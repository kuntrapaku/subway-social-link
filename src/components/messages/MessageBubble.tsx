
import React from "react";

interface MessageProps {
  content: string;
  time: string;
  isSelf: boolean;
}

const MessageBubble = ({ content, time, isSelf }: MessageProps) => {
  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          isSelf 
            ? 'bg-subway-600 text-white rounded-tr-none' 
            : 'bg-white border border-gray-200 rounded-tl-none'
        }`}
      >
        <p>{content}</p>
        <p className={`text-xs mt-1 ${isSelf ? 'text-subway-100' : 'text-gray-500'}`}>
          {time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
