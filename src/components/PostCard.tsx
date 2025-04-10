
import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="subway-card mb-4 animate-fade-in">
      <div className="flex justify-between">
        <div className="flex">
          <div className="h-10 w-10 rounded-full bg-subway-100 flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-subway-600" />
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
              alt="Post" 
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
            className={`text-sm flex items-center ${isLiked ? 'text-subway-600' : 'text-gray-500'} hover:text-subway-600`}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-subway-600' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm flex items-center text-gray-500 hover:text-subway-600"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{post.comments}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm flex items-center text-gray-500 hover:text-subway-600"
          >
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
