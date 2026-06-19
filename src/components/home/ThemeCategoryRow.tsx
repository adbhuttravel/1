"use client";

import React from "react";
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
import type { ThemeCategory } from "@/lib/theme-flyers";

export default function ThemeCategoryRow({
  category,
  delay = 3500,
}: {
  category: ThemeCategory;
  delay?: number;
}) {
  // One autoplay instance per row; staggered delay keeps the rows from sliding
  // in lockstep. Pauses on hover, resumes on leave.
  const autoplay = React.useRef(
    Autoplay({ delay, stopOnInteraction: false })
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="font-headline text-2xl font-bold md:text-3xl">
            {category.label}
          </h3>
          <p className="text-sm text-muted-foreground md:text-base">
            {category.tagline}
          </p>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {category.flyers.length} packages
        </span>
      </div>

      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.play}
        className="w-full"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {category.flyers.map((flyer) => (
            <CarouselItem
              key={flyer.src}
              className="basis-4/5 pl-4 sm:basis-1/2 md:pl-6 lg:basis-1/3"
            >
              <div className="group/card overflow-hidden rounded-2xl bg-background shadow-lg ring-1 ring-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={flyer.src}
                    alt={flyer.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[-1rem] top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border bg-background/70 shadow-lg hover:bg-background/90 md:size-12">
          <ChevronLeft className="size-6 text-foreground/70" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-[-1rem] top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border bg-background/70 shadow-lg hover:bg-background/90 md:size-12">
          <ChevronRight className="size-6 text-foreground/70" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
