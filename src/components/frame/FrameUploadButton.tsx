
import { Video } from "lucide-react";

interface FrameUploadButtonProps {
  onVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FrameUploadButton = ({ onVideoChange }: FrameUploadButtonProps) => {
  return (
    <label className="cursor-pointer">
      <input
        type="file"
        className="hidden"
        accept="video/*"
        onChange={onVideoChange}
      />
      <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100">
        <Video className="h-5 w-5 mr-1" />
        <span className="text-sm">Upload Video</span>
      </div>
    </label>
  );
};

export default FrameUploadButton;
