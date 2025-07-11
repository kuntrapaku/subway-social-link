import { User, MapPin, Briefcase, Calendar, Link, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditProfileDialog } from "./EditProfileDialog";
import { getProfile, saveProfile, updateProfile, Profile as ProfileType } from "@/utils/profiles";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toCompatibleUser, getUserDisplayName } from "@/utils/userHelpers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileCardProps {
  isCurrentUser?: boolean;
  userId?: string;
}

const ProfileCard = ({ isCurrentUser = false, userId }: ProfileCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Always check localStorage first for the most up-to-date profile
      const localProfile = localStorage.getItem('user-profile');
      if (localProfile && isCurrentUser) {
        try {
          const parsedProfile = JSON.parse(localProfile);
          console.log('Using localStorage profile:', parsedProfile);
          setProfile(parsedProfile);
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing localStorage profile:', error);
        }
      }

      // If user is authenticated and real (not temp), try to get from Supabase
      const isRealUser = user && 'email' in user && !('isTemporary' in user);
      
      if (isRealUser) {
        try {
          const { data: supabaseProfile } = await supabase
            .from('profile_builder')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (supabaseProfile) {
            const profileData = {
              id: supabaseProfile.id,
              name: supabaseProfile.display_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Film Professional',
              title: 'Film Professional',
              location: 'Mumbai, India',
              connections: 0,
              company: 'MovCon Studios',
              joinDate: new Date(supabaseProfile.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              website: '',
              bio: supabaseProfile.bio || 'Welcome to MovConnect!',
              user_id: user.id
            };
            
            // Cache in localStorage
            localStorage.setItem('user-profile', JSON.stringify(profileData));
            setProfile(profileData);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error fetching from Supabase:', error);
        }
      }

      // For temp users or when database fetch fails
      if (user) {
        const displayName = 'username' in user ? user.username : 
                           'email' in user ? (user.user_metadata?.name || user.email?.split('@')[0] || 'Film Professional') :
                           'Film Professional';
        
        const basicProfile = {
          id: user.id,
          name: displayName,
          title: "Film Professional",
          location: "Mumbai, India",
          connections: 0,
          company: "MovCon Studios",
          joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          website: "",
          bio: "Welcome to MovConnect!",
          user_id: user.id
        };
        setProfile(basicProfile);
        
        // Cache in localStorage for temp users too
        if (isCurrentUser) {
          localStorage.setItem('user-profile', JSON.stringify(basicProfile));
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    
    // Add event listener to refresh profile when it's updated
    const handleProfileUpdate = () => {
      console.log('Profile update event received, refetching...');
      fetchProfile();
    };
    
    window.addEventListener("profile-updated", handleProfileUpdate);
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, [user, userId, isCurrentUser]);

  const handleSaveProfile = async (updatedProfile: Omit<ProfileType, 'connections' | 'joinDate' | 'id' | 'user_id'>) => {
    if (!user || !profile) return;
    
    try {
      // Update profile in Supabase if user is authenticated via Supabase
      const isRealUser = 'email' in user && !('isTemporary' in user);
      
      if (isRealUser) {
        const { error } = await supabase
          .from('profile_builder')
          .upsert({
            user_id: user.id,
            display_name: updatedProfile.name,
            bio: updatedProfile.bio,
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error updating profile in Supabase:', error);
          throw error;
        }
      }

      // Update local profile state
      const newProfile = {
        ...profile,
        ...updatedProfile
      };
      setProfile(newProfile);

      // Update localStorage cache immediately
      localStorage.setItem('user-profile', JSON.stringify(newProfile));
      console.log('Profile saved to localStorage:', newProfile);

      // Update temp user data if it's a temp user
      if ('isTemporary' in user && user.isTemporary) {
        const tempUserData = {
          ...user,
          username: updatedProfile.name
        };
        localStorage.setItem('tempUser', JSON.stringify(tempUserData));
      }

      toast({
        title: "Profile updated successfully",
        description: "Your profile changes have been saved.",
      });

      // Trigger profile update event for other components
      window.dispatchEvent(new Event("profile-updated"));
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "There was an error saving your changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <ProfileCardSkeleton />;
  }

  if (!profile) {
    return <div className="subway-card">Profile not found</div>;
  }

  return (
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
            {isCurrentUser ? (
              <EditProfileDialog 
                initialData={{
                  name: profile.name,
                  title: profile.title,
                  location: profile.location,
                  company: profile.company,
                  website: profile.website,
                  bio: profile.bio
                }}
                onSave={handleSaveProfile}
                trigger={
                  <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                    Edit Profile
                  </Button>
                }
              />
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
            <Link className="h-4 w-4 mr-2 text-gray-500" />
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
  );
};

// Loading skeleton for the profile card
const ProfileCardSkeleton = () => (
  <div className="subway-card">
    <div className="relative">
      <div className="h-32 bg-gray-200 rounded-t-lg"></div>
      <div className="absolute -bottom-12 left-4">
        <div className="h-24 w-24 rounded-full bg-white p-1">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </div>
    </div>
    <div className="mt-14 px-2 space-y-4">
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export default ProfileCard;
