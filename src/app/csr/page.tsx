
"use client";

import type { Metadata } from "next";
import { Sprout, GraduationCap, HeartHandshake, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef, useEffect, useState } from "react";

const focusAreas = [
    {
        icon: Sprout,
        title: "Environment & Sustainability",
        points: [
            "Promoting eco-friendly tourism practices",
            "Tree plantation drives and green campaigns",
            "Awareness programs on reducing plastic usage",
        ]
    },
    {
        icon: GraduationCap,
        title: "Education & Skill Development",
        points: [
            "Supporting underprivileged students with books, uniforms, and scholarships",
            "Organizing skill-development workshops and vocational training",
            "Promoting digital literacy in rural areas",
        ]
    },
    {
        icon: HeartHandshake,
        title: "Community Welfare",
        points: [
            "Providing health check-up camps in rural and semi-urban areas",
            "Women empowerment programs through self-help groups and training",
            "Disaster relief support during emergencies",
        ]
    },
    {
        icon: Globe,
        title: "Responsible Tourism",
        points: [
            "Encouraging responsible and ethical travel practices",
            "Collaborating with local communities to create sustainable livelihood opportunities",
            "Supporting cultural preservation and heritage awareness",
        ]
    }
];

const csrImages = [
    "/images/services/CSR/Adbhut CSR Army Duty.jpg",
    "/images/services/CSR/CSR Army Duty.jpg",
    "/images/services/CSR/CSR Blood Camp 2.jpg",
    "/images/services/CSR/CSR Blood Camp 3.jpg",
    "/images/services/CSR/CSR Blood Donation.jpg"
];

export default function CsrPage() {
    const autoplayPlugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnFocusIn: true }));
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
    <>
      <section className="bg-secondary py-8 md:py-12">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Corporate Social Responsibility (CSR)</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
             Giving Back Through Adbhut Foundation
          </p>
        </div>
      </section>

       <section className="py-12" ref={carouselRef}>
        <div className="container">
          <Carousel
            plugins={isCarouselVisible ? [autoplayPlugin.current] : []}
            className="w-full relative"
            opts={{ loop: true, align: "center" }}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.play}
          >
            <CarouselContent className="-ml-4">
              {csrImages.map((src, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={src}
                      alt={`CSR initiative image ${index + 1}`}
                      fill
                      className="object-contain"
                      data-ai-hint="social responsibility"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
          </Carousel>
        </div>
      </section>

      <section className="py-16">
         <div className="container max-w-4xl mx-auto space-y-12">
            <div className="text-center">
                <p className="text-muted-foreground text-lg leading-relaxed">
                    At Adbhut Travel and Event Pvt. Ltd., we believe that true success is measured not only by business growth but also by the positive impact we create in society. Guided by our commitment to community development, sustainability, and social well-being, our CSR initiatives are carried out under the umbrella of the <span className="font-semibold text-accent">Adbhut Foundation.</span>
                </p>
            </div>

            <div className="text-center border-t border-b border-dashed py-8">
                <h2 className="text-3xl font-headline font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground italic">
                    Through the Adbhut Foundation, we aim to empower communities, support education, promote environmental sustainability, and contribute to the overall betterment of society. We believe in creating meaningful change that lasts beyond a single initiative.
                </p>
            </div>

            <div>
                 <h2 className="text-3xl font-headline font-bold text-center mb-10">Key Focus Areas</h2>
                 <div className="grid md:grid-cols-2 gap-8">
                    {focusAreas.map(area => (
                        <Card key={area.title} className="shadow-lg hover:-translate-y-1 transition-transform duration-300">
                           <CardHeader className="flex-row items-center gap-4">
                                <area.icon className="w-8 h-8 text-accent"/>
                                <CardTitle className="font-headline">{area.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                                <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                    {area.points.map(point => <li key={point}>{point}</li>)}
                                </ul>
                           </CardContent>
                        </Card>
                    ))}
                 </div>
            </div>

             <div>
                <h2 className="text-3xl font-headline font-bold text-center mb-4">Why CSR Matters to Us</h2>
                <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    As a leading name in travel and events, we understand that our work touches lives far beyond our business. Every journey we organize and every event we create reflects our responsibility towards people and the planet. CSR is not just a duty for us—it is an integral part of our identity.
                </p>
             </div>

             <div className="bg-primary/20 text-center p-8 rounded-lg">
                <h3 className="text-2xl font-headline font-bold text-accent mb-2">Join Us in Making a Difference</h3>
                <p className="text-muted-foreground">
                   The Adbhut Foundation invites partners, travelers, and well-wishers to join hands in building a better tomorrow. Together, we can create impactful change and ensure that our growth as an organization is shared with the communities and environment around us.
                </p>
                <p className="font-bold text-foreground/80 mt-4">✨ Adbhut Travel and Event Pvt. Ltd. – Beyond Travel, Towards Transformation</p>
             </div>
         </div>
      </section>
    </>
  );
}
