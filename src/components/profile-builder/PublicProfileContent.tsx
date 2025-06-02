
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid, List, ExternalLink, Play } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  tags: string[];
  trailer_url?: string;
}

interface Post {
  id: string;
  content: string;
  media_url: string;
  media_type: string;
  likes: number;
  comments: number;
}

interface PublicProfileContentProps {
  projects: Project[];
  posts: Post[];
  showProjects: boolean;
  showPosts: boolean;
}

export const PublicProfileContent = ({ 
  projects, 
  posts, 
  showProjects, 
  showPosts 
}: PublicProfileContentProps) => {
  const [postsView, setPostsView] = useState<'grid' | 'list'>('grid');

  if (!showProjects && !showPosts) {
    return null;
  }

  return (
    <div className="mt-8 space-y-8">
      {/* Projects Section */}
      {showProjects && projects.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={project.cover_image_url} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.trailer_url && (
                    <Button
                      size="sm"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                      onClick={() => window.open(project.trailer_url, '_blank')}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Trailer
                    </Button>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Posts Section */}
      {showPosts && posts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Posts</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={postsView === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPostsView('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={postsView === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPostsView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {postsView === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square relative group cursor-pointer">
                  <img 
                    src={post.media_url} 
                    alt="Post"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-sm">❤️ {post.likes}</div>
                      <div className="text-sm">💬 {post.comments}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <p className="mb-3">{post.content}</p>
                    <img 
                      src={post.media_url} 
                      alt="Post"
                      className="w-full max-w-md rounded-lg mb-3"
                    />
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>❤️ {post.likes} likes</span>
                      <span>💬 {post.comments} comments</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
