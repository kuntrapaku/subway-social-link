
import { useEffect, useRef } from "react";
import { Post } from "@/components/NewPost";
import { useAuth } from "@/context/AuthContext";
import FrameHeader from "./frame/FrameHeader";
import FrameContent from "./frame/FrameContent";
import InteractionBar from "./frame/InteractionBar";

interface PlayableFrameCardProps {
  frame: Post;
  autoplay?: boolean;
}

const PlayableFrameCard = ({ frame, autoplay = false }: PlayableFrameCardProps) => {
  const frameIdRef = useRef(frame.id);
  const { user, isLoading } = useAuth();
  
  // Enhanced logging for authentication state and video URL
  useEffect(() => {
    console.log(`[Frame ${frame.id}] PlayableFrameCard - Auth state:`, user ? "Logged in" : "Not logged in");
    console.log(`[Frame ${frame.id}] PlayableFrameCard - Loading:`, isLoading);
    console.log(`[Frame ${frame.id}] PlayableFrameCard - Video URL:`, frame.imageUrl);
    console.log(`[Frame ${frame.id}] PlayableFrameCard - Autoplay:`, autoplay);
    
    // Update ref when frame ID changes
    frameIdRef.current = frame.id;
  }, [user, isLoading, frame.id, frame.imageUrl, autoplay]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4 max-w-md mx-auto">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  // Show sign in message if not authenticated
  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4 max-w-md mx-auto">
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Sign in to view videos</p>
            <a href="/login" className="text-orange-600 hover:underline">
              Go to login
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show video content when authenticated
  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4 animate-fade-in max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
      <FrameHeader 
        author={frame.author} 
        timeAgo={frame.timeAgo} 
      />

      <FrameContent 
        content={frame.content}
        imageUrl={frame.imageUrl}
        id={frame.id}
        isVideo={frame.isVideo}
        autoplay={autoplay}
      />

      <InteractionBar 
        id={frame.id}
        initialLikes={frame.likes}
        initialComments={frame.comments}
        isLiked={frame.isLiked}
      />
    </div>
  );
};

export default PlayableFrameCard;
