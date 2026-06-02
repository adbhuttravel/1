
"use client";

import { Plane, Hotel, Compass, Users, Star, Briefcase, FileText, Car, Ship } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef, useEffect, useState } from "react";

const services = [
    {
    icon: Compass,
    title: "Personalized Itineraries",
    description: "Your journey should be as unique as you are. We go beyond pre-packaged tours to design a travel blueprint that perfectly aligns with your passions, pace, and preferences. Our experts collaborate with you to craft a one-of-a-kind adventure, ensuring every detail reflects your personal travel style.",
    example: "Example: A 10-day culinary tour through Italy, featuring private cooking classes in Tuscany, wine tasting in a Chianti vineyard, and a guided food market exploration in Bologna, all tailored to your love for authentic Italian cuisine.",
    images: ["/images/services/Services/Personalised Itn.png"],
    dataAiHints: ["travel map planning"],
    },
    {
    icon: Plane,
    title: "Flight Bookings",
    description: "Navigating the world of air travel can be complex. Let us handle it for you. We leverage our expertise to find the most efficient routes, optimal layovers, and competitive fares across a global network of airlines. Our goal is a seamless, stress-free booking experience from start to finish.",
    example: "Example: For a multi-city European holiday, we can book a complex open-jaw ticket, flying you into Rome and out of Paris, with a convenient and cost-effective flight to Barcelona in between, saving you both time and money.",
    images: ["/images/services/Services/Flight Booking.jpeg"],
    dataAiHints: ["airplane wing clouds"],
    },
    {
    icon: Hotel,
    title: "Hotel Bookings",
    description: "Where you stay is a crucial part of your travel experience. We handpick and book accommodations that promise comfort, quality, and character. From world-class luxury resorts and charming boutique hotels to cozy B&Bs, we ensure your home away from home meets our high standards and your expectations.",
    example: "Example: On a romantic honeymoon in Bali, we can arrange a stay in a private pool villa overlooking the serene rice paddies of Ubud, followed by a chic beachfront resort to catch the stunning sunsets in Seminyak.",
    images: [
        "/images/services/Services/Hotel Booking 1.jpeg", 
        "/images/services/Services/Hotel Booking 2.jpeg"
    ],
    dataAiHints: ["luxury hotel room", "hotel suite"],
    },
    {
    icon: Users,
    title: "Domestic & International Group Tours",
    description: "Discover the world with like-minded individuals on our expertly curated group tours. We keep our groups small to foster a sense of community and provide a more intimate experience. Led by knowledgeable local guides, our tours offer a perfect balance of planned activities and personal free time for exploration.",
    example: "Example: Join our 'Wonders of Peru' tour to hike the historic Inca Trail to Machu Picchu. You’ll share the journey with a small group of fellow adventurers and be led by a local guide who brings the ancient Incan world to life.",
    images: [
        "/images/services/Home/Adbhut Tour Group 1.jpg",
        "/images/services/Home/Adbhut Tour Group 4.JPG",
        "/images/services/Home/Adbhut Tour Group 10.JPG",
        "/images/services/Home/Mice g2.jpg",
        "/images/services/Home/Mice g4.jpg"
    ],
    dataAiHints: ["group travel friends", "corporate group photo", "friends traveling together", "group friends", "outdoor group"],
    },
    {
    icon: Briefcase,
    title: "MICE & Corporate Travel",
    description: "Elevate your business events with our professional MICE (Meetings, Incentives, Conferences, and Exhibitions) services and corporate travel management. We provide end-to-end solutions, from strategic planning and venue sourcing to seamless on-site logistics, ensuring your event is both successful and memorable.",
    example: "Example: We can organize a week-long sales incentive trip to Dubai for your top performers, including 5-star accommodation, team-building desert safaris, and a formal gala dinner at an exclusive venue with city skyline views.",
    images: [
        "/images/services/Home/Adbhut Tour Group 4.JPG",
        "/images/services/MICE/MICE E2.jpg",
        "/images/services/MICE/Mice g5.jpg",
    ],
    dataAiHints: ["corporate group photo", "business meeting", "corporate conference"],
    },
    {
    icon: FileText,
    title: "Visa & Travel Insurance Assistance",
    description: "Navigating the complexities of international travel documentation can be daunting. Our dedicated team simplifies the process by providing expert guidance on visa requirements and applications, ensuring you have all the necessary paperwork. We also help you choose the right travel insurance plan for complete peace of mind on your journey.",
    example: "Example: Planning a trip to Europe? We'll guide you through the Schengen visa application process, from filling out forms to gathering documents, and help you select a comprehensive insurance policy that covers medical emergencies and trip cancellations.",
    images: [
        "/images/services/Services/Visa and  Passport.png",
    ],
    dataAiHints: ["passport visa stamps"],
    },
    {
    icon: Car,
    title: "Airport & Local Cab Services",
    description: "Start and end your journey with convenient and reliable transportation. We arrange seamless airport transfers to and from your accommodation. Additionally, our local cab services, powered by North Cab, are available for sightseeing, business meetings, or simply exploring the city at your own pace, ensuring you travel comfortably and safely.",
    example: "Example: Upon landing in Delhi, your pre-booked cab will be waiting to take you directly to your hotel. The next day, you can book the same trusted service for a full-day city tour, visiting all the major landmarks without any hassle.",
    images: [
        "/images/services/Services/Airport Cab.png",
        "/images/services/Services/Airport cab 2.png",
        "/images/services/Services/Airport Cab 3.png"
    ],
    dataAiHints: ["taxi car city", "person entering cab", "cab interior"],
    },
    {
    icon: Ship,
    title: "Cruise Packages",
    description: "Set sail on the seas with our premier cruise packages. We partner with world-renowned cruise lines to bring you exceptional voyages. We also specialize in organizing combo packages that pair your dream cruise with exciting land excursions for a complete holiday experience. We proudly offer packages for:",
    example: "Example: Embark on a 7-night Royal Caribbean cruise through the Mediterranean, then spend 3 days exploring the historic wonders of Rome, with all hotels and transfers seamlessly arranged by our team.",
    images: [ "/images/services/Services/Service Cruise.jpeg" ],
    dataAiHints: [ "cruise ship ocean" ],
    listItems: [
        "Star Cruise",
        "Nile Cruise",
        "MSC Cruises",
        "Royal Caribbean",
        "Norwegian Cruise Line",
    ],
    },
    {
    icon: Star,
    title: "Exclusive Experiences",
    description: "We believe in creating moments that last a lifetime. Our connections provide you with access to unique local experiences, private tours, and activities that go far beyond the standard tourist trail. Let us add that 'wow' factor to your itinerary with moments you won't find in a guidebook.",
    example: "Example: Imagine a private, after-hours tour of the Vatican Museums, a serene sunrise hot air balloon ride over the ancient temples of Bagan, or a thrilling helicopter journey over Iceland's dramatic volcanic landscapes.",
    images: [
        "/images/services/Services/Exclusive Experience 1.jpeg",
        "/images/services/Services/Exclusive Experience 2.jpeg"
    ],
    dataAiHints: ["hot air balloon sunrise", "couple boat"],
    },
];


