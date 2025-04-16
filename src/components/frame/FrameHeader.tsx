
import { User, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/components/NewPost";

interface FrameHeaderProps {
  author: Post['author'];
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
          <h3 className="font-medium">{author.name}</h3>
          <p className="text-xs text-gray-500">{author.title}</p>
          <p className="text-xs text-gray-400">{timeAgo}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </Button>
    </div>
  );
};

export default FrameHeader;
