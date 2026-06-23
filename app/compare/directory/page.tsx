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
    canonical: "https://onlineshiksha.online/compare/directory",
  },
  openGraph: {
    title: "University Comparison Directory 2026 | Online Shiksha",
    description: "Compare fees, placement packages, ratings, and learning systems for all 34 top UGC approved online universities.",
    type: "website",
    url: "https://onlineshiksha.online/compare/directory",
  }
};

export default function ComparisonDirectoryPage() {
  // Breadcrumb schema for structured rich results
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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ComparisonDirectoryClient />
    </>
  );
}
