
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[calc(80vh)] w-full">
      <Image
        src="/images/services/Home/Home Page Hero.jpeg"
        alt="Tropical beach background"
        fill
        priority
        className="object-cover"
        data-ai-hint="tropical beach"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-white leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
          Discover Your Next Adventure
        </h1>
        <p className="mt-4 max-w-3xl text-lg md:text-xl text-gray-200 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
          Explore the world's most breathtaking destinations with Adbhut Travel. From exotic beaches to thrilling mountain treks, we curate unforgettable travel experiences tailored just for you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 transition-transform duration-300 hover:-translate-y-1">
                <Link href="/#domestic-packages">Explore Packages</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

    