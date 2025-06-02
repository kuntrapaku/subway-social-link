
import { User } from "lucide-react";

interface FrameHeaderProps {
  author: {
    name: string;
    title: string;
  };
  timeAgo: string;
}

const FrameHeader = ({ author, timeAgo }: FrameHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
          <User className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{author.name}</h3>
          <p className="text-xs text-gray-500">{author.title}</p>
          <p className="text-xs text-gray-400">{timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

export default FrameHeader;
