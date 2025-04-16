
import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Play, Pause, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toggleFrameLike, addCommentToFrame } from "@/utils/postsStorage";
import { Post } from "@/components/NewPost";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Improved debugging for video URLs
  useEffect(() => {
    console.log("PlayableFrameCard mounted with frame ID:", frame.id);
    console.log("Video URL:", frame.imageUrl);
    console.log("Video URL type:", typeof frame.imageUrl);
    console.log("Is video flag:", frame.isVideo);
    
    // Attempt to load the video when component mounts
    if (hasValidVideo && videoRef.current) {
      console.log(`Initial load: Trying to play video: ${frame.imageUrl}`);
      
      // Force video to reload
      videoRef.current.load();
      
      // Add a short delay before attempting to play
      const timer = setTimeout(() => {
        if (videoRef.current) {
          // Try to play
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Auto-play successful for video:", frame.imageUrl);
                setIsPlaying(true);
                setVideoLoaded(true);
              })
              .catch(error => {
                console.log("Auto-play prevented (this is normal in many browsers):", error);
                // Don't mark as error since this could be due to browser autoplay policy
              });
          }
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      console.log("PlayableFrameCard unmounting for frame ID:", frame.id);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [frame.id, frame.imageUrl]);

  // Reset video element and try again when video URL changes or retry is attempted
  useEffect(() => {
    if (videoRef.current && !videoError && hasValidVideo) {
      console.log(`Attempt ${videoAttempts + 1}: Loading video for frame ID: ${frame.id}`);
      
      // Reset video element
      videoRef.current.load();
    }
  }, [frame.imageUrl, videoAttempts, videoError, frame.id]);

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
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log("Manual play attempt for frame ID:", frame.id);
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setVideoError(true);
          toast({
            title: "Video playback error",
            description: "There was an issue playing this video.",
            variant: "destructive"
          });
        });
        setIsPlaying(true);
      }
    }
  };

  const retryVideo = () => {
    console.log("Retrying video load for frame ID:", frame.id);
    setVideoError(false);
    setVideoLoaded(false);
    setVideoAttempts(videoAttempts + 1);
    
    toast({
      title: "Retrying video",
      description: "Attempting to reload the video..."
    });
  };

  const handleVideoError = () => {
    console.error("Video failed to load:", frame.imageUrl);
    setVideoError(true);
    setVideoLoaded(false);
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully:", frame.imageUrl);
    setVideoLoaded(true);
    setVideoError(false);
  };
  
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    togglePlay();
  };

  // More robust URL validation
  const hasValidVideo = Boolean(
    frame.imageUrl && 
    typeof frame.imageUrl === 'string' && 
    frame.imageUrl.trim() !== '' &&
    !frame.imageUrl.includes('undefined') &&
    !frame.imageUrl.includes('null') &&
    !frame.imageUrl.includes('[object Object]')
  );

  // Format video URL safely
  const videoUrl = hasValidVideo ? frame.imageUrl : '';

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
        {hasValidVideo ? (
          <div className="mt-3 relative">
            {videoError ? (
              <div className="w-full bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-500">Video could not be loaded</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2 flex items-center gap-1"
                  onClick={retryVideo}
                >
                  <RefreshCw className="h-4 w-4" /> Retry Video
                </Button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  className="w-full h-auto rounded-lg object-cover"
                  onClick={handleVideoClick}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  controls
                  playsInline
                  loop
                  muted
                />
                {!isPlaying && !videoLoaded && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                    <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
                {!isPlaying && videoLoaded && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full h-12 w-12"
                    onClick={togglePlay}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="mt-3 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-500">No video available</p>
          </div>
        )}
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
