
import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import VideoPlayer from "./VideoPlayer";

interface FrameContentProps {
  content: string;
  imageUrl?: string;
  id: string;
  isVideo?: boolean;
}

const FrameContent = ({ content, imageUrl, id, isVideo }: FrameContentProps) => {
  const [videoError, setVideoError] = useState(false);
  const [videoAttempts, setVideoAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();

  // Reset video error state when auth changes
  useEffect(() => {
    console.log(`[Frame ${id}] Auth state updated, resetting video error state. User: ${user ? 'logged in' : 'not logged in'}`);
    setVideoError(false);
  }, [user, id]);

  // Improved video URL validation with more robust checks
  const validateVideoUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    if (typeof url !== 'string') return false;
    if (url.trim() === '') return false;
    // Additional checks for invalid placeholders or empty blob URLs
    if (url.includes('undefined') || url.includes('null') || url.includes('[object Object]')) return false;
    if (url.startsWith('blob:') && url.length < 20) return false;
    
    console.log(`[Frame ${id}] URL validation passed for: ${url}`);
    return true;
  };

  const retryVideo = () => {
    console.log(`[Frame ${id}] Retrying video (attempt ${videoAttempts + 1})`);
    setVideoError(false);
    setVideoAttempts(prev => prev + 1);
  };

  // Get validated video URL
  const videoUrl = validateVideoUrl(imageUrl) ? imageUrl : '';
  
  // Only show video when authenticated and valid URL is available
  const shouldShowVideo = Boolean(user) && isVideo && validateVideoUrl(imageUrl);

  return (
    <div className="mt-3">
      <p className="text-sm">{content}</p>
      
      <div className="mt-3 relative">
        {!shouldShowVideo && isVideo ? (
          <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-gray-700">
              {!user ? "Sign in to view videos" : "No valid video available"}
            </p>
          </div>
        ) : shouldShowVideo ? (
          <VideoPlayer 
            videoUrl={videoUrl}
            frameId={id}
            onRetry={retryVideo}
            videoError={videoError}
            setVideoError={setVideoError}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FrameContent;
