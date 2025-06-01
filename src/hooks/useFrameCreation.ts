
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/post";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/utils/userHelpers";

interface UseFrameCreationReturn {
  content: string;
  setContent: (content: string) => void;
  video: File | null;
  setVideo: (video: File | null) => void;
  videoPreviewUrl: string | null;
  setVideoPreviewUrl: (url: string | null) => void;
  isVideoReady: boolean;
  setIsVideoReady: (ready: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleSubmit: (e: React.FormEvent, onFrameCreated?: (frame: Post) => void) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveVideo: () => void;
}

export const useFrameCreation = (): UseFrameCreationReturn => {
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

  const handleSubmit = (e: React.FormEvent, onFrameCreated?: (frame: Post) => void) => {
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
    
    createFrame(videoPreviewUrl, onFrameCreated);
  };
  
  const createFrame = (videoUrl: string | null, onFrameCreated?: (frame: Post) => void) => {
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

  return {
    content,
    setContent,
    video,
    setVideo,
    videoPreviewUrl,
    setVideoPreviewUrl,
    isVideoReady,
    setIsVideoReady,
    videoRef,
    handleSubmit,
    handleVideoChange,
    handleRemoveVideo,
  };
};
