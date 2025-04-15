
import React from "react";
import { CheckCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationActionsProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({ 
  unreadCount, 
  onMarkAllAsRead 
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        className="border-gray-300 text-gray-600"
        onClick={onMarkAllAsRead}
        disabled={unreadCount === 0}
      >
        <CheckCheck className="h-4 w-4 mr-1" />
        Mark all as read
      </Button>
      <Button variant="outline" className="border-gray-300 text-gray-600">
        <Filter className="h-4 w-4 mr-1" />
        Filter
      </Button>
    </div>
  );
};

export default NotificationActions;
