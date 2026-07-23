import { EmiCalculatorClient } from '@/components/EmiCalculatorClient';
import type { Metadata } from 'next';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Online Degree Course EMI Calculator 2026 | Online Shiksha",
  description: "Calculate your education loan monthly installments with our free online degree EMI calculator. Check No Cost EMI options for MBA, MCA, BBA, and BCA programs.",
  keywords: [
    "education EMI calculator", "college fee EMI calculator", 
    "no cost education EMI", "online degree EMI calculator", 
    "online MBA EMI calculator"
  ],
  alternates: {
    canonical: "/emi-calculator",
  },
  openGraph: {
    title: "Online Degree Course EMI Calculator 2026 | Online Shiksha",
    description: "Calculate your education loan monthly installments with our free online degree EMI calculator. Check No Cost EMI options for MBA, MCA, BBA, and BCA programs.",
    url: "https://onlineshiksha.online/emi-calculator",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Degree Course EMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Degree Course EMI Calculator 2026 | Online Shiksha",
    description: "Calculate your education loan monthly installments with our free online degree EMI calculator.",
    images: ["/og-image.webp"],
  },
};

export default function EmiCalculator() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://onlineshiksha.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "EMI Calculator",
        "item": "https://onlineshiksha.online/emi-calculator"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Online Degree Course EMI Calculator",
    "url": "https://onlineshiksha.online/emi-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webAppSchema} />
      <EmiCalculatorClient />
    </>
  );
}
