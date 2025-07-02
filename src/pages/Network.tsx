
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, MessageSquare, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const connections = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Cinematographer',
      location: 'Mumbai, India',
      mutualConnections: 12,
      avatar: null,
      isConnected: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      role: 'Art Director',
      location: 'Delhi, India',
      mutualConnections: 8,
      avatar: null,
      isConnected: true
    },
    {
      id: '3',
      name: 'Vikram Singh',
      role: 'Music Composer',
      location: 'Chennai, India',
      mutualConnections: 15,
      avatar: null,
      isConnected: true
    }
  ];

  const suggestions = [
    {
      id: '4',
      name: 'Aditya Kapoor',
      role: 'Film Director',
      location: 'Bangalore, India',
      mutualConnections: 5,
      avatar: null,
      isConnected: false
    },
    {
      id: '5',
      name: 'Meera Nair',
      role: 'Producer',
      location: 'Kochi, India',
      mutualConnections: 3,
      avatar: null,
      isConnected: false
    },
    {
      id: '6',
      name: 'Arjun Reddy',
      role: 'Editor',
      location: 'Hyderabad, India',
      mutualConnections: 7,
      avatar: null,
      isConnected: false
    }
  ];

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

  const UserCard = ({ user, showConnectButton = false }: { user: any, showConnectButton?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow border-orange-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-lg">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
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
              placeholder="Search people, roles, or companies..."
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
              My Connections ({connections.length})
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Suggestions ({suggestions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="mt-6">
            <div className="space-y-4">
              {connections.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-6">
            <div className="space-y-4">
              {suggestions.map((user) => (
                <UserCard key={user.id} user={user} showConnectButton />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Network;
