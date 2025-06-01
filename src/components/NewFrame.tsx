
import { useState, useEffect, useRef } from "react";
import { Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/post";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/utils/userHelpers";

interface NewFrameProps {
  onFrameCreated?: (frame: Post) => void;
}

const NewFrame = ({ onFrameCreated }: NewFrameProps = {}) => {
  const [content, setContent] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Enhanced authentication state logging
  useEffect(() => {
    console.log("NewFrame - Auth state:", user ? "Logged in" : "Not logged in");
  }, [user]);

  // Clean up any object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        console.log("Cleaning up video URL on unmount:", videoPreviewUrl);
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  // Enhanced video playability validation
  useEffect(() => {
    if (!videoPreviewUrl || !videoRef.current) {
      return;
    }
    
    console.log("Checking video playability for:", videoPreviewUrl);
    const video = videoRef.current;
    
    const handleCanPlay = () => {
      console.log("Video is playable:", videoPreviewUrl);
      setIsVideoReady(true);
    };
    
    const handleError = (e: Event) => {
      console.error("Video cannot be played:", e);
      setIsVideoReady(false);
      toast({
        title: "Video error",
        description: "The selected video cannot be played. Please try another one.",
        variant: "destructive",
      });
    };
    
    const handleLoadedData = () => {
      console.log("Video data loaded:", videoPreviewUrl);
      setIsVideoReady(true);
    };
    
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    // Force reload of video element with explicit src setting
    video.src = videoPreviewUrl;
    video.load();
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoPreviewUrl, toast]);

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
    
    // Enhanced video readiness check
    if (video && (!videoPreviewUrl || !isVideoReady)) {
      toast({
        title: "Video processing",
        description: "Your video is still being processed. Please wait a moment and try again.",
        variant: "destructive",
      });
      return;
    }
    
    createFrame(videoPreviewUrl);
  };
  
  const createFrame = (videoUrl: string | null) => {
    console.log("Creating frame with video URL:", videoUrl);
    
    // Validate the video URL
    if (!videoUrl && video) {
      console.error("Failed to create video URL although video file exists");
      toast({
        title: "Error creating video",
        description: "There was a problem processing your video.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new frame object with a more unique ID
    const newFrame: Post = {
      id: `frame-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: {
        name: user ? getUserDisplayName(user) : "You",
        title: "Filmmaker"
      },
      timeAgo: "Just now",
      content: content,
      imageUrl: videoUrl || undefined,
      likes: 0,
      comments: 0,
      isLiked: false,
      isVideo: true
    };
    
    console.log("Created new frame:", newFrame);
    console.log("Frame video URL:", newFrame.imageUrl);
    
    // Call the callback to add the frame to the timeline
    if (onFrameCreated) {
      onFrameCreated(newFrame);
    }
    
    // Show success toast
    toast({
      title: "Frame shared!",
      description: "Your video frame has been shared with your network.",
    });
    
    // Reset form - but don't revoke the URL immediately as it's being used by the frame
    setContent("");
    setVideo(null);
    setIsVideoReady(false);
    setVideoPreviewUrl(null);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedVideo = e.target.files[0];
      
      console.log("Video selected:", selectedVideo.name, "Size:", selectedVideo.size, "Type:", selectedVideo.type);
      
      // Clear existing video if present
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(null);
        setIsVideoReady(false);
      }
      
      setVideo(selectedVideo);
      
      // Create video preview URL with more explicit error handling
      try {
        const videoUrl = URL.createObjectURL(selectedVideo);
        console.log("Created new video URL:", videoUrl);
        setVideoPreviewUrl(videoUrl);
        
        toast({
          title: "Video selected",
          description: "Your video is being processed. Please wait a moment before sharing.",
        });
      } catch (error) {
        console.error("Error creating object URL:", error);
        toast({
          title: "Video error",
          description: "Failed to process video. Please try another one.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setIsVideoReady(false);
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
      setVideoPreviewUrl(null);
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
            placeholder="Add details about your frame..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {videoPreviewUrl && (
          <div className="mt-3 relative">
            <video 
              ref={videoRef}
              src={videoPreviewUrl}
              className="w-full h-auto rounded-lg object-cover max-h-60"
              controls
              playsInline
              muted
              preload="metadata"
              style={{ display: "block" }}
            />
            <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg ${isVideoReady ? 'hidden' : ''}`}>
              <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
            </div>
            <Button 
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveVideo}
            >
              Remove
            </Button>
            {!isVideoReady && videoPreviewUrl && (
              <p className="text-center text-sm mt-2 text-amber-600">Video is processing...</p>
            )}
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleVideoChange}
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
            disabled={video && !isVideoReady}
          >
            {video && !isVideoReady ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </span>
            ) : (
              'Share Frame'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewFrame;
