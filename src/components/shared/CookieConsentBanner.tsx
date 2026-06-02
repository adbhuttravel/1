
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This code now runs only on the client
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 p-4 w-full max-w-2xl">
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-2xl">
        <CardContent className="container flex flex-col md:flex-row items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Cookie className="h-6 w-6 text-accent shrink-0 hidden sm:block"/>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience and analyze site traffic.
              </p>
            </div>
          <Button onClick={handleAccept} size="sm" className="shrink-0">Accept</Button>
        </CardContent>
      </Card>
    </div>
  );
}
