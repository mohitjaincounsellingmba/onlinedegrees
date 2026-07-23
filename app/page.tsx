import type { Metadata } from 'next';
import { HomePageClient } from '@/components/HomePageClient';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Compare UGC Approved Online Universities 2026 | Fees, Placements & Reviews",
  description: "Compare 27+ UGC-DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling.",
  keywords: [
    "online degrees India", "UGC approved online universities", "online MBA fees",
    "online BBA admission", "online MCA colleges", "online BCA degree",
    "distance education India UGC", "NAAC A++ online university",
    "Amity University online", "LPU online MBA", "Chandigarh University online"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Compare UGC Approved Online Universities 2026 | Online Shiksha",
    description: "Compare 27+ UGC-DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling.",
    url: "https://onlineshiksha.online",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Shiksha - Compare UGC Approved Online Universities 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare UGC Approved Online Universities 2026 | Online Shiksha",
    description: "Compare 27+ UGC-DEB approved online universities in India for 2026. Find fees, NAAC grades, programs (MBA, MCA, BBA, BCA) and get FREE expert counselling.",
    images: ["/og-image.webp"],
  },
};

const FAQ_ITEMS = [
  {
    q: 'Is an online degree from Indian universities valid?',
    a: 'Yes. Online degrees from UGC-DEB approved universities are fully valid and equivalent to regular degrees as per UGC regulations 2020. They are recognized by employers, government bodies, and for higher education and PSU jobs.',
  },
  {
    q: 'What is the fee for an online MBA in India in 2026?',
    a: 'Online MBA fees in India range from ₹62,200 (Andhra University) to ₹2,20,000 (SASTRA University) in 2026. The average fee for a reputed UGC-approved online MBA is around ₹1–1.8 Lakhs for 2 years.',
  },
  {
    q: 'Which is the best online university in India for MBA?',
    a: 'Top picks include Amity University Online (WES approved), LPU Online (NAAC A++), Chandigarh University (QS Ranked), Jain Univ Online (NAAC A++), and NMIMS Online (Top-5 B-school brand). Best choice depends on your budget and career goals.',
  },
  {
    q: 'Are UGC-DEB approved degrees accepted for government jobs?',
    a: 'Yes. As per UGC (ODL & Online Programmes) Regulations 2020, UGC-DEB approved online degrees hold equivalent status and are accepted for most government jobs, PSU recruitment, and higher education admissions.',
  },
  {
    q: 'Can I pursue an online MBA while working a full-time job?',
    a: 'Absolutely. Online MBA programs are built for working professionals — most universities offer weekend batches, recorded lectures, and self-paced modules so you can complete your degree without quitting your job.',
  },
  {
    q: 'What is the difference between online and distance education?',
    a: 'Online degrees (UGC-DEB mode) use live/recorded digital classes on an LMS platform. Distance education (ODL mode) traditionally uses printed study material with physical contact sessions. Both are UGC-recognized; online is more interactive.',
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomePageClient faqItems={FAQ_ITEMS} />
    </>
  );
}
