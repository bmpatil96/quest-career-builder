
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, BookOpen, Search, TrendingUp, Award, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  useEffect(() => {
    // Add animation classes to elements as they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  const features = [
    {
      icon: <Search className="h-10 w-10 text-brand-blue" />,
      title: "Job Search",
      description: "Find opportunities that match your skills and experience from thousands of listings."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-brand-purple" />,
      title: "Career Guidance",
      description: "Get personalized advice and insights to help you navigate your career path."
    },
    {
      icon: <Award className="h-10 w-10 text-brand-blue" />,
      title: "Skill Assessment",
      description: "Evaluate your abilities and identify areas for growth and development."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "CareerQuest helped me discover opportunities I wouldn't have found otherwise. The resources section was particularly helpful for interview preparation."
    },
    {
      name: "Michael Chen",
      role: "Marketing Specialist",
      content: "The career guidance tools gave me clarity on my next steps. I was able to pivot into a new role that better aligned with my long-term goals."
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      content: "I've recommended CareerQuest to all my colleagues. The skill assessments helped me identify gaps in my knowledge that I've since addressed."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="container px-4 py-24 md:py-32 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <Badge className="mb-4 bg-brand-purple hover:bg-brand-purple">Your Career Journey Starts Here</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
                Navigate Your <span className="text-brand-blue">Career</span> With Confidence
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-600">
                Tools, resources, and guidance to help you find your dream job and thrive in your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/jobs">Explore Jobs</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/resources">Career Resources</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Career development" 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Empower Your Career Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you navigate every stage of your career development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover animate-on-scroll opacity-0">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Job Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities across a wide range of industries and specializations.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design', 'Engineering', 'Sales', 'Customer Service', 'Human Resources', 'Legal', 'Operations'].slice(0, 6).map((category, index) => (
              <Card key={index} className="animate-on-scroll opacity-0 card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Briefcase className="h-10 w-10 mb-4 text-brand-blue" />
                  <h3 className="font-semibold">{category}</h3>
                  <p className="text-sm text-gray-500">Jobs Available</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/jobs">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Development Resources</h2>
              <p className="text-xl text-gray-600 mb-6">
                Access guides, templates, and expert advice to help you at every stage of your career journey.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Resume & Cover Letter Templates',
                  'Interview Preparation Guides',
                  'Salary Negotiation Tips',
                  'Career Change Resources',
                  'Skill Development Courses'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="mt-6" asChild>
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </div>
            
            <div className="order-1 md:order-2 animate-on-scroll opacity-0">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Career resources" 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who have advanced their careers with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-on-scroll opacity-0">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-brand-purple opacity-40">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-6">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-brand-lightblue flex items-center justify-center mr-3">
                      <span className="font-semibold text-brand-blue">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-blue text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of professionals who are discovering new opportunities and growing their careers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/jobs">Find Jobs</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-blue" asChild>
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
