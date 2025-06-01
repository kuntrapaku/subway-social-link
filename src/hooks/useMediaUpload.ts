
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseMediaUploadReturn {
  image: File | null;
  video: File | null;
  imagePreviewUrl: string | null;
  videoPreviewUrl: string | null;
  setImage: (image: File | null) => void;
  setVideo: (video: File | null) => void;
  setImagePreviewUrl: (url: string | null) => void;
  setVideoPreviewUrl: (url: string | null) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetMedia: () => void;
}

export const useMediaUpload = (): UseMediaUploadReturn => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

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
      console.log("Video selected in NewPost:", selectedVideo.name, "Size:", selectedVideo.size, "Type:", selectedVideo.type);
      
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
      
      // Create video preview URL
      try {
        const videoUrl = URL.createObjectURL(selectedVideo);
        setVideoPreviewUrl(videoUrl);
        console.log("Video URL created in NewPost:", videoUrl);
        
        toast({
          title: "Video selected",
          description: "Your video has been selected. Click Share Art to post.",
        });
      } catch (error) {
        console.error("Error creating video URL in NewPost:", error);
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
      console.log("Image selected in NewPost:", selectedImage.name, "Size:", selectedImage.size, "Type:", selectedImage.type);
      
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
      
      // Create image preview URL
      try {
        const imageUrl = URL.createObjectURL(selectedImage);
        setImagePreviewUrl(imageUrl);
        console.log("Image URL created in NewPost:", imageUrl);
        
        toast({
          title: "Image selected",
          description: "Your image has been selected. Click Share Art to post.",
        });
      } catch (error) {
        console.error("Error creating image URL in NewPost:", error);
        toast({
          title: "Image error",
          description: "Failed to process image. Please try another one.",
          variant: "destructive",
        });
      }
    }
  };

  const resetMedia = () => {
    setImage(null);
    setVideo(null);
    setImagePreviewUrl(null);
    setVideoPreviewUrl(null);
  };

  return {
    image,
    video,
    imagePreviewUrl,
    videoPreviewUrl,
    setImage,
    setVideo,
    setImagePreviewUrl,
    setVideoPreviewUrl,
    handleImageChange,
    handleVideoChange,
    resetMedia,
  };
};
