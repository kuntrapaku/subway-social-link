
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        
        // First, check if it's a slug-based search (like "ayaan-khan")
        let fetchedProfile: Profile | null = null;
        
        // Try to find by user ID first
        fetchedProfile = await getProfileById(userId);
        
        // If not found and it looks like a slug, try to find by name
        if (!fetchedProfile && userId.includes('-')) {
          const nameFromSlug = userId.replace(/-/g, ' ');
          
          // Check localStorage first for temp users
          const localProfile = localStorage.getItem('user-profile');
          if (localProfile) {
            const profile = JSON.parse(localProfile);
            if (profile.name?.toLowerCase() === nameFromSlug.toLowerCase()) {
              fetchedProfile = {
                id: profile.id || profile.user_id,
                name: profile.name,
                title: profile.title || 'Film Professional',
                location: profile.location || 'Mumbai, India',
                connections: profile.connections || 0,
                company: profile.company || '',
                joinDate: profile.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                website: profile.website || '',
                bio: profile.bio || 'Welcome to MovConnect!',
                user_id: profile.user_id || profile.id
              };
            }
          }
          
          // If still not found, create a mock profile for demo users
          if (!fetchedProfile) {
            const mockUsers = [
              { name: 'Sarayu Kuntrapaku', role: 'Film Director', location: 'Mumbai', id: 'sarayu-kuntrapaku' },
              { name: 'Surendra Kuntrapaku', role: 'Producer & Director', location: 'Hyderabad', id: 'surendra-kuntrapaku' },
              { name: 'Ayaan Khan', role: 'Cinematographer', location: 'Mumbai', id: 'ayaan-khan' },
              { name: 'Rajesh Kumar', role: 'Cinematographer', location: 'Mumbai', id: 'rajesh-kumar' },
              { name: 'Priya Sharma', role: 'Art Director', location: 'Delhi', id: 'priya-sharma' },
              { name: 'Vikram Singh', role: 'Film Director', location: 'Chennai', id: 'vikram-singh' },
              { name: 'Ananya Patel', role: 'Music Composer', location: 'Mumbai', id: 'ananya-patel' },
              { name: 'Divya Singh', role: 'Actress & Model', location: 'Mumbai', id: 'divya-singh' },
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
            }
          }
        }
        
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
                  <span>{profile.company || "MovCon Studios"}</span>
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
  );
};

export default UserProfile;
