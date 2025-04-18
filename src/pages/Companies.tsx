
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Users, Search, Briefcase, Globe, Clock, ChevronRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setupScrollAnimations } from '@/utils/animationUtils';
import { useEffect } from 'react';

// Mock company data
const companyData = [
  {
    id: 1,
    name: "TechCorp Inc.",
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    industry: "Technology",
    location: "San Francisco, CA",
    size: "500-1000 employees",
    description: "Leading technology company specializing in software development and cloud services. TechCorp aims to innovate and transform the digital landscape with cutting-edge solutions.",
    founded: "2008",
    website: "techcorp.example.com",
    openPositions: 12,
    benefits: ["Remote Work", "Health Insurance", "401(k)", "Flexible Hours", "Professional Development"],
    featured: true
  },
  {
    id: 2,
    name: "CreativeDesign Studio",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    industry: "Design",
    location: "New York, NY",
    size: "50-200 employees",
    description: "Design studio focused on creating memorable brand experiences. We combine art and technology to deliver exceptional design solutions for global clients.",
    founded: "2015",
    website: "creativedesign.example.com",
    openPositions: 5,
    benefits: ["Creative Environment", "Health Benefits", "Team Events", "Learning Budget"],
    featured: true
  },
  {
    id: 3,
    name: "FinTech Solutions",
    logo: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    industry: "Finance",
    location: "Chicago, IL",
    size: "200-500 employees",
    description: "Innovative financial technology company revolutionizing the way people and businesses manage their finances through smart, accessible solutions.",
    founded: "2011",
    website: "fintechsolutions.example.com",
    openPositions: 8,
    benefits: ["Competitive Salary", "Health & Dental", "Parental Leave", "Stock Options"],
    featured: false
  },
  {
    id: 4,
    name: "GreenEco Innovations",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    industry: "Sustainability",
    location: "Portland, OR",
    size: "50-200 employees",
    description: "Sustainable product company committed to creating eco-friendly solutions. We believe in business as a force for good and environmental stewardship.",
    founded: "2016",
    website: "greeneco.example.com",
    openPositions: 3,
    benefits: ["Sustainable Workplace", "Volunteer Time", "Health Insurance", "Eco-Bonus"],
    featured: false
  },
  {
    id: 5,
    name: "DataInsights Corp",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    industry: "Data Analytics",
    location: "Boston, MA",
    size: "200-500 employees",
    description: "Data analytics company specializing in turning complex data into actionable insights. We help businesses make smarter decisions through data.",
    founded: "2013",
    website: "datainsights.example.com",
    openPositions: 6,
    benefits: ["Flexible Work", "Health Coverage", "Continuing Education", "International Offices"],
    featured: true
  },
  {
    id: 6,
    name: "HealthTech Innovations",
    logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    industry: "Healthcare",
    location: "Austin, TX",
    size: "50-200 employees",
    description: "Healthcare technology company focused on improving patient outcomes and healthcare delivery through innovative digital solutions.",
    founded: "2017",
    website: "healthtech.example.com",
    openPositions: 4,
    benefits: ["Medical Benefits", "Work-Life Balance", "Professional Growth", "Innovation Days"],
    featured: false
  }
];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  // Filter companies based on search term and industry filter
  const filteredCompanies = companyData.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'all' ? true : company.industry.toLowerCase() === selectedIndustry.toLowerCase();
    
    return matchesSearch && matchesIndustry;
  });

  // Get unique industries for filter
  const industries = ['all', ...new Set(companyData.map(company => company.industry.toLowerCase()))];

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple text-white py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0">Discover Great Companies</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 animate-on-scroll opacity-0 animate-delay-100">
              Find companies that align with your values and career goals
            </p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2 animate-on-scroll opacity-0 animate-delay-200">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text" 
                  placeholder="Search by company name or industry" 
                  className="pl-10 border-0 shadow-none focus-visible:ring-0" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="w-full md:w-auto" size="lg">
                Search Companies
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Companies List Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          {/* Industry Filter */}
          <div className="mb-8 animate-on-scroll opacity-0">
            <Tabs 
              defaultValue="all" 
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
              className="w-full"
            >
              <TabsList className="flex flex-wrap w-full justify-start h-auto bg-transparent p-0 gap-2">
                {industries.map((industry, index) => (
                  <TabsTrigger 
                    key={index}
                    value={industry}
                    className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full"
                  >
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Featured Companies */}
          <div className="mb-12 animate-on-scroll opacity-0">
            <h2 className="text-2xl font-bold mb-6">Featured Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companyData
                .filter(company => company.featured)
                .map((company) => (
                  <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
                        <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-start">
                        <span>{company.name}</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-600">
                          {company.industry}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-center text-gray-500 mb-1 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{company.size}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {company.description}
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{company.openPositions} open positions</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button className="w-full" variant="outline">
                        View Company
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
          
          {/* All Companies */}
          <div className="animate-on-scroll opacity-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                All Companies
                <span className="ml-2 text-gray-500 text-lg font-normal">
                  ({filteredCompanies.length})
                </span>
              </h2>
            </div>
            
            {filteredCompanies.length > 0 ? (
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="overflow-hidden card-hover">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center justify-center md:justify-start">
                          <Avatar className="h-20 w-20 md:h-24 md:w-24">
                            <AvatarImage src={company.logo} alt={company.name} className="object-cover" />
                            <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold">{company.name}</h3>
                              <Badge variant="outline" className="mt-1 md:mt-0 bg-blue-50 text-blue-600">
                                {company.industry}
                              </Badge>
                            </div>
                            <div className="hidden md:flex">
                              <Button variant="outline" className="mr-2">View Jobs</Button>
                              <Button>View Company</Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {company.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              {company.size}
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-gray-400" />
                              {company.website}
                            </div>
                            <div className="flex items-center md:col-span-2">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              Founded in {company.founded}
                            </div>
                            <div className="flex items-center text-primary font-medium">
                              <Briefcase className="h-4 w-4 mr-2" />
                              {company.openPositions} open positions
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {company.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="md:hidden flex mt-4">
                            <Button variant="outline" className="flex-1 mr-2">View Jobs</Button>
                            <Button className="flex-1">View Company</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <div className="mb-4">
                  <Building className="h-12 w-12 mx-auto text-gray-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">No companies found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('all');
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Join as a Company CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-r from-slate-100 to-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Are you hiring?</h2>
                <p className="text-gray-600 mb-6">
                  Join CareerQuest to showcase your company and connect with top talent. Post job listings and build your employer brand.
                </p>
                <Button size="lg" className="px-6">
                  Create Company Profile <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="hidden md:block md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Business team" 
                  className="rounded-lg object-cover h-64 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Companies;
