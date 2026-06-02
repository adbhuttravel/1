
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Offer {
    title: string;
    imageUrl: string;
    dataAiHint: string;
}

interface OfferModalProps {
  offer: Offer;
  children: React.ReactNode;
}

export function OfferModal({ offer, children }: OfferModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="font-headline">{offer.title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
             <Image
                src={offer.imageUrl}
                alt={offer.title}
                fill
                className="object-contain"
                data-ai-hint={offer.dataAiHint}
            />
          </div>
        </div>
        <DialogFooter className="p-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button asChild>
            <Link href="/contact">Book Now</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
