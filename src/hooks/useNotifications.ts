
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    postId: "1"
  },
  {
    id: "2",
    type: "comment",
    content: "commented on your post: 'This is amazing work! The lighting is perfect.'",
    user: "Priya Sharma",
    time: "5 hours ago",
    read: false,
    postId: "1"
  },
  {
    id: "3",
    type: "connection",
    content: "accepted your connection request",
    user: "Arjun Kapoor",
    time: "1 day ago",
    read: true
  },
  {
    id: "4",
    type: "mention",
    content: "mentioned you in a comment: '@SurendraK check out this new camera setup!'",
    user: "Rahul Singh",
    time: "2 days ago",
    read: true,
    postId: "3"
  },
  {
    id: "5",
    type: "like",
    content: "liked your post about the new RED camera",
    user: "Deepika Reddy",
    time: "3 days ago",
    read: true,
    postId: "2"
  },
  {
    id: "6",
    type: "comment",
    content: "commented on your art: 'This frame composition is breathtaking!'",
    user: "Amit Kumar",
    time: "3 days ago",
    read: true,
    postId: "2"
  },
  {
    id: "7",
    type: "other",
    content: "Your artwork was featured in 'Top Indian Film Artists' collection",
    user: "MovConnect Team",
    time: "4 days ago",
    read: true
  }
];

export const useNotifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationType[]>(mockNotifications);

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

  const handleNotificationClick = (notification: NotificationType) => {
    // Mark the notification as read
    markAsRead(notification.id);
    
    // Navigate to the appropriate location based on notification type
    if (notification.type === "connection") {
      navigate("/network");
      toast({
        title: "Network Connection",
        description: `Viewing your connection with ${notification.user}`,
      });
    } else if (notification.postId) {
      navigate(`/?postId=${notification.postId}`);
      toast({
        title: "Post View",
        description: `Viewing post related to ${notification.user}'s activity`,
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
    handleNotificationClick
  };
};
