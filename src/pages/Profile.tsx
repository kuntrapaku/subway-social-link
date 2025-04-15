
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import PostCard from "@/components/PostCard";
import FrameCard from "@/components/FrameCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Image, Video, Newspaper, Calendar, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Post } from "@/components/NewPost";
import { getPosts, getFrames } from "@/utils/postsStorage";
import NewFrame from "@/components/NewFrame";
import { useToast } from "@/hooks/use-toast";
import { addFrame } from "@/utils/postsStorage";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const initialTab = location.state?.activeTab || "posts";
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [frames, setFrames] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState(initialTab);
  const { toast } = useToast();

  useEffect(() => {
    const storedPosts = getPosts();
    const storedFrames = getFrames();
    setPosts(storedPosts);
    setFrames(storedFrames);
    
    const handleStorageChange = () => {
      const updatedPosts = getPosts();
      setPosts(updatedPosts);
    };
    
    const handleFramesUpdate = () => {
      const updatedFrames = getFrames();
      setFrames(updatedFrames);
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("frames-updated", handleFramesUpdate);
    window.addEventListener("profile-updated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("frames-updated", handleFramesUpdate);
      window.removeEventListener("profile-updated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Handle tab changes from navigation state
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleNewFrame = (frame: Post) => {
    const updatedFrames = addFrame(frame);
    setFrames(updatedFrames);
    
    toast({
      title: "Video uploaded successfully",
      description: "Your video frame has been added to your profile.",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <ProfileCard isCurrentUser={true} />
              
              <div className="subway-card mt-4">
                <h3 className="font-medium text-lg mb-3">Your connections</h3>
                <div className="flex flex-wrap">
                  {[1,2,3,4,5,6].map((item) => (
                    <div key={item} className="w-1/3 p-1">
                      <div className="aspect-square rounded-full bg-subway-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-subway-600" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <a href="/network" className="text-subway-600 text-sm hover:underline">
                    View all connections
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="subway-card mb-4">
              <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="posts" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Newspaper className="h-4 w-4 mr-1" />
                    <span>Posts</span>
                  </TabsTrigger>
                  <TabsTrigger value="photos" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Image className="h-4 w-4 mr-1" />
                    <span>Photos</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Video className="h-4 w-4 mr-1" />
                    <span>Videos</span>
                  </TabsTrigger>
                  <TabsTrigger value="events" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Events</span>
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="data-[state=active]:text-subway-600 data-[state=active]:border-b-2 data-[state=active]:border-subway-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Connections</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className="mt-0">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Newspaper className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p>No posts to display yet</p>
                      <p className="text-sm mt-2">Share your first art to see it here!</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="photos" className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {posts.filter(post => post.imageUrl && !post.isVideo).length > 0 ? (
                      posts.filter(post => post.imageUrl && !post.isVideo).map((post) => (
                        <div key={post.id} className="aspect-square bg-subway-100 rounded-lg overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt="Art" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      [1,2,3,4,5,6].map((item) => (
                        <div key={item} className="aspect-square bg-subway-100 rounded-lg flex items-center justify-center">
                          <Image className="h-8 w-8 text-subway-600" />
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-0">
                  <NewFrame onFrameCreated={handleNewFrame} />
                  
                  {frames.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {frames.map((frame) => (
                        <FrameCard key={frame.id} frame={frame} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 mt-4">
                      <Video className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p>No videos to display</p>
                      <p className="text-sm mt-2">Use the form above to upload your first video!</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="events" className="mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No upcoming events</p>
                  </div>
                </TabsContent>
                <TabsContent value="connections" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1,2,3,4].map((item) => (
                      <div key={item} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                        <div className="h-12 w-12 rounded-full bg-subway-100 flex items-center justify-center mr-3">
                          <Users className="h-6 w-6 text-subway-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Connection Name</h4>
                          <p className="text-sm text-gray-500">Professional Title</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
