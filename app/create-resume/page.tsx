import { CreateResumeClient } from '@/components/CreateResumeClient';
import type { Metadata } from 'next';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free ATS Resume Builder for Online MBA, MCA & BCA Graduates 2026 | Online Shiksha",
  description: "Create a professional ATS-friendly resume in minutes with our free online resume builder. Perfect for online MBA, MCA, BCA graduates & freshers in India. Download PDF instantly — no sign-up needed.",
  keywords: [
    "free resume builder India",
    "ATS friendly resume maker",
    "ATS resume builder online free",
    "resume builder for freshers India 2026",
    "online MBA resume format",
    "MCA resume format 2026",
    "BCA resume format India",
    "resume format for online degree holders",
    "free CV maker India",
    "online resume builder download PDF",
    "professional resume builder no sign up",
    "resume for MBA graduates India",
    "how to make ATS resume India",
    "best free resume builder 2026"
  ],
  authors: [{ name: "Online Shiksha", url: "https://onlineshiksha.online" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://onlineshiksha.online/create-resume",
  },
  openGraph: {
    title: "Free ATS Resume Builder for MBA, MCA & BCA Graduates | Online Shiksha",
    description: "Build a professional, ATS-optimized resume in minutes. Free PDF download. Perfect for online MBA, MCA, and BCA graduates in India applying for jobs in 2026.",
    url: "https://onlineshiksha.online/create-resume",
    siteName: "Online Shiksha",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://onlineshiksha.online/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Free ATS Resume Builder – Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Builder for MBA, MCA & BCA Graduates | Online Shiksha",
    description: "Build a professional, ATS-optimized resume in minutes. Free PDF download. Perfect for online MBA, MCA, and BCA graduates in India.",
    images: ["https://onlineshiksha.online/og-image.webp"],
    site: "@onlineshiksha",
    creator: "@careerwithmohit",
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
        "name": "Free Resume Builder",
        "item": "https://onlineshiksha.online/create-resume"
      }
    ]
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Online Shiksha Free Resume Builder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "A free ATS-friendly resume builder designed for online MBA, MCA, and BCA graduates in India. Create and download a professional resume as PDF in minutes.",
    "url": "https://onlineshiksha.online/create-resume",
    "provider": {
      "@type": "Organization",
      "name": "Online Shiksha",
      "url": "https://onlineshiksha.online"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1240",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this resume builder completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our resume builder is 100% free. No sign-up, no hidden charges. You can build and download your resume as a PDF instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is this resume builder ATS-friendly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our resume template uses a clean, single-column, ATS-optimized format that is parseable by all major Applicant Tracking Systems used by Indian and global companies."
        }
      },
      {
        "@type": "Question",
        "name": "Can online MBA graduates use this resume builder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our resume builder is specifically designed keeping online MBA, MCA, and BCA graduates in mind. You can showcase your UGC-DEB approved degree, projects, internships, and skills professionally."
        }
      },
      {
        "@type": "Question",
        "name": "How do I download my resume as a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you fill in your details, click the 'Download PDF' button at the top right of the page. Your resume will be instantly saved as a professional PDF file."
        }
      },
      {
        "@type": "Question",
        "name": "What resume format is best for freshers in India 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For freshers, a clean single-page hybrid resume format works best. Highlight your education, internships, academic projects, certifications, and skills. Use our free builder to generate this format automatically."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free ATS Resume Builder for MBA, MCA & BCA Graduates",
    "description": "Build a professional ATS-friendly resume in minutes. Free PDF download. Designed for online MBA, MCA, and BCA graduates in India.",
    "url": "https://onlineshiksha.online/create-resume",
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Online Shiksha",
      "url": "https://onlineshiksha.online"
    },
    "about": {
      "@type": "Thing",
      "name": "ATS Resume Builder"
    },
    "datePublished": "2026-01-01",
    "dateModified": "2026-05-27"
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={webPageSchema} />
      <CreateResumeClient />
    </>
  );
}

