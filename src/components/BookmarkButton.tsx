
import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface BookmarkButtonProps {
  jobId: number | string;
  initialBookmarked?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const BookmarkButton = ({
  jobId,
  initialBookmarked = false,
  variant = 'outline',
  size = 'default',
  showText = true,
  onBookmarkChange,
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const { toast } = useToast();

  const toggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    // Call the callback if provided
    if (onBookmarkChange) {
      onBookmarkChange(newBookmarkState);
    }
    
    // Show toast notification
    toast({
      title: newBookmarkState ? "Job Bookmarked" : "Bookmark Removed",
      description: newBookmarkState 
        ? "This job has been added to your bookmarks." 
        : "This job has been removed from your bookmarks.",
    });
    
    // In a real app, you would save this to a database or local storage
    console.log(`Job ${jobId} bookmark status: ${newBookmarkState}`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleBookmark}
      className={isBookmarked ? "text-primary" : ""}
    >
      {isBookmarked ? (
        <BookmarkCheck className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
      ) : (
        <Bookmark className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
      )}
      {showText && (isBookmarked ? "Bookmarked" : "Bookmark")}
    </Button>
  );
};

export default BookmarkButton;
