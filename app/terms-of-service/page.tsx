import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Scale, FileText, Info, AlertOctagon, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Online Shiksha",
  description: "Read the Terms of Service for Online Shiksha. Understand the rules, obligations, and academic directory terms when using our portal.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
        "name": "Terms of Service",
        "item": "https://onlineshiksha.online/terms-of-service"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-[#ccff00]/30">
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO BANNER ── */}
      <div className="relative pt-24 pb-16 bg-slate-950 text-white rounded-b-[2.5rem] mb-12 shadow-xl overflow-hidden">
        {/* Dynamic backdrop gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/90">Terms of Service</span>
          </nav>

          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Scale className="h-4 w-4 text-[#ccff00]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00]">
              User Agreement
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-4">
            Terms of Service
          </h1>
          <p className="text-indigo-100/70 font-semibold text-sm md:text-base max-w-xl mx-auto">
            Welcome to Online Shiksha. By accessing our directory, comparing courses, or submitting advisory requests, you agree to these terms.
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
          
          {/* Card 1: Acceptance of Terms */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 shrink-0">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                1. Acceptance & Use Eligibility
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                By browsing `onlineshiksha.online` or engaging with our counselors, you warrant that you are at least 18 years of age or possess legal parental consent. If you do not agree to all elements of this agreement, please discontinue using this portal and its widgets.
              </p>
            </div>
          </div>

          {/* Card 2: Academic Information & Advisory Scope */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-[#ccff00]/10 p-4 rounded-2xl text-slate-950 shrink-0 border border-[#ccff00]/20">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                2. Informational & Advisory Nature
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                Online Shiksha compiles information regarding online MBA, MCA, BBA, and BCA courses strictly for educational matching and comparison purposes. 
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm md:text-base font-medium space-y-2">
                <li>We do not directly grant degrees or enroll students into university databases.</li>
                <li>All fee estimates, exam criteria, and course syllabus listings are subject to official university revisions.</li>
                <li>Recommended university matches are advisory guidelines and do not guarantee admission or career results.</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Forms & Communication Consent */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 shrink-0">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                3. Submissions & Counseling Consent
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                When you submit your mobile number through our chatbot, popup alerts, or in-line comparison cards:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm md:text-base font-medium space-y-2">
                <li>You agree to provide true, accurate contact details. Submitting fake numbers is a violation of our terms.</li>
                <li>You grant Online Shiksha and its verified academic helpers permission to contact you via telephone calls, SMS messages, and WhatsApp notifications.</li>
                <li>This communication consent overrides any registration on national "Do Not Disturb" (DND) registries.</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Prohibited Uses & Intellectual Property */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-red-50 p-4 rounded-2xl text-red-600 shrink-0">
              <AlertOctagon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                4. Prohibited Behaviors & IP Rights
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                You agree not to scrape, copy, or distribute database layouts, university details, or blog articles without written permission. Furthermore, you will not:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm md:text-base font-medium space-y-2">
                <li>Use automated bots or scripts to query the database or submit forms.</li>
                <li>Decompile or copy our free ATS resume generator's design format or logic.</li>
                <li>Submit spam or malicious payloads to our lead generation API.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* ── UPDATE NOTICE ── */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-center text-slate-400 border border-slate-800">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Last Updated: June 2026
          </p>
          <p className="text-sm font-medium mt-2 text-slate-300">
            We reserve the right to modify these terms. Continued usage of our website indicates your consent to the updated agreement guidelines.
          </p>
        </div>

      </div>
    </div>
  );
}
