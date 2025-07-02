
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

// Sample users data for mapping
const sampleUsers: DatabaseUser[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Priya Sharma",
    title: "Art Director at Dharma Productions",
    profile_picture_url: "https://images.unsplash.com/photo-1494790108755-2616b332c1b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "priya.sharma@bollywood.com"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Rajesh Kumar",
    title: "Cinematographer at Bollywood Studios",
    profile_picture_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "rajesh.kumar@cinematography.com"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Ananya Patel",
    title: "Music Composer",
    profile_picture_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "ananya.patel@music.com"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Vikram Singh",
    title: "Film Director at 24 Frames",
    profile_picture_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "vikram.singh@directing.com"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Kavya Reddy",
    title: "Costume Designer",
    profile_picture_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "kavya.reddy@costume.com"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Arjun Mehta",
    title: "Film Editor",
    profile_picture_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "arjun.mehta@editing.com"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Neha Kapoor",
    title: "Film Producer",
    profile_picture_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    email: "neha.kapoor@production.com"
  },
  {
    id: "temp-user-1",
    name: "Demo User",
    title: "Film Professional",
    profile_picture_url: null,
    email: "demo@movcon.com"
  }
];

// Posts service
export const createPost = async (post: Omit<DatabasePost, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> => {
  try {
    console.log('Creating post with data:', post);
    
    // For temp users, save to localStorage instead of Supabase
    if (post.user_id.startsWith('temp-')) {
      const tempPost: Post = {
        id: `temp-post-${Date.now()}`,
        author: {
          name: sampleUsers.find(u => u.id === post.user_id)?.name || "Demo User",
          title: sampleUsers.find(u => u.id === post.user_id)?.title || "Film Professional"
        },
        timeAgo: "Just now",
        content: post.content,
        imageUrl: post.media_url || undefined,
        likes: 0,
        comments: 0,
        isLiked: false,
        isVideo: post.media_type === 'video'
      };
      
      // Save to localStorage
      const existingPosts = JSON.parse(localStorage.getItem('movcon-posts') || '[]');
      existingPosts.unshift(tempPost);
      localStorage.setItem('movcon-posts', JSON.stringify(existingPosts));
      
      return tempPost;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }

    return convertDatabasePostToPostWithUser(data, sampleUsers);
  } catch (error) {
    console.error('Exception creating post:', error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    // Get posts from localStorage for temp users
    const localPosts = JSON.parse(localStorage.getItem('movcon-posts') || '[]');
    
    // Try to get posts from database
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    let allPosts: Post[] = [];

    if (!postsError && postsData) {
      allPosts = postsData.map(post => convertDatabasePostToPostWithUser(post, sampleUsers));
    }

    // Combine with local posts and sample data
    allPosts = [...localPosts, ...allPosts, ...getSamplePosts()];
    
    // Remove duplicates based on ID
    const uniquePosts = allPosts.filter((post, index, self) => 
      index === self.findIndex(p => p.id === post.id)
    );

    return uniquePosts;
  } catch (error) {
    console.error('Exception fetching posts:', error);
    return getSamplePosts();
  }
};

// Frames service
export const createFrame = async (frame: Omit<DatabaseFrame, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> => {
  try {
    console.log('Creating frame with data:', frame);
    
    // For temp users, save to localStorage instead of Supabase
    if (frame.user_id.startsWith('temp-')) {
      const tempFrame: Post = {
        id: `temp-frame-${Date.now()}`,
        author: {
          name: sampleUsers.find(u => u.id === frame.user_id)?.name || "Demo User",
          title: sampleUsers.find(u => u.id === frame.user_id)?.title || "Film Professional"
        },
        timeAgo: "Just now",
        content: frame.content,
        imageUrl: frame.video_url || undefined,
        likes: 0,
        comments: 0,
        isLiked: false,
        isVideo: true
      };
      
      // Save to localStorage
      const existingFrames = JSON.parse(localStorage.getItem('movcon-frames') || '[]');
      existingFrames.unshift(tempFrame);
      localStorage.setItem('movcon-frames', JSON.stringify(existingFrames));
      
      return tempFrame;
    }

    const { data, error } = await supabase
      .from('frames')
      .insert([frame])
      .select()
      .single();

    if (error) {
      console.error('Error creating frame:', error);
      throw error;
    }

    return convertDatabaseFrameToPostWithUser(data, sampleUsers);
  } catch (error) {
    console.error('Exception creating frame:', error);
    throw error;
  }
};

export const getFrames = async (): Promise<Post[]> => {
  try {
    // Get frames from localStorage for temp users
    const localFrames = JSON.parse(localStorage.getItem('movcon-frames') || '[]');
    
    // Try to get frames from database
    const { data: framesData, error: framesError } = await supabase
      .from('frames')
      .select('*')
      .order('created_at', { ascending: false });

    let allFrames: Post[] = [];

    if (!framesError && framesData) {
      allFrames = framesData.map(frame => convertDatabaseFrameToPostWithUser(frame, sampleUsers));
    }

    // Combine with local frames and sample data
    allFrames = [...localFrames, ...allFrames, ...getSampleFrames()];
    
    // Remove duplicates based on ID
    const uniqueFrames = allFrames.filter((frame, index, self) => 
      index === self.findIndex(f => f.id === frame.id)
    );

    return uniqueFrames;
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
