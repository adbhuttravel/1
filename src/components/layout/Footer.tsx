
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Twitter, Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <footer className="bg-primary text-secondary-foreground border-t">
       <div className="container pt-16 pb-8">
            {isHomePage && (
                <div className="mb-12">
                    <h2 className="text-3xl font-headline font-bold text-center mb-8">Discover Adbhut Travel</h2>
                    <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
                         <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/IfBDSc2Lb7U"
                            title="ADBHUT Profile Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
            <div className="mb-12 text-center">
                 <Image src="/images/services/Home/Adbhut-Affilications-Cetifications.png" alt="Accreditations" width={1200} height={100} className="mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
                {/* Company Info */}
                <div className="space-y-4">
                    <Logo />
                    <p className="font-bold">Adbhut Travel And Event Pvt. Ltd.</p>
                    <p className="text-muted-foreground">Our Effort Your Comfort</p>
                    <p className="text-muted-foreground text-xs">CIN: U63090HR2020PTC086874</p>
                    <div className="flex space-x-3 pt-2">
                        <Link href="https://www.facebook.com/adbhuttravelagency" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5 inline-block"><Facebook /></Link>
                        <Link href="https://www.instagram.com/adbhut_travel_agency/?hl=en" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5 inline-block"><Instagram /></Link>
                        <Link href="https://www.youtube.com/watch?v=IfBDSc2Lb7U" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5 inline-block"><Youtube /></Link>
                        <Link href="https://www.linkedin.com/in/mohit-sharma-8517221b8/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5 inline-block"><Linkedin /></Link>
                        <Link href="https://x.com/AdbhutTravel" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-all duration-200 hover:-translate-y-0.5 inline-block"><Twitter /></Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                    <h3 className="font-headline font-semibold text-lg">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/mice" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">MICE</Link></li>
                        <li><Link href="/offers" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Offers</Link></li>
                        <li><Link href="/updates" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Updates</Link></li>
                        <li><Link href="/about" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">About Us</Link></li>
                        <li><Link href="/services" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Services</Link></li>
                        <li><Link href="/investment" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Investment</Link></li>
                    </ul>
                </div>

                 {/* Legal Links */}
                <div className="space-y-3">
                    <h3 className="font-headline font-semibold text-lg">Legal</h3>
                     <ul className="space-y-2">
                        <li><Link href="/csr" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">CSR</Link></li>
                        <li><Link href="/career" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Careers</Link></li>
                        <li><Link href="/legal" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Legal Information</Link></li>
                        <li><Link href="/cancellation-policy" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Refund Policy</Link></li>
                        <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-accent animated-underline inline-block transition-all duration-200 hover:-translate-y-0.5">Policy & Terms of Service</Link></li>
                    </ul>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                    <h3 className="font-headline font-semibold text-lg">Contact</h3>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3 transition-all duration-200 hover:-translate-y-0.5">
                            <MapPin className="w-5 h-5 mt-1 text-accent flex-shrink-0"/>
                            <Link href="https://maps.app.goo.gl/PQE2gRmZKpLUZY7U9" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                                SCF 61, 1st Floor, Near Anaj Mandi Gate, Pehowa, Kurukshetra, Haryana-136128
                            </Link>
                        </li>
                        <li className="flex items-start gap-3 transition-all duration-200 hover:-translate-y-0.5">
                            <Phone className="w-5 h-5 mt-1 text-accent flex-shrink-0"/>
                            <div>
                                <Link href="tel:18008905147" className="hover:text-accent">Toll Free: 1800 890 5147</Link><br/>
                                <Link href="tel:+919671825147" className="hover:text-accent">Mobile: +91-9671825147</Link>
                            </div>
                        </li>
                         <li className="flex items-start gap-3 transition-all duration-200 hover:-translate-y-0.5">
                            <Mail className="w-5 h-5 mt-1 text-accent flex-shrink-0"/>
                            <Link href="mailto:info@adbhuttravel.in" className="hover:text-accent">info@adbhuttravel.in</Link>
                        </li>
                    </ul>
                </div>
            </div>
       </div>
       <div className="bg-secondary/50 text-foreground border-t">
           <div className="container py-4">
                <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Adbhut Travel And Event Pvt. Ltd. All Rights Reserved.</p>
                </div>
           </div>
       </div>
    </footer>
  );
}
