
export interface NotificationType {
  id: string;
  type: "like" | "comment" | "connection" | "mention" | "other";
  content: string;
  user: string;
  time: string;
  read: boolean;
  postId?: string; // ID of the related post if applicable
}
