
import { User, MapPin, Briefcase, Calendar, Link, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditProfileDialog } from "./EditProfileDialog";
import { getProfile, saveProfile, Profile as ProfileType } from "@/utils/profileStorage";

interface ProfileCardProps {
  isCurrentUser?: boolean;
}

const ProfileCard = ({ isCurrentUser = false }: ProfileCardProps) => {
  const [profile, setProfile] = useState<ProfileType>(getProfile());

  useEffect(() => {
    // Load profile on component mount
    setProfile(getProfile());
    
    // Add event listener to refresh profile when localStorage changes
    const handleProfileUpdate = () => {
      setProfile(getProfile());
    };
    
    window.addEventListener("profile-updated", handleProfileUpdate);
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  const handleSaveProfile = (updatedProfile: Omit<ProfileType, 'connections' | 'joinDate'>) => {
    const newProfile = {
      ...profile,
      ...updatedProfile
    };
    saveProfile(newProfile);
    setProfile(newProfile);
  };

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
              {profile.website}
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

export default ProfileCard;
