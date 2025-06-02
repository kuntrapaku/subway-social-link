
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/post";

export interface DatabasePost {
  id: string;
  user_id: string;
  content: string;
  media_url: string | null;
  media_type: string | null; // Changed to allow any string from database
  likes: number;
  comments: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseFrame {
  id: string;
  user_id: string;
  content: string;
  video_url: string | null;
  likes: number;
  comments: number;
  created_at: string;
  updated_at: string;
}

// Posts service
export const createPost = async (post: Omit<DatabasePost, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return null;
    }

    return convertDatabasePostToPost(data);
  } catch (error) {
    console.error('Exception creating post:', error);
    return null;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data.map(convertDatabasePostToPost);
  } catch (error) {
    console.error('Exception fetching posts:', error);
    return [];
  }
};

// Frames service
export const createFrame = async (frame: Omit<DatabaseFrame, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('frames')
      .insert([frame])
      .select()
      .single();

    if (error) {
      console.error('Error creating frame:', error);
      return null;
    }

    return convertDatabaseFrameToPost(data);
  } catch (error) {
    console.error('Exception creating frame:', error);
    return null;
  }
};

export const getFrames = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('frames')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching frames:', error);
      return [];
    }

    return data.map(convertDatabaseFrameToPost);
  } catch (error) {
    console.error('Exception fetching frames:', error);
    return [];
  }
};

// Helper functions to convert database objects to Post type
function convertDatabasePostToPost(dbPost: DatabasePost): Post {
  return {
    id: dbPost.id,
    author: {
      name: "User", // We'll need to enhance this with profile data later
      title: "Artist"
    },
    timeAgo: formatTimeAgo(dbPost.created_at),
    content: dbPost.content,
    imageUrl: dbPost.media_url || undefined,
    likes: dbPost.likes,
    comments: dbPost.comments,
    isLiked: false,
    isVideo: dbPost.media_type === 'video'
  };
}

function convertDatabaseFrameToPost(dbFrame: DatabaseFrame): Post {
  return {
    id: dbFrame.id,
    author: {
      name: "User", // We'll need to enhance this with profile data later
      title: "Filmmaker"
    },
    timeAgo: formatTimeAgo(dbFrame.created_at),
    content: dbFrame.content,
    imageUrl: dbFrame.video_url || undefined,
    likes: dbFrame.likes,
    comments: dbFrame.comments,
    isLiked: false,
    isVideo: true
  };
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
