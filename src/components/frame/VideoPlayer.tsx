
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
  autoplay?: boolean;
}

const VideoPlayer = ({ 
  videoUrl, 
  frameId, 
  onRetry, 
  videoError, 
  setVideoError, 
  setIsPlaying,
  isPlaying,
  autoplay = false
}: VideoPlayerProps) => {
  const {
    videoLoaded,
    loadingVideo,
    isMuted,
    showControls,
    videoRef,
    togglePlay,
    toggleMute,
    handleVideoClick,
    handleRetry,
    handleMouseEnter,
    handleMouseLeave
  } = useVideoPlayer({
    videoUrl,
    frameId,
    onRetry,
    setVideoError,
    setIsPlaying,
    autoplay
  });

  if (videoError) {
    return <VideoError onRetry={handleRetry} />;
  }

  if (!videoUrl) {
    return <InvalidVideo />;
  }

  return (
    <div 
      className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        className="w-full h-full object-cover cursor-pointer"
        onClick={handleVideoClick}
        playsInline
        preload="metadata"
        loop={autoplay}
        style={{ 
          display: "block",
          backgroundColor: "#f8f8f8"
        }}
      />
      
      <VideoLoadingIndicator 
        loadingVideo={loadingVideo}
        videoError={videoError}
      />
      
      <VideoControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        videoLoaded={videoLoaded}
        loadingVideo={loadingVideo}
        showControls={showControls}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
      />
    </div>
  );
};

export default VideoPlayer;
