
import { NotificationType } from "@/types/notifications";

export const generateNewNotification = (): NotificationType => {
  return {
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
};

export const createNotification = (
  notification: Omit<NotificationType, 'id' | 'time' | 'read'>
): NotificationType => {
  return {
    ...notification,
    id: `manual-${Date.now()}`,
    time: "Just now",
    read: false,
  };
};
