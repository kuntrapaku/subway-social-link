
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import NewPost from "@/components/NewPost";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import SuggestedConnections from "@/components/SuggestedConnections";
import { 
  Camera, 
  Video, 
  Film,
  Headphones,
  Users,
  Palette,
  Scissors,
  Brush,
  Music,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Add this missing import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const isMobile = useIsMobile();
  
  // Sample data
  const posts = [
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

  return (
    <Layout>
      <div className="relative pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Left Sidebar */}
            <div className="md:col-span-1 hidden md:block">
              <div className="sticky top-20 space-y-6">
                <ProfileCard isCurrentUser={true} />
                
                {/* Categories Navigation - Indian Film Context */}
                <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
                  <h3 className="font-medium text-gray-900 mb-3">Film Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "all"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Film className="mr-2 h-4 w-4" />
                      All Art
                    </button>
                    <button
                      onClick={() => setActiveCategory("bollywood")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "bollywood"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Music className="mr-2 h-4 w-4" />
                      Bollywood
                    </button>
                    <button
                      onClick={() => setActiveCategory("regional")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "regional"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Regional Cinema
                    </button>
                    <button
                      onClick={() => setActiveCategory("indie")}
                      className={`flex w-full items-center px-3 py-2 rounded-lg text-sm font-medium ${
                        activeCategory === "indie"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Indie Films
                    </button>
                  </div>
                </div>
                
                {/* Creative Departments */}
                <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
                  <h3 className="font-medium text-gray-900 mb-3">Creative Departments</h3>
                  <NavigationMenu>
                    <NavigationMenuList className="flex flex-col space-y-1">
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                          <Brush className="mr-2 h-4 w-4" /> Direction
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px] bg-white p-2 rounded-lg shadow-lg">
                          <ul className="space-y-1">
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Directors</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Assistant Directors</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Script Supervisors</NavigationMenuLink></li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                          <Camera className="mr-2 h-4 w-4" /> Camera
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px] bg-white p-2 rounded-lg shadow-lg">
                          <ul className="space-y-1">
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Cinematographers</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Camera Operators</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Focus Pullers</NavigationMenuLink></li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                          <Palette className="mr-2 h-4 w-4" /> Art
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px] bg-white p-2 rounded-lg shadow-lg">
                          <ul className="space-y-1">
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Art Directors</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Production Designers</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Set Decorators</NavigationMenuLink></li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                          <Scissors className="mr-2 h-4 w-4" /> Post
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px] bg-white p-2 rounded-lg shadow-lg">
                          <ul className="space-y-1">
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Editors</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">VFX Artists</NavigationMenuLink></li>
                            <li><NavigationMenuLink className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Colorists</NavigationMenuLink></li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            </div>
            
            {/* Main Feed */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="rounded-xl bg-white p-6 shadow-md border border-orange-100 mb-6">
                <Tabs defaultValue="art" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger value="art" className="gap-2 text-lg data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                      <Palette className="h-5 w-5" />
                      <span className={isMobile ? "hidden" : "inline"}>Art</span>
                    </TabsTrigger>
                    <TabsTrigger value="frames" className="gap-2 text-lg data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                      <Video className="h-5 w-5" />
                      <span className={isMobile ? "hidden" : "inline"}>Frames</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Filter Pills for mobile */}
                  <div className="md:hidden mb-4 flex w-full overflow-x-auto pb-2">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "all"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Film className="mr-1 h-4 w-4" />
                      All
                    </button>
                    <button
                      onClick={() => setActiveCategory("bollywood")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "bollywood"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Music className="mr-1 h-4 w-4" />
                      Bollywood
                    </button>
                    <button
                      onClick={() => setActiveCategory("regional")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "regional"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Globe className="mr-1 h-4 w-4" />
                      Regional
                    </button>
                    <button
                      onClick={() => setActiveCategory("indie")}
                      className={`mr-2 flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === "indie"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Camera className="mr-1 h-4 w-4" />
                      Indie
                    </button>
                  </div>

                  <TabsContent value="art" className="space-y-4">
                    <NewPost />
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="frames" className="space-y-4">
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-8 text-center">
                      <Video className="mx-auto h-12 w-12 text-orange-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">Share your frames</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Start sharing your film frames with the Indian film community.
                      </p>
                      <Button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white">
                        Upload Frame
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                <SuggestedConnections />
                
                {/* Trending Topics - Indian Film Industry */}
                <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
                  <h3 className="font-medium text-gray-900 mb-3">Trending in Indian Cinema</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-orange-50 text-orange-700 border-orange-200">
                        #FilmfareAwards
                      </Badge>
                      <span className="text-sm text-gray-500">1.2K posts</span>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-orange-50 text-orange-700 border-orange-200">
                        #NewBollywood
                      </Badge>
                      <span className="text-sm text-gray-500">856 posts</span>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-orange-50 text-orange-700 border-orange-200">
                        #RegionalCinema
                      </Badge>
                      <span className="text-sm text-gray-500">712 posts</span>
                    </div>
                    <div className="flex items-start">
                      <Badge variant="outline" className="mr-2 bg-orange-50 text-orange-700 border-orange-200">
                        #IndieFilm
                      </Badge>
                      <span className="text-sm text-gray-500">598 posts</span>
                    </div>
                  </div>
                </div>
                
                {/* Film Festivals Calendar */}
                <div className="rounded-xl bg-white p-4 shadow-md border border-orange-100">
                  <h3 className="font-medium text-gray-900 mb-3">Upcoming Film Festivals</h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h4 className="font-medium">Mumbai Film Festival</h4>
                      <p className="text-xs text-gray-500">October 15-22, 2025</p>
                    </div>
                    <div className="border-l-4 border-orange-300 pl-3">
                      <h4 className="font-medium">International Film Festival of India</h4>
                      <p className="text-xs text-gray-500">November 20-28, 2025</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h4 className="font-medium">Kerala Film Festival</h4>
                      <p className="text-xs text-gray-500">December 5-12, 2025</p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white">
                    View All Events
                  </Button>
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
