
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function WhatsAppButton() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // This code now runs only on the client
    const timer = setTimeout(() => {
        setShowPrompt(true);
    }, 3000); // Show after 3 seconds

    // Optional: Hide prompt after a few more seconds
    const hideTimer = setTimeout(() => {
        setShowPrompt(false);
    }, 11000); // Start hiding after 8 more seconds (total 11s)

    return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
       {showPrompt && (
        <div className="relative flex items-center gap-2 rounded-md bg-background p-3 shadow-lg border animate-in fade-in-50 slide-in-from-bottom-2">
            <p className="text-sm font-medium text-foreground">Talk to us on WhatsApp</p>
            <button
                onClick={() => setShowPrompt(false)}
                className="p-1 rounded-full text-muted-foreground hover:bg-muted"
                aria-label="Dismiss WhatsApp prompt"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
       )}
        <Link 
            href="https://wa.me/919671825147" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-transform duration-300 hover:scale-110"
            aria-label="Chat on WhatsApp"
        >
            <Image
            src="/whatsapp-icon.svg"
            alt="WhatsApp Icon"
            width={64}
            height={64}
            className="drop-shadow-lg"
            />
        </Link>
    </div>
  );
}
