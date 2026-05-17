import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InstagramGallery } from "@/components/InstagramGallery";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";
import { InquiryPopup } from "@/components/InquiryPopup";
import { BotInquiryPopup } from "@/components/BotInquiryPopup";
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlinedegreehub.in"),
  title: {
    default: "Online Degree Hub | UGC Approved Online Universities 2026",
    template: "%s | Online Degree Hub",
  },
  description: "Compare 27+ UGC-DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling.",
  keywords: [
    "online degrees India", "UGC approved online universities", "online MBA fees",
    "online BBA admission", "online MCA colleges", "online BCA degree",
    "distance education India UGC", "NAAC A++ online university",
    "Amity University online", "LPU online MBA", "Chandigarh University online"
  ],
  authors: [{ name: "Online Degree Hub" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.onlinedegreehub.in",
    siteName: "OnlineDegreeHub",
    title: "Online Degree Hub | UGC Approved Online Universities 2026",
    description: "Compare India's top online universities on fees, accreditation, and programs.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Degree Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Degree Hub | UGC Approved Online Universities 2026",
    description: "Compare India's top online universities on fees, accreditation, and programs.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Online Degree Hub",
    "url": "https://www.onlinedegreehub.in",
    "logo": "https://www.onlinedegreehub.in/logo.webp",
    "image": "https://www.onlinedegreehub.in/og-image.webp",
    "telephone": "+91-9560020771",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi NCR",
      "addressCountry": "IN"
    },
    "areaServed": [
      "Delhi", "Noida", "Gurgaon", "Pune", "Mumbai", "Bangalore", "Jaipur", "Chennai", "Kolkata"
    ],
    "priceRange": "$$"
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Online Degree Hub",
    "url": "https://www.onlinedegreehub.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.onlinedegreehub.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationData} />
        <JsonLd data={websiteData} />
      </head>
      <body
        className={`${outfit.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Header />
        <InquiryPopup />
        <BotInquiryPopup />
        <main className="flex-grow">
          {children}
        </main>
        <Footer instagramGallery={<InstagramGallery />} />
        
        {/* Combined Google Analytics and Ads Tag */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-448JRKP87B"}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics-ads" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-448JRKP87B"}');
            gtag('config', 'AW-18052249575');
          `}
        </Script>
      </body>
    </html>
  );
}
