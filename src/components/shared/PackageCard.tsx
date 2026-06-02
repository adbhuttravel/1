import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plane, Utensils, BedDouble, Wifi, Car, Leaf, LandPlot, Palmtree, FerrisWheel, HandPlatter, Earth, Ticket, ShieldCheck, FileText, MountainSnow, Flower, User, Users } from "lucide-react";
import type { Package, Facility } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PackageDetailModal } from "./PackageDetailModal";

interface PackageCardProps {
  pkg: Package;
}

const facilityIcons: Record<Facility, React.ElementType> = {
  flight: Plane,
  hotel: BedDouble,
  transport: Car,
  meals: Utensils,
  sightseeing: Palmtree,
  guide: User,
  visa: FileText,
  insurance: ShieldCheck,
  permit: Ticket,
  spa: Flower,
  wifi: Wifi,
  veg: Leaf
};

const iconColors = [
    "text-chart-1",
    "text-chart-2",
    "text-chart-3",
    "text-chart-4",
    "text-chart-5",
];

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-card border">
      <CardHeader className="p-0">
        <Image
          src={pkg.image}
          alt={pkg.name}
          width={600}
          height={400}
          className="w-full h-56 object-cover"
          data-ai-hint={pkg.dataAiHint}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 min-h-[3rem]">{pkg.name}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="w-4 h-4 mr-1.5"/>
            <span>{pkg.duration}</span>
        </div>
         {pkg.packageType && (
          <p className="text-sm text-muted-foreground mt-1">Package Type - {pkg.packageType}</p>
        )}
      </CardContent>

      {pkg.facilities && pkg.facilities.length > 0 && (
        <div className="px-4 pb-4 border-t pt-4">
          <div className="flex items-center gap-4 flex-wrap">
            {pkg.facilities.slice(0, 5).map((facility, index) => {
                const Icon = facilityIcons[facility];
                if (!Icon) return null;
                const colorClass = iconColors[index % iconColors.length];
                return <Icon key={facility} className={cn("w-6 h-6", colorClass)} aria-label={facility}/>;
            })}
             {pkg.facilities.length > 5 && (
              <span className="text-sm text-muted-foreground">+ {pkg.facilities.length - 5} more</span>
            )}
          </div>
        </div>
      )}

      <CardFooter className="p-4 pt-0 flex justify-end items-center">
        <PackageDetailModal pkg={pkg}>
           <Button>Get Free Quote</Button>
        </PackageDetailModal>
      </CardFooter>
    </Card>
  );
}
