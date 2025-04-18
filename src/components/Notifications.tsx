
import { useState } from 'react';
import { Bell, CheckCheck, X, Mail, Briefcase, Building, Clock, Info, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

type NotificationType = 'application' | 'message' | 'job' | 'system' | 'alert';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
  link?: string;
  image?: string;
}

interface NotificationsProps {
  initialNotifications?: Notification[];
}

// Get icon based on notification type
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'application':
      return <Briefcase className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <MessageSquare className="h-5 w-5 text-purple-500" />;
    case 'job':
      return <Building className="h-5 w-5 text-green-500" />;
    case 'system':
      return <Info className="h-5 w-5 text-gray-500" />;
    case 'alert':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    default:
      return <Mail className="h-5 w-5 text-gray-500" />;
  }
};

// Default notifications for demo
const defaultNotifications: Notification[] = [
  {
    id: '1',
    title: 'Application Update',
    description: 'Your application for Senior Developer at TechCorp has moved to interview stage.',
    time: '15 minutes ago',
    type: 'application',
    read: false,
    link: '/profile',
    image: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'New Message',
    description: 'You received a message from Sarah from DesignHub regarding your application.',
    time: '2 hours ago',
    type: 'message',
    read: false,
    link: '/profile',
  },
  {
    id: '3',
    title: 'Job Recommendation',
    description: 'We found 3 new jobs that match your skills and preferences.',
    time: '1 day ago',
    type: 'job',
    read: true,
    link: '/jobs',
  },
  {
    id: '4',
    title: 'Profile Viewed',
    description: 'Your profile was viewed by recruiters from 5 companies this week.',
    time: '2 days ago',
    type: 'system',
    read: true,
    link: '/profile',
  },
  {
    id: '5',
    title: 'Upcoming Interview',
    description: 'Reminder: You have an interview with DataInsights tomorrow at 2:00 PM.',
    time: '2 days ago',
    type: 'alert',
    read: false,
    link: '/profile',
  },
];

const Notifications = ({ initialNotifications = defaultNotifications }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      description: `${unreadCount} notifications have been marked as read.`,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification removed",
      description: "The notification has been removed from your list.",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setOpen(false);
    toast({
      title: "All notifications cleared",
      description: "Your notification list has been cleared.",
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0" sideOffset={5}>
        <div className="px-4 pt-4 pb-2 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'No new notifications'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8">
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        
        <Separator />
        
        <ScrollArea className="h-[350px]">
          {notifications.length > 0 ? (
            <div className="p-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`relative p-3 rounded-md ${notification.read ? 'bg-background' : 'bg-muted/30'} hover:bg-muted/40 transition-colors cursor-pointer mb-2`}
                  onClick={() => {
                    markAsRead(notification.id);
                    // Navigate to link in a real app
                    console.log('Navigate to:', notification.link);
                  }}
                >
                  <div className="flex">
                    <div className="mr-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted">
                        {notification.image ? (
                          <Avatar>
                            <AvatarImage src={notification.image} alt="" />
                            <AvatarFallback>
                              {getNotificationIcon(notification.type)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className={`font-medium ${notification.read ? '' : 'text-primary'}`}>
                          {notification.title}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 text-muted-foreground hover:text-foreground -mt-1 -mr-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mb-4 text-muted" />
              <h4 className="text-lg font-medium">No notifications</h4>
              <p className="text-sm max-w-[220px] mt-1">
                When you get notifications, they'll show up here.
              </p>
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2 flex justify-between">
              <Button variant="link" size="sm" className="h-8" asChild>
                <a href="/notifications">View all</a>
              </Button>
              <Button variant="ghost" size="sm" className="h-8" onClick={clearAllNotifications}>
                Clear all
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
