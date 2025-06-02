
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/utils/userHelpers";
import { uploadMediaFile } from "@/services/mediaUploadService";
import { createFrame } from "@/services/postsService";
import { Post } from "@/types/post";

interface UseFrameCreationReturn {
  content: string;
  setContent: (content: string) => void;
  video: File | null;
  setVideo: (video: File | null) => void;
  videoPreviewUrl: string | null;
  setVideoPreviewUrl: (url: string | null) => void;
  isVideoReady: boolean;
  setIsVideoReady: (ready: boolean) => void;
  uploading: boolean;
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
  const [uploading, setUploading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent, onFrameCreated?: (frame: Post) => void) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create frames.",
        variant: "destructive",
      });
      return;
    }
    
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
    
    try {
      setUploading(true);
      
      // Upload video if present
      let videoUrl: string | null = null;
      if (video) {
        const result = await uploadMediaFile(video);
        if (result.error) {
          toast({
            title: "Upload failed",
            description: result.error,
            variant: "destructive",
          });
          return;
        }
        videoUrl = result.url;
      }
      
      // Create frame in database
      const newFrame = await createFrame({
        user_id: user.id,
        content: content,
        video_url: videoUrl,
        likes: 0,
        comments: 0
      });
      
      if (!newFrame) {
        toast({
          title: "Failed to create frame",
          description: "There was an error creating your frame. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the frame with proper author info
      const frameWithAuthor: Post = {
        ...newFrame,
        author: {
          name: user ? getUserDisplayName(user) : "You",
          title: "Filmmaker"
        }
      };
      
      console.log("Created new frame:", frameWithAuthor);
      
      // Call the callback to add the frame to the timeline
      if (onFrameCreated) {
        onFrameCreated(frameWithAuthor);
      }
      
      // Show success toast
      toast({
        title: "Frame shared!",
        description: "Your video frame has been shared with your network.",
      });
      
      // Reset form
      setContent("");
      setVideo(null);
      setIsVideoReady(false);
      setVideoPreviewUrl(null);
    } catch (error) {
      console.error("Error creating frame:", error);
      toast({
        title: "Error",
        description: "Failed to create frame. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
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
    uploading,
    videoRef,
    handleSubmit,
    handleVideoChange,
    handleRemoveVideo,
  };
};
