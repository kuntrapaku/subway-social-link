import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TrendingTopics from "./TrendingTopics";
import CreativeDepartments from "./CreativeDepartments";
import UpcomingEvents from "./UpcomingEvents";
import SuggestedConnections from "@/components/SuggestedConnections";
import { useAuth } from "@/context/AuthContext";
import { getSuggestedProfiles } from "@/utils/profiles";
import { Profile } from "@/utils/profiles";

const RightSidebar = () => {
  const { user } = useAuth();
  const [suggestedProfiles, setSuggestedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (user) {
        try {
          setLoading(true);
          const profiles = await getSuggestedProfiles(user.id, 3);
          setSuggestedProfiles(profiles);
        } catch (error) {
          console.error("Error fetching suggested profiles:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSuggestions();
  }, [user]);

  return (
    <div className="hidden lg:block space-y-6">
      <Card className="p-4 shadow-sm">
        <h3 className="font-medium text-lg mb-4">People you may know</h3>
        <SuggestedConnections 
          profiles={suggestedProfiles} 
          loading={loading} 
        />
      </Card>
      
      <Card className="p-4 shadow-sm">
        <TrendingTopics />
      </Card>
      
      <Card className="p-4 shadow-sm">
        <CreativeDepartments />
      </Card>
      
      <Card className="p-4 shadow-sm">
        <UpcomingEvents />
      </Card>
    </div>
  );
};

export default RightSidebar;
