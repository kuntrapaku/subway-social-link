
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { getProfileById, Profile } from "@/utils/profiles";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User, MapPin, Briefcase, Calendar, Link as LinkIcon, Users, MessageSquare, ArrowLeft, Film } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedProfile = await getProfileById(userId);
        
        if (!fetchedProfile) {
          setError("User not found");
        } else {
          setProfile(fetchedProfile);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-20 w-full rounded-lg mb-4" />
              <Skeleton className="h-72 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
          <div className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {error || "User not found"}
            </h2>
            <p className="text-gray-600 mb-6">
              The profile you're looking for doesn't exist or isn't available.
            </p>
            <Button onClick={() => navigate("/network")}>
              Back to Network
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{profile.name}'s Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCard isCurrentUser={user?.id === profile.user_id} userId={profile.user_id} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="subway-card mb-4">
              <Tabs defaultValue="posts">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="posts" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Posts</span>
                  </TabsTrigger>
                  <TabsTrigger value="photos" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <User className="h-4 w-4 mr-1" />
                    <span>Photos</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Film className="h-4 w-4 mr-1" />
                    <span>Videos</span>
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Connections</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="posts" className="mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No posts to display yet</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="photos" className="mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No photos to display yet</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="videos" className="mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <Film className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No videos to display yet</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="connections" className="mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No connections to display</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
