
import { useState, useRef, useEffect } from "react";
import { Play, Pause, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface VideoPlayerProps {
  videoUrl: string;
  frameId: string;
  onRetry: () => void;
  videoError: boolean;
  setVideoError: (error: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
}

const VideoPlayer = ({ 
  videoUrl, 
  frameId, 
  onRetry, 
  videoError, 
  setVideoError, 
  setIsPlaying,
  isPlaying
}: VideoPlayerProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Use ref to track if component is mounted
  const isMounted = useRef(true);
  
  useEffect(() => {
    isMounted.current = true;
    console.log(`[Frame ${frameId}] VideoPlayer mounted with URL: ${videoUrl}`);
    
    return () => {
      isMounted.current = false;
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      console.log(`[Frame ${frameId}] VideoPlayer unmounted`);
    };
  }, [frameId, videoUrl]);

  // Reset states when video URL changes
  useEffect(() => {
    console.log(`[Frame ${frameId}] Video URL changed, resetting states`);
    setVideoLoaded(false);
    setLoadingVideo(true);
    setVideoError(false);
  }, [videoUrl, frameId, setVideoError]);

  // Main effect for loading and monitoring video
  useEffect(() => {
    if (!videoUrl || !videoRef.current) {
      console.log(`[Frame ${frameId}] No valid video URL or ref`);
      setLoadingVideo(false);
      return;
    }
    
    console.log(`[Frame ${frameId}] Setting up video: ${videoUrl}`);
    setLoadingVideo(true);
    setVideoError(false);
    
    const video = videoRef.current;
    
    // Define event handlers
    const handleCanPlay = () => {
      if (!isMounted.current) return;
      console.log(`[Frame ${frameId}] Video can play`);
      setVideoLoaded(true);
      setLoadingVideo(false);
      setVideoError(false);
    };
    
    const handleLoadedData = () => {
      if (!isMounted.current) return;
      console.log(`[Frame ${frameId}] Video data loaded`);
      setVideoLoaded(true);
      setLoadingVideo(false);
    };
    
    const handleError = (e: Event) => {
      if (!isMounted.current) return;
      
      const videoElement = e.target as HTMLVideoElement;
      console.error(`[Frame ${frameId}] Video error:`, videoElement.error);
      
      // Don't immediately set error - give video more time to load
      setTimeout(() => {
        if (isMounted.current && !videoLoaded) {
          setVideoError(true);
          setLoadingVideo(false);
          setIsPlaying(false);
        }
      }, 2000); // Wait 2 seconds before showing error
    };
    
    const handlePlay = () => {
      if (isMounted.current) {
        console.log(`[Frame ${frameId}] Video playing`);
        setIsPlaying(true);
      }
    };
    
    const handlePause = () => {
      if (isMounted.current) {
        console.log(`[Frame ${frameId}] Video paused`);
        setIsPlaying(false);
      }
    };
    
    const handleEnded = () => {
      if (isMounted.current) {
        console.log(`[Frame ${frameId}] Video ended`);
        setIsPlaying(false);
      }
    };
    
    // Add all event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    // Set video source and load
    try {
      video.src = videoUrl;
      video.load();
      console.log(`[Frame ${frameId}] Video loading started`);
    } catch (err) {
      console.error(`[Frame ${frameId}] Load error:`, err);
      setVideoError(true);
      setLoadingVideo(false);
    }
    
    // Cleanup function
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoUrl, frameId, setVideoError, setIsPlaying, videoLoaded]);

  const togglePlay = () => {
    if (!videoRef.current || videoError || !videoLoaded) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      console.log(`[Frame ${frameId}] Manual play attempt`);
      videoRef.current.play().catch(error => {
        console.error(`[Frame ${frameId}] Play error:`, error);
        toast({
          title: "Video playback error",
          description: "There was an issue playing this video.",
          variant: "destructive"
        });
      });
    }
  };
  
  const handleVideoClick = (e: React.MouseEvent) => {
    if (videoLoaded && !videoError) {
      e.preventDefault();
      togglePlay();
    }
  };

  const handleRetry = () => {
    console.log(`[Frame ${frameId}] Manual retry triggered`);
    setVideoError(false);
    setVideoLoaded(false);
    setLoadingVideo(true);
    
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.load();
    }
    
    onRetry();
  };

  if (videoError) {
    return (
      <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
        <p className="text-gray-700 mb-2">Video could not be loaded</p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-2 flex items-center gap-1 mx-auto"
          onClick={handleRetry}
        >
          <RefreshCw className="h-4 w-4" /> Retry Video
        </Button>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
        <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
        <p className="text-gray-700">No valid video available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <video 
        ref={videoRef}
        className="w-full h-auto rounded-lg object-cover"
        onClick={handleVideoClick}
        controls={videoLoaded}
        playsInline
        preload="metadata"
        style={{ 
          display: "block",
          backgroundColor: "#f8f8f8",
          minHeight: "200px"
        }}
      />
      
      {loadingVideo && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
          <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {!isPlaying && videoLoaded && !loadingVideo && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full h-14 w-14"
          onClick={togglePlay}
        >
          <Play className="h-7 w-7" />
        </Button>
      )}
    </div>
  );
};

export default VideoPlayer;
