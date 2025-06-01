
import React from "react";
import { CheckCheck, Star, Bell } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { NotificationType } from "@/types/notifications";

interface NotificationListProps {
  notifications: NotificationType[];
  filter: string;
  onNotificationClick: (notification: NotificationType) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  filter, 
  onNotificationClick 
}) => {
  let filteredNotifications = notifications;
  
  if (filter === "unread") {
    filteredNotifications = notifications.filter(n => !n.is_read);
  } else if (filter === "mentions") {
    filteredNotifications = notifications.filter(n => n.type === 'mention');
  } else if (filter === "likes") {
    filteredNotifications = notifications.filter(n => n.type === 'like');
  } else if (filter === "comments") {
    filteredNotifications = notifications.filter(n => n.type === 'comment');
  } else if (filter === "connections") {
    filteredNotifications = notifications.filter(n => n.type === 'connection');
  }
  
  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {filter === "mentions" ? (
          <>
            <Star className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>No mentions yet</p>
          </>
        ) : filter === "likes" ? (
          <>
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>No likes yet</p>
          </>
        ) : filter === "comments" ? (
          <>
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>No comments yet</p>
          </>
        ) : filter === "connections" ? (
          <>
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p>No connections yet</p>
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
          onMarkAsRead={() => onNotificationClick(notification)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
