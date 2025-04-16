
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, UserPlus, Mail, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { 
  getPendingConnectionRequests, 
  searchProfiles, 
  sendConnectionRequest, 
  acceptConnectionRequest, 
  getUserConnections,
  ConnectionRequest,
  Profile
} from "@/utils/profileStorage";

const Network = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [pendingConnections, setPendingConnections] = useState<ConnectionRequest[]>([]);
  const [connections, setConnections] = useState<Profile[]>([]);
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const [filteredConnections, setFilteredConnections] = useState<Profile[]>([]);

  useEffect(() => {
    if (user) {
      // Load pending connection requests
      const loadPendingRequests = async () => {
        const requests = await getPendingConnectionRequests(user.id);
        setPendingConnections(requests);
      };

      // Load connections
      const loadConnections = async () => {
        const userConnections = await getUserConnections(user.id);
        setConnections(userConnections);
        setFilteredConnections(userConnections);
      };

      loadPendingRequests();
      loadConnections();
    }
  }, [user]);

  useEffect(() => {
    // Filter connections based on search query
    if (connections.length > 0) {
      const filtered = connections.filter(conn => 
        conn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        conn.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConnections(filtered);
    }
  }, [searchQuery, connections]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchProfiles(searchQuery);
      
      // Filter out the current user and existing connections
      const filteredResults = results.filter(profile => {
        if (!user) return true;
        if (profile.user_id === user.id) return false;
        
        // Check if already connected
        return !connections.some(conn => conn.user_id === profile.user_id);
      });
      
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error searching profiles:", error);
      toast({
        title: "Search error",
        description: "Failed to search for profiles. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleAcceptConnection = async (connection: ConnectionRequest) => {
    if (!user) return;

    try {
      const success = await acceptConnectionRequest(connection.id);
      
      if (success) {
        // Remove from pending
        setPendingConnections(prev => prev.filter(c => c.id !== connection.id));
        
        // Add to connections (refresh connections)
        const userConnections = await getUserConnections(user.id);
        setConnections(userConnections);
        setFilteredConnections(userConnections);
        
        // Show success toast
        toast({
          title: "Connection accepted",
          description: `You are now connected with ${connection.sender?.name || 'this user'}`,
        });
      } else {
        throw new Error("Failed to accept connection");
      }
    } catch (error) {
      console.error("Error accepting connection:", error);
      toast({
        title: "Error",
        description: "Failed to accept connection request. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleIgnoreConnection = (connection: ConnectionRequest) => {
    // Remove from pending
    setPendingConnections(prev => prev.filter(c => c.id !== connection.id));
    
    // Show toast
    toast({
      title: "Connection ignored",
      description: `Request from ${connection.sender?.name || 'this user'} has been ignored`,
    });
  };
  
  const handleConnect = async (profile: Profile) => {
    if (!user) return;

    try {
      const success = await sendConnectionRequest(user, profile.user_id);
      
      if (success) {
        // Remove from search results
        setSearchResults(prev => prev.filter(p => p.user_id !== profile.user_id));
        
        // Show success toast
        toast({
          title: "Connection request sent",
          description: `A connection request has been sent to ${profile.name}`,
        });
      } else {
        throw new Error("Failed to send connection request");
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleRemoveConnection = (connectionId: string) => {
    // Remove from connections
    setConnections(prev => prev.filter(c => c.user_id !== connectionId));
    setFilteredConnections(prev => prev.filter(c => c.user_id !== connectionId));
    
    // Show toast
    toast({
      title: "Connection removed",
      description: "The connection has been removed from your network",
    });
  };
  
  const handleMessage = (connection: Profile) => {
    // Show toast and we'd navigate to messages in a real app
    toast({
      title: "Message sent",
      description: `Opening chat with ${connection.name}`,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md border border-orange-100 p-6 mb-6">
          <Tabs defaultValue="connections">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Film Artists</h1>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="connections" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-1" />
                  Connections
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Pending
                </TabsTrigger>
                <TabsTrigger value="search" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="connections" className="mt-0">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="subway-input pl-10 w-full border border-orange-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Search connections by name or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.length > 0 ? (
                  filteredConnections.map((connection) => (
                    <div key={connection.user_id} className="flex items-start p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{connection.name}</h4>
                        <p className="text-sm text-gray-500">{connection.title}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-orange-600 text-orange-600 hover:bg-orange-50"
                            onClick={() => handleMessage(connection)}
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                            onClick={() => handleRemoveConnection(connection.user_id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    <p>No connections found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <h2 className="text-lg font-medium mb-4">Pending requests</h2>
              <div className="space-y-4">
                {pendingConnections.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p>No pending requests</p>
                  </div>
                ) : (
                  pendingConnections.map((connection) => (
                    <div key={connection.id} className="flex items-start p-4 border border-orange-100 rounded-lg bg-orange-50">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{connection.sender?.name || 'Unknown user'}</h4>
                        <p className="text-sm text-gray-500">{connection.sender?.title || 'Film Professional'}</p>
                        <div className="mt-3 flex space-x-2">
                          <Button 
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={() => handleAcceptConnection(connection)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-gray-300"
                            onClick={() => handleIgnoreConnection(connection)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Ignore
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="search" className="mt-0">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="subway-input pl-10 flex-1 border border-orange-200 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Search people by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button 
                    onClick={handleSearch}
                    className="rounded-l-none bg-orange-600 hover:bg-orange-700"
                    disabled={isSearching || !searchQuery.trim()}
                  >
                    <Search className="h-4 w-4 mr-1" />
                    Search
                  </Button>
                </div>
              </div>
              
              {isSearching ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Searching...</p>
                </div>
              ) : searchQuery && searchResults.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p>No results found for "{searchQuery}"</p>
                </div>
              ) : (
                <div>
                  {searchResults.length > 0 && (
                    <h3 className="text-lg font-medium mb-3">Search Results</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((profile) => (
                      <div key={profile.user_id} className="flex items-start p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <User className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{profile.name}</h4>
                          <p className="text-sm text-gray-500">{profile.title}</p>
                          <p className="text-xs text-gray-400">{profile.location}</p>
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-orange-600 text-orange-600 hover:bg-orange-50"
                              onClick={() => handleConnect(profile)}
                            >
                              <UserPlus className="h-3 w-3 mr-1" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!searchQuery && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p>Search for film professionals to connect with</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Network;
