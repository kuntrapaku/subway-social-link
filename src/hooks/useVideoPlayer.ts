
import { useState, useRef, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseVideoPlayerProps {
  videoUrl: string;
  frameId: string;
  onRetry: () => void;
  setVideoError: (error: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  autoplay?: boolean;
}

interface UseVideoPlayerReturn {
  videoLoaded: boolean;
  loadingVideo: boolean;
  isMuted: boolean;
  showControls: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  togglePlay: () => void;
  toggleMute: () => void;
  handleVideoClick: (e: React.MouseEvent) => void;
  handleRetry: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const useVideoPlayer = ({
  videoUrl,
  frameId,
  onRetry,
  setVideoError,
  setIsPlaying,
  autoplay = false
}: UseVideoPlayerProps): UseVideoPlayerReturn => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const isMounted = useRef(true);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

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
      
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
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

  // Setup intersection observer for autoplay
  useEffect(() => {
    if (!autoplay || !videoRef.current) return;

    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isMounted.current || !videoRef.current) return;
          
          if (entry.isIntersecting && videoLoaded) {
            // Auto play when in viewport
            videoRef.current.play().catch(() => {
              // Ignore autoplay errors
            });
          } else {
            // Pause when out of viewport
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    intersectionObserver.current.observe(videoRef.current);

    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [autoplay, videoLoaded]);

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
      
      // Set muted state for autoplay
      if (video) {
        video.muted = isMuted;
      }
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
      }, 2000);
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
      video.muted = isMuted;
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
  }, [videoUrl, frameId, setVideoError, setIsPlaying, videoLoaded, isMuted]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current || !videoLoaded) return;
    
    if (videoRef.current.paused) {
      console.log(`[Frame ${frameId}] Manual play attempt`);
      videoRef.current.play().catch(error => {
        console.error(`[Frame ${frameId}] Play error:`, error);
        toast({
          title: "Video playback error",
          description: "There was an issue playing this video.",
          variant: "destructive"
        });
      });
    } else {
      videoRef.current.pause();
    }
  }, [videoLoaded, frameId, toast]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRef.current.muted = newMutedState;
    
    console.log(`[Frame ${frameId}] Video ${newMutedState ? 'muted' : 'unmuted'}`);
  }, [isMuted, frameId]);
  
  const handleVideoClick = useCallback((e: React.MouseEvent) => {
    if (videoLoaded) {
      e.preventDefault();
      togglePlay();
    }
  }, [videoLoaded, togglePlay]);

  const handleRetry = useCallback(() => {
    console.log(`[Frame ${frameId}] Manual retry triggered`);
    setVideoError(false);
    setVideoLoaded(false);
    setLoadingVideo(true);
    
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.load();
    }
    
    onRetry();
  }, [frameId, videoUrl, onRetry, setVideoError]);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowControls(false);
  }, []);

  return {
    videoLoaded,
    loadingVideo,
    isMuted,
    showControls,
    videoRef,
    togglePlay,
    toggleMute,
    handleVideoClick,
    handleRetry,
    handleMouseEnter,
    handleMouseLeave
  };
};
