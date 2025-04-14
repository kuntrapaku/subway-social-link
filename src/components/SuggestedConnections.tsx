
import { User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectionProps {
  id: string;
  name: string;
  title: string;
  mutualConnections: number;
}

const SuggestedConnections = () => {
  const connections: ConnectionProps[] = [
    { id: '1', name: 'Arjun Reddy', title: 'Cinematographer at 24 Frames', mutualConnections: 12 },
    { id: '2', name: 'Priya Sharma', title: 'Art Director at 24 Frames', mutualConnections: 8 },
    { id: '3', name: 'Vikram Patel', title: 'Sound Designer at 24 Frames', mutualConnections: 5 },
  ];

  return (
    <div className="subway-card mb-4">
      <h3 className="font-medium text-lg mb-3">People you may know</h3>
      <div className="space-y-4">
        {connections.map((connection) => (
          <div key={connection.id} className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{connection.name}</h4>
              <p className="text-sm text-gray-500">{connection.title}</p>
              <p className="text-xs text-gray-400">{connection.mutualConnections} mutual connections</p>
            </div>
            <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              <Plus className="h-4 w-4 mr-1" />
              Connect
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="link" className="text-orange-600">
          View more
        </Button>
      </div>
    </div>
  );
};

export default SuggestedConnections;
