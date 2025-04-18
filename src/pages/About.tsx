
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative bg-brand-blue text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container py-20 px-4 md:px-6 text-center z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Career Quest</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Your gateway to finding your dream job and discovering exciting career opportunities. Let's
            build a brighter future together!
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="space-y-16">
          {/* Who We Are */}
          <section className="animate-on-scroll opacity-0 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-blue">Who We Are</h2>
            <p className="text-gray-700">
              At Career Quest, we are passionate about connecting job seekers with exceptional career opportunities. Our platform is designed 
              with the belief that the right job should be intuitive, accessible, and empowering for everyone. We are committed to providing
              a seamless experience that bridges the gap between talent and opportunity.
            </p>
          </section>

          {/* Our Mission */}
          <section className="animate-on-scroll opacity-0 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-blue">Our Mission</h2>
            <p className="text-gray-700">
              We aim to be the leading platform for individuals to explore diverse career paths while supporting organizations in efficiently accessing 
              top talent. Our mission is fueled by innovation, as we continue to redefine the job search experience with technology and 
              human-centric design.
            </p>
          </section>

          {/* Our Vision */}
          <section className="animate-on-scroll opacity-0 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-blue">Our Vision</h2>
            <p className="text-gray-700">
              Our vision is to revolutionize how job seekers and organizations connect, apply, and secure employment through cutting-edge
              technology, personalized job matching, and a user-friendly experience that puts people first.
            </p>
          </section>

          {/* Our Values */}
          <section className="animate-on-scroll opacity-0 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-brand-blue">Our Values</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-brand-purple">Innovation</h3>
                <p className="text-gray-700">We are dedicated to continuously evolving to meet the changing needs of the job market.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-purple">Integrity</h3>
                <p className="text-gray-700">We maintain the highest ethical standards in all our interactions and transactions.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-purple">Empowerment</h3>
                <p className="text-gray-700">We empower job seekers and employers by providing the tools and insights needed for informed decision-making.</p>
              </div>
            </div>
          </section>

          {/* Meet Our Team */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-brand-blue">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <Card className="animate-on-scroll opacity-0 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <img src="/placeholder.svg" alt="Bhagyat Mutthe" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold">Bhagyat Mutthe</h3>
                    <p className="text-brand-purple">CEO & Founder</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    John is the visionary behind Career Quest, with over 15 years of experience in the tech and recruitment sectors. His dedication to creating innovative solutions has driven the platform's success, making it a go-to resource for job seekers and employers alike.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 2 */}
              <Card className="animate-on-scroll opacity-0 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <img src="/placeholder.svg" alt="Ankush Pawar" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold">Ankush Pawar</h3>
                    <p className="text-brand-purple">Chief Marketing Officer</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Ankush brings a wealth of experience in digital marketing and brand development. She leads the marketing team, ensuring the platform's mission and values are communicated clearly to the global audience.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 3 */}
              <Card className="animate-on-scroll opacity-0 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <img src="/placeholder.svg" alt="Ajay Pishal" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold">Ajay Pishal</h3>
                    <p className="text-brand-purple">Head of Product Development</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Ajay is responsible for overseeing the product development lifecycle with a strong background in software engineering and user experience design. Sam ensures that Career Quest's platform remains cutting-edge, user-friendly, and efficient.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 4 */}
              <Card className="animate-on-scroll opacity-0 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <img src="/placeholder.svg" alt="Pravin Kale" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold">Pravin Kale</h3>
                    <p className="text-brand-purple">Lead Data Scientist</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Pravin leads the data science team, using advanced algorithms to enhance the platform's job matching capabilities. His work ensures that job seekers receive personalized job recommendations tailored to their skills and preferences.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 5 */}
              <Card className="animate-on-scroll opacity-0 animate-fade-in">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <img src="/placeholder.svg" alt="Amol Pawar" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-semibold">Amol Pawar</h3>
                    <p className="text-brand-purple">Lead Data Scientist</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Amol leads the data science team, using advanced algorithms to enhance the platform's job matching capabilities. His work ensures that job seekers receive personalized job recommendations tailored to their skills and preferences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-brand-blue text-white p-8 rounded-lg text-center animate-on-scroll opacity-0 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Learn More?</h2>
            <p className="mb-6">
              Explore our platform, or get in touch with us to discover how Career Quest can help you achieve your career goals!
            </p>
            <Button variant="outline" className="bg-white text-brand-blue hover:bg-gray-100">Contact Us</Button>
          </section>

          {/* Contact Information */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll opacity-0 animate-fade-in">
            <div className="flex items-center gap-3">
              <Mail className="text-brand-blue" size={24} />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">contact@careerquest.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-brand-blue" size={24} />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">(123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-brand-blue" size={24} />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">123 Main Street, Anytown, USA</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
