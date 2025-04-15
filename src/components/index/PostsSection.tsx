
import React from "react";
import { Palette, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewPost, { Post } from "@/components/NewPost";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import CategoryList from "./CategoryList";
import { useIsMobile } from "@/hooks/use-mobile";

interface PostsSectionProps {
  posts: Post[];
  onNewPost: (post: Post) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const PostsSection = ({ posts, onNewPost, activeCategory, setActiveCategory }: PostsSectionProps) => {
  const isMobile = useIsMobile();

  return (
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

        {isMobile && (
          <div className="md:hidden mb-4">
            <CategoryList 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              isMobile={true}
            />
          </div>
        )}

        <TabsContent value="art" className="space-y-4">
          <NewPost onPostCreated={onNewPost} />
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
  );
};

export default PostsSection;
