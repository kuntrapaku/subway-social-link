
import { Notification } from "@/types/notifications";

// Mock notifications data - in a real app, this would come from an API
export const mockNotifications: Notification[] = [
  {
    id: "1",
    user_id: "current_user",
    type: "like",
    message: "Vikram Patel liked your artwork 'Mumbai Sunset Scene'",
    link: "/posts/1",
    is_read: false,
    created_at: "2024-06-01T16:00:00Z",
    updated_at: "2024-06-01T16:00:00Z",
    actor_user_id: "vp123",
    target_id: "1",
    target_type: "post"
  },
  {
    id: "2",
    user_id: "current_user",
    type: "comment",
    message: "Priya Sharma commented on your post: 'This is amazing work! The lighting is perfect.'",
    link: "/posts/1",
    is_read: false,
    created_at: "2024-06-01T13:00:00Z",
    updated_at: "2024-06-01T13:00:00Z",
    actor_user_id: "ps456",
    target_id: "1",
    target_type: "post"
  },
  {
    id: "3",
    user_id: "current_user",
    type: "connection",
    message: "Arjun Kapoor accepted your connection request",
    link: "/profile/arjun-kapoor",
    is_read: true,
    created_at: "2024-05-31T10:00:00Z",
    updated_at: "2024-05-31T10:00:00Z",
    actor_user_id: "ak789",
    target_id: "ak789",
    target_type: "user"
  },
  {
    id: "4",
    user_id: "current_user",
    type: "mention",
    message: "Rahul Singh mentioned you in a comment: '@SurendraK check out this new camera setup!'",
    link: "/posts/3",
    is_read: true,
    created_at: "2024-05-30T14:00:00Z",
    updated_at: "2024-05-30T14:00:00Z",
    actor_user_id: "rs101",
    target_id: "3",
    target_type: "post"
  },
  {
    id: "5",
    user_id: "current_user",
    type: "like",
    message: "Deepika Reddy liked your post about the new RED camera",
    link: "/posts/2",
    is_read: true,
    created_at: "2024-05-29T09:00:00Z",
    updated_at: "2024-05-29T09:00:00Z",
    actor_user_id: "dr202",
    target_id: "2",
    target_type: "post"
  },
  {
    id: "6",
    user_id: "current_user",
    type: "comment",
    message: "Amit Kumar commented on your art: 'This frame composition is breathtaking!'",
    link: "/posts/2",
    is_read: true,
    created_at: "2024-05-29T08:00:00Z",
    updated_at: "2024-05-29T08:00:00Z",
    actor_user_id: "ak303",
    target_id: "2",
    target_type: "post"
  },
  {
    id: "7",
    user_id: "current_user",
    type: "invite",
    message: "Your artwork was featured in 'Top Indian Film Artists' collection",
    link: "/featured",
    is_read: true,
    created_at: "2024-05-28T12:00:00Z",
    updated_at: "2024-05-28T12:00:00Z",
    target_type: "feature"
  }
];
