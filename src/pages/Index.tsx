
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import NewPost from "@/components/NewPost";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import SuggestedConnections from "@/components/SuggestedConnections";
import { 
  Clapperboard, 
  Camera, 
  Video, 
  Film,
  Headphones,
  Users
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();
  
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
      imageUrl: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
    },
    {
      id: "4",
      author: {
        name: "Tom Wilson",
        title: "Cinematographer"
      },
      timeAgo: "3 hours ago",
      content: "Just wrapped up filming for the new sci-fi short film 'Nebula Dreams'. Can't wait to share the final product with everyone! #filmmaking #scifi",
      imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
      likes: 78,
      comments: 15,
      isLiked: false
    }
  ];

  return (
    <Layout>
      <div className="relative overflow-hidden pt-20 pb-10">
        {/* Hero Banner with Parallax Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-subway-800 opacity-90">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-40"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="block">SubConnect</span>
              <span className="block bg-gradient-to-r from-subway-400 to-subway-200 bg-clip-text text-transparent">
                Film Community
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-xl">
              Share your work, discover opportunities, and connect with film professionals.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="md:col-span-1 hidden md:block">
              <div className="sticky top-20 space-y-6">
                <ProfileCard isCurrentUser={true} />
                
                {/* Categories Navigation */}
                <div className="rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur">
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "all"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Film className="mr-2 h-4 w-4" />
                      All Posts
                    </button>
                    <button
                      onClick={() => setActiveCategory("crew")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "crew"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Crew
                    </button>
                    <button
                      onClick={() => setActiveCategory("equipment")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "equipment"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Equipment
                    </button>
                    <button
                      onClick={() => setActiveCategory("sound")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "sound"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Headphones className="mr-2 h-4 w-4" />
                      Sound
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Feed */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="rounded-xl bg-white/95 p-6 shadow-xl backdrop-blur mb-6">
                <Tabs defaultValue="posts" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="posts" className="gap-2 text-lg">
                      <Clapperboard className="h-5 w-5" />
                      <span className={isMobile ? "hidden" : "inline"}>Posts</span>
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="gap-2 text-lg">
                      <Video className="h-5 w-5" />
                      <span className={isMobile ? "hidden" : "inline"}>Videos</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Filter Pills for mobile */}
                  <div className="md:hidden mb-4 flex w-full overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "all"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Film className="mr-1 h-4 w-4" />
                      All
                    </button>
                    <button
                      onClick={() => setActiveCategory("crew")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "crew"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Users className="mr-1 h-4 w-4" />
                      Crew
                    </button>
                    <button
                      onClick={() => setActiveCategory("equipment")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "equipment"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Camera className="mr-1 h-4 w-4" />
                      Equipment
                    </button>
                    <button
                      onClick={() => setActiveCategory("sound")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "sound"
                          ? "bg-subway-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Headphones className="mr-1 h-4 w-4" />
                      Sound
                    </button>
                  </div>

                  <TabsContent value="posts" className="space-y-4">
                    <NewPost />
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="videos" className="space-y-4">
                    <div className="text-center p-8">
                      <Video className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No videos yet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Start sharing your film industry videos with the community.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <SuggestedConnections />
                
                {/* Trending Topics */}
                <div className="rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur">
                  <h3 className="font-medium text-gray-900 mb-3">Trending in Film</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-subway-50">
                        #CinemaFest2025
                      </Badge>
                      <span className="text-sm text-gray-500">1.2K posts</span>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-subway-50">
                        #FilmTech
                      </Badge>
                      <span className="text-sm text-gray-500">856 posts</span>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-subway-50">
                        #IndieFilmmakers
                      </Badge>
                      <span className="text-sm text-gray-500">712 posts</span>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-subway-50">
                        #CameraGear
                      </Badge>
                      <span className="text-sm text-gray-500">598 posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
