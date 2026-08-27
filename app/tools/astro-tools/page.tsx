import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { House, ChevronRight, Compass, Sparkles, HelpCircle } from 'lucide-react';
import { AstroToolsClient } from '@/components/AstroToolsClient';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "फ्री ऑनलाइन कुंडली, अंकशास्त्र और टैरो रीडिंग 2026 | Online Shiksha",
  description: "फ्री ऑनलाइन कुंडली मेकिंग, मूलांक/भाग्यांक अंकशास्त्र और 1 व 3 कार्ड टैरो रीडिंग हिंदी में। जन्म विवरण दर्ज करें और तुरंत अपनी विस्तृत रिपोर्ट प्राप्त करें।",
  keywords: [
    "kundali making hindi", "free online kundali in hindi",
    "numerology calculator hindi", "moolank bhagyank calculator",
    "tarot reading card hindi", "future prediction hindi",
    "astro tools online shiksha", "vedic astrology hindi",
    "जन्म कुंडली हिंदी", "अंकशास्त्र मूलांक", "टैरो कार्ड रीडिंग"
  ],
  alternates: {
    canonical: "/tools/astro-tools",
  },
  openGraph: {
    title: "फ्री ऑनलाइन कुंडली, अंकशास्त्र और टैरो रीडिंग 2026 | Online Shiksha",
    description: "फ्री ऑनलाइन कुंडली मेकिंग, मूलांक/भाग्यांक अंकशास्त्र और 1 व 3 कार्ड टैरो रीडिंग हिंदी में। जन्म विवरण दर्ज करें और तुरंत अपनी विस्तृत रिपोर्ट प्राप्त करें।",
    url: "https://onlineshiksha.online/tools/astro-tools",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Online Kundali, Numerology & Tarot - Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "फ्री ऑनलाइन कुंडली, अंकशास्त्र और टैरो रीडिंग 2026 | Online Shiksha",
    description: "फ्री ऑनलाइन कुंडली मेकिंग, मूलांक/भाग्यांक अंकशास्त्र और 1 व 3 कार्ड टैरो रीडिंग हिंदी में। जन्म विवरण दर्ज करें और तुरंत अपनी विस्तृत रिपोर्ट प्राप्त करें।",
    images: ["/og-image.webp"],
  },
};

export default function AstroToolsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "क्या यह कुंडली, अंकशास्त्र और टैरो पूरी तरह से फ्री है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "हाँ, यह टूल आपके लिए पूरी तरह से निःशुल्क है। आप अपनी कुंडली, मूलांक, भाग्यांक और टैरो कार्ड रीडिंग की रिपोर्ट बिना किसी शुल्क के तुरंत देख सकते हैं।"
        }
      },
      {
        "@type": "Question",
        "name": "कुंडली बनाने के लिए किन विवरणों की आवश्यकता होती है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "सटीक कुंडली विश्लेषण के लिए आपका नाम, जन्म तिथि, जन्म का समय और जन्म स्थान (शहर/राज्य) की आवश्यकता होती है।"
        }
      },
      {
        "@type": "Question",
        "name": "मूलांक और भाग्यांक क्या होते हैं?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "मूलांक (Radix) आपकी जन्म तिथि का योग होता है (जैसे 25 तारीख = 2+5 = 7), जो आपके स्वभाव को दर्शाता है। भाग्यांक (Destiny Number) आपकी पूरी जन्म तिथि (दिन+महीना+वर्ष) का कुल योग होता है, जो आपके जीवन पथ को निर्देशित करता है।"
        }
      },
      {
        "@type": "Question",
        "name": "टैरो कार्ड रीडिंग कैसे काम करती है?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "टैरो कार्ड रीडिंग ऊर्जा और अंतर्ज्ञान पर आधारित होती है। आप प्रश्न मन में सोचकर 1 या 3 कार्ड चुनते हैं, जो आपके भूत, वर्तमान, भविष्य या तात्कालिक समस्या का उत्तर देते हैं।"
        }
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kundali, Numerology & Tarot Calculator (Hindi)",
    "description": "Vedic astrology kundali maker, numerology calculators (Radix, Destiny, Name) and interactive Tarot card reader in Hindi.",
    "applicationCategory": "AstrologyApplication",
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
        "name": "Tools",
        "item": "https://onlineshiksha.online/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Kundali, Numerology & Tarot",
        "item": "https://onlineshiksha.online/tools/astro-tools"
      }
    ]
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={appSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="flex-grow pb-24 md:pb-32 bg-slate-50 font-sans pt-24">
        {/* Header Block */}
        <div className="bg-white border-b-8 border-foreground py-16 px-6">
          <div className="max-w-7xl mx-auto">
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
                  <span className="text-slate-400">Tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <span className="text-foreground" aria-current="page">Kundali, Numerology &amp; Tarot</span>
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                ज्योतिष <span className="text-indigo-600 underline decoration-[12px] decoration-indigo-200 underline-offset-8">साधना</span> केंद्र
              </h1>
              <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-indigo-500 pl-8">
                अपनी जन्म कुंडली बनाएं, मूलांक व भाग्यांक से अपना भाग्य जानें, और टैरो कार्ड्स के जरिए अपने भविष्य का मार्गदर्शन प्राप्त करें। संपूर्ण विवरण हिंदी में।
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-indigo-50 border-4 border-indigo-300 px-5 py-3 flex items-center gap-3">
                  <Compass className="w-5 h-5 text-indigo-600" />
                  <span className="font-black text-sm uppercase text-indigo-800">सटीक वैदिक कुंडली</span>
                </div>
                <div className="bg-violet-50 border-4 border-violet-300 px-5 py-3 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <span className="font-black text-sm uppercase text-violet-800">अंकशास्त्र मूलांक व भाग्यांक</span>
                </div>
                <div className="bg-rose-50 border-4 border-rose-300 px-5 py-3 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-rose-600" />
                  <span className="font-black text-sm uppercase text-rose-800">टैरो भूत-वर्तमान-भविष्य</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <AstroToolsClient />
        </div>
      </main>
    </>
  );
}
