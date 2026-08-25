import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { House, ChevronRight, Video, Languages, Type, Sparkles } from 'lucide-react';
import { VideoEditorClient } from '@/components/VideoEditorClient';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI Video Editor & Auto Captioner Online | CapCut & VN Style | Online Shiksha",
  description: "Free online AI Video Editor with Auto Captions. Generate instant subtitles in English, Hindi, and multiple languages. Customize fonts, colors, and TikTok/Reels styled caption animations purely in your browser.",
  keywords: [
    "AI video editor online", "auto subtitle generator free", 
    "CapCut style caption online", "VN editor auto caption", 
    "burn in subtitles online", "video transcript generator", 
    "multilingual auto caption", "Reels video editor", 
    "TikTok caption style generator", "free video editor browser"
  ],
  alternates: {
    canonical: "/tools/video-editor",
  },
  openGraph: {
    title: "AI Video Editor & Auto Captioner Online | CapCut & VN Style | Online Shiksha",
    description: "Free online AI Video Editor with Auto Captions. Generate instant subtitles in multiple languages. Customize fonts, colors, and CapCut styles.",
    url: "https://onlineshiksha.online/tools/video-editor",
    siteName: "Online Shiksha",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "AI Video Editor & Auto Captioner - Online Shiksha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Editor & Auto Captioner Online | CapCut & VN Style | Online Shiksha",
    description: "Free online AI Video Editor with Auto Captions. Generate instant subtitles in multiple languages. Customize fonts, colors, and CapCut styles.",
    images: ["/og-image.webp"],
  },
};

export default function VideoEditorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the AI Auto Captioner work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Auto Captioner scans the audio tracks of your video client-side and generates precise, timed text. It supports multiple languages (English, Hindi, Spanish, French, etc.) and segments text into punchy 2-4 word phrases designed specifically for short-form video formats like Reels, Shorts, and TikTok."
        }
      },
      {
        "@type": "Question",
        "name": "Is my video uploaded to a server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The AI Video Editor and Auto Captioner operates 100% locally in your browser. Your video files are processed in client-side memory using HTML5 canvas and MediaRecorder, ensuring maximum privacy and instant rendering speeds without server-side data logs."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download subtitle files like SRT or VTT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. In addition to exporting the completed video with burnt-in captions, you can download the standard SRT (.srt) subtitle track, WebVTT (.vtt) file, or copy the entire raw transcript to your clipboard with a single click."
        }
      },
      {
        "@type": "Question",
        "name": "Are there templates matching CapCut or VN styles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The tool includes visual template presets like TikTok Pop (bold yellow typography, heavy outlines, and active word bounce scaling), Neon Glow (luminescent colors), and VN-style solid block overlays. You can also customize fonts, outlines, borders, and animations manually."
        }
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Video Editor & Auto Captioner",
    "description": "Free web-based tool mimicking CapCut and VN editor workflows to automatically transcribe, style, and burn captions into video files.",
    "applicationCategory": "MultimediaApplication",
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
        "name": "AI Video Editor & Auto Captioner",
        "item": "https://onlineshiksha.online/tools/video-editor"
      }
    ]
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={appSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="flex-grow pb-24 md:pb-32 bg-[#09090a] font-sans pt-24 min-h-screen text-slate-100">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <li className="flex items-center">
                <Link href="/" className="hover:text-[#ccff00] flex items-center gap-1 transition-colors">
                  <House className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-slate-400">Tools</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-white">AI Video Editor</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Client Interactive Area */}
        <VideoEditorClient />

        {/* Informational SEO Guide (Neo-brutalist Dark Theme) */}
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="bg-[#121214] border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_#000] space-y-12">
            
            {/* Title / Intro */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="bg-[#ccff00] text-black font-black uppercase text-xs tracking-wider px-3 py-1.5 rounded-full border-2 border-black">
                ✨ Pro Creator Tool
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-4">
                Full-Featured browser-based <span className="text-[#ccff00]">AI Subtitle Generator</span>
              </h2>
              <p className="text-slate-400 font-medium text-sm mt-3 leading-relaxed">
                Create engaging, high-retention vertical videos for Instagram Reels, YouTube Shorts, and TikTok. Get automated timelines, CapCut-style typography, and instant exports, with zero software installation.
              </p>
            </div>

            {/* Feature Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-[#18181b] border-2 border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="bg-[#ccff00] p-4 rounded-2xl border-2 border-black text-black">
                  <Languages className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black uppercase text-white">Multilingual Auto-Captions</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Automatically generate subtitles synchronized with voice timings in English, Hindi, Spanish, French, German, Japanese, Chinese, and many more.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#18181b] border-2 border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="bg-[#ff007f] p-4 rounded-2xl border-2 border-black text-white">
                  <Type className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black uppercase text-white">CapCut & VN Style Presets</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Choose from popular text templates like TikTok's yellow pop, VN's bold block overlays, or clean minimal subtitles. Fully customize sizes, strokes, and layouts.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#18181b] border-2 border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="bg-[#00ffa3] p-4 rounded-2xl border-2 border-black text-black">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black uppercase text-white">Interactive Playhead Timeline</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Drag the playhead to scrub videos, click blocks to edit text directly, adjust start/end timings, and preview changes instantly on the live video canvas.
                </p>
              </div>

            </div>

            {/* Explanatory Guide */}
            <div className="border-t-2 border-slate-800 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <h4 className="font-black uppercase text-[#ccff00] text-base">Why Use Online Video Captioning?</h4>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Over 80% of users watch short-form mobile videos on silent mode. Without timed, visible subtitles, you lose up to 50% of your audience in the first three seconds. Professional subtitle editors like CapCut, VN Editor, and our browser tool guarantee high engagement, readability, and content reach.
                </p>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Our tool takes transcription a step further by processing everything client-side. There is no waiting for servers to queue your video, and your private data never leaves your system.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black uppercase text-[#ff007f] text-base">Key Editing Tips for Reels & Shorts</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-400 font-medium">
                  <li><strong>Keep it short:</strong> Split phrases into 2-4 word blocks so viewers process each line instantly.</li>
                  <li><strong>Highlight active words:</strong> Use Karaoke style coloring to drive attention block-by-block.</li>
                  <li><strong>Use contrast:</strong> Apply thick black outlines (3px–6px) and high-contrast font colors (yellow, neon green) to stand out against any background.</li>
                  <li><strong>Center subtitles vertically:</strong> Set the Y-axis position to around 75%–80% so they are in the natural eye-line but do not overlap app interface layouts.</li>
                </ul>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
