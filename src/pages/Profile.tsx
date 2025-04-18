
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, BookOpen, Star, Award, Edit, Settings, FileText, Clock, MapPin, Mail, Phone, Globe, Bookmark, CheckCircle, School, Plus, Trash, Camera } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ResumeUpload from '@/components/ResumeUpload';
import BookmarkButton from '@/components/BookmarkButton';
import { setupScrollAnimations } from '@/utils/animationUtils';

// Mock user data
const userData = {
  name: "Alex Johnson",
  title: "UX/UI Designer",
  location: "San Francisco, CA",
  email: "alex.johnson@example.com",
  phone: "(555) 123-4567",
  website: "alexjohnson.design",
  about: "Passionate UX/UI designer with 5+ years of experience creating user-centered digital experiences for various industries. Proficient in design thinking, user research, wireframing, prototyping, and usability testing.",
  experience: [
    {
      id: 1,
      role: "Senior UX Designer",
      company: "TechVision Inc.",
      period: "2023 - Present",
      description: "Lead UX design for enterprise software products, conducting user research and creating wireframes, prototypes, and user interfaces."
    },
    {
      id: 2,
      role: "UI Designer",
      company: "Creative Solutions Agency",
      period: "2020 - 2023",
      description: "Designed user interfaces for web and mobile applications across various client projects, collaborating with development teams."
    },
    {
      id: 3,
      role: "Junior Designer",
      company: "StartUp Innovations",
      period: "2018 - 2020",
      description: "Created visual designs for digital products and assisted with user research and usability testing."
    }
  ],
  education: [
    {
      id: 1,
      degree: "Master of Design",
      school: "California Institute of Design",
      period: "2016 - 2018",
      description: "Focused on interaction design and user experience research."
    },
    {
      id: 2,
      degree: "Bachelor of Fine Arts",
      school: "University of Creative Arts",
      period: "2012 - 2016",
      description: "Major in Digital Media and Minor in Psychology."
    }
  ],
  skills: [
    { name: "UI Design", level: 95 },
    { name: "Figma", level: 90 },
    { name: "User Research", level: 85 },
    { name: "Wireframing", level: 90 },
    { name: "Prototyping", level: 88 },
    { name: "HTML/CSS", level: 75 },
    { name: "JavaScript", level: 60 },
    { name: "Adobe Creative Suite", level: 85 }
  ],
  savedJobs: [
    {
      id: 1,
      title: "UX/UI Designer",
      company: "InnovateTech",
      location: "San Francisco, CA",
      posted: "2 days ago",
      status: "Applied"
    },
    {
      id: 2,
      title: "Senior Product Designer",
      company: "DesignHub Agency",
      location: "Remote",
      posted: "1 week ago",
      status: "Saved"
    },
    {
      id: 3,
      title: "Interaction Designer",
      company: "CreativeWorks Studio",
      location: "New York, NY",
      posted: "3 days ago",
      status: "Interview"
    }
  ]
};

