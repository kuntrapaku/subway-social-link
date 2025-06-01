
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoErrorProps {
  onRetry: () => void;
}

const VideoError = ({ onRetry }: VideoErrorProps) => {
  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
      <p className="text-gray-700 mb-2">Video could not be loaded</p>
      <Button
        variant="secondary"
        size="sm"
        className="mt-2 flex items-center gap-1 mx-auto"
        onClick={onRetry}
      >
        <RefreshCw className="h-4 w-4" /> Retry Video
      </Button>
    </div>
  );
};

export default VideoError;
