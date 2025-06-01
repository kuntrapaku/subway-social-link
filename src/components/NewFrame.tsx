
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";
import { useFrameCreation } from "@/hooks/useFrameCreation";
import FrameTextarea from "@/components/frame/FrameTextarea";
import FrameVideoPreview from "@/components/frame/FrameVideoPreview";
import FrameUploadButton from "@/components/frame/FrameUploadButton";

interface NewFrameProps {
  onFrameCreated?: (frame: Post) => void;
}

const NewFrame = ({ onFrameCreated }: NewFrameProps = {}) => {
  const {
    content,
    setContent,
    video,
    videoPreviewUrl,
    isVideoReady,
    videoRef,
    handleSubmit,
    handleVideoChange,
    handleRemoveVideo,
  } = useFrameCreation();

  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4">
      <form onSubmit={(e) => handleSubmit(e, onFrameCreated)}>
        <FrameTextarea 
          content={content}
          onContentChange={setContent}
        />
        
        <FrameVideoPreview
          videoPreviewUrl={videoPreviewUrl}
          videoRef={videoRef}
          isVideoReady={isVideoReady}
          onRemoveVideo={handleRemoveVideo}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <FrameUploadButton onVideoChange={handleVideoChange} />
          </div>
          <Button 
            type="submit"
            className="bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            disabled={video && !isVideoReady}
          >
            {video && !isVideoReady ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </span>
            ) : (
              'Share Frame'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewFrame;
