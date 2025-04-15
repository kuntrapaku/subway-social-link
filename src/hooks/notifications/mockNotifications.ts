
import { NotificationType } from "@/types/notifications";

// Mock notifications data - in a real app, this would come from an API
export const mockNotifications: NotificationType[] = [
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
