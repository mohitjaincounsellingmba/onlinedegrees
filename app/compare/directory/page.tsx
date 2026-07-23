import type { Metadata } from 'next';
import { ComparisonDirectoryClient } from '@/components/ComparisonDirectoryClient';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "University Comparison Directory 2026: Compare Online Colleges | Online Shiksha",
  description: "Browse all 561 side-by-side comparison combinations of top UGC-DEB approved online universities. Compare fees, placement packages, ratings, and learning systems.",
  keywords: [
    "online university directory",
    "compare online colleges India 2026",
    "online MBA comparison index",
    "UGC approved universities comparison",
    "Online Shiksha directory"
  ],
  alternates: {
    canonical: "/compare/directory",
  },
  openGraph: {
    title: "University Comparison Directory 2026 | Online Shiksha",
    description: "Compare fees, placement packages, ratings, and learning systems for all top UGC approved online universities.",
    type: "website",
    url: "https://onlineshiksha.online/compare/directory",
    siteName: "Online Shiksha",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "University Comparison Directory 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "University Comparison Directory 2026 | Online Shiksha",
    description: "Compare fees, placement packages, ratings, and learning systems for all top UGC approved online universities.",
    images: ["/og-image.webp"],
  },
};

export default function ComparisonDirectoryPage() {
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Directory",
        "item": "https://onlineshiksha.online/compare/directory"
      }
    ]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "University Comparison Directory 2026",
    "description": "Browse all 561 side-by-side comparison combinations of top UGC-DEB approved online universities.",
    "url": "https://onlineshiksha.online/compare/directory",
    "numberOfItems": 561
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <ComparisonDirectoryClient />
    </>
  );
}
