
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  unread: boolean;
  time: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
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

      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-200">
          {filteredConversations.map((conv) => (
            <div 
              key={conv.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversationId === conv.id ? 'bg-gray-100' : ''}`}
              onClick={() => onSelectConversation(conv.id)}
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
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
