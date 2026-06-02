
"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Plane,
  BedDouble,
  Car,
  Utensils,
  Palmtree,
  User,
  FileText,
  ShieldCheck,
  Ticket,
  Flower,
  Wifi,
  Leaf
} from "lucide-react";
import type { Package, Facility } from "@/lib/types";
import Link from "next/link";

interface PackageDetailModalProps {
  pkg: Package;
  children: React.ReactNode;
}

const facilityDetails: Record<Facility, { icon: React.ElementType; label: string }> = {
  flight: { icon: Plane, label: "Flights" },
  hotel: { icon: BedDouble, label: "Hotel Accommodation" },
  transport: { icon: Car, label: "Airport Transfers & Transport" },
  meals: { icon: Utensils, label: "Meals Included" },
  sightseeing: { icon: Palmtree, label: "Sightseeing Tours" },
  guide: { icon: User, label: "Professional Guide" },
  visa: { icon: FileText, label: "Visa Assistance" },
  insurance: { icon: ShieldCheck, label: "Travel Insurance" },
  permit: { icon: Ticket, label: "Required Permits" },
  spa: { icon: Flower, label: "Spa & Wellness" },
  wifi: { icon: Wifi, label: "Wi-Fi Access" },
  veg: { icon: Leaf, label: "Vegetarian Meals" },
};

const tripExclusions = [
  "Personal expenses such as laundry, telephone calls, and tips.",
  "Any cost arising due to natural calamities like landslides, road blockage, etc.",
  "Travel insurance (unless specified).",
  "Any other services not specified in the inclusions.",
  "Entrance fees to monuments and museums (unless specified).",
  "Camera charges, alcoholic/non-alcoholic beverages and starters.",
];

export function PackageDetailModal({ pkg, children }: PackageDetailModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 flex flex-col max-h-[90vh] bg-card">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-headline text-2xl">{pkg.name}</DialogTitle>
        </DialogHeader>

        <div className="flex-grow min-h-0 overflow-y-auto">
          <div className="px-6">
            <Tabs defaultValue="outline" className="w-full">
              <TabsList className="grid w-full grid-cols-4 sticky top-0 bg-card pt-2 z-10">
                <TabsTrigger value="outline">Trip Outline</TabsTrigger>
                <TabsTrigger value="includes">Trip Includes</TabsTrigger>
                <TabsTrigger value="excludes">Trip Excludes</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="outline" className="mt-4">
                <div className="space-y-6">
                  {pkg.itinerary.map((day, dayIndex) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        {pkg.itinerary.length > dayIndex + 1 && (
                           <div className="w-px h-full bg-border"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold font-headline">{day.title}</h4>
                        <ul className="mt-1 ml-4 list-disc text-muted-foreground space-y-1">
                          {day.details.map((detail, index) => (
                             <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="includes" className="mt-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pkg.facilities?.map((facility) => {
                      const detail = facilityDetails[facility];
                      if (!detail) return null;
                      const Icon = detail.icon;
                      return (
                        <div key={facility} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{detail.label}</span>
                        </div>
                      );
                    })}
                 </div>
              </TabsContent>

              <TabsContent value="excludes" className="mt-4">
                <div className="space-y-3">
                  {tripExclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <span>{exclusion}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

               <TabsContent value="gallery" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="overflow-hidden rounded-lg shadow-md aspect-w-16 aspect-h-9">
                        <Image
                            src={pkg.image}
                            alt={`${pkg.name} gallery image`}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            data-ai-hint={pkg.dataAiHint}
                        />
                    </div>
                </div>
              </TabsContent>

            </Tabs>
          </div>
          
          <DialogFooter className="p-6 mt-4">
            <DialogClose asChild>
                <Button asChild>
                    <Link href="/contact">Book This Tour</Link>
                </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
