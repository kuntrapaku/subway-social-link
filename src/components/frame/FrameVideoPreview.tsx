
import { Button } from "@/components/ui/button";

interface FrameVideoPreviewProps {
  videoPreviewUrl: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoReady: boolean;
  onRemoveVideo: () => void;
}

const FrameVideoPreview = ({ 
  videoPreviewUrl, 
  videoRef, 
  isVideoReady, 
  onRemoveVideo 
}: FrameVideoPreviewProps) => {
  if (!videoPreviewUrl) return null;

  return (
    <div className="mt-3 relative">
      <video 
        ref={videoRef}
        src={videoPreviewUrl}
        className="w-full h-auto rounded-lg object-cover max-h-60"
        controls
        playsInline
        muted
        preload="metadata"
        style={{ display: "block" }}
      />
      <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg ${isVideoReady ? 'hidden' : ''}`}>
        <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
      <Button 
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2"
        onClick={onRemoveVideo}
      >
        Remove
      </Button>
      {!isVideoReady && videoPreviewUrl && (
        <p className="text-center text-sm mt-2 text-amber-600">Video is processing...</p>
      )}
    </div>
  );
};

export default FrameVideoPreview;
