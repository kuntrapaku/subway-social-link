
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Users, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createDemoData } from '@/utils/demoData';

export const DemoDataButton = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateDemoData = async () => {
    setIsCreating(true);
    try {
      const result = await createDemoData();
      
      if (result.success) {
        toast({
          title: "Demo data created successfully!",
          description: "3 demo users, projects, posts, and analytics data have been added to the platform.",
        });
      } else {
        throw new Error('Failed to create demo data');
      }
    } catch (error) {
      console.error('Error creating demo data:', error);
      toast({
        title: "Error creating demo data",
        description: "There was an error creating the demo data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border">
      <div className="flex items-center space-x-2 text-blue-600">
        <Database className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Demo Data</h3>
      </div>
      
      <p className="text-center text-gray-600 text-sm max-w-md">
        Populate the platform with realistic demo content including users, projects, posts, and analytics data for CEO/CTO demonstrations.
      </p>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Users className="h-4 w-4" />
        <span>3 Users • 6 Projects • 6 Posts • Analytics Data</span>
      </div>

      <Button 
        onClick={handleCreateDemoData}
        disabled={isCreating}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isCreating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Demo Data...
          </>
        ) : (
          'Create Demo Data'
        )}
      </Button>
    </div>
  );
};
