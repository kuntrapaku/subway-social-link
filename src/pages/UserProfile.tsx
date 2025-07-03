
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User, MapPin, Briefcase, Calendar, Link as LinkIcon, Users, MessageSquare, ArrowLeft, Film } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  name: string;
  title: string;
  location: string;
  connections: number;
  company: string;
  joinDate: string;
  website: string;
  bio: string;
  user_id: string;
}

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
        console.log('Fetching profile for userId:', userId);
        
        let fetchedProfile: Profile | null = null;
        
        // Check if current user is a real authenticated user (not temp)
        const isRealUser = user && 'email' in user && !('isTemporary' in user);
        
        if (isRealUser) {
          // Try to find in Supabase profile_builder by user_id (for real users)
          const { data: supabaseProfile, error: supabaseError } = await supabase
            .from('profile_builder')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();
          
          console.log('Supabase profile query result:', supabaseProfile, 'Error:', supabaseError);
          
          if (supabaseProfile && !supabaseError) {
            fetchedProfile = {
              id: supabaseProfile.id,
              name: supabaseProfile.display_name || 'Film Professional',
              title: 'Film Professional',
              location: 'Mumbai, India',
              connections: Math.floor(Math.random() * 500) + 50,
              company: 'MovCon Studios',
              joinDate: new Date(supabaseProfile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              website: 'www.movconnect.com',
              bio: supabaseProfile.bio || 'Welcome to MovConnect!',
              user_id: supabaseProfile.user_id
            };
            console.log('Found profile in Supabase:', fetchedProfile);
          }
        }
        
        // If not found in database, try mock users (for demo purposes)
        if (!fetchedProfile) {
          const mockUsers = [
            { name: 'Ayaan Khan', role: 'Cinematographer', location: 'Mumbai', id: 'ayaan-khan' },
            { name: 'Rajesh Kumar', role: 'Cinematographer', location: 'Mumbai', id: 'rajesh-kumar' },
            { name: 'Priya Sharma', role: 'Art Director', location: 'Delhi', id: 'priya-sharma' },
            { name: 'Vikram Singh', role: 'Film Director', location: 'Chennai', id: 'vikram-singh' },
            { name: 'Aditya Kapoor', role: 'Film Director', location: 'Bangalore', id: 'aditya-kapoor' },
            { name: 'Meera Nair', role: 'Producer', location: 'Kochi', id: 'meera-nair' },
          ];
          
          const matchedUser = mockUsers.find(u => u.id === userId);
          if (matchedUser) {
            fetchedProfile = {
              id: matchedUser.id,
              name: matchedUser.name,
              title: matchedUser.role,
              location: matchedUser.location,
              connections: Math.floor(Math.random() * 500) + 50,
              company: 'Independent Filmmaker',
              joinDate: 'January 2024',
              website: 'www.example.com',
              bio: `Passionate ${matchedUser.role.toLowerCase()} with years of experience in the film industry. Always looking to collaborate on exciting projects.`,
              user_id: matchedUser.id
            };
            console.log('Found mock user profile:', fetchedProfile);
          }
        }
        
        if (!fetchedProfile) {
          setError("User not found");
          console.log('No profile found for userId:', userId);
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
  }, [userId, user]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
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
    );
  }

  if (error || !profile) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{profile.name}'s Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="subway-card animate-fade-in">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-orange-400 to-red-600 rounded-t-lg"></div>
              <div className="absolute -bottom-12 left-4">
                <div className="h-24 w-24 rounded-full bg-white p-1">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-orange-100 to-red-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-14 px-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-gray-600">{profile.title}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-orange-600 mt-1 font-medium">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{profile.connections} connections</span>
                  </div>
                </div>
                <div>
                  {user?.id === profile.user_id ? (
                    <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button className="bg-orange-600 text-white hover:bg-orange-700 w-full">
                        Connect
                      </Button>
                      <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 w-full">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{profile.company}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Joined {profile.joinDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <a href={profile.website ? `https://${profile.website}` : "#"} className="text-orange-600 hover:underline">
                    {profile.website || "Not specified"}
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-md font-medium">About</h3>
                <p className="text-sm text-gray-600 mt-1">{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="subway-card mb-4">
            <Tabs defaultValue="posts">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="posts">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>Posts</span>
                </TabsTrigger>
                <TabsTrigger value="photos">
                  <User className="h-4 w-4 mr-1" />
                  <span>Photos</span>
                </TabsTrigger>
                <TabsTrigger value="videos">
                  <Film className="h-4 w-4 mr-1" />
                  <span>Videos</span>
                </TabsTrigger>
                <TabsTrigger value="connections">
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
  );
};

export default UserProfile;
