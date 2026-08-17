import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { House, ChevronRight, Timer, ShieldCheck, CheckSquare, Award } from 'lucide-react';
import { LiveTestClient } from '@/components/LiveTestClient';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Online Live Test 2026 | Anti-Cheat Exam Simulator | Online Shiksha",
  description: "Take the official Online Live Test. Experience a real-time exam dashboard with a strict anti-cheating environment (tab-switch & reload protection). Instant scorecard & analysis.",
  keywords: [
    "online live test 2026", "online quiz exam", "mock exam simulator",
    "anti cheat online test", "aptitude mock test", "online shiksha exam",
    "free online exam with certificate", "live test console", "timed quiz app"
  ],
  alternates: {
    canonical: "/live-test",
  },
  openGraph: {
    title: "Online Live Test 2026 | Anti-Cheat Exam Simulator | Online Shiksha",
    description: "Take the official Online Live Test. Experience a real-time exam dashboard with a strict anti-cheating environment.",
    url: "https://onlineshiksha.online/live-test",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Live Test - Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Live Test 2026 | Anti-Cheat Exam Simulator | Online Shiksha",
    description: "Take the official Online Live Test. Experience a real-time exam dashboard with a strict anti-cheating environment.",
    images: ["/og-image.webp"],
  },
};

export default function LiveTestPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the anti-cheating mechanism work in this online test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The exam utilizes browser-level window monitoring. If you switch tabs, minimize your browser, reload the page, or click outside the exam screen, the system will record it as a violation. A first violation triggers a warning popup. A second violation results in immediate exam termination."
        }
      },
      {
        "@type": "Question",
        "name": "Can I pause the exam and resume it later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, this is a real-time live test. Once started, the countdown timer runs continuously. Closing the tab or navigating away will automatically end and invalidate the exam."
        }
      },
      {
        "@type": "Question",
        "name": "Is there any charge for taking the online live test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Online Live Test is completely free for all aspirants to help evaluate their preparation levels in Quantitative Aptitude, Verbal Ability, and Logical Reasoning."
        }
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Online Live Test 2026",
    "description": "A secure online test environment with anti-cheat detection and live timer to evaluate candidate aptitude.",
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
        "name": "Live Test",
        "item": "https://onlineshiksha.online/live-test"
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
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none"></div>
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
                  <span className="text-black" aria-current="page">Online Live Test</span>
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-black">
                Online <span className="text-[#ff007f] underline decoration-[12px] decoration-[#ccff00] underline-offset-8">Live</span> Test
              </h1>
              <p className="text-xl md:text-2xl font-bold text-slate-700 leading-tight border-l-[12px] border-[#ccff00] pl-8">
                A highly secure, timed exam dashboard mimicking real-world computer-based tests. Test your capabilities under real exam conditions.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-[#ccff00]/10 border-4 border-black px-5 py-3 flex items-center gap-3 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <Timer className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">Live Countdown Timer</span>
                </div>
                <div className="bg-[#00ffa3]/10 border-4 border-black px-5 py-3 flex items-center gap-3 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">Anti-Cheat Enabled</span>
                </div>
                <div className="bg-[#ff007f]/10 border-4 border-black px-5 py-3 flex items-center gap-3 rounded-2xl shadow-[4px_4px_0px_#000]">
                  <Award className="w-5 h-5 text-black" />
                  <span className="font-black text-sm uppercase text-black">Instant Performance Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Test Component Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <LiveTestClient />
        </div>
      </main>
    </>
  );
}
