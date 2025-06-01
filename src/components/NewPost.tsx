import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/utils/userHelpers";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { Post } from "@/types/post";
import MediaPreview from "@/components/post/MediaPreview";
import MediaUploadButtons from "@/components/post/MediaUploadButtons";
import PostTextarea from "@/components/post/PostTextarea";

interface NewPostProps {
  onPostCreated?: (post: Post) => void;
  onNewVideo?: (video: File) => void;
  onSwitchToFrames?: () => void;
}

const NewPost = ({ onPostCreated, onNewVideo, onSwitchToFrames }: NewPostProps = {}) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const {
    image,
    video,
    imagePreviewUrl,
    videoPreviewUrl,
    handleImageChange,
    handleVideoChange,
    resetMedia,
    setImagePreviewUrl,
    setVideoPreviewUrl,
  } = useMediaUpload();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !image && !video) {
      toast({
        title: "Empty art post",
        description: "Please add some description, an image, or a video to your art.",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare media URL - Don't revoke it immediately, let the post component handle it
    let mediaUrl: string | undefined;
    if (video && videoPreviewUrl) {
      mediaUrl = videoPreviewUrl;
      console.log("Using video URL:", mediaUrl);
    } else if (image && imagePreviewUrl) {
      mediaUrl = imagePreviewUrl;
      console.log("Using image URL:", mediaUrl);
    }
    
    // Create a new post object
    const newPost: Post = {
      id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      author: {
        name: user ? getUserDisplayName(user) : "You",
        title: "Artist"
      },
      timeAgo: "Just now",
      content: content,
      imageUrl: mediaUrl,
      likes: 0,
      comments: 0,
      isLiked: false,
      isVideo: video !== null // Set isVideo flag based on whether a video was selected
    };
    
    console.log("Created new post:", newPost);
    console.log("Post media URL:", newPost.imageUrl);
    
    // Call the callback to add the post to the timeline
    if (onPostCreated) {
      onPostCreated(newPost);
    }
    
    // Show success toast
    toast({
      title: video ? "Video shared!" : "Art shared!",
      description: video ? "Your video has been shared with your network." : "Your artwork has been shared with your network.",
    });
    
    // Reset form - but keep the URLs for the posts that were just created
    setContent("");
    resetMedia();
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
  };

  const handleRemoveVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <PostTextarea 
          content={content}
          onContentChange={setContent}
          placeholder="Show your art..."
        />
        
        <MediaPreview
          imagePreviewUrl={imagePreviewUrl}
          videoPreviewUrl={videoPreviewUrl}
          onRemoveImage={handleRemoveImage}
          onRemoveVideo={handleRemoveVideo}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <MediaUploadButtons
            onImageChange={handleImageChange}
            onVideoChange={handleVideoChange}
          />
          <Button 
            type="submit"
            className="bg-orange-600 text-white hover:bg-orange-700 transition-colors"
          >
            Share Art
          </Button>
        </div>
      </form>
    </div>
  );
};

// Re-export Post type for backward compatibility
export type { Post };

export default NewPost;
