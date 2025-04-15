
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Post } from "@/components/NewPost";
import LeftSidebar from "@/components/index/LeftSidebar";
import PostsSection from "@/components/index/PostsSection";
import RightSidebar from "@/components/index/RightSidebar";
import { getPosts, addPost, savePosts, getFrames, addFrame, saveFrames } from "@/utils/postsStorage";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [frames, setFrames] = useState<Post[]>([]);
  
  // Load posts and frames from localStorage on component mount
  useEffect(() => {
    const storedPosts = getPosts();
    const storedFrames = getFrames();
    
    if (storedPosts.length > 0) {
      setPosts(storedPosts);
    } else {
      // Set initial sample posts if no posts in storage
      const samplePosts = [
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
      setPosts(samplePosts);
      savePosts(samplePosts); // Save sample posts to localStorage
    }
    
    if (storedFrames.length > 0) {
      setFrames(storedFrames);
    } else {
      // Set initial sample frames if no frames in storage
      const sampleFrames = [
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
      setFrames(sampleFrames);
      saveFrames(sampleFrames); // Save sample frames to localStorage
    }
  }, []);

  const handleNewPost = (newPost: Post) => {
    // Add post to localStorage and update state
    const updatedPosts = addPost(newPost);
    setPosts(updatedPosts);
  };
  
  const handleNewFrame = (newFrame: Post) => {
    // Add frame to localStorage and update state
    const updatedFrames = addFrame(newFrame);
    setFrames(updatedFrames);
  };

  return (
    <Layout>
      <div className="relative pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
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
    </Layout>
  );
};

export default Index;
