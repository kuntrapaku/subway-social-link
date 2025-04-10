
import { useState } from "react";
import { Image, Users, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NewPost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please add some content to your post.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the post to a backend
    toast({
      title: "Post created!",
      description: "Your post has been shared with your network.",
    });
    
    // Reset form
    setContent("");
    setImage(null);
  };

  return (
    <div className="subway-card mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-subway-100 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-subway-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <textarea
            className="flex-1 p-2 subway-input resize-none"
            placeholder="What's on your mind?"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {image && (
          <div className="mt-3 relative">
            <img 
              src={URL.createObjectURL(image)} 
              alt="Post preview" 
              className="w-full h-auto rounded-lg object-cover max-h-60" 
            />
            <Button 
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setImage(null)}
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
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              <div className="flex items-center text-gray-500 hover:text-subway-600 p-2 rounded-md hover:bg-gray-100">
                <Image className="h-5 w-5 mr-1" />
                <span className="text-sm">Photo</span>
              </div>
            </label>
            <div className="flex items-center text-gray-500 hover:text-subway-600 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <Video className="h-5 w-5 mr-1" />
              <span className="text-sm">Video</span>
            </div>
            <div className="flex items-center text-gray-500 hover:text-subway-600 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <Calendar className="h-5 w-5 mr-1" />
              <span className="text-sm">Event</span>
            </div>
          </div>
          <Button 
            type="submit"
            className="subway-button"
            disabled={!content.trim() && !image}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
