
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CookieConsentBanner } from "@/components/shared/CookieConsentBanner";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import "./globals.css";
import { ScrollToBottomButton } from "@/components/shared/ScrollToBottomButton";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { PT_Sans, Playfair_Display } from 'next/font/google';
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import Script from "next/script";
// Forces public/images/media/* to be traced into the Firebase deploy bundle.
import { siteMediaFiles } from "@/lib/site-media";

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adbhuttravel.com'),
  title: {
    default: "Adbhut Travel And Event Pvt. Ltd.",
    template: "%s | Adbhut Travel",
  },
  description: "Explore breathtaking destinations with Adbhut Travel. We curate unforgettable, personalized travel packages and itineraries, from exotic beaches to mountain treks.",
  icons: {
    icon: "/images/media/A fevicon.ico",
  },
  openGraph: {
    title: "Adbhut Travel | Unforgettable Journeys & Custom Itineraries",
    description: "Explore the world's most breathtaking destinations with Adbhut Travel.",
    url: 'https://adbhuttravel.com',
    siteName: 'Adbhut Travel',
    images: [
      {
        url: '/images/home/hero.jpeg', // Default OG image
        width: 1200,
        height: 630,
        alt: 'A beautiful tropical beach with a boat, representing travel destinations.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adbhut Travel | Unforgettable Journeys & Custom Itineraries",
    description: "Explore the world's most breathtaking destinations with Adbhut Travel.",
     images: ['/images/home/hero.jpeg'], // Default Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.variable} ${playfairDisplay.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="facebook-domain-verification" content="f2c3wtdfb1s7oi06s2le3iiwtx3tlt" />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '534515503076183');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=534515503076183&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen bg-background" data-asset-count={siteMediaFiles.length}>
        <CustomCursor />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CookieConsentBanner />
        <Toaster />
        <ScrollToTopButton />
        <ScrollToBottomButton />
        <WhatsAppButton />
      </body>
    </html>
  );
}
