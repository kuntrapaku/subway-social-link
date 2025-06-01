
import { Notification } from "@/types/notifications";

export const generateNewNotification = (): Notification => {
  const now = new Date().toISOString();
  return {
    id: `new-${Date.now()}`,
    user_id: "current_user",
    type: Math.random() > 0.5 ? "like" : "comment",
    message: Math.random() > 0.5 
      ? "liked your newest artwork" 
      : "commented: 'Fantastic work on the latest project!'",
    link: "/posts/1",
    is_read: false,
    created_at: now,
    updated_at: now,
    actor_user_id: Math.random() > 0.5 ? "neha_gupta" : "rajiv_malhotra",
    target_id: "1",
    target_type: "post"
  };
};

export const createNotification = (
  notification: Omit<Notification, 'id' | 'created_at' | 'updated_at' | 'is_read'>
): Notification => {
  const now = new Date().toISOString();
  return {
    ...notification,
    id: `manual-${Date.now()}`,
    created_at: now,
    updated_at: now,
    is_read: false,
  };
};
