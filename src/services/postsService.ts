
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

export interface DatabaseUser {
  id: string;
  name: string;
  title: string | null;
  profile_picture_url: string | null;
  email: string;
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
    // Try to get posts from database first
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      return getSamplePosts();
    }

    // Get users for the posts
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return postsData.map(convertDatabasePostToPost);
    }

    // Combine posts with user information
    return postsData.map(post => convertDatabasePostToPostWithUser(post, usersData));
  } catch (error) {
    console.error('Exception fetching posts:', error);
    return getSamplePosts();
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
    // Try to get frames from database first
    const { data: framesData, error: framesError } = await supabase
      .from('frames')
      .select('*')
      .order('created_at', { ascending: false });

    if (framesError) {
      console.error('Error fetching frames:', framesError);
      return getSampleFrames();
    }

    // Get users for the frames
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*');

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return framesData.map(convertDatabaseFrameToPost);
    }

    // Combine frames with user information
    return framesData.map(frame => convertDatabaseFrameToPostWithUser(frame, usersData));
  } catch (error) {
    console.error('Exception fetching frames:', error);
    return getSampleFrames();
  }
};

// Helper functions to convert database objects to Post type
function convertDatabasePostToPost(dbPost: DatabasePost): Post {
  return {
    id: dbPost.id,
    author: {
      name: "User",
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

function convertDatabasePostToPostWithUser(dbPost: DatabasePost, users: DatabaseUser[]): Post {
  const user = users.find(u => u.id === dbPost.user_id);
  
  return {
    id: dbPost.id,
    author: {
      name: user?.name || "User",
      title: user?.title || "Artist"
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
      name: "User",
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

function convertDatabaseFrameToPostWithUser(dbFrame: DatabaseFrame, users: DatabaseUser[]): Post {
  const user = users.find(u => u.id === dbFrame.user_id);
  
  return {
    id: dbFrame.id,
    author: {
      name: user?.name || "User",
      title: user?.title || "Filmmaker"
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

// Sample data as fallback
function getSamplePosts(): Post[] {
  return [
    {
      id: "sample-1",
      author: {
        name: "Priya Sharma",
        title: "Art Director at Dharma Productions"
      },
      timeAgo: "2 hours ago",
      content: "Just finished designing the sets for our upcoming Bollywood romance! The intricate details and vibrant colors really bring the story to life. Can't wait for everyone to see it! 🎬✨ #SetDesign #BollywoodMagic",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      likes: 127,
      comments: 23,
      isLiked: false
    },
    {
      id: "sample-2",
      author: {
        name: "Rajesh Kumar",
        title: "Cinematographer at Bollywood Studios"
      },
      timeAgo: "4 hours ago",
      content: "Golden hour magic during our outdoor shoot in Rajasthan! The natural lighting created the perfect mood for this emotional scene. Sometimes the best shots happen when you work with nature. 📸🌅 #Cinematography #GoldenHour",
      imageUrl: "https://images.unsplash.com/photo-1500064817180-233d04bb5f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      likes: 89,
      comments: 15,
      isLiked: false
    },
    {
      id: "sample-3",
      author: {
        name: "Ananya Patel",
        title: "Music Composer"
      },
      timeAgo: "6 hours ago",
      content: "Spent the entire night perfecting the background score for the climax. Mixing traditional Indian instruments with modern electronic beats - the result gives me goosebumps every time! 🎵🎹 #FilmMusic #IndianClassical",
      likes: 156,
      comments: 31,
      isLiked: false
    },
    {
      id: "sample-4",
      author: {
        name: "Vikram Singh",
        title: "Film Director at 24 Frames"
      },
      timeAgo: "8 hours ago",
      content: "Day 20 of shooting in the lanes of Old Delhi. The authenticity of the location adds so much depth to our characters. Our lead actor absolutely nailed that emotional monologue today! 🎭🏛️ #Directing #IndianCinema",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      likes: 203,
      comments: 42,
      isLiked: false
    },
    {
      id: "sample-5",
      author: {
        name: "Kavya Reddy",
        title: "Costume Designer"
      },
      timeAgo: "1 day ago",
      content: "Working on period costumes for our historical drama. Each piece tells a story - from the intricate embroidery to the choice of fabrics. Research is half the battle! 👗✂️ #CostumeDesign #PeriodDrama",
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      likes: 94,
      comments: 18,
      isLiked: false
    }
  ];
}

function getSampleFrames(): Post[] {
  return [
    {
      id: "frame-sample-1",
      author: {
        name: "Arjun Mehta",
        title: "Film Editor"
      },
      timeAgo: "3 hours ago",
      content: "Behind the scenes: Editing the chase sequence that took 3 weeks to shoot. Every cut matters when you're building tension! The magic happens in post-production. 🎬⚡ #FilmEditing #ActionSequence",
      imageUrl: "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4",
      likes: 78,
      comments: 12,
      isLiked: false,
      isVideo: true
    },
    {
      id: "frame-sample-2",
      author: {
        name: "Neha Kapoor",
        title: "Film Producer"
      },
      timeAgo: "5 hours ago",
      content: "Wrapping up another successful day of shooting! Our incredible team made what seemed impossible happen. From sunrise to sunset, pure dedication! 🌟🎥 #FilmProduction #TeamWork",
      imageUrl: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
      likes: 145,
      comments: 27,
      isLiked: false,
      isVideo: true
    }
  ];
}
