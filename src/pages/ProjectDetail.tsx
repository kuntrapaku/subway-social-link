
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Film, Calendar, MapPin, DollarSign, Users, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock project data - in real app, this would come from API
  const project = {
    id: '1',
    title: 'Mumbai Stories',
    genre: 'Drama',
    director: 'Rajesh Kumar',
    status: 'Pre-Production',
    budget: '₹2-5 Crore',
    timeline: '6 months',
    location: 'Mumbai, India',
    description: 'An anthology of interconnected stories from the streets of Mumbai, exploring the dreams and struggles of ordinary people. Each story is a window into a different aspect of life in this vibrant metropolis, from the high-rise boardrooms to the bustling street markets.',
    fullDescription: 'Mumbai Stories is an ambitious anthology film that weaves together multiple narratives set against the backdrop of India\'s financial capital. The film explores themes of ambition, love, loss, and redemption through the eyes of diverse characters whose lives intersect in unexpected ways. From a taxi driver with dreams of becoming a singer to a corporate executive questioning her life choices, each story contributes to a larger tapestry that celebrates the human spirit.',
    poster: null,
    neededRoles: ['Lead Actor', 'Supporting Actress', 'Cinematographer'],
    team: [
      { name: 'Rajesh Kumar', role: 'Director', experience: '10+ years', image: null },
      { name: 'Priya Sharma', role: 'Producer', experience: '8 years', image: null },
      { name: 'Vikram Singh', role: 'Writer', experience: '5 years', image: null },
      { name: 'Arjun Reddy', role: 'Music Director', experience: '12 years', image: null }
    ],
    rating: 4.5,
    applications: 24,
    requirements: {
      'Lead Actor': {
        description: 'Male lead, age 28-35, experience in dramatic roles',
        skills: ['Acting', 'Hindi/English fluency', 'Physical fitness'],
        compensation: '₹15-25 Lakhs'
      },
      'Supporting Actress': {
        description: 'Female supporting role, age 22-30, Mumbai-based preferred',
        skills: ['Acting', 'Dance background preferred', 'Versatile performer'],
        compensation: '₹5-10 Lakhs'
      },
      'Cinematographer': {
        description: 'Experienced DP with indie film background',
        skills: ['Camera operation', 'Lighting', 'Visual storytelling'],
        compensation: '₹8-15 Lakhs'
      }
    }
  };

  const handleApply = (role: string) => {
    toast({
      title: "Application submitted",
      description: `Your application for ${role} in ${project.title} has been submitted successfully.`,
    });
  };

  const handleBack = () => {
    navigate('/projects');
  };

  const statusColors = {
    'Pre-Production': 'bg-yellow-100 text-yellow-800',
    'Production': 'bg-blue-100 text-blue-800',
    'Post-Production': 'bg-purple-100 text-purple-800',
    'Completed': 'bg-green-100 text-green-800'
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Project Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6 border-orange-100">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                      <Film className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <p className="text-gray-600 text-lg">{project.genre} • Directed by {project.director}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(project.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-gray-600">({project.rating}) • {project.applications} applications</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Budget: {project.budget}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Timeline: {project.timeline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>Location: {project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>Team: {project.team.length} members</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <p className="text-gray-700">{project.fullDescription}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="roles" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-orange-50">
                <TabsTrigger 
                  value="roles" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
                >
                  Open Roles ({project.neededRoles.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="team"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
                >
                  Team ({project.team.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="roles" className="mt-6">
                <div className="space-y-4">
                  {project.neededRoles.map((role) => (
                    <Card key={role} className="border-orange-100">
                      <CardHeader>
                        <CardTitle className="text-lg">{role}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{project.requirements[role as keyof typeof project.requirements].description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.requirements[role as keyof typeof project.requirements].skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <strong>Compensation:</strong> {project.requirements[role as keyof typeof project.requirements].compensation}
                          </div>
                          <Button 
                            onClick={() => handleApply(role)}
                            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                          >
                            Apply for {role}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.team.map((member, index) => (
                    <Card key={index} className="border-orange-100">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.image} />
                            <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <p className="text-xs text-gray-500">{member.experience}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-orange-100 mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  Express Interest
                </Button>
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  Save Project
                </Button>
                <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                  Share Project
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle>Project Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Applications</span>
                    <span className="font-semibold">{project.applications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Open Roles</span>
                    <span className="font-semibold">{project.neededRoles.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-semibold">{project.team.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Rating</span>
                    <span className="font-semibold">{project.rating}/5</span>
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
