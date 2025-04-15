import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { togglePostLike, addCommentToPost } from "@/utils/postsStorage";

interface PostCardProps {
  post: {
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
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    togglePostLike(post.id);
    
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      
      toast({
        title: "Post liked",
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
      addCommentToPost(post.id);
      
      setCommentCount(commentCount + 1);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the post!",
      });
      
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const handleShare = () => {
    toast({
      title: "Share post",
      description: "Sharing options would appear here in a production app",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4 animate-fade-in">
      <div className="flex justify-between">
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
            <p className="text-xs text-gray-500">{post.author.title}</p>
            <p className="text-xs text-gray-400">{post.timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      <div className="mt-3">
        <p className="text-sm">{post.content}</p>
        {post.imageUrl && (
          <div className="mt-3">
            <img 
              src={post.imageUrl} 
              alt="Art" 
              className="w-full h-auto rounded-lg object-cover max-h-96" 
            />
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

export default PostCard;
