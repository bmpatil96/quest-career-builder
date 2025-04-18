
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, DollarSign, Clock, CalendarDays, Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import BookmarkButton from '@/components/BookmarkButton';
import Notifications from '@/components/Notifications';
import { setupScrollAnimations } from '@/utils/animationUtils';

// Mock job data
const jobListings = [
  {
    id: 1,
    title: "Front-End Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    description: "We're looking for an experienced Front-End Developer to join our team. You'll be responsible for building user interfaces using React, TypeScript, and modern CSS frameworks.",
    tags: ["React", "TypeScript", "CSS", "JavaScript"]
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateSoft",
    location: "New York, NY",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "1 week ago",
    description: "Join our product team to lead the development of innovative software solutions. You'll work closely with designers, developers, and stakeholders to deliver exceptional products.",
    tags: ["Product Management", "Agile", "User Research", "Roadmapping"]
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub Agency",
    location: "Remote",
    salary: "$80,000 - $100,000",
    type: "Contract",
    posted: "3 days ago",
    description: "We're seeking a creative UX/UI Designer to create intuitive and engaging digital experiences. You'll collaborate with our team on projects for various clients.",
    tags: ["Figma", "User Research", "Wireframing", "Prototyping"]
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataInsights Corp",
    location: "Chicago, IL",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "Just now",
    description: "Looking for a Data Scientist to help us analyze large datasets and extract valuable insights. Experience with machine learning and statistical analysis required.",
    tags: ["Python", "Machine Learning", "SQL", "Data Analysis"]
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "GrowthMarketing",
    location: "Austin, TX",
    salary: "$65,000 - $85,000",
    type: "Full-time",
    posted: "5 days ago",
    description: "Join our marketing team to develop and implement effective marketing strategies. You'll work on digital campaigns, content creation, and social media management.",
    tags: ["Digital Marketing", "Content Strategy", "Social Media", "Analytics"]
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Seattle, WA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "1 day ago",
    description: "We're looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and CI/CD pipelines is required.",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"]
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);
  
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  // Handle job bookmark change
  const handleBookmarkChange = (jobId: number | string, isBookmarked: boolean) => {
    if (isBookmarked) {
      setBookmarkedJobs(prev => [...prev, Number(jobId)]);
    } else {
      setBookmarkedJobs(prev => prev.filter(id => id !== Number(jobId)));
    }
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType ? job.type === filterType : true;
    const matchesLocation = filterLocation ? job.location.includes(filterLocation) : true;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-brand-blue text-white py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll opacity-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Browse through thousands of job listings to find the perfect opportunity for your career.
            </p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 animate-on-scroll opacity-0 animate-delay-100">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text" 
                  placeholder="Job title, keyword, or company" 
                  className="pl-10 border-0 shadow-none focus-visible:ring-0" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="w-full md:w-auto" size="lg">
                Search Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Job Listings Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 animate-on-scroll opacity-0">
              <Card>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Job Type</label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Select value={filterLocation} onValueChange={setFilterLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Locations</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Austin">Austin</SelectItem>
                        <SelectItem value="Seattle">Seattle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Salary Range</label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="All Ranges" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-ranges">All Ranges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience Level</label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {
                    setSearchTerm('');
                    setFilterType('');
                    setFilterLocation('');
                  }}>
                    Reset Filters
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6 animate-on-scroll opacity-0">
                <h2 className="text-2xl font-bold">
                  {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
                </h2>
                <Select disabled>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by: Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job, index) => (
                    <Card key={job.id} className="card-hover animate-on-scroll opacity-0" style={{animationDelay: `${index * 100}ms`}}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <Badge className={
                            job.type === "Full-time" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            job.type === "Contract" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                            job.type === "Part-time" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                            "bg-purple-100 text-purple-800 hover:bg-purple-100"
                          }>
                            {job.type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            {job.salary}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            Posted {job.posted}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="bg-gray-50 border-t p-4 flex justify-between">
                        <BookmarkButton 
                          jobId={job.id} 
                          initialBookmarked={bookmarkedJobs.includes(job.id)}
                          onBookmarkChange={(isBookmarked) => handleBookmarkChange(job.id, isBookmarked)}
                        />
                        <Button size="sm">Apply Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border animate-on-scroll opacity-0">
                  <div className="mb-4">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setFilterType('');
                    setFilterLocation('');
                  }}>
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Jobs;
