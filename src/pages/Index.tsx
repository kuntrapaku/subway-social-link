
import { useState } from "react";
import Navbar from "@/components/Navbar";
import NewPost from "@/components/NewPost";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import SuggestedConnections from "@/components/SuggestedConnections";

const Index = () => {
  // Sample data
  const posts = [
    {
      id: "1",
      author: {
        name: "Jane Smith",
        title: "Marketing Director at Creative Co."
      },
      timeAgo: "2 hours ago",
      content: "Just launched our new sustainable product line! Check it out and let me know what you think. #Sustainability #ProductLaunch",
      imageUrl: "https://images.unsplash.com/photo-1586339949886-35bd60821339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 42,
      comments: 7,
      isLiked: false
    },
    {
      id: "2",
      author: {
        name: "Alex Johnson",
        title: "Software Engineer at Tech Innovations"
      },
      timeAgo: "1 day ago",
      content: "Just shared my thoughts on the future of web development in 2025. The landscape is changing rapidly with AI integration becoming a standard practice.",
      likes: 89,
      comments: 13,
      isLiked: true
    },
    {
      id: "3",
      author: {
        name: "Maria Garcia",
        title: "UX Designer"
      },
      timeAgo: "2 days ago",
      content: "Thrilled to announce I've joined the design team at @DesignStudio! Looking forward to creating amazing experiences with this talented team.",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 124,
      comments: 21,
      isLiked: false
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left sidebar */}
          <div className="md:col-span-1 hidden md:block">
            <div className="sticky top-20">
              <ProfileCard isCurrentUser={true} />
            </div>
          </div>
          
          {/* Main feed */}
          <div className="md:col-span-2 lg:col-span-1">
            <NewPost />
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Right sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <SuggestedConnections />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
