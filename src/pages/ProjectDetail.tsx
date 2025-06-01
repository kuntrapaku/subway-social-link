
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Edit, Users, Calendar, ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProject, useProjectCollaborators } from '@/hooks/useProjects';
import { useAuth } from '@/context/AuthContext';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: project, isLoading: projectLoading } = useProject(id!);
  const { data: collaborators, isLoading: collaboratorsLoading } = useProjectCollaborators(id!);

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === project.owner_id;
  const canEdit = isOwner; // In the future, you could add collaborator edit permissions

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEmbedUrl = (url: string) => {
    // Convert YouTube watch URLs to embed URLs
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Convert Vimeo URLs to embed URLs
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Badge variant={project.is_public ? "default" : "secondary"}>
                {project.is_public ? (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Public
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" />
                    Private
                  </>
                )}
              </Badge>
            </div>
          </div>

          {canEdit && (
            <Button asChild>
              <Link to={`/projects/${project.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Link>
            </Button>
          )}
        </div>

        {/* Cover Image */}
        {project.cover_image_url && (
          <Card className="mb-8 overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        )}

        {/* Title and Meta */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
          
          <div className="flex items-center space-x-6 text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Updated {formatDate(project.updated_at)}
            </div>
            {collaborators && collaborators.length > 0 && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {collaborators.length} Collaborator{collaborators.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {project.description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trailer */}
            {project.trailer_url && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Trailer</h2>
                    <Button asChild variant="outline" size="sm">
                      <a href={project.trailer_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Original
                      </a>
                    </Button>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {project.trailer_url.includes('youtube.com') || project.trailer_url.includes('vimeo.com') ? (
                      <iframe
                        src={getEmbedUrl(project.trailer_url)}
                        title="Project Trailer"
                        className="w-full h-full"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Video preview not available</p>
                          <Button asChild variant="outline" className="mt-2">
                            <a href={project.trailer_url} target="_blank" rel="noopener noreferrer">
                              Watch Trailer
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Collaborators */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Team</h3>
                
                {/* Owner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Project Owner</p>
                      <p className="text-sm text-gray-600">Creator & Lead</p>
                    </div>
                    <Badge>Owner</Badge>
                  </div>

                  {/* Collaborators */}
                  {collaborators && collaborators.length > 0 ? (
                    collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            {collaborator.name || collaborator.user_id}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">
                            {collaborator.role.replace('_', ' ')}
                          </p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {collaborator.role.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No collaborators added yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="font-medium">{formatDate(project.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">{formatDate(project.updated_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visibility</span>
                    <span className="font-medium">{project.is_public ? 'Public' : 'Private'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
