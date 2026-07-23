import { CompareClient } from '@/components/CompareClient';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Compare Online Universities 2026 | Fees, NAAC Grades & Reviews | Online Shiksha",
  description: "Compare fees, placements, approvals, and features of top UGC approved online universities in India for 2026.",
  keywords: [
    "compare online universities", "online MBA comparison", "UGC approved university comparison",
    "online college fee comparison", "NAAC A++ online colleges comparison"
  ],
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare Online Universities 2026 | Online Shiksha",
    description: "Compare fees, placements, approvals, and features of top UGC approved online universities.",
    url: "https://onlineshiksha.online/compare",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Compare Online Universities - Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Online Universities 2026 | Online Shiksha",
    description: "Compare fees, placements, approvals, and features of top UGC approved online universities.",
    images: ["/og-image.webp"],
  },
};

export default function ComparePage() {
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
        "name": "Compare Universities",
        "item": "https://onlineshiksha.online/compare"
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CompareClient />
    </>
  );
}
