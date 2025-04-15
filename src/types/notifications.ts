
export interface NotificationType {
  id: string;
  type: "like" | "comment" | "connection" | "mention" | "other";
  content: string;
  user: string;
  time: string;
  read: boolean;
  postId?: string; // ID of the related post if applicable
  userId?: string; // ID of the user who triggered the notification
  commentId?: string; // ID of the comment if applicable
  connectionId?: string; // ID of the connection if applicable
  actionUrl?: string; // URL to navigate to when notification is clicked
}
