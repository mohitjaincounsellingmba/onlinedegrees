"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Phone 
} from 'lucide-react';
import { detectDegree } from '@/lib/detectDegree';

interface BlogLeadBannerProps {
  slug?: string;
  title?: string;
  category?: string;
  variant?: 'inline' | 'compact' | 'bottom';
}

export default function BlogLeadBanner({ slug = '', title = '', category = '', variant = 'inline' }: BlogLeadBannerProps) {
  const degree = detectDegree(slug, title, category);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      name,
      number: phone,
      phone,
      course: degree.name,
      source: `Blog Banner (${title || slug})`,
      message: `Quick Lead from Blog: ${title || slug}. Interested in ${degree.name}.`,
      timestamp: new Date().toISOString()
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');

      // Auto redirect to WhatsApp
      const waMsg = encodeURIComponent(
        `Hi Mohit Sir, I submitted my inquiry for ${degree.name} while reading your guide on "${title || 'Online Shiksha'}". My name is ${name}. Please guide me on admissions & fees.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/919560020771?text=${waMsg}`, '_blank');
      }, 1200);

    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const waHref = `https://wa.me/919560020771?text=${encodeURIComponent(degree.waText)}`;

  if (status === 'success') {
    return (
      <div className="my-10 bg-slate-950 border-2 border-[#ccff00] rounded-3xl p-8 text-center text-white shadow-xl space-y-3">
        <div className="w-12 h-12 bg-[#ccff00] text-black rounded-full flex items-center justify-center font-black text-xl mx-auto">
          ✓
        </div>
        <h3 className="text-xl font-black text-white">Shortlist Request Received!</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Mohit Jain will share the <strong className="text-[#ccff00]">{degree.name}</strong> brochure, fee structures, and placement reports on your WhatsApp (<strong className="text-white">{phone}</strong>).
        </p>
        <p className="text-xs text-slate-400 animate-pulse">Connecting you to WhatsApp...</p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          Open WhatsApp Immediately
        </a>
      </div>
    );
  }

  return (
    <div className="my-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {degree.badge}
          </div>
          <span className="text-[11px] text-indigo-200 font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            UGC-DEB Approved Only
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-3">
          Get Free University Shortlist & Scholarships for <span className="text-[#ccff00]">{degree.name}</span>
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-2xl">
          {degree.subText} Get 1-on-1 counseling from senior advisor <strong className="text-white">Mohit Jain</strong>.
        </p>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6 text-xs font-semibold text-slate-200">
          <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>0% Interest Monthly EMI</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>100% Placement Drives</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
            <span>Up to 25% Fee Concession</span>
          </div>
        </div>

        {/* Quick 2-Input Capture Form */}
        <form onSubmit={handleQuickSubmit} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-4 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            <div className="sm:col-span-4">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-4">
              <input
                type="tel"
                required
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#ccff00] hover:bg-lime-400 text-black font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-[#ccff00]/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {status === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    <span>Get Shortlist on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
          {status === 'error' && (
            <p className="text-red-400 text-xs text-center mt-2 font-bold">
              Submission error. Please try WhatsApp directly below.
            </p>
          )}
        </form>

        {/* Secondary CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
          <div className="flex items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Direct WhatsApp (+91 95600 20771)
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Advisor
            </a>
          </div>

          <Link
            href={`/inquiry/?course=${degree.id}`}
            className="inline-flex items-center gap-1 text-[#ccff00] hover:underline font-black uppercase tracking-wider"
          >
            <span>Detailed {degree.name} Application & Fee Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
