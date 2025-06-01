
export interface Notification {
  id: string;
  user_id: string;
  type: 'follow' | 'invite' | 'comment' | 'like' | 'mention' | 'connection';
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  actor_user_id?: string;
  target_id?: string;
  target_type?: string;
}

// Legacy type alias for backward compatibility
export type NotificationType = Notification;

export interface NotificationGroup {
  date: string;
  label: string;
  notifications: Notification[];
}

export type NotificationFilter = 'all' | 'mentions' | 'invites' | 'comments';
