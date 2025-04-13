
import { Link } from "react-router-dom";
import { Home, Users, Bell, MessageSquare, User, Menu, Search, Clapperboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-subway-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-subway-500 to-subway-700 flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-subway-600 to-subway-500 text-transparent bg-clip-text">
                  SubConnect
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-subway-600">
                <Home className="h-5 w-5 mr-1" />
                <span>Home</span>
              </Link>
              <Link to="/network" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-subway-600">
                <Users className="h-5 w-5 mr-1" />
                <span>My Network</span>
              </Link>
              <Link to="/messages" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-subway-600">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>Messages</span>
              </Link>
              <Link to="/film-industry" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-subway-600">
                <Clapperboard className="h-5 w-5 mr-1" />
                <span>Film Industry</span>
              </Link>
              <Link to="/notifications" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-subway-600">
                <Bell className="h-5 w-5 mr-1" />
                <span>Notifications</span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="subway-input pl-10 w-64"
                placeholder="Search connections, posts..."
              />
            </div>
            <Link to="/profile" className="p-1">
              <div className="h-8 w-8 rounded-full bg-subway-200 flex items-center justify-center">
                <User className="h-5 w-5 text-subway-600" />
              </div>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-subway-600 hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-subway-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Home
            </Link>
            <Link
              to="/network"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-subway-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              My Network
            </Link>
            <Link
              to="/messages"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-subway-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Messages
            </Link>
            <Link
              to="/film-industry"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-subway-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Film Industry
            </Link>
            <Link
              to="/notifications"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-subway-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Notifications
            </Link>
            <Link
              to="/profile"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent hover:bg-gray-50 hover:border-subway-300 text-gray-500 hover:text-gray-700 font-medium"
            >
              Profile
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-subway-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-subway-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">John Doe</div>
                <div className="text-sm font-medium text-gray-500">johndoe@example.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
