import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { House, ChevronRight, TrendingUp, BarChart3, BookOpen, Target, ShieldCheck, Zap } from 'lucide-react';
import { CatScoreCalculatorClient } from '@/components/CatScoreCalculatorClient';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "CAT Score Calculator 2026 | Raw Score & Percentile Predictor | Online Shiksha",
  description: "Free CAT 2026 Score Calculator. Enter your VARC, DILR & QA attempts to instantly calculate your raw score, scaled score, and expected percentile for IIM admissions.",
  keywords: [
    "CAT score calculator 2026", "CAT 2026 score calculator", 
    "cat marks calculator", "cat percentile calculator", 
    "cat raw score calculator", "cat scaled score", 
    "cat score predictor 2026", "cat 2026 percentile predictor", 
    "cat answer key calculator", "cat marks vs percentile 2026", 
    "IIM admission score calculator", "cat varc dilr qa score"
  ],
  alternates: {
    canonical: "/tools/cat-score-calculator",
  },
};

export default function CatScoreCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is the CAT 2026 score calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CAT uses a differential marking scheme: +3 for every correct MCQ answer, −1 for every wrong MCQ answer. TITA (Type In The Answer) questions carry +3 for correct answers and 0 for wrong or unattempted. The raw score is then scaled/equated across slots to produce the final scaled score."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between raw score and scaled score in CAT 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The raw score is the score computed directly from your answers using the marking scheme (+3/−1). The scaled score (also called equated score) is derived through statistical equating to account for difficulty differences between exam slots. IIMs use the scaled score to compute your percentile."
        }
      },
      {
        "@type": "Question",
        "name": "What CAT percentile is needed for IIM Ahmedabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IIM Ahmedabad typically shortlists candidates with an overall CAT percentile of 99+ and section-wise percentiles above 90. A raw score of 185+ is generally required to be in that range."
        }
      },
      {
        "@type": "Question",
        "name": "How many questions are in CAT 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CAT 2026 is expected to have 66 questions across 3 sections: VARC (24 questions), DILR (20 questions), and QA (22 questions). The exam is 2 hours long with 40 minutes per section."
        }
      },
      {
        "@type": "Question",
        "name": "Is there negative marking for TITA questions in CAT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. There is no negative marking for TITA (Type In The Answer) questions. Wrong TITA answers receive 0 marks, while correct ones receive +3 marks. Only MCQ wrong answers attract a penalty of −1 mark."
        }
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CAT Score Calculator 2026",
    "description": "Online tool to calculate CAT 2026 raw score, scaled score and predict percentile for IIM and top MBA college admissions.",
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
        "name": "Tools",
        "item": "https://onlineshiksha.online/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "CAT Score Calculator",
        "item": "https://onlineshiksha.online/tools/cat-score-calculator"
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
                  <span className="text-foreground" aria-current="page">CAT Score Calculator</span>
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                CAT 2026 <span className="text-amber-500 underline decoration-[12px] underline-offset-8">Score</span> Calculator
              </h1>
              <p className="text-xl md:text-2xl font-bold text-slate-600 leading-tight border-l-[12px] border-amber-400 pl-8">
                Calculate your CAT 2026 raw score, scaled score &amp; expected percentile section-wise. Built for IIM aspirants — free, instant &amp; accurate.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-amber-50 border-4 border-amber-300 px-5 py-3 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <span className="font-black text-sm uppercase text-amber-800">Instant Results</span>
                </div>
                <div className="bg-emerald-50 border-4 border-emerald-300 px-5 py-3 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="font-black text-sm uppercase text-emerald-800">Official Marking Scheme</span>
                </div>
                <div className="bg-blue-50 border-4 border-blue-300 px-5 py-3 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="font-black text-sm uppercase text-blue-800">Percentile Prediction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <CatScoreCalculatorClient />

          {/* Detailed Explanatory Copy */}
          <div className="mt-32 max-w-4xl space-y-12 mx-auto">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
                <TrendingUp className="w-10 h-10 text-amber-500" />
                How CAT 2026 Raw Score is Normalized to Scaled Score
              </h2>
              <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6 shadow-[8px_8px_0px_#000]">
                <p className="font-bold text-slate-700 leading-relaxed">
                  Since the <strong>CAT 2026 exam</strong> is conducted in multiple slots (usually Slot 1, Slot 2, and Slot 3) across the country, the difficulty level of the test papers varies slightly. To ensure fairness, IIMs employ a scientific <strong>normalization process</strong>.
                </p>
                <p className="font-bold text-slate-700 leading-relaxed">
                  The normalization is based on a gating formula that equates the mean and standard deviation of scores across different slots. The resulting <strong>scaled score</strong> is what determines your final CAT percentile. Our <strong>CAT percentile predictor 2026</strong> utilizes statistical trends from past years to give you the closest estimate.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
                <BarChart3 className="w-10 h-10 text-blue-600" />
                CAT 2026 Marks vs Percentile Projection
              </h2>
              <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6 shadow-[8px_8px_0px_#000]">
                <p className="font-bold text-slate-700 leading-relaxed">
                  To achieve a 99+ percentile in <strong>CAT Exam 2026</strong>, a student typically needs a raw score around 100-110 marks, depending on slot difficulty. This table highlights historical trends:
                </p>
                <ul className="list-disc pl-6 font-bold text-slate-600 space-y-2">
                  <li><strong>99.9+ Percentile:</strong> Raw Score ~155+ (Excellent profile checks for IIM A, B, C calls)</li>
                  <li><strong>99.0+ Percentile:</strong> Raw Score ~105-110 (Strong chances for Baby/New IIMs and Tier-1 colleges)</li>
                  <li><strong>95.0+ Percentile:</strong> Raw Score ~75-80 (Good for MDI Gurgaon, SPJIMR profiles, IITs)</li>
                  <li><strong>90.0+ Percentile:</strong> Raw Score ~60-65 (Opens doors to top Tier-2 MBA programs)</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
                <BookOpen className="w-10 h-10 text-amber-500" />
                CAT 2026 – What You Need to Know
              </h2>
              <div className="bg-white border-4 border-foreground p-8 md:p-10 space-y-6 shadow-[8px_8px_0px_#000]">
                <p className="font-bold text-slate-700 leading-relaxed text-lg">
                  The <strong>Common Admission Test (CAT 2026)</strong> is conducted by the IIMs on a rotational basis. It is the most competitive MBA entrance exam in India, with over 3 lakh aspirants competing for seats in IIMs and 1,200+ other business schools.
                </p>
                <div className="overflow-x-auto border-4 border-foreground mt-6">
                  <table className="w-full text-left border-collapse">
                    <tbody className="text-base font-bold">
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Conducting Body</td>
                        <td className="p-5">IIMs (rotational)</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Exam Mode</td>
                        <td className="p-5">Online Computer Based Test (CBT)</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Total Questions</td>
                        <td className="p-5">66 (approx.)</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Total Duration</td>
                        <td className="p-5">2 hours (120 minutes)</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Sections</td>
                        <td className="p-5">VARC · DILR · QA</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Marking Scheme</td>
                        <td className="p-5">+3 correct MCQ, −1 wrong MCQ, +3 correct TITA</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Negative Marking on TITA</td>
                        <td className="p-5">None</td>
                      </tr>
                      <tr className="border-b-2 border-slate-200">
                        <td className="p-5 bg-slate-50 border-r-2 border-slate-200 font-black w-1/2">Max Raw Score</td>
                        <td className="p-5">228</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 flex items-center gap-4">
                <Target className="w-10 h-10 text-amber-500" />
                How to Use This Calculator
              </h2>
              <div className="space-y-4">
                <div className="bg-white border-4 border-foreground p-6 flex gap-6 items-start shadow-[6px_6px_0px_#000]">
                  <div className="bg-foreground text-white w-14 h-14 flex items-center justify-center font-black text-xl shrink-0 border-4 border-amber-400">01</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-1">Select Section</h4>
                    <p className="font-bold text-slate-600">Click on VARC, DILR, or QA tab to enter responses for each section.</p>
                  </div>
                </div>
                <div className="bg-white border-4 border-foreground p-6 flex gap-6 items-start shadow-[6px_6px_0px_#000]">
                  <div className="bg-foreground text-white w-14 h-14 flex items-center justify-center font-black text-xl shrink-0 border-4 border-amber-400">02</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-1">Enter Correct MCQs</h4>
                    <p className="font-bold text-slate-600">Count the number of MCQ questions you answered correctly in the section.</p>
                  </div>
                </div>
                <div className="bg-white border-4 border-foreground p-6 flex gap-6 items-start shadow-[6px_6px_0px_#000]">
                  <div className="bg-foreground text-white w-14 h-14 flex items-center justify-center font-black text-xl shrink-0 border-4 border-amber-400">03</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-1">Enter Wrong MCQs</h4>
                    <p className="font-bold text-slate-600">Count the number of MCQ questions you answered incorrectly (attracts −1 penalty).</p>
                  </div>
                </div>
                <div className="bg-white border-4 border-foreground p-6 flex gap-6 items-start shadow-[6px_6px_0px_#000]">
                  <div className="bg-foreground text-white w-14 h-14 flex items-center justify-center font-black text-xl shrink-0 border-4 border-amber-400">04</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-1">Enter Correct TITA</h4>
                    <p className="font-bold text-slate-600">Enter how many TITA questions you answered correctly. No penalty for wrong TITA.</p>
                  </div>
                </div>
                <div className="bg-white border-4 border-foreground p-6 flex gap-6 items-start shadow-[6px_6px_0px_#000]">
                  <div className="bg-foreground text-white w-14 h-14 flex items-center justify-center font-black text-xl shrink-0 border-4 border-amber-400">05</div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-1">Repeat for All Sections</h4>
                    <p className="font-bold text-slate-600">Fill in all three sections for the most accurate overall score and percentile.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <ShieldCheck className="w-12 h-12 text-amber-500 mb-6" />
                <h4 className="text-xl font-black uppercase mb-4">Accurate Marking</h4>
                <p className="font-bold text-slate-600">Strictly follows CAT&apos;s official marking scheme: +3/−1 for MCQ, +3/0 for TITA.</p>
              </div>
              <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />
                <h4 className="text-xl font-black uppercase mb-4">Percentile Prediction</h4>
                <p className="font-bold text-slate-600">Based on 5+ years of CAT data trends to give you a reliable percentile estimate.</p>
              </div>
              <div className="p-8 border-4 border-foreground bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Zap className="w-12 h-12 text-emerald-600 mb-6" />
                <h4 className="text-xl font-black uppercase mb-4">Section-wise Insights</h4>
                <p className="font-bold text-slate-600">See individual section scores and percentiles so you know your strengths.</p>
              </div>
            </div>

            <div className="pt-12">
              <h2 className="text-4xl font-black uppercase tracking-tight mb-12">CAT 2026 Score Calculator – FAQs</h2>
              <div className="space-y-4">
                <details className="bg-white border-4 border-foreground p-6 group cursor-pointer shadow-[4px_4px_0px_#000]">
                  <summary className="text-lg font-black uppercase flex justify-between items-center list-none">
                    How is the CAT 2026 score calculated?
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 font-bold text-slate-600 leading-relaxed">
                    CAT uses +3 for correct MCQs, −1 for wrong MCQs, and +3 for correct TITA questions with no negative marking on TITA. The raw score is then statistically scaled/equated across different exam slots.
                  </p>
                </details>
                <details className="bg-white border-4 border-foreground p-6 group cursor-pointer shadow-[4px_4px_0px_#000]">
                  <summary className="text-lg font-black uppercase flex justify-between items-center list-none">
                    What is a good CAT score for IIM A, B, C?
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 font-bold text-slate-600 leading-relaxed">
                    A raw score of 185+ (scaled ~190+) usually corresponds to 99.5+ percentile required for IIM Ahmedabad, Bangalore, and Calcutta shortlists.
                  </p>
                </details>
                <details className="bg-white border-4 border-foreground p-6 group cursor-pointer shadow-[4px_4px_0px_#000]">
                  <summary className="text-lg font-black uppercase flex justify-between items-center list-none">
                    Does the calculator account for scaling?
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 font-bold text-slate-600 leading-relaxed">
                    Our tool gives an estimated scaled score based on historical trends. The official scaled score is computed by IIMs after the exam using a normalization process across all slots.
                  </p>
                </details>
                <details className="bg-white border-4 border-foreground p-6 group cursor-pointer shadow-[4px_4px_0px_#000]">
                  <summary className="text-lg font-black uppercase flex justify-between items-center list-none">
                    Can I use this for previous year CAT papers?
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 font-bold text-slate-600 leading-relaxed">
                    Yes! You can use this calculator for any CAT year as long as the exam followed the standard 66-question, 228-mark format. Note that the total questions may vary slightly by year.
                  </p>
                </details>
                <details className="bg-white border-4 border-foreground p-6 group cursor-pointer shadow-[4px_4px_0px_#000]">
                  <summary className="text-lg font-black uppercase flex justify-between items-center list-none">
                    Is there negative marking for TITA questions?
                    <span className="group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 font-bold text-slate-600 leading-relaxed">
                    No. TITA (Type In The Answer) questions have no negative marking. A wrong TITA answer gets 0, and a correct one gets +3.
                  </p>
                </details>
              </div>
            </div>

            <div className="pt-12">
              <h3 className="text-2xl font-black uppercase mb-6">Related CAT Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_#000]" href="/colleges">
                  <span>Top MBA Colleges 2026 →</span>
                </Link>
                <Link className="bg-white border-4 border-foreground p-6 font-black hover:bg-amber-50 transition-colors flex items-center justify-between group shadow-[4px_4px_0px_#000]" href="/#comparison-engine">
                  <span>Compare Online Degrees →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