const Profile = () => {
  const [profileProgress, setProfileProgress] = useState(85);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(userData);
  
  useEffect(() => {
    const cleanup = setupScrollAnimations();
    return cleanup;
  }, []);

  // Handler for form fields changes
  const handleInputChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handleSaveProfile = () => {
    setIsEditMode(false);
    // In a real app, you would save the data to your backend here
    console.log('Saving profile data:', profileData);
  };

  const handleFileUpload = (file: File) => {
    console.log('Resume uploaded:', file.name);
    // In a real app, you would upload the file to your backend or storage service
  };
  
  return (
    <MainLayout>
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-purple text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt={profileData.name} />
                <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{profileData.name}</h1>
              <p className="text-xl opacity-90 mb-2">{profileData.title}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{profileData.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 ml-auto md:self-start">
              <Button 
                variant={isEditMode ? "default" : "outline"} 
                className={isEditMode ? "bg-white text-brand-blue hover:bg-gray-100" : "bg-transparent border-white hover:bg-white hover:text-brand-blue"}
                onClick={() => isEditMode ? handleSaveProfile() : setIsEditMode(true)}
              >
                {isEditMode ? (
                  <>Save Profile</>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
              <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-blue">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Completion */}
      <div className="bg-white border-b">
        <div className="container px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-grow">
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Profile Completion</span>
                <span>{profileProgress}%</span>
              </div>
              <Progress value={profileProgress} className="h-2" />
            </div>
            <Button variant="outline" size="sm">Complete Profile</Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* About Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>About</CardTitle>
                {isEditMode && <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>}
              </CardHeader>
              <CardContent>
                {isEditMode ? (
                  <Textarea 
                    value={profileData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    className="mb-4"
                    rows={5}
                  />
                ) : (
                  <p className="text-gray-600">{profileData.about}</p>
                )}
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  {isEditMode ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{profileData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{profileData.website}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Skills Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Skills</CardTitle>
                {isEditMode && <Button variant="ghost" size="sm"><Plus className="h-4 w-4" /></Button>}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Skills
                </Button>
              </CardFooter>
            </Card>

            {/* Resume Upload Card */}
            <ResumeUpload onFileUpload={handleFileUpload} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Tabs defaultValue="experience">
              <TabsList className="mb-4">
                <TabsTrigger value="experience" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Education</span>
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span>Saved Jobs</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Experience Tab */}
              <TabsContent value="experience" className="m-0">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Work Experience</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {profileData.experience.map((exp) => (
                        <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200 pb-6 last:pb-0">
                          <div className="absolute w-4 h-4 bg-brand-blue rounded-full -left-[9px] top-0" />
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{exp.role}</h3>
                              <p className="text-brand-blue">{exp.company}</p>
                            </div>
                            <Badge variant="outline" className="md:self-start whitespace-nowrap">
                              <Clock className="h-3 w-3 mr-1" />
                              {exp.period}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{exp.description}</p>
                          {isEditMode && (
                            <div className="flex gap-2 mt-2">
                              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Trash className="h-4 w-4" /></Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Education Tab */}
              <TabsContent value="education" className="m-0">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Education</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {profileData.education.map((edu) => (
                        <div key={edu.id} className="relative pl-6 border-l-2 border-gray-200 pb-6 last:pb-0">
                          <div className="absolute w-4 h-4 bg-brand-purple rounded-full -left-[9px] top-0" />
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{edu.degree}</h3>
                              <p className="text-brand-purple flex items-center">
                                <School className="h-4 w-4 mr-1" />
                                {edu.school}
                              </p>
                            </div>
                            <Badge variant="outline" className="md:self-start whitespace-nowrap">
                              <Clock className="h-3 w-3 mr-1" />
                              {edu.period}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{edu.description}</p>
                          {isEditMode && (
                            <div className="flex gap-2 mt-2">
                              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Trash className="h-4 w-4" /></Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Saved Jobs Tab */}
              <TabsContent value="saved" className="m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved & Applied Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profileData.savedJobs.map((job) => (
                        <div key={job.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{job.location}</span>
                              <span className="mx-2">•</span>
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={
                              job.status === "Applied" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                              job.status === "Interview" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }>
                              {job.status === "Applied" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {job.status}
                            </Badge>
                            <BookmarkButton 
                              jobId={job.id} 
                              initialBookmarked={true} 
                              size="sm" 
                              variant="ghost"
                              showText={false}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Jobs</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Suggestions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your profile and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-lightblue p-2 rounded-lg">
                        <Briefcase className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Senior UX Designer</h3>
                        <p className="text-sm text-gray-600">TechInnovate Corp • San Francisco</p>
                        <Button variant="link" className="p-0 h-auto text-brand-blue">View Job</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-brand-lightpurple p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-brand-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold">UX Research Workshop</h3>
                        <p className="text-sm text-gray-600">Online • Next Week</p>
                        <Button variant="link" className="p-0 h-auto text-brand-purple">Learn More</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">UI Design Skills Assessment</h3>
                        <p className="text-sm text-gray-600">Evaluate your design skills</p>
                        <Button variant="link" className="p-0 h-auto text-green-600">Take Assessment</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Figma Advanced Certification</h3>
                        <p className="text-sm text-gray-600">Boost your credentials</p>
                        <Button variant="link" className="p-0 h-auto text-amber-600">Learn More</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
