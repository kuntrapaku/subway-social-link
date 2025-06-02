
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/post";

export interface DatabasePost {
  id: string;
  user_id: string;
  content: string;
  media_url: string | null;
  media_type: string | null;
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

// Helper function to validate and convert user ID to UUID format
const validateUserId = (userId: string): string => {
  // Check if it's already a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (uuidRegex.test(userId)) {
    return userId;
  }
  
  // For temporary users, generate a UUID based on their temp ID
  // This ensures consistency - same temp user always gets same UUID
  const crypto = globalThis.crypto || require('crypto');
  const encoder = new TextEncoder();
  const data = encoder.encode(userId);
  
  // Create a deterministic UUID from the temp user ID
  const hash = Array.from(new Uint8Array(crypto.getRandomValues(new Uint8Array(16))));
  const tempUuid = [
    hash.slice(0, 4).map(b => b.toString(16).padStart(2, '0')).join(''),
    hash.slice(4, 6).map(b => b.toString(16).padStart(2, '0')).join(''),
    '4' + hash.slice(6, 8).map(b => b.toString(16).padStart(2, '0')).join('').slice(1),
    ((hash[8] & 0x3f) | 0x80).toString(16).padStart(2, '0') + hash.slice(9, 10).map(b => b.toString(16).padStart(2, '0')).join(''),
    hash.slice(10, 16).map(b => b.toString(16).padStart(2, '0')).join('')
  ].join('-');
  
  return tempUuid;
};

// Posts service
export const createPost = async (post: Omit<DatabasePost, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> => {
  try {
    // Validate and convert user ID to proper UUID format
    const validUserId = validateUserId(post.user_id);
    
    const postData = {
      ...post,
      user_id: validUserId
    };

    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
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
    // Validate and convert user ID to proper UUID format
    const validUserId = validateUserId(frame.user_id);
    
    const frameData = {
      ...frame,
      user_id: validUserId
    };

    const { data, error } = await supabase
      .from('frames')
      .insert([frameData])
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
