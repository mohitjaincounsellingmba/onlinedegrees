import { CreateResumeClient } from '@/components/CreateResumeClient';
import type { Metadata } from 'next';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free ATS Resume Builder for Students & Professionals | Online Shiksha",
  description: "Create a professional, ATS-friendly resume in minutes with our free resume builder. Perfect for online MBA, MCA, and BCA graduates applying for jobs.",
  keywords: [
    "free resume builder", "ATS friendly resume maker", 
    "online CV creator", "resume builder for freshers", 
    "resume format for MBA graduates"
  ],
  alternates: {
    canonical: "/create-resume",
  },
};

export default function CreateResumePage() {
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
        "name": "Resume Builder",
        "item": "https://onlineshiksha.online/create-resume"
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CreateResumeClient />
    </>
  );
}
