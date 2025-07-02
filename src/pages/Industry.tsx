
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, DollarSign, Users, Film, Search, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Industry = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const { toast } = useToast();

  const castingCalls = [
    {
      id: '1',
      title: 'Lead Actor for Independent Drama',
      project: 'Mumbai Stories',
      director: 'Rajesh Kumar',
      role: 'Lead Actor',
      location: 'Mumbai, India',
      pay: 'Paid',
      deadline: '2024-08-15',
      description: 'Seeking experienced actor for lead role in independent drama film.',
      requirements: ['Age 25-35', 'Previous film experience', 'Mumbai based'],
      type: 'casting'
    },
    {
      id: '2',
      title: 'Cinematographer Needed',
      project: 'Neon Nights',
      director: 'Priya Sharma',
      role: 'Cinematographer',
      location: 'Delhi, India',
      pay: 'Negotiable',
      deadline: '2024-08-20',
      description: 'Looking for creative cinematographer for neo-noir thriller.',
      requirements: ['5+ years experience', 'Own equipment preferred', 'Available full-time'],
      type: 'crew'
    },
    {
      id: '3',
      title: 'Supporting Actress',
      project: 'Coastal Dreams',
      director: 'Vikram Singh',
      role: 'Supporting Actress',
      location: 'Goa, India',
      pay: 'Paid',
      deadline: '2024-08-25',
      description: 'Seeking talented actress for supporting role in romantic drama.',
      requirements: ['Age 20-28', 'Good dancing skills', 'Comfortable with water scenes'],
      type: 'casting'
    }
  ];

  const jobOpportunities = [
    {
      id: '4',
      title: 'Post-Production Supervisor',
      company: 'Dream Films Studio',
      location: 'Chennai, India',
      type: 'Full-time',
      salary: '₹8-12 LPA',
      posted: '2 days ago',
      description: 'Oversee post-production workflow for multiple film projects.',
      requirements: ['3+ years experience', 'Avid/Premiere Pro', 'Team management skills']
    },
    {
      id: '5',
      title: 'Script Supervisor',
      company: 'Bollywood Productions',
      location: 'Mumbai, India',
      type: 'Contract',
      salary: '₹50,000/month',
      posted: '1 week ago',
      description: 'Maintain script continuity during filming.',
      requirements: ['Film school graduate', 'Attention to detail', 'Previous experience preferred']
    }
  ];

  const handleApply = (title: string, type: string) => {
    toast({
      title: "Application submitted",
      description: `Your application for ${title} has been submitted successfully.`,
    });
  };

  const CastingCard = ({ casting }: { casting: any }) => (
    <Card className="hover:shadow-lg transition-shadow border-orange-100">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{casting.title}</CardTitle>
            <p className="text-sm text-gray-600">{casting.project} • {casting.director}</p>
          </div>
          <Badge variant={casting.pay === 'Paid' ? 'default' : 'secondary'}>
            {casting.pay}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-2" />
            <span>{casting.role}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{casting.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Apply by {casting.deadline}</span>
          </div>
          <p className="text-sm text-gray-700">{casting.description}</p>
          <div className="flex flex-wrap gap-2">
            {casting.requirements.map((req: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>
          <Button 
            onClick={() => handleApply(casting.title, 'casting call')}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const JobCard = ({ job }: { job: any }) => (
    <Card className="hover:shadow-lg transition-shadow border-orange-100">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
          <Badge variant="outline">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Posted {job.posted}</span>
          </div>
          <p className="text-sm text-gray-700">{job.description}</p>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>
          <Button 
            onClick={() => handleApply(job.title, 'job')}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Industry Opportunities</h1>
          <p className="text-gray-600">Discover casting calls, job opportunities, and career growth in film</p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-500"
            />
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="border-orange-200">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="border-orange-200">
              <SelectValue placeholder="Role/Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actor">Actor</SelectItem>
              <SelectItem value="director">Director</SelectItem>
              <SelectItem value="cinematographer">Cinematographer</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
            <Film className="h-4 w-4 mr-2" />
            Create Posting
          </Button>
        </div>

        <Tabs defaultValue="casting" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-orange-50">
            <TabsTrigger 
              value="casting" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Casting Calls ({castingCalls.length})
            </TabsTrigger>
            <TabsTrigger 
              value="jobs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              Job Opportunities ({jobOpportunities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="casting" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {castingCalls.map((casting) => (
                <CastingCard key={casting.id} casting={casting} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobOpportunities.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Industry;
