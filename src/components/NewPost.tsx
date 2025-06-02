
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { getUserDisplayName } from "@/utils/userHelpers";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { createPost } from "@/services/postsService";
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
    uploading,
    handleImageChange,
    handleVideoChange,
    resetMedia,
    uploadCurrentMedia,
    setImagePreviewUrl,
    setVideoPreviewUrl,
  } = useMediaUpload();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create posts.",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim() && !image && !video) {
      toast({
        title: "Empty art post",
        description: "Please add some description, an image, or a video to your art.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Upload media if present
      let mediaUrl: string | null = null;
      let mediaType: 'image' | 'video' | null = null;
      
      if (image || video) {
        mediaUrl = await uploadCurrentMedia();
        if (!mediaUrl) {
          return; // Upload failed, error already shown
        }
        mediaType = video ? 'video' : 'image';
      }
      
      // Create post in database
      const newPost = await createPost({
        user_id: user.id,
        content: content,
        media_url: mediaUrl,
        media_type: mediaType,
        likes: 0,
        comments: 0
      });
      
      if (!newPost) {
        toast({
          title: "Failed to create post",
          description: "There was an error creating your post. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the post with proper author info
      const postWithAuthor: Post = {
        ...newPost,
        author: {
          name: user ? getUserDisplayName(user) : "You",
          title: "Artist"
        }
      };
      
      console.log("Created new post:", postWithAuthor);
      
      // Call the callback to add the post to the timeline
      if (onPostCreated) {
        onPostCreated(postWithAuthor);
      }
      
      // Show success toast
      toast({
        title: video ? "Video shared!" : "Art shared!",
        description: video ? "Your video has been shared with your network." : "Your artwork has been shared with your network.",
      });
      
      // Reset form
      setContent("");
      resetMedia();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
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
            disabled={uploading}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Uploading...
              </span>
            ) : (
              'Share Art'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Re-export Post type for backward compatibility
export type { Post };

export default NewPost;
