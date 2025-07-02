
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  videoLoaded: boolean;
  loadingVideo: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  showControls: boolean;
}

const VideoControls = ({ 
  isPlaying, 
  isMuted,
  videoLoaded, 
  loadingVideo, 
  onTogglePlay,
  onToggleMute,
  showControls
}: VideoControlsProps) => {
  if (!videoLoaded || loadingVideo || !showControls) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <Button
          onClick={onTogglePlay}
          size="lg"
          className="bg-white/90 hover:bg-white text-black rounded-full p-3 shadow-lg"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-0.5" />
          )}
        </Button>
        
        <Button
          onClick={onToggleMute}
          size="sm"
          className="bg-white/90 hover:bg-white text-black rounded-full p-2 shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoControls;