const ServiceSection = ({ service, index }: { service: typeof services[0], index: number }) => {
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
        <div key={service.title} className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div ref={carouselRef} className={`rounded-lg overflow-hidden ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                {service.images.length > 1 ? (
                    <Carousel 
                    plugins={isCarouselVisible ? [autoplayPlugin.current] : []}
                    className="w-full relative" 
                    opts={{ loop: true, align: "start" }}
                    onMouseEnter={() => autoplayPlugin.current.stop()}
                    onMouseLeave={() => autoplayPlugin.current.play()}
                    >
                    <CarouselContent className="-ml-4">
                        {service.images.map((img, i) => (
                        <CarouselItem key={i} className="pl-4 md:basis-10/12">
                            <div className="overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src={img}
                                alt={`${service.title} image ${i + 1}`}
                                width={600}
                                height={400}
                                className="w-full h-full max-h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                                data-ai-hint={service.dataAiHints[i]}
                            />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
                    </Carousel>
                ) : (
                    <div className="overflow-hidden rounded-lg shadow-xl">
                    <Image
                        src={service.images[0]}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={service.dataAiHints[0]}
                    />
                    </div>
                )}
                </div>
                <div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                    <service.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-headline font-bold">{service.title}</h2>
                </div>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                {service.listItems && (
                    <ul className="list-disc pl-5 space-y-1 mb-4 text-muted-foreground">
                    {service.listItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                    </ul>
                )}
                <p className="text-sm italic text-muted-foreground/80 border-l-4 border-primary/50 pl-4 py-2">{service.example}</p>
                </div>
            </div>
        </div>
    )
}

export default function ServicesPage() {

    const metadata: Metadata = {
      title: "Our Services",
      description: "Discover the comprehensive travel services offered by Adbhut Travel, including personalized itineraries, flight and hotel bookings, group tours, corporate MICE solutions, and exclusive experiences.",
    };

  return (
    <>
      <section className="bg-secondary py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            From personalized dream trips to seamless corporate events, we offer a comprehensive suite of travel solutions designed to make your journey extraordinary.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 space-y-12 md:space-y-20">
        {services.map((service, index) => (
            <ServiceSection key={service.title} service={service} index={index} />
        ))}
      </section>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="container text-center">
          <h2 className="text-3xl font-headline font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Whether you're dreaming of a custom adventure or a corporate event, our experts are here to help.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
