import { 
  BadgeCheck, 
  Phone, 
  ChevronDown, 
  GraduationCap, 
  Award, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Users,
  Compass
} from 'lucide-react';
import OnlineDegreeClient from '@/components/OnlineDegreeClient';

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

  return (
    <div className="bg-[#0b0f19] text-white min-h-screen font-body overflow-x-hidden">
      {/* ── CUSTOM GEN-Z CSS STYLE tokens ── */}
      <style>{`
        .hero-mesh {
          background-color: #0b0f19;
          background-image: 
            radial-gradient(at 10% 20%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
            radial-gradient(at 90% 10%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 50% 80%, rgba(236, 72, 153, 0.1) 0px, transparent 50%);
          position: relative;
        }
        
        .grid-accent {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .glass-card {
          background: rgba(30, 41, 59, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .glass-card-hover:hover {
          background: rgba(30, 41, 59, 0.65);
          border-color: rgba(99, 102, 241, 0.35);
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.15);
        }

        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes float-y-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float-y 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-y-delayed 7s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glow-button {
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.35);
          transition: all 0.3s ease;
        }
        .glow-button:hover {
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.55);
          transform: scale(1.03);
        }
      `}</style>

      {/* ── HERO SECTION WITH GRAPHICAL CSS MOCKUPS ── */}
      <section className="hero-mesh pt-32 pb-24 relative border-b border-slate-800/80">
        <div className="grid-accent" />
        
        {/* Dynamic Glowing Spheres in Background */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: Highly Styled Value Prop */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest px-4.5 py-2 rounded-2xl backdrop-blur-md animate-bounce-slow">
              <BadgeCheck size={14} className="text-indigo-400" />
              UGC-DEB Approved Universities · 2026
            </span>
            
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight">
              Compare Top UGC <br className="hidden sm:inline" />
              <span className="gradient-text">Online Degrees</span> <br />
              In India Instantly
            </h1>
            
            <p className="text-slate-400 text-base sm:text-lg font-semibold max-w-xl leading-relaxed">
              Compare 27+ premier approved universities on fees, NAAC grades, WES status, and student ratings. Search, filter, and choose your perfect college path with zero stress.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => {
                  const el = document.getElementById('comparison-engine');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black px-8 py-4.5 rounded-2xl glow-button text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch Comparison Tool <ArrowRight size={18} />
              </button>
              <a
                href="tel:+919560020771"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 px-8 text-sm font-black uppercase tracking-wider text-white transition-all active:scale-95"
              >
                <Phone size={16} className="text-indigo-400" />
                Call Expert Advisor
              </a>
            </div>

            {/* Stats Row */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-md">
              {[
                { num: '27+', label: 'Universities', color: 'text-indigo-400' },
                { num: '₹62K', label: 'Start Fee', color: 'text-violet-400' },
                { num: '100%', label: 'UGC Approved', color: 'text-pink-400' },
              ].map((s) => (
                <div key={s.label} className="space-y-1">
                  <p className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.num}</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Absolutely Gorgeous Interactive Mockup Graphic */}
          <div className="lg:col-span-5 relative hidden lg:block select-none">
            {/* Ambient Rotator Ring */}
            <div className="absolute inset-0 m-auto w-[360px] h-[360px] border border-dashed border-indigo-500/10 rounded-full animate-spin-slow" />
            
            {/* Graphic Mockup 1: Primary comparison board */}
            <div className="relative glass-card p-6 rounded-3xl w-[380px] shadow-2xl animate-float border-indigo-500/20">
              {/* Card Title */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Comparator</span>
              </div>

              {/* Mock items */}
              <div className="space-y-4 pt-4">
                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600/20 rounded-xl border border-indigo-500/30 flex items-center justify-center font-display text-sm font-black text-indigo-400">AM</div>
                    <div>
                      <span className="block text-xs font-black text-white">Amity Online</span>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">UGC-DEB · WES</span>
                    </div>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2 py-1 rounded-lg border border-emerald-500/20">NAAC A+</span>
                </div>

                <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-600/20 rounded-xl border border-pink-500/30 flex items-center justify-center font-display text-sm font-black text-pink-400">LP</div>
                    <div>
                      <span className="block text-xs font-black text-white">LPU Online</span>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">NAAC A++ · WES</span>
                    </div>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2 py-1 rounded-lg border border-emerald-500/20">NAAC A++</span>
                </div>
              </div>
            </div>

            {/* Graphic Mockup 2: Floating Quick Stats overlay */}
            <div className="absolute -bottom-8 -left-8 glass-card p-4.5 rounded-2xl w-[200px] shadow-2xl animate-float-delayed border-pink-500/20">
              <div className="flex items-center gap-3">
                <div className="bg-pink-600/20 p-2 rounded-xl text-pink-400 border border-pink-500/20">
                  <Zap size={18} className="animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Fast Search</span>
                  <span className="block text-xs font-black text-white">Compare in 10s</span>
                </div>
              </div>
            </div>

            {/* Graphic Mockup 3: Floating check stats */}
            <div className="absolute -top-10 -right-6 glass-card p-4 rounded-2xl w-[180px] shadow-2xl animate-float border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-600/20 p-1.5 rounded-lg text-emerald-400">
                  <ShieldCheck size={16} />
                </div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">100% Secure</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHATSAPP CTA STRIP ── */}
      <div className="bg-slate-900 border-b border-slate-800 py-4.5 text-center text-sm font-bold text-slate-400 relative z-20">
        <a
          href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20online%20degrees"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          WhatsApp Assistance Available: Get comparison PDFs & prospectus instantly!
        </a>
      </div>

      {/* ── MAIN COMPARATOR BOARD ── */}
      <div id="comparison-engine" className="relative z-10">
        <OnlineDegreeClient />
      </div>

      {/* ── WHY CHOOSE ONLINE: Sleek Graphics Grid ── */}
      <section id="ugc-guidelines" className="bg-[#0b0f19] py-24 border-t border-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.03),transparent_40%)]" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Why Pick an <span className="gradient-text">Online Degree</span> in 2026?
            </h2>
            <p className="text-slate-400 font-semibold max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Online programs under UGC-DEB mode provide top-tier learning, extreme cost efficiency, and recognized credentials worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
            {[
              { icon: <GraduationCap size={24} />, color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5', title: 'UGC-DEB Valid Degree', desc: 'Fully equivalent to traditional on-campus degrees under UGC regulations. Valid for Government jobs, PSUs, and study abroad.' },
              { icon: <Award size={24} />, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5', title: 'NAAC A++ Grades', desc: 'Study at India\'s premium tier universities like Jain, Parul, SRM, Parul, and LPU with highest national quality tags.' },
              { icon: <Compass size={24} />, color: 'text-pink-400 border-pink-500/20 bg-pink-500/5', title: 'WES Approved', desc: 'Perfect path for relocation. Multiple portal options are fully recognized by WES for credential assessment in the US & Canada.' },
              { icon: <Clock size={24} />, color: 'text-violet-400 border-violet-500/20 bg-violet-500/5', title: 'Work-Friendly LMS', desc: 'Access recorded lectures, attend weekend live classes, and submit assignments on highly polished student dashboards.' },
              { icon: <ShieldCheck size={24} />, color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5', title: 'Cost Efficient', desc: 'Save up to 10x compared to full-time offline courses. Zero hostel, accommodation, or travel costs.' },
              { icon: <Flame size={24} />, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5', title: 'Placement Drives', desc: 'Leverage university corporate connection networks, resume reviews, placement portals, and regular job alerts.' },
            ].map((item) => (
              <div 
                key={item.title} 
                className="glass-card glass-card-hover p-8 rounded-3xl text-left space-y-5 transition-all duration-300 border-slate-800"
              >
                <div className={`p-3 rounded-2xl w-fit border ${item.color}`}>
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-white text-lg tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP-WISE HOW TO CHOOSE: Ultra Modern Graphic Timeline ── */}
      <section className="bg-slate-900/40 py-24 border-t border-slate-900 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Make the Right <span className="gradient-text">Decision</span>
            </h2>
            <p className="text-slate-400 font-semibold max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Use our simple 5-step roadmap to assess which university matches your career and budget guidelines.
            </p>
          </div>

          <div className="relative space-y-8">
            {/* Visual connecting line */}
            <div className="absolute top-8 bottom-8 left-6 w-[2px] bg-slate-800 pointer-events-none hidden md:block" />

            {[
              { num: '01', title: 'Confirm UGC-DEB Approval First', desc: 'Never skip this. Check that the university has an active ODL approval status from the UGC Distance Education Bureau. (All listed on Online Shiksha are 100% verified!).' },
              { num: '02', title: 'Compare NAAC Grade & Accreditations', desc: 'Prioritize NAAC A++ or A+ colleges. This guarantees premium academic syllabus quality, proper online LMS tools, and top faculty boards.' },
              { num: '03', title: 'Align with Specializations', desc: 'Select institutions whose elective arrays map precisely to your target job profile (e.g. Analytics, Marketing, Cloud Computing, Finance).' },
              { num: '04', title: 'Review total Fee vs ROI', desc: 'Some regional universities offer premium tags at highly affordable structures (e.g. SRM or Parul). Don\'t pay double for similar NAAC grades unless necessary.' },
              { num: '05', title: 'Evaluate Global Approvals if relocations are planned', desc: 'Make sure your chosen program is WES approved (like Amity, LPU, Jain, D.Y. Patil) if you wish to apply for overseas immigration visas.' },
            ].map((item) => (
              <div 
                key={item.num} 
                className="flex flex-col md:flex-row gap-6 items-start bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/30 transition-colors duration-300 relative z-10"
              >
                <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 text-indigo-400 font-black text-lg shrink-0">
                  {item.num}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-black text-white text-base sm:text-lg tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section id="faqs" className="bg-[#0b0f19] py-24 border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Got <span className="gradient-text">Questions?</span> We got answers.
            </h2>
            <p className="text-slate-400 font-semibold max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Find instant answers to the most common queries about fee structures, equivalency, and placements.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={i}
                className="group glass-card rounded-3xl border border-slate-800 overflow-hidden transition-all duration-300 open:border-indigo-500/30"
              >
                <summary className="flex items-center justify-between gap-4 px-6.5 py-5.5 cursor-pointer list-none font-black text-white text-sm sm:text-base hover:text-indigo-400 transition-colors">
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="text-indigo-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6.5 pb-6 text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed border-t border-slate-800/80 pt-4.5">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM BOTTOM BANNER ── */}
      <section className="bg-slate-950 py-24 border-t border-slate-900 relative overflow-hidden">
        {/* Glow effect in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Not Sure Which College to Choose?
            </h2>
            <p className="text-slate-400 font-semibold text-base max-w-xl mx-auto leading-relaxed">
              Schedule a free 1-on-1 career mapping call with Mohit Jain and find your perfect online program matching your exact budget and targets.
            </p>
          </div>
          
          <div className="pt-2">
            <a
              href="https://wa.me/919560020771?text=Hi%2C%20I%20want%20to%20know%20more%20about%20online%20degrees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-sm uppercase tracking-wider px-10 py-5 rounded-2xl glow-button hover:opacity-95 cursor-pointer"
            >
              Get Free Counselling Session →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
