
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { NotificationType } from "@/types/notifications";

// Mock notifications data - in a real app, this would come from an API
const mockNotifications: NotificationType[] = [
  {
    id: "1",
    type: "like",
    content: "liked your artwork 'Mumbai Sunset Scene'",
    user: "Vikram Patel",
    time: "2 hours ago",
    read: false,
    postId: "1",
    userId: "vp123"
  },
  {
    id: "2",
    type: "comment",
    content: "commented on your post: 'This is amazing work! The lighting is perfect.'",
    user: "Priya Sharma",
    time: "5 hours ago",
    read: false,
    postId: "1",
    commentId: "c123",
    userId: "ps456"
  },
  {
    id: "3",
    type: "connection",
    content: "accepted your connection request",
    user: "Arjun Kapoor",
    time: "1 day ago",
    read: true,
    connectionId: "con123",
    userId: "ak789"
  },
  {
    id: "4",
    type: "mention",
    content: "mentioned you in a comment: '@SurendraK check out this new camera setup!'",
    user: "Rahul Singh",
    time: "2 days ago",
    read: true,
    postId: "3",
    commentId: "c456",
    userId: "rs101"
  },
  {
    id: "5",
    type: "like",
    content: "liked your post about the new RED camera",
    user: "Deepika Reddy",
    time: "3 days ago",
    read: true,
    postId: "2",
    userId: "dr202"
  },
  {
    id: "6",
    type: "comment",
    content: "commented on your art: 'This frame composition is breathtaking!'",
    user: "Amit Kumar",
    time: "3 days ago",
    read: true,
    postId: "2",
    commentId: "c789",
    userId: "ak303"
  },
  {
    id: "7",
    type: "other",
    content: "Your artwork was featured in 'Top Indian Film Artists' collection",
    user: "MovConnect Team",
    time: "4 days ago",
    read: true,
    actionUrl: "/featured"
  }
];

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
        const newNotification: NotificationType = {
          id: `new-${Date.now()}`,
          type: Math.random() > 0.5 ? "like" : "comment",
          content: Math.random() > 0.5 
            ? "liked your newest artwork" 
            : "commented: 'Fantastic work on the latest project!'",
          user: Math.random() > 0.5 ? "Neha Gupta" : "Rajiv Malhotra",
          time: "Just now",
          read: false,
          postId: "1"
        };
        
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
    const newNotification: NotificationType = {
      ...notification,
      id: `manual-${Date.now()}`,
      time: "Just now",
      read: false,
    };
    
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
