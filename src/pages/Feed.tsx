import React, { useState, useEffect } from "react";
import { Post } from "@/components/NewPost";
import LeftSidebar from "@/components/index/LeftSidebar";
import PostsSection from "@/components/index/PostsSection";
import RightSidebar from "@/components/index/RightSidebar";
import { getPosts as getPostsFromSupabase, getFrames as getFramesFromSupabase } from "@/services/postsService";
import { getPosts, savePosts, getFrames, saveFrames } from "@/utils/postsStorage";

const Feed = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [frames, setFrames] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load posts and frames from both Supabase and localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load from Supabase first
        const [supabasePosts, supabaseFrames] = await Promise.all([
          getPostsFromSupabase(),
          getFramesFromSupabase()
        ]);
        
        // Load from localStorage for fallback/sample data
        const localPosts = getPosts();
        const localFrames = getFrames();
        
        // Combine Supabase data with local data, prioritizing Supabase
        const allPosts = supabasePosts.length > 0 ? supabasePosts : localPosts.length > 0 ? localPosts : getSamplePosts();
        const allFrames = supabaseFrames.length > 0 ? supabaseFrames : localFrames.length > 0 ? localFrames : getSampleFrames();
        
        setPosts(allPosts);
        setFrames(allFrames);
        
        // Save to localStorage for offline access
        if (supabasePosts.length > 0) {
          savePosts(supabasePosts);
        }
        if (supabaseFrames.length > 0) {
          saveFrames(supabaseFrames);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        // Fallback to localStorage data
        const localPosts = getPosts();
        const localFrames = getFrames();
        setPosts(localPosts.length > 0 ? localPosts : getSamplePosts());
        setFrames(localFrames.length > 0 ? localFrames : getSampleFrames());
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleNewPost = (newPost: Post) => {
    // Add post to state immediately for UI responsiveness
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
  };
  
  const handleNewFrame = (newFrame: Post) => {
    // Add frame to state immediately for UI responsiveness
    const updatedFrames = [newFrame, ...frames];
    setFrames(updatedFrames);
  };

  const getSamplePosts = (): Post[] => [
    {
      id: "1",
      author: {
        name: "Rajesh Kumar",
        title: "Cinematographer at Bollywood Studios"
      },
      timeAgo: "2 hours ago",
      content: "Just shot an amazing dance sequence for the upcoming film 'Dil Se'. Using the new RED One camera really gave us some incredible shots! #BollywoodMagic #Cinematography",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      likes: 42,
      comments: 7,
      isLiked: false
    },
    {
      id: "2",
      author: {
        name: "Priya Sharma",
        title: "Art Director at Dharma Productions"
      },
      timeAgo: "1 day ago",
      content: "Set design for 'Mumbai Nights' is almost complete! Can't wait for everyone to see the magic we've created. #SetDesign #BollywoodArt",
      likes: 89,
      comments: 13,
      isLiked: true
    },
    {
      id: "3",
      author: {
        name: "Vikram Singh",
        title: "Music Composer"
      },
      timeAgo: "2 days ago",
      content: "Just wrapped up the background score for the climax scene. The fusion of classical and electronic music creates such a powerful emotion. #FilmMusic #IndianCinema",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 124,
      comments: 21,
      isLiked: false
    },
    {
      id: "4",
      author: {
        name: "Aditya Kapoor",
        title: "Film Director at 24 Frames"
      },
      timeAgo: "3 hours ago",
      content: "Day 15 of shooting 'Namaste India' in the streets of Old Delhi. The local culture and colors bring so much authenticity to our story. #IndianCinema #Directing",
      imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
      likes: 78,
      comments: 15,
      isLiked: false
    }
  ];

  const getSampleFrames = (): Post[] => [
    {
      id: "100",
      author: {
        name: "Vikram Bhatt",
        title: "Director at Vishesh Films"
      },
      timeAgo: "1 day ago",
      content: "Behind-the-scenes from our latest horror film. The lighting crew did an amazing job with this shot!",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      likes: 56,
      comments: 8,
      isLiked: false,
      isVideo: true
    },
    {
      id: "101",
      author: {
        name: "Anurag Kashyap",
        title: "Film Director"
      },
      timeAgo: "3 days ago",
      content: "Working with natural light in the streets of Mumbai gives such an authentic feel to our independent cinema.",
      imageUrl: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      likes: 124,
      comments: 15,
      isLiked: true,
      isVideo: true
    }
  ];

  if (loading) {
    return (
      <div className="relative pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
            <div className="md:col-span-2 lg:col-span-1">
              <div className="animate-pulse bg-gray-200 rounded-lg h-96"></div>
            </div>
            <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <LeftSidebar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          <div className="md:col-span-2 lg:col-span-1">
            <PostsSection 
              posts={posts} 
              onNewPost={handleNewPost}
              onNewFrame={handleNewFrame}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Feed;
