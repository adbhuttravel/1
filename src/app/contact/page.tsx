
import ContactForm from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Adbhut Travel team. Find our office address, email, phone number, or use the contact form to plan your next trip.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-secondary py-8 md:py-12">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We'd love to hear from you. Whether you have a question about our packages or want to plan a custom trip, we're here to help.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-headline font-bold mb-4">Get in Touch</h2>
                    <p className="text-muted-foreground mb-6">Fill out the form and our team will get back to you within 24 hours.</p>
                </div>
                <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                           <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Our Office</h3>
                            <p className="text-muted-foreground">SCF 61, 1st Floor, Near Anaj Mandi Gate, Pehowa, Kurukshetra, Haryana-136128</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                           <Phone className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Call Us</h3>
                            <div className="text-muted-foreground space-y-1">
                                <Link href="tel:18008905147" className="block hover:text-accent">Toll Free: 1800 890 5147</Link>
                                <p>Whatsapp Number: (+91) 96718-25147</p>
                            </div>
                        </div>
                     </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/20 p-3 rounded-full">
                           <Mail className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                            <div className="space-y-2">
                                <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground/90">For General Inquiries:</span>
                                    <Link href="mailto:info@adbhuttravel.in" className="hover:text-accent ml-2">info@adbhuttravel.in</Link>
                                </p>
                                 <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground/90">For Sales related Inquiries:</span>
                                    <Link href="mailto:sales@adbhuttravel.in" className="hover:text-accent ml-2">sales@adbhuttravel.in</Link>
                                 </p>
                                 <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground/90">For Accounts related Inquiries:</span>
                                    <Link href="mailto:accounts@adbhuttravel.in" className="hover:text-accent ml-2">accounts@adbhuttravel.in</Link>
                                 </p>
                                 <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground/90">For Tie-up Inquiries:</span>
                                    <Link href="mailto:ops@adbhuttravel.in" className="hover:text-accent ml-2">ops@adbhuttravel.in</Link>
                                 </p>
                                <p className="text-muted-foreground">
                                    <span className="font-medium text-foreground/90">For Investment Related Inquiries:</span>
                                    <Link href="mailto:invest@adbhuttravel.in" className="hover:text-accent ml-2">invest@adbhuttravel.in</Link>
                                </p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            <ContactForm />
          </div>
          <div className="text-center mt-16">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
                <Link href="https://www.facebook.com/adbhuttravelagency" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-2 bg-primary/20 rounded-full transition-transform duration-300 hover:-translate-y-1">
                    <Facebook className="h-6 w-6" />
                </Link>
                <Link href="https://www.instagram.com/adbhut_travel_agency/?hl=en" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-2 bg-primary/20 rounded-full transition-transform duration-300 hover:-translate-y-1">
                    <Instagram className="h-6 w-6" />
                </Link>
                <Link href="https://www.youtube.com/watch?v=IfBDSc2Lb7U" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-2 bg-primary/20 rounded-full transition-transform duration-300 hover:-translate-y-1">
                    <Youtube className="h-6 w-6" />
                </Link>
                <Link href="https://www.linkedin.com/in/mohit-sharma-8517221b8/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-2 bg-primary/20 rounded-full transition-transform duration-300 hover:-translate-y-1">
                    <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="https://x.com/AdbhutTravel" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent p-2 bg-primary/20 rounded-full transition-transform duration-300 hover:-translate-y-1">
                    <Twitter className="h-6 w-6" />
                </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container max-w-2xl mx-auto text-center">
            <h3 className="font-headline font-semibold mb-2 text-2xl">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-6">Stay updated with our latest travel deals, destinations, and stories. No spam, just travel inspiration.</p>
            <NewsletterForm />
        </div>
      </section>
      <section className="pb-12 md:pb-16">
        <div className="container">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d442340.13377289276!2d76.584489!3d29.985686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e25af861f3c3f%3A0x199d26fab984e138!2sAdbhut%20Travel%20%26%20Event%20Pvt%20Ltd!5e0!3m2!1sen!2sus!4v1750874273315!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Adbhut Travel Location on Google Maps"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
