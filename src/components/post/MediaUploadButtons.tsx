
import { Image, Video, Calendar } from "lucide-react";

interface MediaUploadButtonsProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaUploadButtons = ({ onImageChange, onVideoChange }: MediaUploadButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageChange}
        />
        <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100">
          <Image className="h-5 w-5 mr-1" />
          <span className="text-sm">Photo</span>
        </div>
      </label>
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={onVideoChange}
        />
        <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100">
          <Video className="h-5 w-5 mr-1" />
          <span className="text-sm">Video</span>
        </div>
      </label>
      <div className="flex items-center text-gray-500 hover:text-orange-600 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
        <Calendar className="h-5 w-5 mr-1" />
        <span className="text-sm">Event</span>
      </div>
    </div>
  );
};

export default MediaUploadButtons;
