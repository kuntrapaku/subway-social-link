
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import VideoControls from "./VideoControls";
import VideoError from "./VideoError";
import VideoLoadingIndicator from "./VideoLoadingIndicator";
import InvalidVideo from "./InvalidVideo";

interface VideoPlayerProps {
  videoUrl: string;
  frameId: string;
  onRetry: () => void;
  videoError: boolean;
  setVideoError: (error: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
}

const VideoPlayer = ({ 
  videoUrl, 
  frameId, 
  onRetry, 
  videoError, 
  setVideoError, 
  setIsPlaying,
  isPlaying
}: VideoPlayerProps) => {
  const {
    videoLoaded,
    loadingVideo,
    videoRef,
    togglePlay,
    handleVideoClick,
    handleRetry
  } = useVideoPlayer({
    videoUrl,
    frameId,
    onRetry,
    setVideoError,
    setIsPlaying
  });

  if (videoError) {
    return <VideoError onRetry={handleRetry} />;
  }

  if (!videoUrl) {
    return <InvalidVideo />;
  }

  return (
    <div className="relative">
      <video 
        ref={videoRef}
        className="w-full h-auto rounded-lg object-cover"
        onClick={handleVideoClick}
        controls={videoLoaded}
        playsInline
        preload="metadata"
        style={{ 
          display: "block",
          backgroundColor: "#f8f8f8",
          minHeight: "200px"
        }}
      />
      
      <VideoLoadingIndicator 
        loadingVideo={loadingVideo}
        videoError={videoError}
      />
      
      <VideoControls
        isPlaying={isPlaying}
        videoLoaded={videoLoaded}
        loadingVideo={loadingVideo}
        onTogglePlay={togglePlay}
      />
    </div>
  );
};

export default VideoPlayer;
