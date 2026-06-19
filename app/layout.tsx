import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import Script from "next/script";
import { InquiryPopup } from "@/components/InquiryPopup";
import { BotInquiryPopup } from "@/components/BotInquiryPopup";

export const metadata: Metadata = {
  metadataBase: new URL("https://onlineshiksha.online"),
  title: {
    default: "Online Shiksha | UGC Approved Online Universities 2026",
    template: "%s | Online Shiksha",
  },
  description: "Compare 27+ UGC-DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling.",
  keywords: [
    "online degrees India", "UGC approved online universities", "online MBA fees",
    "online BBA admission", "online MCA colleges", "online BCA degree",
    "distance education India UGC", "NAAC A++ online university",
    "Amity University online", "LPU online MBA", "Chandigarh University online"
  ],
  authors: [{ name: "Online Shiksha" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://onlineshiksha.online",
    siteName: "OnlineShiksha",
    title: "Online Shiksha | UGC Approved Online Universities 2026",
    description: "Compare India's top online universities on fees, accreditation, and programs.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Shiksha | UGC Approved Online Universities 2026",
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
    "name": "Online Shiksha",
    "url": "https://onlineshiksha.online",
    "logo": "https://onlineshiksha.online/logo.webp",
    "image": "https://onlineshiksha.online/og-image.webp",
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
    "name": "Online Shiksha",
    "url": "https://onlineshiksha.online",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://onlineshiksha.online/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder"} />
        <JsonLd data={organizationData} />
        <JsonLd data={websiteData} />
      </head>
      <body
        className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground"
      >
        <Header />
        <InquiryPopup />
        <BotInquiryPopup />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
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
