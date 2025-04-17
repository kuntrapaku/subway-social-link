
import { useEffect, useRef } from "react";
import { Post } from "@/components/NewPost";
import { useAuth } from "@/context/AuthContext";
import FrameHeader from "./frame/FrameHeader";
import FrameContent from "./frame/FrameContent";
import InteractionBar from "./frame/InteractionBar";

interface PlayableFrameCardProps {
  frame: Post;
}

const PlayableFrameCard = ({ frame }: PlayableFrameCardProps) => {
  const frameIdRef = useRef(frame.id);
  const { user } = useAuth();
  
  // Enhanced logging for authentication state and video URL
  useEffect(() => {
    console.log(`[Frame ${frame.id}] PlayableFrameCard - Auth state:`, user ? "Logged in" : "Not logged in");
    console.log(`[Frame ${frame.id}] PlayableFrameCard - Video URL:`, frame.imageUrl);
    
    // Update ref when frame ID changes
    frameIdRef.current = frame.id;
  }, [user, frame.id, frame.imageUrl]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-4 mb-4 animate-fade-in">
      <FrameHeader 
        author={frame.author} 
        timeAgo={frame.timeAgo} 
      />

      <FrameContent 
        content={frame.content}
        imageUrl={frame.imageUrl}
        id={frame.id}
        isVideo={frame.isVideo}
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
