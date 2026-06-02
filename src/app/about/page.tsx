
"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Globe, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

const teamMembers = [
  { name: "Mr. Mohit Sharma", role: "Founder & CEO",image: "/images/services/About Us/Mohit Adbhut Founder.jpeg", dataAiHint: "man portrait" },
  { name: "Mrs. Aditi Sharma", role: "Sales Director", image: "/images/services/About Us/Mrs. Aditi Sharma.jpg", dataAiHint: "woman portrait" },
  { name: "Mr. Sachin", role: "Head of Operations", image: "/images/services/About Us/Sachin-OPS-Manager-Adbhut-Travel-Event-Pvt.-Ltd.png", dataAiHint: "man portrait" },
  { name: "Mr. Ankit", role: "Business Development Manager (BDM)", image: "/images/services/About Us/Anku D.Dun.jpg", dataAiHint: "man portrait" },
];

const youtubeVideos = [
    { id: "SOYiaKA5sRk", title: "Adbhut Travel Corporate Film" },
    { id: "IfBDSc2Lb7U", title: "ADBHUT Profile Video" },
    { id: "pAlKLcYQ6wE", title: "Adbhut Travel Customer Testimonial" },
    { id: "Y-zFCOX7eBE", title: "Adbhut Travel Customer Testimonial 2" },
    { id: "JZbbO89Cr2U", title: "Adbhut Travel Customer Testimonial 3" }
];

const strengths = [
    "Strong Industry Experience",
    "Highly Qualified & Tourism-Educated Management Team",
    "End-to-End Travel Solutions under One Roof",
    "Personalized Itinerary Planning & 24/7 Customer Support",
    "Trusted Network of Global Partners",
    "Focus on Client Satisfaction, Quality, and Transparency",
];

export default function AboutPage() {
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnFocusIn: true }));
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
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About Adbhut Travel</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are a team of passionate travelers dedicated to creating extraordinary journeys and unforgettable memories.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/services/About Us/Our Story.jpeg"
                alt="Our team working together on a travel plan"
                width={600}
                height={500}
                className="w-full h-full object-cover"
                data-ai-hint="diverse team"
              />
            </div>
            <div>
              <h2 className="text-3xl font-headline font-bold mb-4">Our Story</h2>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Adbhut Travel and Event Pvt. Ltd. is one of India’s emerging names in the travel and tourism industry, delivering excellence across domestic and international travel solutions. We specialize in providing comprehensive travel services, including MICE (Meetings, Incentives, Conferences, Exhibitions), Corporate Travel, Group Tours, Tour Packages, Flight Bookings, Hotel Reservations, Visa Assistance, and Cab Services.
                </p>
                <p>
                  <span className="font-semibold text-foreground/90">Incorporation Date:</span> Originally established as a proprietorship firm on 5th July 2017 by Mr. Mohit Sharma, Adbhut started its journey with a vision to deliver exceptional travel experiences. With continued growth and dedication, the company was incorporated as Adbhut Travel and Event Pvt. Ltd. on 18th June 2020.
                </p>
                <p>
                  Our organization is led by a team of highly qualified and experienced professionals who have specialized in tourism studies. The senior management brings a wealth of industry knowledge, ensuring every client receives personalized and world-class service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-3xl font-headline font-bold mb-4">Our Strengths</h2>
                    <ul className="space-y-3 text-muted-foreground">
                        {strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                              <span>{strength}</span>
                          </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-headline font-bold mb-4">Vision</h2>
                        <p className="text-muted-foreground italic">“To become a globally admired travel company known for innovation, trust, and excellence in delivering travel experiences.”</p>
                    </div>
                     <div>
                        <h2 className="text-3xl font-headline font-bold mb-4">Mission</h2>
                        <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                            <li>To offer seamless and memorable travel solutions to every customer.</li>
                            <li>To build long-term relationships based on transparency, trust, and quality service.</li>
                            <li>To continuously enhance our offerings through innovation and customer feedback.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto" ref={carouselRef}>
            <h2 className="text-3xl font-headline font-bold text-center mb-12">Discover Our Journey</h2>
             <Carousel
                plugins={isCarouselVisible ? [autoplayPlugin.current] : []}
                className="w-full relative"
                opts={{ loop: true, align: "center", slidesToScroll: 1 }}
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.play}
                >
              <CarouselContent className="-ml-4 md:-ml-8">
                {youtubeVideos.map(video => (
                  <CarouselItem key={video.id} className="pl-4 md:pl-8 md:basis-10/12">
                    <div className="relative h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-2xl">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}?si=2WdEVM6oot_jdX0d`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
               <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
               <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-4">Our Brands</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Adbhut Travel is a proud member of the Adbhut Group, a family of brands dedicated to providing a comprehensive and exceptional range of services in the travel and tourism industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-items-center text-center">
            <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center justify-center h-16">
                    <Link href="https://www.adbhuttravel.com/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:-translate-y-1">
                        <Logo />
                    </Link>
                </div>
                <h3 className="text-xl font-headline font-semibold">Adbhut Travel</h3>
                <p className="text-muted-foreground mt-2">Our flagship brand for crafting unforgettable domestic and international travel experiences.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center justify-center h-16">
                    <Link href="https://www.northcabs.in/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:-translate-y-1">
                        <Image src="/images/services/About Us/NorthCabs.png" alt="North Cab Logo" width={200} height={80} className="max-h-12 w-auto object-contain" />
                    </Link>
                </div>
                <h3 className="text-xl font-headline font-semibold">North Cab</h3>
                <p className="text-muted-foreground mt-2">Reliable and comfortable taxi services for all your travel needs across North India.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center justify-center h-16">
                    <Link href="https://visitkurukshetra.in/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:-translate-y-1">
                        <Image src="/images/services/About Us/visitkurukshetra_logo.png" alt="Visit Kurukshetra Logo" width={250} height={80} className="max-h-12 w-auto object-contain" />
                    </Link>
                </div>
                <h3 className="text-xl font-headline font-semibold">Visit Kurukshetra</h3>
                <p className="text-muted-foreground mt-2">Your dedicated guide to exploring the rich history and culture of Kurukshetra.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <Card className="p-6 border-0 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <HeartHandshake className="h-12 w-12 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-headline font-semibold mb-2">Customer First</h3>
              <p className="text-muted-foreground">Your journey is our priority. We are committed to providing impeccable service and support.</p>
            </Card>
            <Card className="p-6 border-0 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Globe className="h-12 w-12 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-headline font-semibold mb-2">Authentic Experiences</h3>
              <p className="text-muted-foreground">We connect you with the local culture for travel that is genuine and enriching.</p>
            </Card>
            <Card className="p-6 border-0 shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Award className="h-12 w-12 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-headline font-semibold mb-2">Unmatched Quality</h3>
              <p className="text-muted-foreground">From planning to execution, we ensure the highest standards in every aspect of your trip.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-4 md:p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} className="object-cover" />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-headline font-semibold">{member.name}</h3>
                  <p className="text-accent text-sm md:text-base font-medium">{member.role}</p>
                  {member.additionalRoleLine1 && (
                    <div className="text-muted-foreground mt-1 leading-snug">
                        <p className="text-[9px]">{member.additionalRoleLine1}</p>
                        <p className="text-[8px]">{member.additionalRoleLine2}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
