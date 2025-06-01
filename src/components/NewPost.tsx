
import { useState, useEffect } from "react";
import { Image, Users, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/utils/userHelpers";

// Define the Post type to match what's used in the Index page
export interface Post {
  id: string;
  author: {
    name: string;
    title: string;
  };
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isVideo?: boolean;
}

interface NewPostProps {
  onPostCreated?: (post: Post) => void;
  onNewVideo?: (video: File) => void;
  onSwitchToFrames?: () => void;
}

const NewPost = ({ onPostCreated, onNewVideo, onSwitchToFrames }: NewPostProps = {}) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Clean up any object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [imagePreviewUrl, videoPreviewUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !image && !video) {
      toast({
        title: "Empty art post",
        description: "Please add some description, an image, or a video to your art.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare media URL
    let mediaUrl: string | undefined;
    if (video && videoPreviewUrl) {
      mediaUrl = videoPreviewUrl;
      console.log("Using video URL:", mediaUrl);
    } else if (image && imagePreviewUrl) {
      mediaUrl = imagePreviewUrl;
      console.log("Using image URL:", mediaUrl);
    }
    
    // Create a new post object
    const newPost: Post = {
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: {
        name: user ? getUserDisplayName(user) : "You",
        title: "Artist"
      },
      timeAgo: "Just now",
      content: content,
      imageUrl: mediaUrl,
      likes: 0,
      comments: 0,
      isLiked: false,
      isVideo: video !== null // Set isVideo flag based on whether a video was selected
    };
    
    console.log("Created new post:", newPost);
    console.log("Post media URL:", newPost.imageUrl);
    
    // Call the callback to add the post to the timeline
    if (onPostCreated) {
      onPostCreated(newPost);
    }
    
    // Show success toast
    toast({
      title: video ? "Video shared!" : "Art shared!",
      description: video ? "Your video has been shared with your network." : "Your artwork has been shared with your network.",
    });
    
    // Reset form
    setContent("");
    setImage(null);
    setVideo(null);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedVideo = e.target.files[0];
      console.log("Video selected in NewPost:", selectedVideo.name, "Size:", selectedVideo.size, "Type:", selectedVideo.type);
      
      setVideo(selectedVideo);
      setImage(null); // Clear image if a video is selected
      
      // Clean up any previous image URL
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        setImagePreviewUrl(null);
      }
      
      // Clean up any previous video URL
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
      
      // Create video preview URL
      try {
        const videoUrl = URL.createObjectURL(selectedVideo);
        setVideoPreviewUrl(videoUrl);
        console.log("Video URL created in NewPost:", videoUrl);
        
        toast({
          title: "Video selected",
          description: "Your video has been selected. Click Share Art to post.",
        });
      } catch (error) {
        console.error("Error creating video URL in NewPost:", error);
        toast({
          title: "Video error",
          description: "Failed to process video. Please try another one.",
          variant: "destructive",
        });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      console.log("Image selected in NewPost:", selectedImage.name, "Size:", selectedImage.size, "Type:", selectedImage.type);
      
      setImage(selectedImage);
      setVideo(null); // Clear video if an image is selected
      
      // Clean up any previous video URL
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(null);
      }
      
      // Clean up any previous image URL
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      
      // Create image preview URL
      try {
        const imageUrl = URL.createObjectURL(selectedImage);
        setImagePreviewUrl(imageUrl);
        console.log("Image URL created in NewPost:", imageUrl);
        
        toast({
          title: "Image selected",
          description: "Your image has been selected. Click Share Art to post.",
        });
      } catch (error) {
        console.error("Error creating image URL in NewPost:", error);
        toast({
          title: "Image error",
          description: "Failed to process image. Please try another one.",
          variant: "destructive",
        });
      }
    }
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
            placeholder="Show your art..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {imagePreviewUrl && (
          <div className="mt-3 relative">
            <img 
              src={imagePreviewUrl} 
              alt="Art preview" 
              className="w-full h-auto rounded-lg object-cover max-h-60" 
            />
            <Button 
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                if (imagePreviewUrl) {
                  URL.revokeObjectURL(imagePreviewUrl);
                }
                setImagePreviewUrl(null);
                setImage(null);
              }}
            >
              Remove
            </Button>
          </div>
        )}
        
        {videoPreviewUrl && (
          <div className="mt-3 relative">
            <video 
              src={videoPreviewUrl} 
              className="w-full h-auto rounded-lg object-cover max-h-60"
              controls
              playsInline
              muted
              preload="metadata"
            />
            <Button 
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                if (videoPreviewUrl) {
                  URL.revokeObjectURL(videoPreviewUrl);
                }
                setVideoPreviewUrl(null);
                setVideo(null);
              }}
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
                onChange={handleImageChange}
              />
              <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100">
                <Image className="h-5 w-5 mr-1" />
                <span className="text-sm">Photo</span>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleVideoChange}
              />
              <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100">
                <Video className="h-5 w-5 mr-1" />
                <span className="text-sm">Video</span>
              </div>
            </label>
            <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <Calendar className="h-5 w-5 mr-1" />
              <span className="text-sm">Event</span>
            </div>
          </div>
          <Button 
            type="submit"
            className="bg-orange-600 text-white hover:bg-orange-700 transition-colors"
          >
            Share Art
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
