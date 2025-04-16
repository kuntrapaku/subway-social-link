import { Link, useNavigate } from "react-router-dom";
import { Home, Users, Bell, MessageSquare, User, Menu, Search, LogOut, Settings, HelpCircle, Moon, Film, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getProfile, Profile } from "@/utils/profiles";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const profile = await getProfile(user);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error fetching user profile for navbar:", error);
        }
      }
    };

    fetchUserProfile();

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchUserProfile();
    };
    
    window.addEventListener("profile-updated", handleProfileUpdate);
    
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Navigate to network page with search query and explicitly set the tab
    navigate(`/network?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-subway-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-600 to-red-500 text-transparent bg-clip-text">
                  MovConnect
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-orange-600">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link to="/network" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-orange-600">
                <Users className="h-5 w-5 mr-1" />
                <span>My Network</span>
              </Link>
              <Link to="/messages" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-orange-600">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>Messages</span>
              </Link>
              <Link to="/notifications" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-orange-600">
                <Bell className="h-5 w-5 mr-1" />
                <span>Notifications</span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Search creators, art..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="hidden">Search</button>
            </form>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center hover:ring-2 hover:ring-orange-400 transition-all duration-200">
                      <User className="h-5 w-5 text-orange-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72" align="end">
                  <div className="flex items-center gap-2 p-3 border-b border-gray-100">
                    <div className="h-12 w-12 rounded-full bg-orange-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{userProfile?.name || "Loading..."}</span>
                      <Link to="/profile" className="text-sm text-gray-500 hover:text-orange-500">
                        View your profile
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                      <Film className="h-5 w-5 text-orange-500" />
                      <span>Filmmaker Hub</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span>Settings & privacy</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                      <HelpCircle className="h-5 w-5 text-gray-600" />
                      <span>Help & support</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                      <Moon className="h-5 w-5 text-gray-600" />
                      <span>Display mode</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                      <Send className="h-5 w-5 text-gray-600" />
                      <span>Send feedback</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      className="flex items-center gap-2 p-3 cursor-pointer hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <div className="p-1 rounded-full bg-red-100">
                        <LogOut className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="font-medium text-red-600">Sign out</span>
                    </DropdownMenuItem>
                    
                    <div className="p-3 text-xs text-gray-500 mt-2 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        <span>Privacy</span>•
                        <span>Terms</span>•
                        <span>Advertising</span>•
                        <span>Cookies</span>•
                        <span>More</span>
                      </div>
                      <div className="mt-1">
                        © 2025 MovConnect
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orange-600 hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <form onSubmit={handleSearch} className="px-4 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Search creators, art..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="hidden">Search</button>
              </div>
            </form>
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-orange-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Home
            </Link>
            <Link
              to="/network"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-orange-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              My Network
            </Link>
            <Link
              to="/messages"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-orange-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Messages
            </Link>
            <Link
              to="/notifications"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-orange-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Notifications
            </Link>
            {!user && (
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-orange-300 text-gray-500 hover:text-gray-700 font-medium"
              >
                Login
              </Link>
            )}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-orange-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{userProfile?.name || "Loading..."}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2 px-3 py-2 text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md"
                >
                  <LogOut className="h-5 w-5" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
