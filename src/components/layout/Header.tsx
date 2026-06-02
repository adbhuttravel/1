
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/mice", label: "MICE" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact Us" },
];

const morePageLinks = [
    { href: "/csr", label: "CSR" },
    { href: "/offers", label: "Offers" },
    { href: "/updates", label: "Updates" },
    { href: "/investment", label: "Investment" },
    { href: "/affiliations", label: "Affiliations" },
    { href: "/trademarks", label: "Trademarks" },
    { href: "https://northcabs.in", label: "Cab Booking" },
    { href: "https://adbhuttravel.in/visitkurukshetra.in.pdf", label: "Visit Kurukshetra" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerHeightClass = isMounted && scrolled ? 'h-24' : 'h-20';
  const navGapClass = isMounted && scrolled ? 'gap-8' : 'gap-5';


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 bg-primary backdrop-blur-sm shadow-md"
      )}>
      <div className={cn("container flex items-center justify-between transition-all duration-300", headerHeightClass)}>
        <div className="flex-shrink-0">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow items-center justify-center">
            <nav className={cn("flex items-center transition-all duration-500", navGapClass)}>
            {navLinks.map(({ href, label }) => (
                <Link
                key={href}
                href={href}
                className={cn(
                    "text-base font-bold pb-1 text-primary-foreground animated-underline",
                    pathname === href ? "text-accent" : ""
                )}
                >
                {label}
                </Link>
            ))}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <button className={cn(
                    "text-base font-bold pb-1 flex items-center gap-1 group text-primary-foreground animated-underline",
                     morePageLinks.some(link => pathname.startsWith(link.href)) ? "text-accent" : ""
                )}>
                    More
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                {morePageLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                    <Link 
                        href={link.href} 
                        className="w-full"
                        {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                        {link.label}
                    </Link>
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
            </nav>
        </div>


        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex" size="lg">
            <Link href="/contact">Get Free Consultation</Link>
          </Button>
          
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-2 text-lg font-medium mt-8">
                <Link href="/" className="mb-4">
                   <Logo />
                </Link>
                {navLinks.map(({ href, label }) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "block px-4 py-2 rounded-md hover:text-accent hover:bg-muted transition-colors",
                        pathname === href ? "text-foreground bg-muted" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="border-t pt-4 mt-2">
                     <h3 className="px-4 py-2 text-sm font-semibold text-muted-foreground">More Options</h3>
                     {morePageLinks.map((link) => (
                         <SheetClose asChild key={link.href}>
                             <Link 
                                href={link.href} 
                                className={cn("block px-4 py-2 rounded-md hover:text-accent hover:bg-muted transition-colors text-muted-foreground", pathname === link.href && "text-foreground bg-muted" )}
                                {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                             >
                                 {link.label}
                            </Link>
                         </SheetClose>
                     ))}
                </div>
                <div className="border-t pt-6 mt-4">
                    <SheetClose asChild>
                        <Button asChild className="w-full">
                            <Link href="/contact">Get Free Consultation</Link>
                        </Button>
                    </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
