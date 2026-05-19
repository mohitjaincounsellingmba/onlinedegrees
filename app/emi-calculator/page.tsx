import { EmiCalculatorClient } from '@/components/EmiCalculatorClient';
import type { Metadata } from 'next';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Online Degree Course EMI Calculator | Online Shiksha",
  description: "Calculate your education loan monthly installments with our free online degree EMI calculator. Check No Cost EMI options for MBA, MCA, BBA, and BCA programs.",
  keywords: [
    "education EMI calculator", "college fee EMI calculator", 
    "no cost education EMI", "online degree EMI calculator", 
    "online MBA EMI calculator"
  ],
  alternates: {
    canonical: "/emi-calculator",
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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <EmiCalculatorClient />
    </>
  );
}
