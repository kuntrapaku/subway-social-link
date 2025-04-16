
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { togglePostLike, addCommentToPost } from "@/utils/postsStorage";
import { useToast } from "@/hooks/use-toast";
import FrameHeader from "./frame/FrameHeader";
import FrameContent from "./frame/FrameContent";
import PostCommentSection from "./post/PostCommentSection";

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
    isVideo?: boolean;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

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

  const handleAddComment = (commentText: string) => {
    if (commentText.trim()) {
      addCommentToPost(post.id);
      
      setCommentCount(commentCount + 1);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added to the post!",
      });
      
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
      <FrameHeader 
        author={post.author} 
        timeAgo={post.timeAgo} 
      />

      <FrameContent 
        content={post.content} 
        imageUrl={post.imageUrl} 
        id={post.id}
        isVideo={post.isVideo}
      />

      <PostCommentSection
        postId={post.id}
        likeCount={likeCount}
        commentCount={commentCount}
        isLiked={isLiked}
        showCommentInput={showCommentInput}
        onLike={handleLike}
        onCommentClick={handleCommentClick}
        onAddComment={handleAddComment}
        onShare={handleShare}
      />
    </div>
  );
};

export default PostCard;
