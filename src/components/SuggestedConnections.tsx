
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sendConnectionRequest, Profile } from "@/utils/profileStorage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SuggestedConnectionsProps {
  profiles: Profile[];
  loading?: boolean;
}

const SuggestedConnections = ({ profiles, loading = false }: SuggestedConnectionsProps) => {
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
      const success = await sendConnectionRequest(user, profileId);
      
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
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-4">
        <Users className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">No suggestions available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <div key={profile.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <User className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{profile.name}</h4>
              <p className="text-xs text-gray-500">{profile.title}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="text-orange-600 border-orange-600 hover:bg-orange-50"
            onClick={() => handleConnect(profile.user_id)}
            disabled={sendingRequests[profile.user_id]}
          >
            {sendingRequests[profile.user_id] ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
            ) : (
              "Connect"
            )}
          </Button>
        </div>
      ))}
      
      {profiles.length > 0 && (
        <div className="pt-2 text-center">
          <a href="/network" className="text-orange-600 text-sm hover:underline">
            View more
          </a>
        </div>
      )}
    </div>
  );
};

export default SuggestedConnections;
