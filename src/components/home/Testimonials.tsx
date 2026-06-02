
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "I recently went on a business trip to Goa arranged by Adbhut Travel Agency, and seriously, it was just amazing! Everything was perfectly planned — from flights to hotel bookings to local transport. The whole trip felt super smooth and...",
    author: "Ajay Yadav",
    location: "Local Guide",
  },
  {
    id: "2",
    quote: "I recently booked a tour with them and it was truly a fantastic experience! From the moment we started planning to the end of our journey, everything was smooth and well-organized. The itinerary was perfectly balanced with sightseeing,...",
    author: "Apurva",
    location: "Google Review",
  },
  {
    id: "3",
    quote: "Adbhut Travel and Event Company is exceptional! Their planning, attention to detail, and personalized service made everything seamless and memorable. Highly recommended for hassle-free travel and flawless events!",
    author: "Ashutosh Mishra",
    location: "Google Review",
  },
   {
    id: "4",
    quote: "Team work, wonderful experience with Adbhut Travel Agency, Pehowa. Superb experience.",
    author: "Tanya Sharma",
    location: "Google Review",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">
          What Our Clients Say
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Stories from travelers who embarked on their dream journeys with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-secondary border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
