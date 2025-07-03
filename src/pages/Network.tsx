
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, MessageSquare, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface NetworkUser {
  id: string;
  name: string;
  role: string;
  location: string;
  mutualConnections: number;
  avatar?: string;
  isConnected: boolean;
  userId: string;
}

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState<NetworkUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch all registered users from database
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const networkUsers: NetworkUser[] = [];

        // Fetch from Supabase profile_builder
        const { data: profiles, error } = await supabase
          .from('profile_builder')
          .select('*')
          .limit(50);

        if (!error && profiles) {
          profiles.forEach(profile => {
            const userSlug = profile.display_name?.toLowerCase().replace(/\s+/g, '-') || profile.user_id;
            networkUsers.push({
              id: profile.id,
              name: profile.display_name || 'Film Professional',
              role: 'Film Professional',
              location: 'Mumbai, India',
              mutualConnections: Math.floor(Math.random() * 20) + 1,
              isConnected: Math.random() > 0.5,
              userId: userSlug
            });
          });
        }

        // Add mock users for demo
        const mockUsers = [
          { name: 'Rajesh Kumar', role: 'Cinematographer', location: 'Mumbai, India', id: 'rajesh-kumar' },
          { name: 'Priya Sharma', role: 'Art Director', location: 'Delhi, India', id: 'priya-sharma' },
          { name: 'Vikram Singh', role: 'Music Composer', location: 'Chennai, India', id: 'vikram-singh' },
          { name: 'Aditya Kapoor', role: 'Film Director', location: 'Bangalore, India', id: 'aditya-kapoor' },
          { name: 'Meera Nair', role: 'Producer', location: 'Kochi, India', id: 'meera-nair' },
          { name: 'Arjun Reddy', role: 'Editor', location: 'Hyderabad, India', id: 'arjun-reddy' },
          { name: 'Ayaan Khan', role: 'Cinematographer', location: 'Mumbai, India', id: 'ayaan-khan' },
          { name: 'Divya Singh', role: 'Actress & Model', location: 'Mumbai, India', id: 'divya-singh' },
        ];

        mockUsers.forEach((user, index) => {
          const exists = networkUsers.some(nu => nu.name.toLowerCase() === user.name.toLowerCase());
          if (!exists) {
            networkUsers.push({
              id: user.id,
              name: user.name,
              role: user.role,
              location: user.location,
              mutualConnections: Math.floor(Math.random() * 15) + 1,
              isConnected: index < 3, // First 3 are connected
              userId: user.id
            });
          }
        });

        setAllUsers(networkUsers);
      } catch (error) {
        console.error('Error fetching network users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const connections = allUsers.filter(user => user.isConnected);
  const suggestions = allUsers.filter(user => !user.isConnected);

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = suggestions.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (name: string) => {
    toast({
      title: "Connection request sent",
      description: `Your connection request has been sent to ${name}.`,
    });
  };

  const handleMessage = (name: string) => {
    toast({
      title: "Opening chat",
      description: `Starting conversation with ${name}...`,
    });
  };

  const handleViewProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const UserCard = ({ user, showConnectButton = false }: { user: NetworkUser, showConnectButton?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow border-orange-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar 
              className="h-16 w-16 cursor-pointer"
              onClick={() => handleViewProfile(user.userId)}
            >
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-lg">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 
                className="text-lg font-semibold cursor-pointer hover:text-orange-600"
                onClick={() => handleViewProfile(user.userId)}
              >
                {user.name}
              </h3>
              <p className="text-gray-600">{user.role}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center text-sm text-orange-600 mt-1">
                <Users className="h-4 w-4 mr-1" />
                <span>{user.mutualConnections} mutual connections</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            {showConnectButton ? (
              <Button 
                onClick={() => handleConnect(user.name)}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Connect
              </Button>
            ) : (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            )}
            <Button 
              variant="outline" 
              onClick={() => handleMessage(user.name)}
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading network...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Network</h1>
          <p className="text-gray-600">Connect with film industry professionals worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search people, roles, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
            />
          </div>
        </div>

        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-orange-50">
            <TabsTrigger 
              value="connections" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              My Connections ({filteredConnections.length})
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Suggestions ({filteredSuggestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="mt-6">
            <div className="space-y-4">
              {filteredConnections.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p>No connections found matching your search</p>
                </div>
              ) : (
                filteredConnections.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-6">
            <div className="space-y-4">
              {filteredSuggestions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p>No suggestions found matching your search</p>
                </div>
              ) : (
                filteredSuggestions.map((user) => (
                  <UserCard key={user.id} user={user} showConnectButton />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Network;
