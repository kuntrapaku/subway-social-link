
import React from "react";
import { Heart, MessageSquare, Users, Star, Bell, Clock, ArrowRight } from "lucide-react";
import { NotificationType } from "@/types/notifications";

interface NotificationItemProps {
  notification: NotificationType;
  onClick: (notification: NotificationType) => void;
}

export const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-5 w-5 text-red-500" />;
    case "comment":
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case "connection":
      return <Users className="h-5 w-5 text-green-500" />;
    case "mention":
      return <Star className="h-5 w-5 text-yellow-500" />;
    default:
      return <Bell className="h-5 w-5 text-orange-500" />;
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  return (
    <div 
      className={`p-4 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-orange-50 border-orange-200'} transition-colors duration-200 hover:bg-orange-100 cursor-pointer`}
      onClick={() => onClick(notification)}
    >
      <div className="flex">
        <div className="mr-4 mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="font-medium">{notification.user}</p>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-3 w-3 mr-1" />
              {notification.time}
            </div>
          </div>
          <p className="text-gray-600">{notification.content}</p>
          {(notification.postId || notification.type === "connection") && (
            <div className="mt-1 text-orange-600 text-sm flex items-center">
              <span>View {notification.type === "connection" ? "connection" : "post"}</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
