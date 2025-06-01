
export interface Post {
  id: string;
  author: {
    name: string;
    title: string;
  };
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isVideo?: boolean;
}
