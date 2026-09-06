import { Suspense } from 'react';
import type { Metadata } from 'next';
import { InquiryPageClient } from '@/components/InquiryPageClient';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Online Degree Admission Guidance 2026 | MBA, Executive MBA, BBA, MCA, BCA | Online Shiksha",
  description: "Get free personalized admission guidance for UGC-DEB approved Online MBA, Executive MBA, Online BBA, Online MCA, and Online BCA. Compare fees, scholarships, and 100% placement support from senior advisor Mohit Jain.",
  keywords: [
    "online mba admissions 2026",
    "executive mba online admission",
    "online bba admission guidance",
    "online mca colleges placement",
    "online bca course fees",
    "ugc approved online degrees india",
    "distance mba admission counselor mohit jain"
  ],
  alternates: {
    canonical: "/inquiry/",
  },
  openGraph: {
    title: "Online Degree Admission Guidance 2026 | Online MBA, Executive MBA, BBA, MCA, BCA",
    description: "Get free personalized admission guidance for UGC-DEB approved Online MBA, Executive MBA, Online BBA, Online MCA, and Online BCA. Compare fees, scholarships, and 100% placement support.",
    url: "https://onlineshiksha.online/inquiry/",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Shiksha Degree Admission Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Degree Admission Guidance 2026 | Online Shiksha",
    description: "Compare UGC-DEB approved Online MBA, Executive MBA, BBA, MCA, and BCA programs. Free counseling by Mohit Jain.",
    images: ["/og-image.webp"],
  },
};

export default function InquiryPage() {
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
        "name": "Admission Inquiry",
        "item": "https://onlineshiksha.online/inquiry/"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": "Online Degree Admission Guidance & University Shortlisting",
    "description": "Free personalized counseling for Online MBA, Executive MBA, Online BBA, Online MCA, and Online BCA admissions across top UGC-DEB recognized universities.",
    "provider": {
      "@type": "Organization",
      "name": "Online Shiksha",
      "url": "https://onlineshiksha.online/"
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading guidance form...</div>}>
        <InquiryPageClient />
      </Suspense>
    </>
  );
}
