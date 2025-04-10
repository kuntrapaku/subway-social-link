
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import PostCard from "@/components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Image, Video, Newspaper, Calendar } from "lucide-react";

const Profile = () => {
  // Sample data
  const posts = [
    {
      id: "1",
      author: {
        name: "John Doe",
        title: "Software Engineer"
      },
      timeAgo: "1 week ago",
      content: "Just completed a new project using React and Tailwind CSS. The combination of these technologies made development so efficient!",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      likes: 78,
      comments: 12,
      isLiked: false
    },
    {
      id: "2",
      author: {
        name: "John Doe",
        title: "Software Engineer"
      },
      timeAgo: "2 weeks ago",
      content: "Excited to announce I've been promoted to Senior Software Engineer! Looking forward to new challenges and opportunities to grow.",
      likes: 156,
      comments: 34,
      isLiked: true
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile info */}
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
          
          {/* Tab content */}
          <div className="lg:col-span-2">
            <div className="subway-card mb-4">
              <Tabs defaultValue="posts">
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
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </TabsContent>
                <TabsContent value="photos" className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1,2,3,4,5,6].map((item) => (
                      <div key={item} className="aspect-square bg-subway-100 rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-subway-600" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-0">
                  <div className="text-center py-8 text-gray-500">
                    <Video className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p>No videos to display</p>
                  </div>
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
