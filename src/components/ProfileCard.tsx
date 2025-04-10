
import { User, MapPin, Briefcase, Calendar, Link, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  user?: {
    name: string;
    title: string;
    location: string;
    connections: number;
    company: string;
    joinDate: string;
    website: string;
    bio: string;
  };
  isCurrentUser?: boolean;
}

const ProfileCard = ({ 
  user = {
    name: "John Doe",
    title: "Software Engineer",
    location: "New York, NY",
    connections: 367,
    company: "Tech Company Inc.",
    joinDate: "January 2022",
    website: "johndoe.com",
    bio: "Passionate software engineer with experience in web development and UI/UX design. Always looking to connect with like-minded professionals."
  },
  isCurrentUser = false 
}: ProfileCardProps) => {
  return (
    <div className="subway-card animate-fade-in">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-subway-400 to-subway-600 rounded-t-lg"></div>
        <div className="absolute -bottom-12 left-4">
          <div className="h-24 w-24 rounded-full bg-white p-1">
            <div className="h-full w-full rounded-full bg-subway-100 flex items-center justify-center">
              <User className="h-12 w-12 text-subway-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 px-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.title}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center text-sm text-subway-600 mt-1 font-medium">
              <Users className="h-4 w-4 mr-1" />
              <span>{user.connections} connections</span>
            </div>
          </div>
          <div>
            {isCurrentUser ? (
              <Button variant="outline" className="subway-button-outline">
                Edit Profile
              </Button>
            ) : (
              <div className="space-y-2">
                <Button className="subway-button w-full">
                  Connect
                </Button>
                <Button variant="outline" className="subway-button-outline w-full">
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
            <span>{user.company}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Joined {user.joinDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <Link className="h-4 w-4 mr-2 text-gray-500" />
            <a href={`https://${user.website}`} className="text-subway-600 hover:underline">
              {user.website}
            </a>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-medium">About</h3>
          <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
