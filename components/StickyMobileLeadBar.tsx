"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, Sparkles, X, GraduationCap } from 'lucide-react';
import { detectDegree } from '@/lib/detectDegree';

interface StickyMobileLeadBarProps {
  slug?: string;
  title?: string;
  category?: string;
}

export default function StickyMobileLeadBar({ slug = '', title = '', category = '' }: StickyMobileLeadBarProps) {
  const degree = detectDegree(slug, title, category);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const waHref = `https://wa.me/919560020771?text=${encodeURIComponent(degree.waText)}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      
      {/* Mini top prompt with dismiss */}
      <div className="flex items-center justify-between px-1 mb-2 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-[#ccff00]">
          <Sparkles className="w-3 h-3 animate-pulse" />
          2026 Admissions Open: {degree.name}
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        
        {/* WhatsApp */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-emerald-500 text-slate-950 font-black py-2.5 px-2 rounded-xl text-xs uppercase tracking-tight shadow-md active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp</span>
        </a>

        {/* Free Shortlist Form */}
        <Link
          href={`/inquiry/?course=${degree.id}`}
          className="flex items-center justify-center gap-1.5 bg-[#ccff00] text-black font-black py-2.5 px-2 rounded-xl text-xs uppercase tracking-tight shadow-md active:scale-95"
        >
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>Shortlist</span>
        </Link>

        {/* Call Expert */}
        <a
          href="tel:+919560020771"
          className="flex items-center justify-center gap-1.5 bg-slate-800 text-white font-bold py-2.5 px-2 rounded-xl text-xs uppercase tracking-tight border border-slate-700 active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
          <span>Call</span>
        </a>

      </div>
    </div>
  );
}
