
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadMediaFile } from "@/services/mediaUploadService";
import { useAuth } from "@/context/AuthContext";

interface UseMediaUploadReturn {
  image: File | null;
  video: File | null;
  imagePreviewUrl: string | null;
  videoPreviewUrl: string | null;
  imageUploadUrl: string | null;
  videoUploadUrl: string | null;
  uploading: boolean;
  setImage: (image: File | null) => void;
  setVideo: (video: File | null) => void;
  setImagePreviewUrl: (url: string | null) => void;
  setVideoPreviewUrl: (url: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetMedia: () => void;
  uploadCurrentMedia: () => Promise<string | null>;
}

export const useMediaUpload = (): UseMediaUploadReturn => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [imageUploadUrl, setImageUploadUrl] = useState<string | null>(null);
  const [videoUploadUrl, setVideoUploadUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Clean up any object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [imagePreviewUrl, videoPreviewUrl]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedVideo = e.target.files[0];
      console.log("Video selected:", selectedVideo.name, "Size:", selectedVideo.size, "Type:", selectedVideo.type);
      
      // Clear previous media
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        setImagePreviewUrl(null);
      }
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
      
      setVideo(selectedVideo);
      setImage(null);
      setImageUploadUrl(null);
      setVideoUploadUrl(null);
      
      // Create video preview URL
      try {
        const videoUrl = URL.createObjectURL(selectedVideo);
        setVideoPreviewUrl(videoUrl);
        console.log("Video preview URL created:", videoUrl);
        
        toast({
          title: "Video selected",
          description: "Your video has been selected. Click Share to upload and post.",
        });
      } catch (error) {
        console.error("Error creating video URL:", error);
        toast({
          title: "Video error",
          description: "Failed to process video. Please try another one.",
          variant: "destructive",
        });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      console.log("Image selected:", selectedImage.name, "Size:", selectedImage.size, "Type:", selectedImage.type);
      
      // Clear previous media
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(null);
      }
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      
      setImage(selectedImage);
      setVideo(null);
      setImageUploadUrl(null);
      setVideoUploadUrl(null);
      
      // Create image preview URL
      try {
        const imageUrl = URL.createObjectURL(selectedImage);
        setImagePreviewUrl(imageUrl);
        console.log("Image preview URL created:", imageUrl);
        
        toast({
          title: "Image selected",
          description: "Your image has been selected. Click Share to upload and post.",
        });
      } catch (error) {
        console.error("Error creating image URL:", error);
        toast({
          title: "Image error",
          description: "Failed to process image. Please try another one.",
          variant: "destructive",
        });
      }
    }
  };

  const uploadCurrentMedia = async (): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload media.",
        variant: "destructive",
      });
      return null;
    }

    const fileToUpload = video || image;
    if (!fileToUpload) return null;

    setUploading(true);
    
    try {
      const result = await uploadMediaFile(fileToUpload);
      
      if (result.error) {
        toast({
          title: "Upload failed",
          description: result.error,
          variant: "destructive",
        });
        return null;
      }

      if (result.url) {
        if (video) {
          setVideoUploadUrl(result.url);
        } else {
          setImageUploadUrl(result.url);
        }
        
        toast({
          title: "Upload successful",
          description: "Your media has been uploaded successfully.",
        });
        
        return result.url;
      }
      
      return null;
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload media. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const resetMedia = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    
    setImage(null);
    setVideo(null);
    setImagePreviewUrl(null);
    setVideoPreviewUrl(null);
    setImageUploadUrl(null);
    setVideoUploadUrl(null);
  };

  return {
    image,
    video,
    imagePreviewUrl,
    videoPreviewUrl,
    imageUploadUrl,
    videoUploadUrl,
    uploading,
    setImage,
    setVideo,
    setImagePreviewUrl,
    setVideoPreviewUrl,
    handleImageChange,
    handleVideoChange,
    resetMedia,
    uploadCurrentMedia,
  };
};
