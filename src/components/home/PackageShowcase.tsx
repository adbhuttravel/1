import PackageCard from "@/components/shared/PackageCard";
import type { Package } from "@/lib/types";

interface PackageShowcaseProps {
  id: string;
  title: string;
  packages: Package[];
}

export default function PackageShowcase({ id, title, packages }: PackageShowcaseProps) {
  return (
    <section id={id} className="py-12 md:py-24 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2">
          {title}
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Curated itineraries to make your journey unforgettable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
