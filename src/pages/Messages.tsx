
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User, Search, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState(sampleConversations);
  const [messages, setMessages] = useState(sampleMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showConversations, setShowConversations] = useState(!isMobile);

  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "You",
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
    
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="subway-card p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
            {/* Conversations sidebar - show based on mobile state */}
            {(!isMobile || showConversations) && (
              <div className={`${isMobile ? 'col-span-1' : 'md:col-span-1'} border-r border-gray-200 overflow-y-auto`}>
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="Search conversations..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {filteredConversations.map((conv) => (
                    <div 
                      key={conv.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation === conv.id ? 'bg-gray-100' : ''}`}
                      onClick={() => handleSelectConversation(conv.id)}
                    >
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-subway-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <User className="h-6 w-6 text-subway-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate">{conv.name}</h3>
                            <span className="text-xs text-gray-500">{conv.time}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unread && (
                          <div className="h-2 w-2 bg-subway-600 rounded-full ml-2 flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  ))}
                  {filteredConversations.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      No conversations found
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Chat area - show based on mobile state */}
            {(!isMobile || !showConversations) && (
              <div className={`${isMobile ? 'col-span-1' : 'md:col-span-2'} flex flex-col`}>
                {selectedConversation ? (
                  <>
                    {/* Chat header with back button on mobile */}
                    <div className="p-4 border-b border-gray-200 flex items-center">
                      {isMobile && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="mr-2"
                          onClick={handleBackToConversations}
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                      )}
                      <div className="h-10 w-10 rounded-full bg-subway-100 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-subway-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {conversations.find(c => c.id === selectedConversation)?.name}
                        </h3>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.isSelf 
                                  ? 'bg-subway-600 text-white rounded-tr-none' 
                                  : 'bg-white border border-gray-200 rounded-tl-none'
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 ${message.isSelf ? 'text-subway-100' : 'text-gray-500'}`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                    
                    {/* Message input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <Input 
                          placeholder="Type a message..." 
                          className="flex-1"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                          className="ml-2 bg-subway-600 hover:bg-subway-700"
                          onClick={handleSendMessage}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                      <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="font-medium text-lg">No conversation selected</h3>
                      <p className="text-gray-500">Choose a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
