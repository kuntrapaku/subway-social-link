
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import ConversationList from "@/components/messages/ConversationList";
import ChatView from "@/components/messages/ChatView";
import MessageInput from "@/components/messages/MessageInput";

// Sample data for conversations
const sampleConversations = [
  { id: "1", name: "Sarah Johnson", lastMessage: "Hey, how's your day going?", unread: true, time: "2m ago" },
  { id: "2", name: "Michael Chen", lastMessage: "That project sounds interesting!", unread: false, time: "1h ago" },
  { id: "3", name: "Emma Wilson", lastMessage: "Let's catch up sometime this week", unread: false, time: "5h ago" },
  { id: "4", name: "Alex Rodriguez", lastMessage: "Thanks for the information", unread: false, time: "Yesterday" },
  { id: "5", name: "Jessica Taylor", lastMessage: "Did you see the latest industry news?", unread: true, time: "2d ago" }
];

// Sample messages for a selected conversation
const sampleMessages = [
  { id: "1", sender: "Sarah Johnson", content: "Hey there! How's your day going?", time: "10:30 AM", isSelf: false },
  { id: "2", sender: "You", content: "Hi Sarah! It's going well, just working on some new features for my website. How about you?", time: "10:32 AM", isSelf: true },
  { id: "3", sender: "Sarah Johnson", content: "That sounds interesting! I'm just preparing for a meeting later today.", time: "10:35 AM", isSelf: false },
  { id: "4", sender: "You", content: "Good luck with your meeting!", time: "10:36 AM", isSelf: true },
  { id: "5", sender: "Sarah Johnson", content: "Thanks! Would love to hear more about those features you're working on sometime.", time: "10:40 AM", isSelf: false }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [conversations, setConversations] = useState(sampleConversations);
  const [messages, setMessages] = useState(sampleMessages);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showConversations, setShowConversations] = useState(!isMobile);

  // Handle mobile view navigation
  useEffect(() => {
    if (!isMobile) {
      setShowConversations(true);
    }
  }, [isMobile]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "You",
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "Sarah Johnson",
        content: "Thanks for your message! I'll get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      };
      setMessages(prevMessages => [...prevMessages, responseMessage]);
      
      toast({
        title: "New message",
        description: "Sarah Johnson sent you a message",
      });
    }, 1000);
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <Card className="p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Conversations sidebar - show based on mobile state */}
            {(!isMobile || showConversations) && (
              <div className={`${isMobile ? 'col-span-1' : 'md:col-span-1'} border-r border-gray-200 h-full overflow-hidden`}>
                <ConversationList
                  conversations={conversations}
                  selectedConversationId={selectedConversation}
                  onSelectConversation={handleSelectConversation}
                />
              </div>
            )}
            
            {/* Chat area - show based on mobile state */}
            {(!isMobile || !showConversations) && (
              <div className={`${isMobile ? 'col-span-1' : 'md:col-span-2'} flex flex-col h-full`}>
                <ChatView
                  messages={messages}
                  selectedConversation={selectedConversationData}
                  isMobile={isMobile}
                  onBackToConversations={handleBackToConversations}
                />
                
                {selectedConversation && (
                  <MessageInput onSendMessage={handleSendMessage} />
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
