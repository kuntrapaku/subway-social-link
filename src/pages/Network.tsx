
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Clock, Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  getPendingConnectionRequests, 
  getUserConnections, 
  getSuggestedProfiles,
  acceptConnectionRequest,
  Profile,
  ConnectionRequest
} from "@/utils/profileStorage";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const Network = () => {
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const [connections, setConnections] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [suggestedProfiles, setSuggestedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchNetworkData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const [userConnections, pendingReqs, suggested] = await Promise.all([
          getUserConnections(user.id),
          getPendingConnectionRequests(user.id),
          getSuggestedProfiles(user.id, 10)
        ]);
        
        setConnections(userConnections);
        setPendingRequests(pendingReqs);
        setSuggestedProfiles(suggested);
      } catch (error) {
        console.error("Error fetching network data:", error);
        toast.error("Failed to load network data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNetworkData();
    
    // Refresh when connections change
    const handleConnectionsUpdate = () => {
      fetchNetworkData();
    };
    
    window.addEventListener("connections-updated", handleConnectionsUpdate);
    
    return () => {
      window.removeEventListener("connections-updated", handleConnectionsUpdate);
    };
  }, [user]);

  const handleAcceptRequest = async (requestId: string) => {
    if (!user) return;
    
    setProcessingIds(prev => ({ ...prev, [requestId]: true }));
    try {
      const success = await acceptConnectionRequest(requestId);
      
      if (success) {
        // Update the local state
        const request = pendingRequests.find(req => req.id === requestId);
        if (request && request.sender) {
          // Add the sender to connections
          setConnections(prev => [...prev, request.sender!]);
          
          // Remove from pending requests
          setPendingRequests(prev => prev.filter(req => req.id !== requestId));
          
          uiToast({
            title: "Connection accepted",
            description: `You are now connected with ${request.sender.name}`,
          });
          
          // Dispatch event to update other components
          window.dispatchEvent(new Event("connections-updated"));
        }
      } else {
        uiToast({
          title: "Failed to accept request",
          description: "Please try again later",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error accepting connection request:", error);
      uiToast({
        title: "Error",
        description: "Failed to accept connection request",
        variant: "destructive"
      });
    } finally {
      setProcessingIds(prev => ({ ...prev, [requestId]: false }));
    }
  };

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6).fill(0).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderConnection = (profile: Profile) => (
    <Card key={profile.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-medium">{profile.name}</h4>
            <p className="text-sm text-gray-500">{profile.title}</p>
            <p className="text-xs text-gray-400 mt-1">{profile.location}</p>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
          >
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPendingRequest = (request: ConnectionRequest) => {
    if (!request.sender) return null;
    
    return (
      <Card key={request.id} className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium">{request.sender.name}</h4>
              <p className="text-sm text-gray-500">{request.sender.title}</p>
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  Sent {new Date(request.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-green-600 border-green-600 hover:bg-green-50"
              onClick={() => handleAcceptRequest(request.id)}
              disabled={processingIds[request.id]}
            >
              {processingIds[request.id] ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Network</h1>
        
        <Tabs defaultValue="connections">
          <TabsList className="mb-4">
            <TabsTrigger value="connections" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">
              <Users className="h-4 w-4 mr-2" />
              Connections ({connections.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">
              <Clock className="h-4 w-4 mr-2" />
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">
              <User className="h-4 w-4 mr-2" />
              Suggestions ({suggestedProfiles.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            {loading ? (
              renderLoadingSkeleton()
            ) : connections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.map(renderConnection)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No connections yet</h3>
                <p className="text-gray-500 mb-6">Start building your professional network by connecting with other film industry professionals</p>
                <Button 
                  onClick={() => document.querySelector('[data-value="suggestions"]')?.click()}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Explore Suggestions
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {loading ? (
              renderLoadingSkeleton()
            ) : pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingRequests.map(renderPendingRequest)}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No pending requests</h3>
                <p className="text-gray-500">When someone sends you a connection request, it will appear here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggestions">
            {loading ? (
              renderLoadingSkeleton()
            ) : suggestedProfiles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedProfiles.map(profile => (
                  <Card key={profile.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{profile.name}</h4>
                          <p className="text-sm text-gray-500">{profile.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{profile.location}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-orange-600 border-orange-600 hover:bg-orange-50"
                        >
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No suggestions available</h3>
                <p className="text-gray-500">We'll let you know when we find people you may know</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Network;
