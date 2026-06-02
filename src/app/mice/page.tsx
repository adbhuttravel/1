
"use client";

import Image from "next/image";
import { CheckCircle, Mic, Trophy, Users, Presentation, Handshake, Building2, Ticket, Users2 } from "lucide-react";
import MiceContactForm from "@/components/mice/MiceContactForm";
import React, { useRef, useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const micePillars = [
    {
        letter: "M",
        title: "Meetings",
        icon: Users2,
        services: ["Venue Sourcing & Booking", "Agenda Planning", "Audio-Visual Setup", "On-site Coordination"]
    },
    {
        letter: "I",
        title: "Incentives",
        icon: Trophy,
        services: ["Customized Itineraries", "Luxury Accommodations", "Exclusive Experiences", "Team-building Activities"]
    },
    {
        letter: "C",
        title: "Conferences",
        icon: Mic,
        services: ["Delegate Registration", "Speaker Management", "Logistics & Transport", "Gala Dinners & Networking"]
    },
    {
        letter: "E",
        title: "Exhibitions",
        icon: Presentation,
        services: ["Stall Design & Fabrication", "Exhibitor Management", "Visitor Engagement", "Post-event Analytics"]
    }
];

const whyChooseUs = [
    "End-to-End solutions for all your event needs.",
    "Access to a global network of trusted vendors and hotels.",
    "Dedicated event manager for seamless coordination.",
    "Transparent budgeting with a focus on delivering value.",
    "Innovative technology for registration and engagement."
];

const clientLogos = [
  { src: "/images/services/Home/Adbhut-Affilications-Cetifications.png", alt: "Client Accreditations", dataAiHint: "corporate accreditations" },
];

const faqItems = [
    {
      question: "What exactly is MICE tourism?",
      answer: "MICE stands for Meetings, Incentives, Conferences, and Exhibitions. It represents a specialized sector of tourism focused on planning, booking, and facilitating corporate events and group travel for business purposes."
    },
    {
      question: "What are the logistical services covered under MICE?",
      answer: "Logistical services include venue sourcing, contract negotiation, travel and accommodation booking for attendees, ground transportation, audio-visual equipment setup, catering, delegate registration, and on-site event management."
    },
    {
      question: "What is the hallmark of a good MICE organiser?",
      answer: "A good MICE organizer is characterized by meticulous attention to detail, strong negotiation skills, an extensive network of trusted vendors, excellent communication, and the ability to seamlessly manage all event logistics to deliver a flawless experience."
    },
    {
      question: "Why is it important for an organisation to have MICE planners?",
      answer: "Professional MICE planners save organizations time and money by leveraging industry expertise and supplier relationships. They ensure events are strategically planned to meet business objectives, manage risks, and allow the organization to focus on its core activities."
    },
    {
      question: "What is the main objective of MICE tourism?",
      answer: "The main objectives are to facilitate business networking, share knowledge, motivate employees through incentive travel, showcase products and services, and ultimately drive business growth and foster professional relationships."
    },
    {
      question: "What are the top MICE tourism destinations in the world?",
      answer: "Top destinations often include cities with excellent connectivity, world-class convention centers, and ample accommodation, such as Dubai, Singapore, Las Vegas, Barcelona, and Bangkok. For domestic MICE in India, popular choices are Delhi, Mumbai, Goa, and Hyderabad."
    },
    {
      question: "What is the latest trend in MICE tourism?",
      answer: "Current trends include a focus on sustainable or 'green' events, the integration of technology for hybrid (in-person and virtual) meetings, and a growing demand for unique, experiential activities that offer authentic local flavor."
    },
    {
      question: "What is the importance of content in MICE tourism?",
      answer: "Content is king. In conferences and meetings, high-quality, relevant content delivered by engaging speakers is crucial for attracting attendees, fostering learning, and ensuring the event's success and ROI."
    },
    {
      question: "What is the role of logistics in MICE tourism?",
      answer: "Logistics form the backbone of any MICE event. It involves the precise coordination of all tangible aspects, including flights, hotels, venues, transportation, and scheduling, to ensure the event runs smoothly from start to finish."
    },
    {
      question: "Why are MICE events good for business?",
      answer: "MICE events are powerful business tools. They help in building employee and client relationships, provide valuable networking opportunities, boost morale and productivity through incentives, and serve as a platform for launching new products and strategies."
    }
  ];

const carouselImages = [
    "/images/services/MICE/Mice g1.jpg",
    "/images/services/MICE/Mice g4.jpg",
    "/images/services/MICE/Mice g3.jpg",
    "/images/services/MICE/Mice Incentices 2.jpeg",
    "/images/services/MICE/MICE E1.jpg",
    "/images/services/MICE/MICE E2.jpg",
    "/images/services/MICE/MICE E3.jpg"
];

export default function MicePage() {
    const autoplayPlugin = React.useRef<any>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);

    useEffect(() => {
      if (!autoplayPlugin.current) {
        autoplayPlugin.current = Autoplay({
          delay: 3000,
          stopOnInteraction: true,
          stopOnFocusIn: true,
        });
      }
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsCarouselVisible(true);
              if (autoplayPlugin.current) {
                autoplayPlugin.current.play();
              }
            } else {
              if (autoplayPlugin.current) {
                autoplayPlugin.current.stop();
              }
            }
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
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:pr-8">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-gray-800">MICE Corporate Travel: Book your business events and off-sites</h1>
              <p className="mt-6 text-lg text-gray-600">
                We are a one-stop solution for your MICE (Meetings, Incentives, Conferences, and Exhibitions) and corporate travel needs.
              </p>
            </div>
            <div className="relative h-80 md:h-96">
               <div className="absolute inset-0 bg-primary/10 rounded-lg -rotate-3 transition-transform duration-300 hover:rotate-0"></div>
               <Image
                  src="/images/services/MICE/Mice g5.jpg"
                  alt="Corporate Event Singer"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  data-ai-hint="corporate event"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Simplifying MICE Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-headline font-bold text-gray-800">Simplifying <span className="text-accent">MICE</span></h2>
            <div className="mt-6 text-gray-600 space-y-4 text-left">
                <p>
                You might have business associates from all over the world whom you want to give a seamless experience, or you want to take your team for an offsite. With Adbhut Travel as your partner, you can be sure of getting the best experience of MICE anywhere in the world. Our team will be your travel partner and take care of all travel and MICE related services so that you can concentrate on growing your business and network.
                </p>
                <p>
                We also understand that planning MICE events requires a special focus on individual needs and various associated services. We have a separate team of professionals who are experts at conceptualizing and executing MICE events for all our esteemed clients.
                </p>
            </div>
        </div>
      </section>

      {/* What Adbhut Offers in MICE? Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
           <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-headline font-bold text-gray-800">What Adbhut Offers in MICE?</h2>
              <p className="mt-4 text-gray-600">
                A one-stop solution for different MICE related services. We provide a full spectrum of services to ensure your corporate event is a resounding success from start to finish.
              </p>
           </div>
           <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {micePillars.map((pillar) => (
                    <div key={pillar.title} className="relative p-6 rounded-lg bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute -top-6 -left-3 text-8xl md:text-9xl font-bold text-primary/30 select-none -z-10 group-hover:text-accent/20 transition-colors duration-300">
                            {pillar.letter}
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-headline font-bold mb-4 text-gray-800 flex items-center gap-3">
                                <pillar.icon className="w-8 h-8 text-accent" />
                                {pillar.title}
                            </h3>
                            <ul className="space-y-3">
                            {pillar.services.map(service => (
                                <li key={service} className="text-gray-600 border-b pb-2 last:border-b-0 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-accent/70" />
                                    <span>{service}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                ))}
           </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
            <h2 className="text-3xl font-headline font-bold text-gray-800 text-center">Why Choose Adbhut MICE?</h2>
            <div className="mt-12">
                <ul className="space-y-4 max-w-2xl mx-auto">
                {whyChooseUs.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0"/>
                        <span className="text-gray-600">{point}</span>
                    </li>
                ))}
                </ul>
            </div>
            <div className="mt-12" ref={carouselRef}>
                <Carousel
                    plugins={isCarouselVisible && autoplayPlugin.current ? [autoplayPlugin.current] : []}
                    className="w-full"
                    opts={{ loop: true, align: "center" }}
                    onMouseEnter={() => isCarouselVisible && autoplayPlugin.current?.stop()}
                    onMouseLeave={() => isCarouselVisible && autoplayPlugin.current?.play()}
                >
                    <CarouselContent className="-ml-4">
                        {carouselImages.map((src, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={src}
                                alt={`Corporate event image ${index + 1}`}
                                fill
                                className="object-cover"
                                data-ai-hint="corporate event"
                            />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 md:size-12 rounded-full bg-background/70 hover:bg-background/90 shadow-lg border" />
                </Carousel>
            </div>
            <div className="mt-16">
                <div className="relative text-center">
                    <h3 className="text-gray-600 font-semibold mb-6">OUR ACCREDITATIONS</h3>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {clientLogos.map((logo, index) => (
                            <Image key={index} src={logo.src} alt={logo.alt} width={1000} height={80} className="object-contain h-auto w-full max-w-4xl" data-ai-hint={logo.dataAiHint} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-16 md:py-20 bg-secondary/30" id="mice-contact">
          <div className="container max-w-4xl mx-auto">
              <div className="mt-8">
                 <MiceContactForm />
              </div>
          </div>
      </section>
      
       {/* FAQ Section */}
       <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-4xl mx-auto">
             <div className="text-center">
                <h2 className="text-3xl font-headline font-bold text-gray-800">FAQs on MICE Tourism</h2>
            </div>
            <Accordion type="single" collapsible className="w-full mt-8">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-left font-semibold text-lg text-gray-700">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </section>
    </div>
  );
}

    