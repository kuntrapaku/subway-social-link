
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { NotificationType } from "@/types/notifications";
import { mockNotifications } from "./notifications/mockNotifications";
import { generateNewNotification, createNotification } from "./notifications/notificationUtils";

export const useNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationType[]>(mockNotifications);
  const [lastNotificationTime, setLastNotificationTime] = useState<Date>(new Date());

  // In a real app, this would be a websocket connection or polling to get new notifications
  useEffect(() => {
    const checkForNewNotifications = () => {
      // Simulate getting new notifications every so often (random interval)
      const randomTime = Math.floor(Math.random() * 300000) + 60000; // Between 1-5 minutes
      
      const timer = setTimeout(() => {
        // In a real app, this would be an API call to get new notifications
        const newNotification = generateNewNotification();
        
        setNotifications(prev => [newNotification, ...prev]);
        setLastNotificationTime(new Date());
        
        // Display a toast for the new notification
        toast({
          title: "New notification",
          description: `${newNotification.user} ${newNotification.content}`,
        });
        
        // Schedule the next check
        checkForNewNotifications();
      }, randomTime);
      
      return () => clearTimeout(timer);
    };
    
    // Start the checking process
    const cleanup = checkForNewNotifications();
    
    return cleanup;
  }, [toast]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "You have no unread notifications",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  // This function will be provided by a wrapper component that has access to navigation
  const handleNotificationClick = (notification: NotificationType) => {
    // Mark the notification as read
    markAsRead(notification.id);
    
    // We'll return the notification so the wrapper can handle navigation
    return notification;
  };

  const addNotification = (notification: Omit<NotificationType, 'id' | 'time' | 'read'>) => {
    const newNotification = createNotification(notification);
    
    setNotifications(prev => [newNotification, ...prev]);
    setLastNotificationTime(new Date());
    
    toast({
      title: "New notification",
      description: `${newNotification.user} ${newNotification.content}`,
    });
    
    return newNotification;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
    handleNotificationClick,
    addNotification,
    lastNotificationTime
  };
};
