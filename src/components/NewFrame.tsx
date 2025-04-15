
import { useState } from "react";
import { Image, Users, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/components/NewPost";

interface NewFrameProps {
  onFrameCreated?: (frame: Post) => void;
}

const NewFrame = ({ onFrameCreated }: NewFrameProps = {}) => {
  const [content, setContent] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !video) {
      toast({
        title: "Empty frame post",
        description: "Please add some description or a video to your frame.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new frame object
    const newFrame: Post = {
      id: Date.now().toString(), // Generate a unique ID based on timestamp
      author: {
        name: "You", // In a real app, this would come from authenticated user
        title: "Filmmaker"
      },
      timeAgo: "Just now",
      content: content,
      imageUrl: video ? URL.createObjectURL(video) : undefined,
      likes: 0,
      comments: 0,
      isLiked: false,
      isVideo: true
    };
    
    // Call the callback to add the frame to the timeline
    if (onFrameCreated) {
      onFrameCreated(newFrame);
    }
    
    // Show success toast
    toast({
      title: "Frame shared!",
      description: "Your video frame has been shared with your network.",
    });
    
    // Reset form
    setContent("");
    setVideo(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <textarea
            className="flex-1 p-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            placeholder="Add details about your frame..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {video && (
          <div className="mt-3 relative">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-60">
              <Video className="h-16 w-16 text-orange-400" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
                {video.name}
              </div>
            </div>
            <Button 
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setVideo(null)}
            >
              Remove
            </Button>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setVideo(e.target.files[0]);
                  }
                }}
              />
              <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100">
                <Video className="h-5 w-5 mr-1" />
                <span className="text-sm">Upload Video</span>
              </div>
            </label>
          </div>
          <Button 
            type="submit"
            className="bg-orange-600 text-white hover:bg-orange-700 transition-colors"
          >
            Share Frame
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewFrame;
