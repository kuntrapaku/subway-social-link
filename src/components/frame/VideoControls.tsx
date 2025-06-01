
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoControlsProps {
  isPlaying: boolean;
  videoLoaded: boolean;
  loadingVideo: boolean;
  onTogglePlay: () => void;
}

const VideoControls = ({ isPlaying, videoLoaded, loadingVideo, onTogglePlay }: VideoControlsProps) => {
  if (!videoLoaded || loadingVideo || isPlaying) return null;

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full h-14 w-14"
      onClick={onTogglePlay}
    >
      <Play className="h-7 w-7" />
    </Button>
  );
};

export default VideoControls;
