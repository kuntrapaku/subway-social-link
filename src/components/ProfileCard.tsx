
import { User, MapPin, Briefcase, Calendar, Link, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditProfileDialog } from "./EditProfileDialog";
import { getProfile, saveProfile, updateProfile, Profile as ProfileType } from "@/utils/profileStorage";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileCardProps {
  isCurrentUser?: boolean;
  userId?: string;
}

const ProfileCard = ({ isCurrentUser = false, userId }: ProfileCardProps) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile when component mounts or when user changes
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // If userId is provided and it's not the current user, we would fetch that user's profile
        // For now, we're only handling the current user's profile
        const profileData = await getProfile(user);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
    
    // Add event listener to refresh profile when it's updated
    const handleProfileUpdate = () => {
      fetchProfile();
    };
    
    window.addEventListener("profile-updated", handleProfileUpdate);
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, [user, userId]);

  const handleSaveProfile = async (updatedProfile: Omit<ProfileType, 'connections' | 'joinDate' | 'id' | 'user_id'>) => {
    if (!user || !profile) return;
    
    try {
      const newProfile = await updateProfile(user, updatedProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
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
            <div className="h-full w-full rounded-full bg-orange-100 flex items-center justify-center">
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
            <span>{profile.company}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Joined {profile.joinDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <Link className="h-4 w-4 mr-2 text-gray-500" />
            <a href={`https://${profile.website}`} className="text-orange-600 hover:underline">
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
