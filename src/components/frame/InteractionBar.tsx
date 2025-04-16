
import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toggleFrameLike } from "@/utils/postsStorage";

interface InteractionBarProps {
  id: string;
  initialLikes: number;
  initialComments: number;
  isLiked?: boolean;
}

const InteractionBar = ({ 
  id, 
  initialLikes, 
  initialComments, 
  isLiked = false 
}: InteractionBarProps) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [commentCount] = useState(initialComments);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const { toast } = useToast();

  const handleLike = () => {
    toggleFrameLike(id);
    
    if (isLikedState) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      
      toast({
        title: "Frame liked",
        description: "The creator will be notified of your appreciation!",
      });
    }
    setIsLikedState(!isLikedState);
  };

  const handleShare = () => {
    toast({
      title: "Share frame",
      description: "Sharing options would appear here in a production app",
    });
  };

  return (
    <div className="mt-4 pt-3 border-t border-gray-100">
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={handleLike}
          className={`text-sm flex items-center ${isLikedState ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
        >
          <Heart className={`h-4 w-4 mr-1 ${isLikedState ? 'fill-red-500' : ''}`} />
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
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-1" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default InteractionBar;
