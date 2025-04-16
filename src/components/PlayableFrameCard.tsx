
import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Play, Pause } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Debug logs to track video URL and component lifecycle
  useEffect(() => {
    console.log("PlayableFrameCard mounted with frame:", frame);
    console.log("Video URL:", frame.imageUrl);
    
    // Clean up function that runs when component unmounts
    return () => {
      console.log("PlayableFrameCard unmounting");
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [frame]);

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
        // Add error handling for play
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          setVideoError(true);
          toast({
            title: "Video playback error",
            description: "There was an issue playing this video. The URL may be invalid.",
            variant: "destructive"
          });
        });
        setIsPlaying(true);
      }
    }
  };

  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video failed to load:", frame.imageUrl);
    console.error("Video error event:", e);
    setVideoError(true);
    toast({
      title: "Video error",
      description: "This video could not be loaded. The file may be missing or corrupted.",
      variant: "destructive"
    });
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully:", frame.imageUrl);
    setVideoLoaded(true);
  };

  // Check if video URL exists and is valid
  const hasValidVideo = frame.imageUrl && typeof frame.imageUrl === 'string' && frame.imageUrl.trim() !== '';

  // Format video URL properly
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
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  className="w-full h-auto rounded-lg object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  preload="metadata"
                  controls={isPlaying}
                  playsInline
                  loop
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full h-12 w-12"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
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
