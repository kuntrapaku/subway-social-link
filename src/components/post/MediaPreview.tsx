
import { Button } from "@/components/ui/button";

interface MediaPreviewProps {
  imagePreviewUrl: string | null;
  videoPreviewUrl: string | null;
  onRemoveImage: () => void;
  onRemoveVideo: () => void;
}

const MediaPreview = ({ 
  imagePreviewUrl, 
  videoPreviewUrl, 
  onRemoveImage, 
  onRemoveVideo 
}: MediaPreviewProps) => {
  if (imagePreviewUrl) {
    return (
      <div className="mt-3 relative">
        <img 
          src={imagePreviewUrl} 
          alt="Art preview" 
          className="w-full h-auto rounded-lg object-cover max-h-60" 
        />
        <Button 
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2"
          onClick={onRemoveImage}
        >
          Remove
        </Button>
      </div>
    );
  }
  
  if (videoPreviewUrl) {
    return (
      <div className="mt-3 relative">
        <video 
          src={videoPreviewUrl} 
          className="w-full h-auto rounded-lg object-cover max-h-60"
          controls
          playsInline
          muted
          preload="metadata"
        />
        <Button 
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2"
          onClick={onRemoveVideo}
        >
          Remove
        </Button>
      </div>
    );
  }
  
  return null;
};

export default MediaPreview;
