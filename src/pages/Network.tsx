
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, UserPlus, Mail, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ConnectionProps {
  id: string;
  name: string;
  title: string;
  mutualConnections?: number;
  isConnected?: boolean;
}

const Network = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [pendingConnections, setPendingConnections] = useState<ConnectionProps[]>([
    { id: '1', name: 'Ananya Sharma', title: 'Costume Designer at Dharma Productions', mutualConnections: 15 },
    { id: '2', name: 'Rajiv Malhotra', title: 'Director of Photography', mutualConnections: 8 },
    { id: '3', name: 'Samir Khan', title: 'Sound Engineer at 24 Frames', mutualConnections: 5 }
  ]);
  
  const [suggestions, setSuggestions] = useState<ConnectionProps[]>([
    { id: '1', name: 'Divya Patel', title: 'Makeup Artist', mutualConnections: 12 },
    { id: '2', name: 'Rohan Kapoor', title: 'Film Editor at Yash Raj Films', mutualConnections: 8 },
    { id: '3', name: 'Neha Gupta', title: 'VFX Supervisor', mutualConnections: 5 },
    { id: '4', name: 'Karan Mehta', title: 'Production Manager', mutualConnections: 3 },
    { id: '5', name: 'Pooja Desai', title: 'Screenplay Writer', mutualConnections: 7 },
    { id: '6', name: 'Vikram Singh', title: 'Stunt Coordinator', mutualConnections: 10 }
  ]);
  
  const [connections, setConnections] = useState<ConnectionProps[]>([
    { id: '1', name: 'Arjun Reddy', title: 'Cinematographer at 24 Frames', isConnected: true },
    { id: '2', name: 'Priya Sharma', title: 'Art Director at 24 Frames', isConnected: true },
    { id: '3', name: 'Vikram Patel', title: 'Sound Designer at 24 Frames', isConnected: true },
    { id: '4', name: 'Sneha Joshi', title: 'Assistant Director at Red Chillies', isConnected: true },
    { id: '5', name: 'Amit Kumar', title: 'Light Technician', isConnected: true },
    { id: '6', name: 'Meera Kapoor', title: 'Costume Designer at 24 Frames', isConnected: true },
    { id: '7', name: 'Rahul Verma', title: 'Production Assistant', isConnected: true },
    { id: '8', name: 'Deepika Reddy', title: 'Makeup Artist at 24 Frames', isConnected: true }
  ]);
  
  const filteredConnections = connections.filter(conn => 
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    conn.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptConnection = (connection: ConnectionProps) => {
    // Add to connections
    setConnections(prev => [...prev, { ...connection, isConnected: true }]);
    
    // Remove from pending
    setPendingConnections(prev => prev.filter(c => c.id !== connection.id));
    
    // Show success toast
    toast({
      title: "Connection accepted",
      description: `You are now connected with ${connection.name}`,
    });
  };
  
  const handleIgnoreConnection = (connection: ConnectionProps) => {
    // Remove from pending
    setPendingConnections(prev => prev.filter(c => c.id !== connection.id));
    
    // Show toast
    toast({
      title: "Connection ignored",
      description: `Request from ${connection.name} has been ignored`,
    });
  };
  
  const handleConnect = (connection: ConnectionProps) => {
    // Remove from suggestions
    setSuggestions(prev => prev.filter(c => c.id !== connection.id));
    
    // Add to connections
    setConnections(prev => [...prev, { ...connection, isConnected: true }]);
    
    // Show success toast
    toast({
      title: "Connection sent",
      description: `You are now connected with ${connection.name}`,
    });
  };
  
  const handleRemoveConnection = (connectionId: string) => {
    // Remove from connections
    setConnections(prev => prev.filter(c => c.id !== connectionId));
    
    // Show toast
    toast({
      title: "Connection removed",
      description: "The connection has been removed from your network",
    });
  };
  
  const handleMessage = (connection: ConnectionProps) => {
    // Show toast and we'd navigate to messages in a real app
    toast({
      title: "Message sent",
      description: `Opening chat with ${connection.name}`,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md border border-orange-100 p-6 mb-6">
          <Tabs defaultValue="connections">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Film Artists</h1>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="connections" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  <Users className="h-4 w-4 mr-1" />
                  Connections
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Pending
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  <User className="h-4 w-4 mr-1" />
                  Suggestions
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="connections" className="mt-0">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="subway-input pl-10 w-full border border-orange-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Search connections by name or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.length > 0 ? (
                  filteredConnections.map((connection) => (
                    <div key={connection.id} className="flex items-start p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{connection.name}</h4>
                        <p className="text-sm text-gray-500">{connection.title}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-orange-600 text-orange-600 hover:bg-orange-50"
                            onClick={() => handleMessage(connection)}
                          >
                            <Mail className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                            onClick={() => handleRemoveConnection(connection.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    <p>No connections found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <h2 className="text-lg font-medium mb-4">Pending requests</h2>
              <div className="space-y-4">
                {pendingConnections.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p>No pending requests</p>
                  </div>
                ) : (
                  pendingConnections.map((connection) => (
                    <div key={connection.id} className="flex items-start p-4 border border-orange-100 rounded-lg bg-orange-50">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{connection.name}</h4>
                        <p className="text-sm text-gray-500">{connection.title}</p>
                        <p className="text-xs text-gray-400">{connection.mutualConnections} mutual connections</p>
                        <div className="mt-3 flex space-x-2">
                          <Button 
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={() => handleAcceptConnection(connection)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-gray-300"
                            onClick={() => handleIgnoreConnection(connection)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Ignore
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="suggestions" className="mt-0">
              <h2 className="text-lg font-medium mb-4">People you may know from 24 Frames</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p>No suggestions at the moment</p>
                  </div>
                ) : (
                  suggestions.map((connection) => (
                    <div key={connection.id} className="flex items-start p-4 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{connection.name}</h4>
                        <p className="text-sm text-gray-500">{connection.title}</p>
                        <p className="text-xs text-gray-400">{connection.mutualConnections} mutual connections</p>
                        <div className="mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-orange-600 text-orange-600 hover:bg-orange-50"
                            onClick={() => handleConnect(connection)}
                          >
                            <UserPlus className="h-3 w-3 mr-1" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Network;
