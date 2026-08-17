import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { House, ChevronRight, Timer, ShieldCheck, Award, GraduationCap } from 'lucide-react';
import { NdimCounsellingExamClient } from '@/components/NdimCounsellingExamClient';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "NDIM Delhi Counselling Exam 2026 | Master Counselor Training Quiz",
  description: "Take the official NDIM Delhi Counselling Exam & Training Quiz. 85 assessment questions across Beginner, Intermediate, and Advanced strategies with strict anti-cheat tracking.",
  keywords: [
    "NDIM Delhi counselling exam", "NDIM master counselor training quiz",
    "NDIM quiz 85 questions", "online counselling test NDIM",
    "NDIM admission guidance mock", "anti cheat counselor quiz"
  ],
  alternates: {
    canonical: "/ndim-counselling-exam/",
  },
  openGraph: {
    title: "NDIM Delhi Counselling Exam 2026 | Master Counselor Training Quiz",
    description: "Take the official NDIM Delhi Counselling Exam & Training Quiz. 85 assessment questions with strict anti-cheat tracking.",
    url: "https://onlineshiksha.online/ndim-counselling-exam",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "NDIM Counselling Exam - Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NDIM Delhi Counselling Exam 2026 | Master Counselor Training Quiz",
    description: "Take the official NDIM Delhi Counselling Exam & Training Quiz. 85 assessment questions with strict anti-cheat tracking.",
    images: ["/og-image.webp"],
  },
};

export default function NdimCounsellingExamPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the structure of the NDIM Master Counselor Training Quiz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The training quiz comprises 85 questions split into four categories: Beginner Level (20 questions), Intermediate Level (20 questions), Advanced & Global Strategy (20 questions), and Global & Technical Excellence (25 questions)."
        }
      },
      {
        "@type": "Question",
        "name": "How much time is allowed for the NDIM Counselling Exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A total duration of 45 minutes is provided to answer all 85 multiple-choice questions. Unsubmitted tests will be auto-submitted when the countdown timer hits zero."
        }
      },
      {
        "@type": "Question",
        "name": "What are the rules regarding window focus and tab switching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The exam is fully anti-cheat protected. Switching tabs, losing focus, or exiting full-screen mode twice will result in immediate termination of the quiz batch."
        }
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NDIM Delhi Counselling Exam Console",
    "description": "Interactive online quiz training platform for NDIM master counselor validation containing 85 questions.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

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
        "name": "NDIM Counselling Exam",
        "item": "https://onlineshiksha.online/ndim-counselling-exam"
      }
    ]
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={appSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="flex-grow pb-24 md:pb-32 bg-[#fdfdfb] font-sans pt-24">
        {/* Header Block */}
        <div className="bg-white border-b-8 border-black py-16 px-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#ff007f]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <li className="flex items-center">
                  <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
                    <House className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <span className="text-black" aria-current="page">NDIM Counselling Exam</span>
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] text-xs font-black uppercase px-4 py-1.5 rounded-full mb-4 border-2 border-black">
                <GraduationCap className="w-4 h-4" /> Counselor Training Portal
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-black">
                NDIM Delhi <span className="text-[#00ffa3] underline decoration-[12px] decoration-black underline-offset-8">Counselling</span> Exam
              </h1>
              <p className="text-xl md:text-2xl font-bold text-slate-700 leading-tight border-l-[12px] border-[#00ffa3] pl-8">
                Official NDIM Master Counselor Training Quiz. Includes 85 testing questions covering NDIM fundamentals, curriculum USP, placements, and advanced counseling dynamics.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-[#ccff00]/15 border-4 border-black px-5 py-3 flex items-center gap-3 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <Timer className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">45 Minutes Limit</span>
                </div>
                <div className="bg-[#ff007f]/15 border-4 border-black px-5 py-3 flex items-center gap-3 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">Strict Tab Lock active</span>
                </div>
                <div className="bg-[#00ffa3]/15 border-4 border-black px-5 py-3 flex items-center gap-3 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <Award className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">85 Questions Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Test Component Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <NdimCounsellingExamClient />
        </div>
      </main>
    </>
  );
}
