
import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostCommentSectionProps {
  postId: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  showCommentInput: boolean;
  onLike: () => void;
  onCommentClick: () => void;
  onAddComment: (commentText: string) => void;
  onShare: () => void;
}

const PostCommentSection = ({
  postId,
  likeCount,
  commentCount,
  isLiked,
  showCommentInput,
  onLike,
  onCommentClick,
  onAddComment,
  onShare
}: PostCommentSectionProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = () => {
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <div className="mt-4 pt-3 border-t border-gray-100">
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={onLike}
          className={`text-sm flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
        >
          <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500' : ''}`} />
          <span>{likeCount}</span>
        </Button>
        <Button 
          variant="ghost" 
          className="text-sm flex items-center text-gray-500 hover:text-orange-600"
          onClick={onCommentClick}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>{commentCount}</span>
        </Button>
        <Button 
          variant="ghost" 
          className="text-sm flex items-center text-gray-500 hover:text-orange-600"
          onClick={onShare}
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
              onClick={onCommentClick}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCommentSection;
