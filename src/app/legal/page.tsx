
import { FileText, Shield, Gavel, Award, Gem, ListTree, Building, Phone, Mail, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "Legal Information",
  description: "Find legal documents, affiliations, and trademark information for Adbhut Travel.",
};

const legalLinks = [
    {
        href: "/terms-of-service",
        icon: Gavel,
        title: "Policy & Terms of Service",
        description: "Read the terms, conditions, and policies that govern your use of our website and booking services."
    },
    {
        href: "/cancellation-policy",
        icon: FileText,
        title: "Refund Policy",
        description: "Understand the terms for cancelling or modifying your booking, and how refunds are processed."
    },
    {
        href: "/affiliations",
        icon: Award,
        title: "Affiliations & Accreditations",
        description: "View our official affiliations, showcasing our commitment to industry standards and quality service."
    },
    {
        href: "/trademarks",
        icon: Gem,
        title: "Trademarks",
        description: "See the registered trademarks and wordmarks owned by Adbhut Travel And Event Private Limited."
    }
];

const legalDetails = [
    { title: "Disclaimer", content: "Adbhut Travel & Event Pvt. Ltd. (\"we\", \"our\", or \"us\") provides this website for informational purposes only. By accessing this site, you agree to the terms outlined in this legal section. All travel itineraries, prices, services, and availability are subject to change without prior notice. While we strive for accuracy, we do not guarantee the completeness or reliability of any information on the website. Users are advised to verify all details with our team before making any bookings." },
    { title: "Copyright and Trademark", content: "All content on this website, including text, graphics, logos, and images, is the property of Adbhut Travel & Event Pvt. Ltd., unless otherwise stated. The use of our brand name, logo, or registered trademarks without written permission is strictly prohibited." },
    { title: "Privacy and Data Protection", content: "We value your privacy. All data collected via this website is handled in accordance with our Privacy Policy. Personal information will not be shared with third parties without your consent, unless required by law." },
    { title: "Limitation of Liability", content: "Adbhut Travel & Event Pvt. Ltd. shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or travel services, including delays, cancellations, or loss of data." },
    { title: "Jurisdiction", content: "All disputes arising from the use of this website or our services shall be subject to the exclusive jurisdiction of the courts in Kurukshetra, Haryana, India." }
];

export default function LegalPage() {
  return (
    <>
      <section className="bg-secondary py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Legal Information</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Important documents, policies, and information about our company.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
            <Card className="mb-12 shadow-lg border-2 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl md:text-3xl text-center">Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center md:text-left">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                        <p className="flex items-center justify-center md:justify-start gap-3">
                            <Building className="w-5 h-5 text-accent"/>
                            <span className="font-semibold">Company Name:</span>
                            <span>Adbhut Travel And Event Private Limited</span>
                        </p>
                         <p className="flex items-center justify-center md:justify-start gap-3">
                            <Shield className="w-5 h-5 text-accent"/>
                            <span className="font-semibold">CIN:</span>
                            <span>U63090HR2020PTC086874</span>
                        </p>
                    </div>
                     <p className="flex items-center justify-center md:justify-start gap-3">
                        <Phone className="w-5 h-5 text-accent"/>
                        <span className="font-semibold">Contact:</span>
                        <Link href="tel:+919802125147" className="hover:text-accent">+91 9802125147</Link>
                         | 
                        <Link href="mailto:info@adbhuttravel.com" className="hover:text-accent">info@adbhuttravel.com</Link>
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-3">
                        <Globe className="w-5 h-5 text-accent"/>
                        <span className="font-semibold">Website:</span>
                        <Link href="https://www.adbhuttravel.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">www.adbhuttravel.com</Link>
                    </p>
                     <div className="border-t pt-4 mt-4">
                        <p className="font-semibold text-lg text-accent">Registered Office:</p>
                        <p className="text-muted-foreground">SCF 61, 1st Floor, Near Anaj Mandi Gate, Pehowa, Kurukshetra, Haryana - 136128, India</p>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-8 mb-16">
                {legalDetails.map(detail => (
                    <div key={detail.title}>
                        <h2 className="text-2xl font-headline font-bold border-b-2 border-accent/30 pb-2 mb-4">{detail.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">{detail.content}</p>
                    </div>
                ))}
            </div>
            
           <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 border-t border-dashed pt-12">
                {legalLinks.map((link) => (
                     <Link href={link.href} key={link.title}>
                        <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                            <CardHeader className="flex-row items-center gap-4">
                                <link.icon className="w-8 h-8 text-accent"/>
                                <CardTitle className="font-headline">{link.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{link.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
           </div>
           <div className="mt-12 text-center text-muted-foreground text-sm">
                <p>If you have any questions regarding our legal policies, please <Link href="/contact" className="text-accent underline underline-offset-4 hover:text-accent/80">contact us</Link>.</p>
           </div>
        </div>
      </section>
    </>
  );
}
