"use client";

import { 
  BadgeCheck, 
  Phone, 
  ChevronDown, 
  GraduationCap, 
  Award, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Compass,
  Sparkles
} from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  const FAQ_ITEMS = [
    {
      q: 'Is an online degree from Indian universities valid?',
      a: 'Yes. Online degrees from UGC-DEB approved universities are fully valid and equivalent to regular degrees as per UGC regulations 2020. They are recognized by employers, government bodies, and for higher education and PSU jobs.',
    },
    {
      q: 'What is the fee for an online MBA in India in 2026?',
      a: 'Online MBA fees in India range from ₹62,200 (Andhra University) to ₹2,20,000 (SASTRA University) in 2026. The average fee for a reputed UGC-approved online MBA is around ₹1–1.8 Lakhs for 2 years.',
    },
    {
      q: 'Which is the best online university in India for MBA?',
      a: 'Top picks include Amity University Online (WES approved), LPU Online (NAAC A++), Chandigarh University (QS Ranked), Jain Univ Online (NAAC A++), and NMIMS Online (Top-5 B-school brand). Best choice depends on your budget and career goals.',
    },
    {
      q: 'Are UGC-DEB approved degrees accepted for government jobs?',
      a: 'Yes. As per UGC (ODL & Online Programmes) Regulations 2020, UGC-DEB approved online degrees hold equivalent status and are accepted for most government jobs, PSU recruitment, and higher education admissions.',
    },
    {
      q: 'Can I pursue an online MBA while working a full-time job?',
      a: 'Absolutely. Online MBA programs are built for working professionals — most universities offer weekend batches, recorded lectures, and self-paced modules so you can complete your degree without quitting your job.',
    },
    {
      q: 'What is the difference between online and distance education?',
      a: 'Online degrees (UGC-DEB mode) use live/recorded digital classes on an LMS platform. Distance education (ODL mode) traditionally uses printed study material with physical contact sessions. Both are UGC-recognized; online is more interactive.',
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-body overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      <JsonLd data={faqSchema} />
      
      {/* ── GEN-Z CSS STYLE TOKENS ── */}
      <style>{`
        .genz-bg {
          background-image: 
            radial-gradient(at 0% 0%, rgba(204, 255, 0, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(255, 0, 127, 0.08) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(121, 40, 202, 0.1) 0px, transparent 50%);
        }

        .dot-pattern {
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .neo-card {
          background: #111;
          border: 2px solid #333;
          border-radius: 24px;
          box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease-in-out;
        }

        .neo-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0px rgba(204, 255, 0, 0.8);
          border-color: rgba(204, 255, 0, 0.5);
        }
        
        .neo-card-pink:hover {
          box-shadow: 8px 8px 0px rgba(255, 0, 127, 0.8);
          border-color: rgba(255, 0, 127, 0.5);
        }

        .text-gradient-genz {
          background: linear-gradient(90deg, #ccff00, #00ffa3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .text-gradient-pink {
          background: linear-gradient(90deg, #ff007f, #ff7171);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .marquee-container {
          background: #ccff00;
          color: #000;
          padding: 12px 0;
          font-weight: 900;
          text-transform: uppercase;
          display: flex;
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 2px solid #000;
          border-top: 2px solid #000;
        }

        .marquee-content {
          display: flex;
          animation: marquee 15s linear infinite;
        }

        .marquee-content span {
          margin-right: 50px;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .float-animation {
          animation: float 5s ease-in-out infinite;
        }

        .float-delayed {
          animation: float 6s ease-in-out 2s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        .brutal-btn {
          background: #ccff00;
          color: #000;
          border: 2px solid #ccff00;
          box-shadow: 0 0 20px rgba(204,255,0,0.4);
          transition: all 0.2s;
        }
        .brutal-btn:hover {
          background: transparent;
          color: #ccff00;
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(204,255,0,0.6);
        }
      `}</style>

      {/* ── TOP MARQUEE ── */}
      <div className="marquee-container z-50 relative">
        <div className="marquee-content text-sm tracking-widest">
          <span>🔥 LEVEL UP YOUR CAREER IN 2026</span>
          <span>🎓 UGC-DEB APPROVED UNIVERSITIES</span>
          <span>💼 100% PLACEMENT ASSISTANCE</span>
          <span>✨ NAAC A++ ACCREDITED</span>
          <span>🔥 LEVEL UP YOUR CAREER IN 2026</span>
          <span>🎓 UGC-DEB APPROVED UNIVERSITIES</span>
          <span>💼 100% PLACEMENT ASSISTANCE</span>
          <span>✨ NAAC A++ ACCREDITED</span>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="genz-bg pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#111] border border-[#333] px-4 py-2 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ccff00]"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">Valid Worldwide • 2026</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
              FIND YOUR <br />
              <span className="text-gradient-genz">PERFECT DEGREE</span> <br />
              NO CAP. 🧢
            </h1>
            
            <p className="text-gray-400 text-lg font-medium max-w-lg">
              Compare 27+ top-tier UGC-approved universities. Check fees, NAAC grades, and real ROI. Skip the fluff, build your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('comparison-engine');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="brutal-btn font-black px-8 py-4 rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Comparing <ArrowRight size={18} strokeWidth={3} />
              </button>
              <a
                href="https://wa.me/919560020771"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#111] border-2 border-[#333] hover:border-[#ff007f] hover:text-[#ff007f] transition-colors text-sm font-black uppercase tracking-wider"
              >
                <Phone size={18} /> Call Expert
              </a>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-3 pt-6">
              {['UGC Approved ✅', 'WES Valid 🌍', 'EMI Available 💳'].map(tag => (
                <span key={tag} className="text-xs font-bold bg-[#111] border border-[#333] px-3 py-1.5 rounded-lg text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Bento Grid Graphics (GenZ Aesthetic) */}
          <div className="lg:col-span-6 relative hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <div className="neo-card neo-card-pink p-6 flex flex-col justify-between h-48 float-animation">
                <div className="flex justify-between items-start">
                  <div className="bg-[#ff007f]/20 text-[#ff007f] p-3 rounded-xl"><Zap size={24} /></div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500">Fast ROI</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black">₹62K</h3>
                  <p className="text-sm font-bold text-gray-400">Starting Fee</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="neo-card p-6 flex flex-col justify-between h-48 float-delayed translate-y-8">
                <div className="flex justify-between items-start">
                  <div className="bg-[#ccff00]/20 text-[#ccff00] p-3 rounded-xl"><Award size={24} /></div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500">Quality</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black">NAAC A++</h3>
                  <p className="text-sm font-bold text-gray-400">Top Universities</p>
                </div>
              </div>

              {/* Card 3 (Wide) */}
              <div className="neo-card col-span-2 p-6 flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1,2,3].map(i => (
                      <div key={i} className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-black ${i===1 ? 'bg-[#ff007f]' : i===2 ? 'bg-[#ccff00] text-black' : 'bg-[#00ffa3] text-black'}`}>
                        {i===1 ? 'AU' : i===2 ? 'CU' : 'LU'}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-black text-lg">27+ Options</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase">Compare them all</p>
                  </div>
                </div>
                <Sparkles className="text-[#ccff00]" size={32} />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN COMPARATOR BOARD ── */}
      <div className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-12">
        <div className="bg-[#050505] rounded-3xl border-2 border-[#333] shadow-[0_0_50px_rgba(204,255,0,0.1)] overflow-hidden">
          <OnlineDegreeClient />
        </div>
      </div>

      {/* ── WHY CHOOSE ONLINE: Bento Box Grid ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Why Go <span className="text-gradient-pink">Online?</span> 🚀
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto">
              Skip the commute. Keep your job. Get the same exact degree. It's literally a no-brainer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎓', color: 'hover:border-[#ccff00]', title: 'UGC Valid', desc: 'Fully equivalent to traditional on-campus degrees under UGC regulations.' },
              { icon: '🌍', color: 'hover:border-[#ff007f]', title: 'WES Approved', desc: 'Valid for abroad PRs and further studies in US/Canada/UK.' },
              { icon: '💻', color: 'hover:border-[#00ffa3]', title: 'Work-Friendly', desc: 'Recorded lectures & weekend live classes fit your job schedule.' },
              { icon: '💸', color: 'hover:border-[#ff9900]', title: 'Cost Efficient', desc: 'Save up to 80% compared to full-time offline courses.' },
              { icon: '🤝', color: 'hover:border-[#00e5ff]', title: 'Placements', desc: 'Access university placement cells and hiring drives directly.' },
              { icon: '⭐', color: 'hover:border-[#b700ff]', title: 'Premium Tag', desc: 'Get alumni status from India’s top NAAC A++ rated universities.' },
            ].map((item) => (
              <div 
                key={item.title} 
                className={`neo-card p-8 space-y-4 ${item.color}`}
              >
                <div className="text-5xl">{item.icon}</div>
                <h3 className="font-black text-xl uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP SECTION ── */}
      <section className="py-24 bg-[#111] border-y-2 border-[#333]">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              How to <span className="text-gradient-genz">Choose</span> 🤔
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'Check Approvals', desc: 'Ensure it is UGC-DEB approved.' },
              { num: '02', title: 'Look at NAAC', desc: 'Prioritize A++ and A+ grades for quality.' },
              { num: '03', title: 'Match Specialization', desc: 'Pick the right major for your career.' },
            ].map((item, i) => (
              <div key={item.num} className="flex flex-col md:flex-row items-center gap-6 bg-[#050505] p-6 rounded-2xl border border-[#333] hover:border-[#ccff00] transition-colors">
                <div className="text-6xl font-black text-transparent [-webkit-text-stroke:2px_#333] hover:[-webkit-text-stroke:2px_#ccff00] transition-all">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-black text-2xl uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 space-y-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Spill The <span className="text-gradient-pink">Tea</span> ☕
            </h2>
            <p className="text-gray-400 mt-4 font-medium">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group neo-card bg-[#050505] overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-black text-lg hover:text-[#ccff00] transition-colors">
                  <span>{item.q}</span>
                  <ChevronDown className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 font-medium border-t border-[#333] pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER ── */}
      <section className="py-24 bg-[#ccff00] text-black border-t-4 border-black relative overflow-hidden">
        {/* Background typographic noise */}
        <div className="absolute inset-0 opacity-10 font-black text-[15rem] leading-none text-black break-all overflow-hidden pointer-events-none select-none">
          ONLINEONLINEONLINEONLINEONLINE
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            Still Confused? 🤯
          </h2>
          <p className="font-bold text-xl max-w-xl mx-auto">
            Get a FREE 1-on-1 counseling session with Mohit Jain. Let's map out your career together.
          </p>
          
          <div className="pt-6">
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20online%20degrees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-[#ccff00] font-black text-lg uppercase tracking-wider px-12 py-6 rounded-2xl hover:scale-105 transition-transform shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[12px_12px_0px_rgba(0,0,0,0.4)]"
            >
              Get Free Counseling 📞
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
