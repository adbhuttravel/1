
"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/services/Home/Adbhut Tour Group 1.jpg",
  "/images/services/Home/Mice g2.jpg",
  "/images/services/Home/Adbhut Tour Group 3.jpg",
  "/images/services/Home/Adbhut Tour Group 4.JPG",
  "/images/services/Home/Adbhut Tour Group 5.JPG",
  "/images/services/Home/Mice g4.jpg",
  "/images/services/Home/Adbhut Tour Group 7.jpg",
  "/images/services/Home/Adbhut Tour Group 8.jpg",
  "/images/services/Home/Adbhut Tour Group 9.png",
  "/images/services/Home/Adbhut Tour Group 10.JPG",
  "/images/services/Home/Adbhut Tour Group 11.jpg",
];

export default function GroupImagesCarousel() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnFocusIn: true })
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsCarouselVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = carouselRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);


  return (
    <section className="py-12 bg-secondary/50">
      <div className="container" ref={carouselRef}>
        <Carousel
          plugins={isCarouselVisible ? [autoplayPlugin.current] : []}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.play}
          className="w-full relative"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-8">
            {images.map((imageUrl, index) => (
              <CarouselItem
                key={index}
                className="pl-8 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 flex items-center justify-center h-80 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={`Group tour image ${index + 1}`}
                    width={600}
                    height={400}
                    className="object-cover h-full w-full transition-transform duration-500 hover:scale-110"
                    data-ai-hint="group travel"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border">
             <ChevronLeft className="size-6 text-foreground/70" />
          </CarouselPrevious>
           <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border">
            <ChevronRight className="size-6 text-foreground/70" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
}
