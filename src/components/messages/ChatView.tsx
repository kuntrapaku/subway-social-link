
import { useEffect, useRef } from "react";
import { User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isSelf: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  unread: boolean;
  time: string;
}

interface ChatViewProps {
  messages: Message[];
  selectedConversation: Conversation | undefined;
  isMobile: boolean;
  onBackToConversations: () => void;
}

const ChatView = ({ 
  messages, 
  selectedConversation, 
  isMobile, 
  onBackToConversations 
}: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="font-medium text-lg">No conversation selected</h3>
          <p className="text-gray-500">Choose a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header with back button on mobile */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={onBackToConversations}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="h-10 w-10 rounded-full bg-subway-100 flex items-center justify-center mr-3">
          <User className="h-6 w-6 text-subway-600" />
        </div>
        <div>
          <h3 className="font-medium">{selectedConversation.name}</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              time={message.time}
              isSelf={message.isSelf}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatView;
