
"use client";

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToBottomButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This code now runs only on the client
    const toggleVisibility = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      setIsVisible(!isAtBottom);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  
  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToBottom}
      className={cn(
        'fixed bottom-16 left-4 z-50 rounded-full shadow-lg'
      )}
      aria-label="Scroll to bottom"
    >
      <ArrowDown className="h-6 w-6" />
    </Button>
  );
}
