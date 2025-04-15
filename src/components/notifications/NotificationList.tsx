
import React from "react";
import { CheckCheck, Star } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { NotificationType } from "@/types/notifications";

interface NotificationListProps {
  notifications: NotificationType[];
  filter: "all" | "unread" | "mentions";
  onNotificationClick: (notification: NotificationType) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  filter, 
  onNotificationClick 
}) => {
  let filteredNotifications = notifications;
  
  if (filter === "unread") {
    filteredNotifications = notifications.filter(n => !n.read);
  } else if (filter === "mentions") {
    filteredNotifications = notifications.filter(n => n.type === 'mention');
  }
  
  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {filter === "mentions" ? (
          <>
            <Star className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>No mentions yet</p>
          </>
        ) : (
          <>
            <CheckCheck className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>No {filter === "unread" ? "unread " : ""}notifications</p>
          </>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredNotifications.map((notification) => (
        <NotificationItem 
          key={notification.id}
          notification={notification}
          onClick={onNotificationClick}
        />
      ))}
    </div>
  );
};

export default NotificationList;
