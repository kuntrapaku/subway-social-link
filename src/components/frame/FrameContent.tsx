
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import VideoPlayer from "./VideoPlayer";

interface FrameContentProps {
  content: string;
  imageUrl?: string;
  id: string;
  isVideo?: boolean;
  autoplay?: boolean;
}

const FrameContent = ({ content, imageUrl, id, isVideo, autoplay = false }: FrameContentProps) => {
  const [videoError, setVideoError] = useState(false);
  const [videoAttempts, setVideoAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();

  // Reset video error state when content changes
  useEffect(() => {
    console.log(`[Frame ${id}] Content updated, resetting video error state`);
    setVideoError(false);
    setVideoAttempts(0);
  }, [imageUrl, id]);

  // Improved video URL validation with more permissive checks
  const validateVideoUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    if (url.trim() === '') return false;
    
    // More permissive validation - allow any valid URL format
    try {
      new URL(url);
      console.log(`[Frame ${id}] URL validation passed for: ${url}`);
      return true;
    } catch {
      console.log(`[Frame ${id}] URL validation failed for: ${url}`);
      return false;
    }
  };

  const retryVideo = () => {
    console.log(`[Frame ${id}] Retrying video (attempt ${videoAttempts + 1})`);
    setVideoError(false);
    setVideoAttempts(prev => prev + 1);
  };

  // Determine if we should show video content
  const hasValidVideoUrl = validateVideoUrl(imageUrl);
  const shouldShowVideo = isVideo && hasValidVideoUrl;
  
  // For frames (id starts with 'frame-'), require auth. For posts, allow videos without auth
  const requiresAuth = id.startsWith('frame-');
  const shouldShowVideoPlayer = shouldShowVideo && (!requiresAuth || user);

  return (
    <div className="mt-3">
      <p className="text-sm">{content}</p>
      
      {imageUrl && !isVideo && (
        <div className="mt-3">
          <img 
            src={imageUrl} 
            alt="Post content" 
            className="w-full h-auto rounded-lg object-cover max-h-96"
            onError={(e) => {
              console.log(`[Frame ${id}] Image failed to load: ${imageUrl}`);
              // Hide broken images
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => {
              console.log(`[Frame ${id}] Image loaded successfully: ${imageUrl}`);
            }}
          />
        </div>
      )}
      
      <div className="mt-3 relative">
        {!shouldShowVideoPlayer && isVideo ? (
          <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-gray-700">
              {!hasValidVideoUrl 
                ? "No valid video available" 
                : requiresAuth && !user 
                ? "Sign in to view video frames" 
                : "Video not available"
              }
            </p>
          </div>
        ) : shouldShowVideoPlayer ? (
          <VideoPlayer 
            videoUrl={imageUrl!}
            frameId={id}
            onRetry={retryVideo}
            videoError={videoError}
            setVideoError={setVideoError}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            autoplay={autoplay}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FrameContent;
