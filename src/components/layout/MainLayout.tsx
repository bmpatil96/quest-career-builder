import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  BookOpen, 
  User, 
  Home, 
  Menu, 
  X,
  Info,
  MessageCircle
} from 'lucide-react';
import { setupScrollAnimations } from '@/utils/animationUtils';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

const NavItem = ({ to, label, icon, active }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant={active ? "default" : "ghost"}
      className={`flex items-center gap-2 w-full justify-start ${active ? 'bg-brand-blue text-white' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const cleanupAnimation = setupScrollAnimations();
    return cleanupAnimation;
  }, [location.pathname]);
  
  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/jobs', label: 'Jobs', icon: <Briefcase size={20} /> },
    { to: '/resources', label: 'Resources', icon: <BookOpen size={20} /> },
    { to: '/about', label: 'About', icon: <Info size={20} /> },
    { to: '/contact', label: 'Contact', icon: <MessageCircle size={20} /> },
    { to: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex justify-between items-center h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-brand-blue">Career<span className="text-brand-purple">Quest</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-brand-blue ${
                  location.pathname === item.to ? 'text-brand-blue' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white border-b border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  icon={item.icon}
                  active={location.pathname === item.to}
                />
              ))}
              <Link to="/auth" className="w-full mt-2">
                <Button className="w-full">Sign In</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="container py-8 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">CareerQuest</h3>
              <p className="text-gray-600 mb-4">Navigating your career journey with expert guidance and tools.</p>
              <div className="flex space-x-4">
                {/* Social Links Placeholder */}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to} 
                      className="text-gray-600 hover:text-brand-blue transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-600">Need help with your career journey?</p>
              <Button className="mt-2" variant="outline">Contact Us</Button>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CareerQuest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
