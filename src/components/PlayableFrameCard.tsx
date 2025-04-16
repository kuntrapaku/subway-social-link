
import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Play, Pause, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toggleFrameLike, addCommentToFrame } from "@/utils/postsStorage";
import { Post } from "@/components/NewPost";
import { useAuth } from "@/context/AuthContext";

interface PlayableFrameCardProps {
  frame: Post;
}

const PlayableFrameCard = ({ frame }: PlayableFrameCardProps) => {
  const [isLiked, setIsLiked] = useState(frame.isLiked || false);
  const [likeCount, setLikeCount] = useState(frame.likes);
  const [commentCount, setCommentCount] = useState(frame.comments);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoAttempts, setVideoAttempts] = useState(0);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameIdRef = useRef(frame.id);
  const { toast } = useToast();
  const { user } = useAuth();

  // Use ref to track if component is mounted
  const isMounted = useRef(true);
  const objectUrlRef = useRef<string | null>(null);
  
  // Log authentication state for debugging
  useEffect(() => {
    console.log(`[Frame ${frame.id}] Auth state:`, user ? "Logged in" : "Not logged in");
    console.log(`[Frame ${frame.id}] Video URL:`, frame.imageUrl);
    
    // Reset video state when auth changes
    if (videoRef.current) {
      setVideoLoaded(false);
      setVideoError(false);
      setIsPlaying(false);
      
      // Increment attempts to force remount of video element
      setVideoAttempts(prev => prev + 1);
    }
  }, [user, frame.id, frame.imageUrl]);
  
  useEffect(() => {
    // Set mount status
    isMounted.current = true;
    
    // Update ref when frame ID changes
    frameIdRef.current = frame.id;
    
    return () => {
      // Set unmount status
      isMounted.current = false;
      
      // Cleanup on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
      
      // Release any object URLs we created
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [frame.id]);

  // Improved video URL validation with more robust checks
  const validateVideoUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    if (url.trim() === '') return false;
    // Additional checks for invalid placeholders or empty blob URLs
    if (url.includes('undefined') || url.includes('null') || url.includes('[object Object]')) return false;
    if (url.startsWith('blob:') && url.length < 20) return false;
    
    console.log(`[Frame ${frame.id}] URL validation passed for: ${url}`);
    return true;
  };

  // Get validated video URL
  const videoUrl = validateVideoUrl(frame.imageUrl) ? frame.imageUrl : '';
  
  // Main effect for loading and monitoring video
  useEffect(() => {
    // Skip if no video or no ref or no user
    if (!videoUrl || !videoRef.current || !user) {
      console.log(`[Frame ${frame.id}] No valid video URL, ref, or user`);
      setLoadingVideo(false);
      return;
    }
    
    console.log(`[Frame ${frame.id}] Setting up video with auth: ${videoUrl}`);
    setLoadingVideo(true);
    setVideoError(false);
    
    const video = videoRef.current;
    
    // Define event handlers
    const handleCanPlay = () => {
      if (!isMounted.current) return;
      
      console.log(`[Frame ${frame.id}] Video can play: ${videoUrl}`);
      setVideoLoaded(true);
      setLoadingVideo(false);
      setVideoError(false);
    };
    
    const handleLoadedMetadata = () => {
      if (!isMounted.current) return;
      console.log(`[Frame ${frame.id}] Metadata loaded: ${videoUrl}, duration: ${video.duration}s`);
    };
    
    const handleLoadedData = () => {
      if (!isMounted.current) return;
      console.log(`[Frame ${frame.id}] Video data loaded: ${videoUrl}`);
      setVideoLoaded(true);
      setLoadingVideo(false);
    };
    
    const handleError = (e: Event) => {
      if (!isMounted.current) return;
      
      const videoElement = e.target as HTMLVideoElement;
      console.error(`[Frame ${frame.id}] Video error:`, videoElement.error);
      
      setVideoError(true);
      setLoadingVideo(false);
      setIsPlaying(false);
      
      // Only show toast on first error to avoid spamming
      if (videoAttempts === 0) {
        toast({
          title: "Video error",
          description: `There was a problem loading this video. ${videoElement.error?.message || ''}`,
          variant: "destructive"
        });
      }
    };
    
    const handlePlay = () => {
      if (isMounted.current) {
        console.log(`[Frame ${frame.id}] Video playing`);
        setIsPlaying(true);
      }
    };
    
    const handlePause = () => {
      if (isMounted.current) {
        console.log(`[Frame ${frame.id}] Video paused`);
        setIsPlaying(false);
      }
    };
    
    const handleEnded = () => {
      if (isMounted.current) {
        console.log(`[Frame ${frame.id}] Video ended`);
        setIsPlaying(false);
      }
    };
    
    // Add all event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    // Force reload of video with latest URL
    try {
      // Explicitly set src attribute - this is key for reloading after auth changes
      video.src = videoUrl;
      video.load();
      console.log(`[Frame ${frame.id}] Video loading started: ${videoUrl}`);
    } catch (err) {
      console.error(`[Frame ${frame.id}] Load error:`, err);
      setVideoError(true);
      setLoadingVideo(false);
    }
    
    // Cleanup function
    return () => {
      // Remove all event listeners
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      
      // Clean up video element
      try {
        video.pause();
      } catch (e) {
        // Ignore errors on cleanup
      }
    };
  }, [videoUrl, videoAttempts, frame.id, toast, user]);

  const handleLike = () => {
    toggleFrameLike(frame.id);
    
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      
      toast({
        title: "Frame liked",
        description: "The creator will be notified of your appreciation!",
      });
    }
    setIsLiked(!isLiked);
  };

  const togglePlay = () => {
    if (!videoRef.current || videoError) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      console.log(`[Frame ${frame.id}] Manual play attempt`);
      videoRef.current.play().catch(error => {
        console.error(`[Frame ${frame.id}] Play error:`, error);
        setVideoError(true);
        toast({
          title: "Video playback error",
          description: "There was an issue playing this video.",
          variant: "destructive"
        });
      });
    }
  };

  const retryVideo = () => {
    console.log(`[Frame ${frame.id}] Retrying video (attempt ${videoAttempts + 1})`);
    setVideoError(false);
    setVideoLoaded(false);
    setLoadingVideo(true);
    setVideoAttempts(prev => prev + 1);
    
    // Recreate the video element by forcing a remount
    if (videoRef.current) {
      videoRef.current.src = "";
      setTimeout(() => {
        if (isMounted.current && videoRef.current && videoUrl) {
          videoRef.current.src = videoUrl;
          videoRef.current.load();
        }
      }, 100);
    }
    
    toast({
      title: "Retrying video",
      description: "Attempting to reload the video..."
    });
  };
  
  const handleVideoClick = (e: React.MouseEvent) => {
    if (videoLoaded && !videoError) {
      e.preventDefault();
      togglePlay();
    }
  };

  // Don't render video if not authenticated
  const shouldShowVideo = !!user && validateVideoUrl(frame.imageUrl);

  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4 animate-fade-in">
      <div className="flex justify-between">
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-medium">{frame.author.name}</h3>
            <p className="text-xs text-gray-500">{frame.author.title}</p>
            <p className="text-xs text-gray-400">{frame.timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      <div className="mt-3">
        <p className="text-sm">{frame.content}</p>
        
        <div className="mt-3 relative">
          {videoError ? (
            <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-gray-700 mb-2">Video could not be loaded</p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 flex items-center gap-1 mx-auto"
                onClick={retryVideo}
              >
                <RefreshCw className="h-4 w-4" /> Retry Video
              </Button>
            </div>
          ) : !shouldShowVideo ? (
            <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
              <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <p className="text-gray-700">
                {!user ? "Sign in to view videos" : "No valid video available"}
              </p>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef}
                src={videoUrl} 
                key={`video-${frame.id}-${videoAttempts}-${user?.id || 'guest'}`}
                className="w-full h-auto rounded-lg object-cover"
                onClick={handleVideoClick}
                controls
                playsInline
                loop
                muted
                preload="auto"
                poster={videoLoaded ? undefined : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
                style={{ 
                  display: "block",
                  backgroundColor: "#f8f8f8"
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
            </>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex justify-between">
          <Button 
            variant="ghost" 
            onClick={handleLike}
            className={`text-sm flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm flex items-center text-gray-500 hover:text-orange-600"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{commentCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm flex items-center text-gray-500 hover:text-orange-600"
            onClick={() => {
              toast({
                title: "Share frame",
                description: "Sharing options would appear here in a production app",
              });
            }}
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayableFrameCard;
