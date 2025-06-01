
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sendConnectionRequest, Profile } from "@/utils/profiles";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { toCompatibleUser } from "@/utils/userHelpers";

interface SuggestedConnectionsProps {
  profiles: Profile[];
  loading: boolean;
}

const SuggestedConnections = ({ profiles, loading }: SuggestedConnectionsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sendingRequests, setSendingRequests] = useState<Record<string, boolean>>({});

  const handleConnect = async (profileId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to connect with other users",
        variant: "destructive"
      });
      return;
    }

    try {
      setSendingRequests(prev => ({ ...prev, [profileId]: true }));
      
      // Convert AuthUser to compatible User for connection operations
      const compatibleUser = toCompatibleUser(user);
      
      if (compatibleUser) {
        const success = await sendConnectionRequest(compatibleUser, profileId);
        
        if (success) {
          toast({
            title: "Connection request sent",
            description: "Your connection request has been sent successfully.",
          });
        } else {
          toast({
            title: "Connection request failed",
            description: "You may have already sent a request to this user.",
            variant: "destructive"
          });
        }
      } else {
        // For temp users, show a message that this feature requires a full account
        toast({
          title: "Feature not available",
          description: "Connecting with other users requires a full account. Please sign up for full access.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast({
        title: "Connection request failed",
        description: "There was a problem sending your connection request.",
        variant: "destructive"
      });
    } finally {
      setSendingRequests(prev => ({ ...prev, [profileId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-2">
        <p>No suggestions available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <div 
          key={profile.id} 
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/user/${profile.user_id}`)}
        >
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{profile.name}</h4>
            <p className="text-xs text-gray-500">{profile.title}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8 border-orange-600 text-orange-600 hover:bg-orange-50"
            onClick={(e) => {
              e.stopPropagation();
              handleConnect(profile.id);
            }}
            disabled={sendingRequests[profile.id]}
          >
            {sendingRequests[profile.id] ? "..." : "Connect"}
          </Button>
        </div>
      ))}
      <div className="text-center mt-4">
        <Button 
          variant="link" 
          className="text-sm text-orange-600"
          onClick={() => navigate("/network")}
        >
          See all suggestions
        </Button>
      </div>
    </div>
  );
};

export default SuggestedConnections;
