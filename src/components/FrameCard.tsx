
import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, User, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toggleFrameLike, addCommentToFrame } from "@/utils/postsStorage";

interface FrameCardProps {
  frame: {
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
  };
}

const FrameCard = ({ frame }: FrameCardProps) => {
  const [isLiked, setIsLiked] = useState(frame.isLiked || false);
  const [likeCount, setLikeCount] = useState(frame.likes);
  const [commentCount, setCommentCount] = useState(frame.comments);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

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

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addCommentToFrame(frame.id);
      
      setCommentCount(commentCount + 1);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the frame!",
      });
      
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const handleShare = () => {
    toast({
      title: "Share frame",
      description: "Sharing options would appear here in a production app",
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    // Get video element
    const videoEl = document.getElementById(`video-${frame.id}`) as HTMLVideoElement;
    if (videoEl) {
      if (isPlaying) {
        videoEl.pause();
      } else {
        videoEl.play().catch(error => {
          console.error("Error playing video:", error);
          toast({
            title: "Video playback error",
            description: "There was an issue playing this video.",
            variant: "destructive"
          });
        });
      }
    }
  };

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
        {frame.imageUrl && (
          <div className="mt-3 relative">
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {isPlaying ? (
                  <video 
                    id={`video-${frame.id}`}
                    src={frame.imageUrl} 
                    className="w-full h-full object-contain" 
                    controls
                    autoPlay
                    onEnded={() => setIsPlaying(false)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center cursor-pointer" onClick={togglePlayback}>
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <Play className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>
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
            onClick={handleCommentClick}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{commentCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm flex items-center text-gray-500 hover:text-orange-600"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </div>
        
        {showCommentInput && (
          <div className="mt-3">
            <textarea
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              rows={2}
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button 
                size="sm"
                variant="outline" 
                className="mr-2"
                onClick={() => setShowCommentInput(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                Comment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameCard;
