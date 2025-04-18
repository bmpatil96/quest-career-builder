
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, Download, ExternalLink, Clock, Bookmark } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Mock resources data
const articles = [
  {
    id: 1,
    title: "How to Write a Resume That Stands Out",
    type: "Article",
    category: "Resume",
    description: "Learn the key elements of a modern resume and how to highlight your achievements effectively.",
    readTime: "8 min read",
    date: "Apr 15, 2025",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Mastering the Art of Salary Negotiation",
    type: "Article",
    category: "Career Growth",
    description: "Effective strategies to negotiate your salary with confidence and secure the compensation you deserve.",
    readTime: "12 min read",
    date: "Apr 10, 2025",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Navigating Career Transitions Successfully",
    type: "Article",
    category: "Career Change",
    description: "A comprehensive guide to making smooth career transitions, including skills assessment and industry research.",
    readTime: "15 min read",
    date: "Apr 5, 2025",
    image: "https://images.unsplash.com/photo-1494178270175-e96de6971df1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Building Your Personal Brand Online",
    type: "Article",
    category: "Personal Branding",
    description: "How to develop and maintain a strong professional presence online to attract career opportunities.",
    readTime: "10 min read",
    date: "Mar 28, 2025",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const templates = [
  {
    id: 1,
    title: "Modern Professional Resume Template",
    type: "Template",
    category: "Resume",
    description: "A clean, professional resume template designed to highlight your skills and experience effectively.",
    format: "DOCX, PDF",
    downloads: "2.5k"
  },
  {
    id: 2,
    title: "Creative Cover Letter Template",
    type: "Template",
    category: "Cover Letter",
    description: "Stand out with this creative yet professional cover letter template that showcases your personality.",
    format: "DOCX, PDF",
    downloads: "1.8k"
  },
  {
    id: 3,
    title: "Interview Thank You Email Template",
    type: "Template",
    category: "Interview",
    description: "A well-crafted thank you email template to send after job interviews to leave a positive impression.",
    format: "DOCX, TXT",
    downloads: "3.2k"
  },
  {
    id: 4,
    title: "Job Application Tracker Spreadsheet",
    type: "Template",
    category: "Organization",
    description: "Keep track of your job applications, interviews, and follow-ups with this comprehensive spreadsheet.",
    format: "XLSX, Google Sheets",
    downloads: "5.1k"
  }
];

const videos = [
  {
    id: 1,
    title: "Ace Your Next Job Interview: Expert Tips and Techniques",
    type: "Video",
    category: "Interview",
    description: "Learn proven strategies and techniques to perform your best in job interviews from career experts.",
    duration: "22 minutes",
    date: "Apr 12, 2025",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "LinkedIn Profile Optimization Workshop",
    type: "Video",
    category: "Personal Branding",
    description: "A step-by-step guide to creating an attention-grabbing LinkedIn profile that attracts recruiters.",
    duration: "35 minutes",
    date: "Apr 8, 2025",
    thumbnail: "https://images.unsplash.com/photo-1554774853-719586f82d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Remote Work Success Strategies",
    type: "Video",
    category: "Work-Life Balance",
    description: "Tips and best practices for thriving in remote work environments and maintaining productivity.",
    duration: "18 minutes",
    date: "Mar 25, 2025",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Networking Strategies for Career Growth",
    type: "Video",
    category: "Networking",
    description: "How to build and leverage professional relationships to advance your career and find opportunities.",
    duration: "28 minutes",
    date: "Mar 18, 2025",
    thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const popularCategories = [
  { name: "Resume Writing", count: 15, icon: <FileText className="h-5 w-5" /> },
  { name: "Interview Prep", count: 23, icon: <Video className="h-5 w-5" /> },
  { name: "Career Change", count: 18, icon: <BookOpen className="h-5 w-5" /> },
  { name: "Networking", count: 12, icon: <BookOpen className="h-5 w-5" /> },
  { name: "Salary Negotiation", count: 9, icon: <BookOpen className="h-5 w-5" /> },
  { name: "Personal Branding", count: 14, icon: <BookOpen className="h-5 w-5" /> },
];

const Resources = () => {
  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-brand-purple text-white py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Career Development Resources</h1>
            <p className="text-lg md:text-xl opacity-90 mb-4">
              Tools, guides, and expert advice to help you navigate your career journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Resources Content Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {popularCategories.map((category, index) => (
                      <Button key={index} variant="ghost" className="w-full justify-start">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                          <Badge variant="secondary" className="ml-auto">{category.count}</Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Categories</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Career Assessment</CardTitle>
                  <CardDescription>Discover your strengths and ideal career paths.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-brand-lightpurple rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-700 mb-4">Take our free career assessment to get personalized insights and recommendations.</p>
                    <Button>Start Assessment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="articles">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="articles" className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>Articles</span>
                    </TabsTrigger>
                    <TabsTrigger value="templates" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>Templates</span>
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>Videos</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <Button variant="ghost" className="hidden md:flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    <span>Saved Resources</span>
                  </Button>
                </div>
                
                {/* Articles Tab */}
                <TabsContent value="articles" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                      <Card key={article.id} className="card-hover overflow-hidden">
                        <div className="aspect-video relative">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex gap-2 mb-2">
                            <Badge className="bg-brand-blue hover:bg-brand-blue">{article.category}</Badge>
                            <Badge variant="outline">{article.type}</Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                          <p className="text-gray-600 mb-4">{article.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{article.readTime}</span>
                            <span className="mx-2">•</span>
                            <span>{article.date}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 border-t p-4">
                          <Button className="w-full">Read Article</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Templates Tab */}
                <TabsContent value="templates" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templates.map((template) => (
                      <Card key={template.id} className="card-hover">
                        <CardContent className="p-6">
                          <div className="flex gap-2 mb-2">
                            <Badge className="bg-brand-purple hover:bg-brand-purple">{template.category}</Badge>
                            <Badge variant="outline">{template.type}</Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                          <p className="text-gray-600 mb-4">{template.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Format: {template.format}</span>
                            <span>{template.downloads} downloads</span>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 border-t p-4">
                          <Button className="w-full flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" />
                            <span>Download Template</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Videos Tab */}
                <TabsContent value="videos" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video) => (
                      <Card key={video.id} className="card-hover overflow-hidden">
                        <div className="aspect-video relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-brand-blue border-b-8 border-b-transparent ml-1"></div>
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white rounded px-2 py-1 text-xs">
                            {video.duration}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex gap-2 mb-2">
                            <Badge className="bg-brand-blue hover:bg-brand-blue">{video.category}</Badge>
                            <Badge variant="outline">{video.type}</Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                          <p className="text-gray-600 mb-4">{video.description}</p>
                          <div className="text-sm text-gray-500">
                            <span>{video.date}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 border-t p-4">
                          <Button className="w-full flex items-center justify-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            <span>Watch Video</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">Load More Resources</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Career Tips</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive the latest career resources, job search tips, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Resources;
