
interface VideoLoadingIndicatorProps {
  loadingVideo: boolean;
  videoError: boolean;
}

const VideoLoadingIndicator = ({ loadingVideo, videoError }: VideoLoadingIndicatorProps) => {
  if (!loadingVideo || videoError) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
      <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
    </div>
  );
};

export default VideoLoadingIndicator;
