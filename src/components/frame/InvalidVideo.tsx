
import { AlertCircle } from "lucide-react";

const InvalidVideo = () => {
  return (
    <div className="w-full bg-gray-100 rounded-lg p-6 text-center">
      <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
      <p className="text-gray-700">No valid video available</p>
    </div>
  );
};

export default InvalidVideo;
