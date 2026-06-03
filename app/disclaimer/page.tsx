import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { AlertTriangle, ShieldCheck, Scale, Info, ArrowLeft, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer & Academic Notice | Online Shiksha",
  description: "Read the academic information and counseling disclaimer for Online Shiksha. Learn about fee variations, UGC-DEB accreditations, and advisory terms.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
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
        "name": "Disclaimer",
        "item": "https://onlineshiksha.online/disclaimer"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-[#ccff00]/30">
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO BANNER ── */}
      <div className="relative pt-24 pb-16 bg-slate-950 text-white rounded-b-[2.5rem] mb-12 shadow-xl overflow-hidden">
        {/* Dynamic backdrop gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/90">Disclaimer</span>
          </nav>

          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Scale className="h-4 w-4 text-[#ccff00]" />
            <span className="text-xs font-black uppercase tracking-widest text-[#ccff00]">
              Legal & Info Terms
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-4">
            Academic & Service Disclaimer
          </h1>
          <p className="text-indigo-100/70 font-semibold text-sm md:text-base max-w-xl mx-auto">
            Please read this notice carefully. It contains important terms regarding data validity, counseling services, and limitation of liability.
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
          
          {/* Card 1: Accuracy of Information */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 shrink-0">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                1. Accuracy of Course & Fee Information
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                The information compiled on <strong>Online Shiksha</strong> (including course details, tuition fee structures, eligibility criteria, admission deadlines, NAAC grades, and UGC approvals) is sourced from official university publications, websites, and public disclosures. 
              </p>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                While we make every effort to ensure the database remains current, universities modify their structures, pricing, and accreditations dynamically. Therefore, we do not warrant the absolute accuracy, completeness, or timeliness of the information. Visitors are requested to verify critical parameters with the respective university administration before enrolling.
              </p>
            </div>
          </div>

          {/* Card 2: Counseling Advisory Disclaimer */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-[#ccff00]/10 p-4 rounded-2xl text-slate-950 shrink-0 border border-[#ccff00]/20">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                2. Counseling & Guidance Advice
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                Any counseling or career guidance provided through our chatbot (<code className="bg-slate-50 px-1 py-0.5 rounded text-indigo-600">BotInquiryPopup</code>), WhatsApp services, or telephone consultations is aimed at helping students navigate their choices. It does not constitute professional career binding contracts.
              </p>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                The ultimate selection of the university, specialization, payment plans, and eligibility compliance remains the sole responsibility of the student. Online Shiksha shall not be held liable for any academic dissatisfaction, enrollment rejections, or career outcomes resulting from the guidance.
              </p>
            </div>
          </div>

          {/* Card 3: Third-Party & Affiliate Disclosure */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                3. Partnered Universities & Referral Disclosure
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-4">
                Online Shiksha works in partnership with multiple UGC-DEB approved distance and online universities. This site provides a free counseling platform for students, supported partly by marketing agreements and referral commissions from partner educational institutions.
              </p>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                We maintain editorial neutrality when reviewing universities and courses in our database; however, the order of university cards or specific recommended rankings may be influenced by existing partner alignments.
              </p>
            </div>
          </div>

          {/* Card 4: Limitation of Liability */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 flex gap-6 items-start flex-col md:flex-row hover:border-slate-200 transition-all">
            <div className="bg-red-50 p-4 rounded-2xl text-red-600 shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                4. Limitation of Liability
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                Under no circumstances shall Online Shiksha, its directors, employees, or partners be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access or inability to access this portal, or from reliance on any information provided herein.
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
            This disclaimer is reviewed periodically to align with the latest UGC-DEB (Distance Education Bureau) guidelines and regulatory policies.
          </p>
        </div>

      </div>
    </div>
  );
}
