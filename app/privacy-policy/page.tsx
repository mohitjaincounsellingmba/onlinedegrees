import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ShieldCheck, Eye, Lock, Globe, ArrowLeft, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Online Shiksha",
  description: "Read the Privacy Policy for Online Shiksha. Understand how we collect, protect, and use your personal information and WhatsApp inquiry data.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
        "name": "Privacy Policy",
        "item": "https://onlineshiksha.online/privacy-policy"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-[#ccff00]/30">
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO BANNER ── */}
      <div className="relative pt-24 pb-16 bg-slate-950 text-white rounded-b-[2.5rem] mb-12 shadow-xl overflow-hidden">
        {/* Dynamic backdrop gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/90">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-[#ccff00]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00]">
              Your Privacy Matters
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-4">
            Privacy Policy
          </h1>
          <p className="text-indigo-100/70 font-semibold text-sm md:text-base max-w-xl mx-auto">
            At Online Shiksha, we are committed to protecting your personal data. This document outlines how we collect, store, and utilize your academic inquiry details.
          </p>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-xs uppercase tracking-wider group transition-all"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to home
          </Link>
        </div>

        {/* ── CARDS WRAPPER ── */}
        <div className="space-y-6">
          
          {/* Card 1: Information We Collect */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 shrink-0">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                1. Information We Collect
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                We collect personal information directly from you when you interact with our platform, fill out academic inquiry forms, use our conversational chatbot, or request free counselling.
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm md:text-base font-medium space-y-2">
                <li><strong>Identity Data:</strong> Full Name.</li>
                <li><strong>Contact Data:</strong> Mobile/WhatsApp Number and Email Address.</li>
                <li><strong>Academic Preferences:</strong> Selected courses (MBA, MCA, BBA, BCA), budget ranges, and career goals.</li>
                <li><strong>Technical Data:</strong> IP Address, browser type, and tracking metrics from cookies (e.g. Google Analytics).</li>
              </ul>
            </div>
          </div>

          {/* Card 2: How We Use Your Data */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-[#ccff00]/10 p-4 rounded-2xl text-slate-950 shrink-0 border border-[#ccff00]/20">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                We use the data collected to deliver high-quality, personalized academic advisory services, including:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm md:text-base font-medium space-y-2">
                <li>Providing customized university shortlists, fee comparisons, and admission assistance.</li>
                <li>Relaying requests to senior academic advisors who will contact you via WhatsApp, SMS, or telephone.</li>
                <li>Improving our comparisons and chatbot response flows using anonymized technical logs.</li>
                <li>Verifying compliance with UGC-DEB eligibility standards before recommending programs.</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Data Security & Retention */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 shrink-0">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                3. Data Security & Storage
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                We take security seriously. All lead transmissions are encrypted securely. We store your data only for as long as necessary to fulfill academic counseling cycles and comply with legal requirements.
              </p>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                We do not sell, rent, or trade your personal information to third-party marketing companies. Data is only shared with partnered, UGC-approved educational institutions and counseling helpers when you request direct admissions support.
              </p>
            </div>
          </div>

          {/* Card 4: Cookies & Tracking */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 shrink-0">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                4. Cookies & Analytics
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                We use cookies and equivalent tracking tags (Google Analytics and Google Ads Tag) to understand site performance, visitor behavior, and traffic sources. You can configure your browser to reject cookies or opt out of tracking, which will not affect your ability to view and use our directory resources.
              </p>
            </div>
          </div>

        </div>

        {/* ── UPDATE NOTICE ── */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-center text-slate-400 border border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Last Updated: June 2026
          </p>
          <p className="text-sm font-medium mt-2 text-slate-300">
            If you have questions about your data or want to request deletion of your contact records, please contact us at: <a href="mailto:info@onlineshiksha.online" className="text-indigo-400 hover:underline">info@onlineshiksha.online</a>.
          </p>
        </div>

      </div>
    </div>
  );
}
