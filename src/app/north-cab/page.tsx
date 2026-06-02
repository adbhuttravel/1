import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "North Cab by Adbhut",
  description: "Our premier cab booking service, North Cab, is coming soon. Stay tuned for reliable and comfortable travel options across North India.",
};

export default function NorthCabPage() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-headline font-bold">North Cab by Adbhut</h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
        Our premier cab booking service is coming soon. Stay tuned for reliable and comfortable travel options across North India.
      </p>
    </div>
  );
}
