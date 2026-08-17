import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { House, ChevronRight, GraduationCap, Timer, ShieldCheck, Award, ArrowRight, BookOpen } from 'lucide-react';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Counselor Training Center | Advisor Certification Portal | Online Shiksha",
  description: "Access the Online Shiksha Counselor Training Center. Choose from our specialized assessment modules (NDIM Delhi & ISBR Bangalore) to test and validate counselling skills.",
  keywords: [
    "counselor training center", "counselling exams portal", "NDIM training quiz",
    "ISBR training quiz", "counselor certification", "online shiksha advisor portal"
  ],
  alternates: {
    canonical: "/counselor-training-center/",
  },
  openGraph: {
    title: "Counselor Training Center | Advisor Certification Portal | Online Shiksha",
    description: "Access the Online Shiksha Counselor Training Center. Choose from our specialized assessment modules.",
    url: "https://onlineshiksha.online/counselor-training-center/",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Counselor Training Center - Online Shiksha",
      },
    ],
  },
};

export default function CounselorTrainingCenterPage() {
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
        "name": "Counselor Training Center",
        "item": "https://onlineshiksha.online/counselor-training-center/"
      }
    ]
  };

  const exams = [
    {
      id: "ndim",
      title: "NDIM Delhi Counselling Exam",
      subtitle: "Master Counselor Quiz",
      description: "85 comprehensive questions testing your familiarity with NDIM, admission guidelines, course metrics, placement rates, and advanced pitching strategy.",
      questions: 85,
      duration: "45 Min",
      badgeColor: "bg-[#00ffa3] text-black border-black",
      link: "/ndim-counselling-exam/",
      uspList: ["Beginner to Advanced Levels", "Placements & Strategy Focus", "85 Questions"]
    },
    {
      id: "isbr",
      title: "ISBR Bangalore Counselling Exam",
      subtitle: "Master Counselor Quiz",
      description: "60 detailed questions covering ISBR Bangalore MBA/PGDM credentials, global ACBSP accreditations, dual specializations, and Electronic City corporate benefits.",
      questions: 60,
      duration: "30 Min",
      badgeColor: "bg-[#ccff00] text-black border-black",
      link: "/isbr-counselling-exam/",
      uspList: ["Accreditation & Curriculum Focus", "Bangalore Tech Hub Proximity", "60 Questions"]
    }
  ];

  return (
    <>
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
                  <span className="text-black" aria-current="page">Counselor Training Center</span>
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] text-xs font-black uppercase px-4 py-1.5 rounded-full mb-4 border-2 border-black">
                <GraduationCap className="w-4 h-4" /> E-Learning &amp; Certification
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-black">
                Counselor <span className="text-[#ff007f] underline decoration-[12px] decoration-[#ccff00] underline-offset-8">Training</span> Center
              </h1>
              <p className="text-xl md:text-2xl font-bold text-slate-700 leading-tight border-l-[12px] border-[#ccff00] pl-8">
                Welcome to the official Online Shiksha Advisor Portal. Validate your institutional knowledge, counseling readiness, and conversion metrics through our secure assessments.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left/Middle Column - The Exams */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#ff007f]" /> Available Assessments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {exams.map((exam) => (
                <div key={exam.id} className="bg-white border-8 border-black rounded-3xl p-6 shadow-[10px_10px_0px_#000] flex flex-col justify-between hover:-translate-y-1 transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">counseling exam</span>
                      <div className={`px-3 py-1 rounded-full border-2 border-black text-xs font-black uppercase ${exam.badgeColor}`}>
                        active
                      </div>
                    </div>

                    <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-black mb-3">
                      {exam.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                      {exam.subtitle}
                    </p>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
                      {exam.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {exam.uspList.map((usp, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                          <span>{usp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t-2 border-slate-100">
                    <div className="flex items-center justify-between text-xs font-black uppercase text-slate-600">
                      <span className="flex items-center gap-1"><Timer className="w-4 h-4 text-black" /> {exam.duration} Limit</span>
                      <span className="flex items-center gap-1"><Award className="w-4 h-4 text-black" /> 3 Marks / Correct</span>
                    </div>

                    <Link 
                      href={exam.link}
                      className="w-full bg-[#ccff00] text-black border-4 border-black px-6 py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                      Start Assessment <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Rules & Instructions */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#00ffa3]" /> Integrity Guidelines
            </h2>

            <div className="bg-white border-8 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000] space-y-6">
              <div className="bg-[#ff007f]/5 border-4 border-black p-5 rounded-2xl">
                <h3 className="text-base font-black uppercase tracking-wider text-[#ff007f] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Anti-Cheating Lock
                </h3>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  Both assessments run in a secure exam console. The browser monitors your screen focus. Switching tabs, minimizing windows, clicking outside, or exiting fullscreen mode will trigger a strike.
                </p>
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-700">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black text-[#ccff00] border-2 border-black flex items-center justify-center font-black shrink-0">1</span>
                  <p className="leading-snug">Ensure you have a stable network connection before starting.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black text-[#ccff00] border-2 border-black flex items-center justify-center font-black shrink-0">2</span>
                  <p className="leading-snug">Closing, refreshing, or reloading the tab mid-exam terminates your session immediately.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black text-[#ccff00] border-2 border-black flex items-center justify-center font-black shrink-0">3</span>
                  <p className="leading-snug">A 2-strike system applies. A second focus-loss violation immediately invalidates the attempt.</p>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">administrator access</p>
                <Link 
                  href="/admin/"
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black hover:text-[#ff007f] transition-colors"
                >
                  Access Control Room &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
