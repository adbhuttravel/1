
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our passionate team! Explore current job openings at Adbhut Travel and be part of a company that's redefining the world of travel.",
};

const jobOpenings = [
  {
    title: "Senior Travel Consultant",
    location: "Pehowa, India",
    type: "Full-time",
    description: "We are looking for an experienced travel consultant to create bespoke itineraries and manage client relationships. Must have 5+ years of experience."
  },
  {
    title: "Digital Marketing Manager",
    location: "Pehowa, India",
    type: "Full-time",
    description: "Lead our digital marketing efforts, including SEO, SEM, and social media campaigns to grow our online presence."
  },
  {
    title: "Operations Executive",
    location: "Pehowa, India",
    type: "Full-time",
    description: "Coordinate with suppliers, manage bookings, and ensure the smooth execution of all our travel packages."
  },
  {
    title: "Sales Person",
    location: "Pehowa, India",
    type: "Full-time",
    description: "We are seeking a motivated Sales Person to join our dynamic team. You will be responsible for selling travel packages and building strong customer relationships."
  }
];

export default function CareerPage() {
  return (
    <>
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Join Our Team</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Be part of a passionate team that's redefining travel. We're looking for talented individuals who share our love for exploration.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="flex flex-col shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 pt-1">
                     <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/>{job.location}</span>
                     <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4"/>{job.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`mailto:info@adbhuttravel.in?subject=Application for ${job.title}`} target="_blank" rel="noopener noreferrer">Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-16">
                <p className="text-muted-foreground">Don't see a role that fits? We're always looking for talent.</p>
                <Button asChild variant="link">
                    <Link href="mailto:info@adbhuttravel.in">Send us your resume</Link>
                </Button>
            </div>
        </div>
      </section>
    </>
  );
}
