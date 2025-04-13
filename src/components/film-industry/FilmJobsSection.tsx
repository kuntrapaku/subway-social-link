
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clapperboard, MapPin, Calendar, DollarSign, Users, Star } from "lucide-react";

interface FilmJobsSectionProps {
  activeCategory: string;
}

export const FilmJobsSection: React.FC<FilmJobsSectionProps> = ({ activeCategory }) => {
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Assistant Director",
      project: "The Last Horizon",
      location: "Los Angeles, CA",
      date: "Starting May 15, 2025",
      duration: "3 months",
      compensation: "$4,500/week",
      category: "crew",
      featured: true,
      description: "Looking for an experienced Assistant Director for our new sci-fi feature film. Must have at least 3 years of experience and be available for pre-production meetings.",
    },
    {
      id: 2,
      title: "Sound Designer",
      project: "Whispers in the Dark",
      location: "New York, NY",
      date: "Starting June 1, 2025",
      duration: "1 month",
      compensation: "$3,800/week",
      category: "sound",
      featured: false,
      description: "Indie horror film seeking a creative sound designer to create atmospheric and tension-building sound effects. Experience in horror genre preferred.",
    },
    {
      id: 3,
      title: "Location Scout",
      project: "Cityscape Chronicles",
      location: "Chicago, IL",
      date: "Immediate",
      duration: "2 weeks",
      compensation: "$2,500/week",
      category: "locations",
      featured: false,
      description: "Urban drama needs a location scout familiar with Chicago's diverse neighborhoods. Must have local connections and permit experience.",
    },
    {
      id: 4,
      title: "Camera Operator",
      project: "Natural Wonders",
      location: "Vancouver, Canada",
      date: "Starting July 10, 2025",
      duration: "6 weeks",
      compensation: "$3,200/week",
      category: "equipment",
      featured: true,
      description: "Documentary series seeking experienced camera operator with RED camera expertise. Must be comfortable in various outdoor environments.",
    },
  ];

  const filteredJobs = activeCategory === "all" 
    ? jobs 
    : jobs.filter(job => job.category === activeCategory);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredJobs.map((job) => (
        <Card key={job.id} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${job.featured ? 'border-l-4 border-l-subway-600' : ''}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                <CardDescription className="text-sm">{job.project}</CardDescription>
              </div>
              {job.featured && (
                <Badge variant="default" className="bg-subway-600">
                  <Star className="mr-1 h-3 w-3" /> Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="mb-4 text-gray-700">{job.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-4 w-4 text-subway-500" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4 text-subway-500" />
                {job.date}
              </div>
              <div className="flex items-center text-gray-600">
                <Clapperboard className="mr-2 h-4 w-4 text-subway-500" />
                {job.duration}
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="mr-2 h-4 w-4 text-subway-500" />
                {job.compensation}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" size="sm" className="text-subway-600 hover:bg-subway-50 hover:text-subway-700">
              Save Job
            </Button>
            <Button size="sm" className="bg-subway-600 hover:bg-subway-700">
              Apply Now
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {filteredJobs.length === 0 && (
        <div className="col-span-2 rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No jobs matching '{activeCategory}' category are currently available.
          </p>
        </div>
      )}
    </div>
  );
};
