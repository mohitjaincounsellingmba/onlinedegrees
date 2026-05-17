"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Instagram, Linkedin, Facebook, Youtube, Phone, Mail, ArrowRight, GraduationCap } from 'lucide-react';

export function Footer({ instagramGallery }: { instagramGallery?: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    programs: [
      { name: 'Online MBA Degree', href: '#' },
      { name: 'Online MCA Degree', href: '#' },
      { name: 'Online BBA Degree', href: '#' },
      { name: 'Online BCA Degree', href: '#' },
      { name: 'Online B.Com Degree', href: '#' },
      { name: 'Online M.Com Degree', href: '#' },
    ],
    approvals: [
      { name: 'UGC-DEB Status', href: '#' },
      { name: 'NAAC A++ Universities', href: '#' },
      { name: 'AICTE Approvals', href: '#' },
      { name: 'WES Assessment', href: '#' },
      { name: 'Government Job Validity', href: '#' },
    ],
    support: [
      { name: 'Expert Counselling', href: '#' },
      { name: 'WhatsApp Assistance', href: 'https://wa.me/919560020771' },
      { name: 'University Reviews', href: '/blog' },
      { name: 'Comparison Guide', href: '#' },
      { name: 'Admissions 2026', href: '#' },
    ]
  };

  const socials = [
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/careerwithmohit.online/", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/career-with-mohit", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/profile.php?id=61575525271998", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: <Youtube size={18} />, href: "https://www.youtube.com/@careerwithmohit.online", label: "YouTube", color: "hover:bg-red-600" }
  ];

  return (
    <footer className="relative bg-[#0f172a] text-white overflow-hidden border-t border-slate-800">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Top Banner */}
      <div className="relative z-10 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Compare UGC ODL Approved Universities</h2>
              <p className="text-indigo-100 text-sm md:text-base font-medium max-w-xl">
                Get free admission assistance and study roadmaps from India&apos;s leading career counsel experts for 2026.
              </p>
            </div>
            <button 
              onClick={() => handleScroll('comparison-engine')}
              className="bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs md:text-sm hover:scale-105 transition-all shadow-xl flex items-center gap-2 shrink-0 cursor-pointer"
            >
              Start Comparison <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5 w-fit">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-display text-lg font-black tracking-tight uppercase text-white">
                  Online<span className="text-indigo-400">Shiksha</span>
                </span>
              </Link>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed max-w-xs">
                Compare 27+ UGC approved ODL and online universities on NAAC grades, accreditation, and programs. Built to simplify professional degree searches in India.
              </p>
            </div>

            <div className="flex gap-2">
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-slate-300 transition-all duration-300 ${social.color} hover:scale-110 hover:border-slate-500`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="space-y-2 text-xs font-bold text-slate-400">
               <a href="tel:+919560020771" className="flex items-center gap-2.5 hover:text-indigo-400 transition-colors">
                 <Phone size={14} className="text-indigo-400" /> +91 95600 20771
               </a>
            </div>
          </div>

          {/* Quick Links Column 1: Programs */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-indigo-400"></span> Online Degrees
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleScroll('comparison-engine')}
                    className="text-slate-400 hover:text-white transition-all text-xs font-semibold text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2: Approvals */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-emerald-400"></span> UGC Guidelines
            </h3>
            <ul className="space-y-3">
              {footerLinks.approvals.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => handleScroll('ugc-guidelines')}
                    className="text-slate-400 hover:text-white transition-all text-xs font-semibold text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 3: Support */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-amber-400"></span> Counselling
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all text-xs font-semibold text-left"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Instagram Gallery */}
          {instagramGallery && (
            <div className="lg:col-span-1 md:col-span-2 lg:col-span-1">
              {instagramGallery}
            </div>
          )}
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between border-t border-slate-800 gap-8">
          <div className="text-[10px] md:text-xs font-bold text-slate-500 flex flex-col md:flex-row items-center gap-2.5 text-center md:text-left">
            <span>© {currentYear} Online Shiksha. All rights reserved.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="text-slate-600 tracking-wider">UGC-DEB EDUCATION PARTNER</span>
          </div>
          <div className="flex gap-6 items-center text-xs font-semibold text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
