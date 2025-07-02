
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Film, Search, Plus, Calendar, MapPin, DollarSign, Users, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const { toast } = useToast();

  const projects = [
    {
      id: '1',
      title: 'Mumbai Stories',
      genre: 'Drama',
      director: 'Rajesh Kumar',
      status: 'Pre-Production',
      budget: '₹2-5 Crore',
      timeline: '6 months',
      location: 'Mumbai, India',
      description: 'An anthology of interconnected stories from the streets of Mumbai, exploring the dreams and struggles of ordinary people.',
      poster: null,
      neededRoles: ['Lead Actor', 'Supporting Actress', 'Cinematographer'],
      team: [
        { name: 'Rajesh Kumar', role: 'Director' },
        { name: 'Priya Sharma', role: 'Producer' },
        { name: 'Vikram Singh', role: 'Writer' }
      ],
      rating: 4.5,
      applications: 24
    },
    {
      id: '2',
      title: 'Neon Nights',
      genre: 'Thriller',
      director: 'Aditya Kapoor',
      status: 'Production',
      budget: '₹5-10 Crore',
      timeline: '8 months',
      location: 'Delhi, India',
      description: 'A neo-noir thriller set in the underbelly of Delhi, following a detective investigating a series of mysterious disappearances.',
      poster: null,
      neededRoles: ['Supporting Actor', 'Stunt Coordinator'],
      team: [
        { name: 'Aditya Kapoor', role: 'Director' },
        { name: 'Meera Nair', role: 'Producer' }
      ],
      rating: 4.2,
      applications: 18
    },
    {
      id: '3',
      title: 'Coastal Dreams',
      genre: 'Romance',
      director: 'Arjun Reddy',
      status: 'Completed',
      budget: '₹1-2 Crore',
      timeline: '4 months',
      location: 'Goa, India',
      description: 'A romantic drama about two souls finding love on the serene beaches of Goa, exploring themes of destiny and second chances.',
      poster: null,
      neededRoles: [],
      team: [
        { name: 'Arjun Reddy', role: 'Director' },
        { name: 'Kavya Menon', role: 'Producer' }
      ],
      rating: 4.7,
      applications: 0
    }
  ];

  const handleApply = (projectTitle: string) => {
    toast({
      title: "Application submitted",
      description: `Your application for ${projectTitle} has been submitted successfully.`,
    });
  };

  const ProjectCard = ({ project }: { project: any }) => {
    const statusColors = {
      'Pre-Production': 'bg-yellow-100 text-yellow-800',
      'Production': 'bg-blue-100 text-blue-800',
      'Post-Production': 'bg-purple-100 text-purple-800',
      'Completed': 'bg-green-100 text-green-800'
    };

    return (
      <Card className="hover:shadow-lg transition-shadow border-orange-100">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                <Film className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <p className="text-gray-600">{project.genre} • {project.director}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(project.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({project.rating})</span>
                </div>
              </div>
            </div>
            <Badge className={statusColors[project.status as keyof typeof statusColors]}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4 text-sm">{project.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{project.budget}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{project.timeline}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>{project.applications} applicants</span>
            </div>
          </div>

          {project.neededRoles.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Needed Roles:</h4>
              <div className="flex flex-wrap gap-2">
                {project.neededRoles.map((role: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Team:</h4>
            <div className="flex -space-x-2">
              {project.team.slice(0, 3).map((member: any, index: number) => (
                <div key={index} className="relative group">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs">
                      {member.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {member.name} - {member.role}
                  </div>
                </div>
              ))}
              {project.team.length > 3 && (
                <div className="h-8 w-8 border-2 border-white rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button asChild variant="outline" className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50">
              <Link to={`/projects/${project.id}`}>
                <Play className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
            {project.neededRoles.length > 0 && (
              <Button 
                onClick={() => handleApply(project.title)}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                Apply Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesGenre = genreFilter === 'all' || project.genre === genreFilter;
    
    return matchesSearch && matchesStatus && matchesGenre;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Film Projects</h1>
            <p className="text-gray-600">Discover and join exciting film projects</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-orange-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pre-Production">Pre-Production</SelectItem>
              <SelectItem value="Production">Production</SelectItem>
              <SelectItem value="Post-Production">Post-Production</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="border-orange-200">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="Drama">Drama</SelectItem>
              <SelectItem value="Thriller">Thriller</SelectItem>
              <SelectItem value="Romance">Romance</SelectItem>
              <SelectItem value="Comedy">Comedy</SelectItem>
              <SelectItem value="Action">Action</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
            <Film className="h-4 w-4 mr-2" />
            My Projects
          </Button>
        </div>

        {/* Projects Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-orange-50 mb-6">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              All ({filteredProjects.length})
            </TabsTrigger>
            <TabsTrigger 
              value="pre-production"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Pre-Production
            </TabsTrigger>
            <TabsTrigger 
              value="production"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Production
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pre-production" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.filter(p => p.status === 'Pre-Production').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="production" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.filter(p => p.status === 'Production').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.filter(p => p.status === 'Completed').map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
