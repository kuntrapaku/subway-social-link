
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users, UserPlus, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ConnectionProps {
  id: string;
  name: string;
  title: string;
  mutualConnections?: number;
  isConnected?: boolean;
}

const Network = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const pendingConnections: ConnectionProps[] = [
    { id: '1', name: 'Jennifer Lee', title: 'Product Designer', mutualConnections: 15 },
    { id: '2', name: 'Robert Smith', title: 'Frontend Developer', mutualConnections: 8 },
    { id: '3', name: 'David Wilson', title: 'Project Manager', mutualConnections: 5 }
  ];
  
  const suggestions: ConnectionProps[] = [
    { id: '1', name: 'Sarah Johnson', title: 'Product Manager', mutualConnections: 12 },
    { id: '2', name: 'Michael Chen', title: 'UI/UX Designer', mutualConnections: 8 },
    { id: '3', name: 'Emma Wilson', title: 'Marketing Lead', mutualConnections: 5 },
    { id: '4', name: 'James Brown', title: 'Backend Developer', mutualConnections: 3 },
    { id: '5', name: 'Olivia Garcia', title: 'Content Strategist', mutualConnections: 7 },
    { id: '6', name: 'Ethan Davis', title: 'Data Analyst', mutualConnections: 10 }
  ];
  
  const connections: ConnectionProps[] = [
    { id: '1', name: 'Alex Johnson', title: 'Software Engineer', isConnected: true },
    { id: '2', name: 'Maria Rodriguez', title: 'UX Researcher', isConnected: true },
    { id: '3', name: 'Daniel Kim', title: 'Product Manager', isConnected: true },
    { id: '4', name: 'Sophia Williams', title: 'Graphic Designer', isConnected: true },
    { id: '5', name: 'Noah Taylor', title: 'Marketing Specialist', isConnected: true },
    { id: '6', name: 'Isabella Martinez', title: 'Content Writer', isConnected: true },
    { id: '7', name: 'William Brown', title: 'Full Stack Developer', isConnected: true },
    { id: '8', name: 'Ava Thomas', title: 'Project Coordinator', isConnected: true }
  ];
  
  const filteredConnections = connections.filter(conn => 
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    conn.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="subway-card mb-6">
          <Tabs defaultValue="connections">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">My Network</h1>
              <TabsList>
                <TabsTrigger value="connections" className="data-[state=active]:bg-subway-50 data-[state=active]:text-subway-600">
                  <Users className="h-4 w-4 mr-1" />
                  Connections
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-subway-50 data-[state=active]:text-subway-600">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Pending
                </TabsTrigger>
                <TabsTrigger value="suggestions" className="data-[state=active]:bg-subway-50 data-[state=active]:text-subway-600">
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
                  className="subway-input pl-10 w-full"
                  placeholder="Search connections by name or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.length > 0 ? (
                  filteredConnections.map((connection) => (
                    <div key={connection.id} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="h-12 w-12 rounded-full bg-subway-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-subway-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{connection.name}</h4>
                        <p className="text-sm text-gray-500">{connection.title}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Mail className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
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
                {pendingConnections.map((connection) => (
                  <div key={connection.id} className="flex items-start p-4 border border-gray-100 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-subway-100 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-subway-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{connection.name}</h4>
                      <p className="text-sm text-gray-500">{connection.title}</p>
                      <p className="text-xs text-gray-400">{connection.mutualConnections} mutual connections</p>
                      <div className="mt-3 flex space-x-2">
                        <Button className="subway-button">
                          Accept
                        </Button>
                        <Button variant="outline" className="border-gray-300">
                          Ignore
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="suggestions" className="mt-0">
              <h2 className="text-lg font-medium mb-4">People you may know</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((connection) => (
                  <div key={connection.id} className="flex items-start p-4 border border-gray-100 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-subway-100 flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-subway-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{connection.name}</h4>
                      <p className="text-sm text-gray-500">{connection.title}</p>
                      <p className="text-xs text-gray-400">{connection.mutualConnections} mutual connections</p>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="subway-button-outline">
                          <UserPlus className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Network;
