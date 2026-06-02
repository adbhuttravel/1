
import Image from "next/image";
import { Logo } from "@/components/shared/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trademarks",
  description: "View the official registered trademarks, service marks, wordmarks, and logos owned by Adbhut Travel And Event Private Limited.",
};

const logos = [
  { src: '/images/services/Trademarks/Adbhut Travel Agency Logo.png', alt: 'Adbhut Travel Agency Logo', width: 250, height: 80 },
  { src: '/images/services/Trademarks/adbhut.png', alt: 'Adbhut Wordmark Logo', width: 250, height: 80 },
  { src: '/images/services/Trademarks/visitkurukshetra_logo.png', alt: 'VisitKurukshetra.in Logo', width: 250, height: 80 },
  { src: '/images/services/Trademarks/Adbhut-Foundation.png', alt: 'Adbhut Foundation Logo', width: 250, height: 80 },
  { src: '/images/services/Trademarks/NorthCabs.png', alt: 'North Cabs Logo', width: 200, height: 80 },
  { src: '/images/services/Trademarks/Home2Home.png', alt: 'Home2Home Logo', width: 250, height: 80 },
];

const wordmarks = [
  "ADBHUT TRAVEL AGENCY",
  "ADBHUT",
  "VisitKurukshetra",
  "ADBHUT FOUNDATION",
  "NORTH CABS",
  "Home2Home",
  "Our effort your comfort"
];

export default function TrademarksPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl font-headline font-bold mb-8">Trademarks</h1>
      <div className="space-y-10 text-muted-foreground">
        <p>
          You may not use or register, in whole or in part, any Adbhut owned trademark, service mark, wordmark, graphic symbols, logos, icons, or an alteration thereof. Provided below is an illustrative list of all trademarks that have been filed and/or registered by Adbhut Travel And Private Limited / Mohit Sharma.
        </p>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Logos</h2>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            {logos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-12 w-auto object-contain"
                />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-2xl font-headline font-semibold text-foreground">Wordmarks</h2>
            <ul className="list-disc pl-5 space-y-2 border-l-2 border-primary ml-2 pl-6">
                {wordmarks.map((mark) => (
                    <li key={mark}>{mark}</li>
                ))}
            </ul>
        </div>

        <p className="text-sm">
          <span className="font-semibold text-foreground">Note:</span> External parties willing to use any of the above listed Adbhut trademarks are required to get written permission from Adbhut Travel And Event Private Limited by writing to the management.
        </p>
      </div>
    </div>
  );
}

    