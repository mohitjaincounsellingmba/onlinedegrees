"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Instagram, Linkedin, Facebook, Youtube, Phone, ArrowRight, GraduationCap } from 'lucide-react';

export function Footer() {
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
      { name: 'Create Resume', href: '/create-resume' },
      { name: 'CAT 2026 Calculator', href: '/tools/cat-score-calculator' },
      { name: 'Admissions 2026', href: '#' },
    ]
  };

  const socials = [
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/careerwithmohit.online/", label: "Instagram", color: "hover:bg-[#ff007f] hover:border-[#ff007f]" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/career-with-mohit", label: "LinkedIn", color: "hover:bg-blue-600 hover:border-blue-600" },
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=61575525271998", label: "Facebook", color: "hover:bg-blue-500 hover:border-blue-500" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@careerwithmohit.online", label: "YouTube", color: "hover:bg-red-600 hover:border-red-600" }
  ];

  return (
    <footer className="relative bg-[#050505] text-white overflow-hidden border-t-4 border-[#333]">

      {/* ── TOP CTA BANNER ── */}
      <div className="bg-[#ccff00] border-b-4 border-black">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black">
              Still Deciding? Get Free Guidance 🎓
            </h2>
            <p className="text-black/70 font-bold text-sm mt-1">
              India's leading career counsel experts. No cap. 100% free.
            </p>
          </div>
          <button
            onClick={() => handleScroll('comparison-engine')}
            className="bg-black text-[#ccff00] px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-sm hover:-translate-y-1 transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.4)] flex items-center gap-2 shrink-0 cursor-pointer border-2 border-black"
          >
            Compare Now <ArrowRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* ── Brand Column ── */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="bg-[#ccff00] p-2.5 rounded-xl text-black border-2 border-black group-hover:shadow-[4px_4px_0px_#ccff00] transition-all">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-black text-xl tracking-tight uppercase text-white">
                Online<span className="text-[#ccff00]">Shiksha</span>
              </span>
            </Link>
            
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
              Compare 27+ UGC approved universities on NAAC grades, accreditation, and fees. Built to simplify professional degree searches in India.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[#111] p-2.5 rounded-xl border-2 border-[#333] text-gray-400 hover:text-white transition-all duration-200 ${social.color} hover:scale-110 shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-0 active:translate-y-0`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Phone */}
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-[#ccff00] transition-colors uppercase tracking-wider"
            >
              <Phone size={16} className="text-[#ccff00]" /> +91 95600 20771
            </a>
          </div>

          {/* ── Programs Column ── */}
          <div className="space-y-5">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-1 bg-[#ccff00] rounded-full inline-block"></span>
              Online Degrees
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScroll('comparison-engine')}
                    className="text-gray-500 hover:text-white transition-all text-sm font-medium text-left cursor-pointer hover:translate-x-1 inline-block"
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Approvals Column ── */}
          <div className="space-y-5">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-1 bg-[#ff007f] rounded-full inline-block"></span>
              UGC Guidelines
            </h3>
            <ul className="space-y-3">
              {footerLinks.approvals.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScroll('ugc-guidelines')}
                    className="text-gray-500 hover:text-white transition-all text-sm font-medium text-left cursor-pointer hover:translate-x-1 inline-block"
                  >
                    → {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support Column ── */}
          <div className="space-y-5">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-4 h-1 bg-[#00ffa3] rounded-full inline-block"></span>
              Counselling
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-all text-sm font-medium hover:translate-x-1 inline-block"
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BIG BRAND STATEMENT ── */}
        <div className="mt-16 pt-12 border-t-2 border-[#1a1a1a] text-center">
          <p className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black uppercase tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_#333] leading-none pointer-events-none select-none">
            ONLINE SHIKSHA
          </p>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 text-xs font-bold text-gray-600 text-center">
            <span>© {currentYear} Online Shiksha. All rights reserved.</span>
            <span className="hidden md:inline text-[#333]">|</span>
            <span className="text-[#ccff00]/40 uppercase tracking-widest text-[10px]">UGC-DEB Education Partner</span>
          </div>
          <div className="flex gap-4 items-center text-xs font-bold text-gray-600">
            <Link href="/privacy-policy" className="hover:text-[#ccff00] transition-colors uppercase tracking-wider">Privacy Policy</Link>
            <span className="text-[#333]">·</span>
            <Link href="/terms-of-service" className="hover:text-[#ccff00] transition-colors uppercase tracking-wider">Terms of Service</Link>
            <span className="text-[#333]">·</span>
            <Link href="/disclaimer" className="hover:text-[#ccff00] transition-colors uppercase tracking-wider">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
