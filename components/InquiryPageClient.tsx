'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  GraduationCap, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Briefcase, 
  Clock, 
  ArrowRight,
  Building2
} from 'lucide-react';

export type TargetDegree = 'online-mba' | 'executive-mba' | 'online-bba' | 'online-mca' | 'online-bca';

interface DegreeInfo {
  id: TargetDegree;
  title: string;
  badge: string;
  duration: string;
  feeRange: string;
  avgPackage: string;
  topRoles: string[];
  topUnis: string[];
  eligibility: string;
  description: string;
  highlights: string[];
  defaultWaMessage: string;
}

const DEGREES: Record<TargetDegree, DegreeInfo> = {
  'online-mba': {
    id: 'online-mba',
    title: 'Online MBA (Master of Business Administration)',
    badge: 'Most Popular Post-Graduation',
    duration: '2 Years (4 Semesters)',
    feeRange: '₹60,000 – ₹2,50,000 Total',
    avgPackage: '₹6.5 – 18.5 LPA',
    topRoles: ['Product Manager', 'Marketing Head', 'Business Consultant', 'Finance Manager', 'Operations Director'],
    topUnis: ['Amity University Online', 'LPU Online', 'Chandigarh University', 'DY Patil Vidyapeeth', 'Manipal Online', 'NMIMS CDOE'],
    eligibility: 'Bachelor’s degree (50% aggregate). No CAT / GMAT required for online mode.',
    description: 'Advance your career without leaving your current job. Gain specialized leadership, corporate strategy, and analytical skills with flexible weekend lectures and 100% placement support.',
    highlights: [
      'UGC-DEB & AICTE Approved Degrees',
      'Specializations: Dual, Marketing, Finance, HR, IT, Analytics',
      '0% Interest EMI starting ₹4,999/month',
      '100% Placement Drives & Resume Optimization'
    ],
    defaultWaMessage: 'Hi Mohit Sir, I am interested in Online MBA (2026 Batch). Please share the top university shortlist, fee structures, and early-bird scholarship details.'
  },
  'executive-mba': {
    id: 'executive-mba',
    title: 'Executive MBA (For Working Professionals)',
    badge: 'Fast-Track Leadership Degree',
    duration: '12 – 18 Months Fast-Track',
    feeRange: '₹1,20,000 – ₹3,50,000 Total',
    avgPackage: '₹12.0 – 32.0 LPA',
    topRoles: ['VP of Operations', 'General Manager', 'Chief Strategy Officer', 'Senior Director', 'Management Consultant'],
    topUnis: ['IIM e-PGP', 'Amity Executive', 'DY Patil Executive', 'NMIMS CDOE', 'SPJIMR Online', 'XLRI Virtual'],
    eligibility: 'Graduation with 2+ to 5+ years of corporate work experience.',
    description: 'Designed specifically for mid-level managers and executives looking to break into C-suite leadership roles. Accelerated curriculum, executive masterclasses, and global alumni networking.',
    highlights: [
      'Accelerated 1-Year Fast-Track Format',
      'Live Masterclasses from Industry Leaders & IIM/XLRI Alumni',
      'Peer Learning with Experienced Working Executives',
      'Global Credibility for Promotions & Overseas Opportunities'
    ],
    defaultWaMessage: 'Hi Mohit Sir, I am an experienced working professional looking for an Executive MBA (1-year fast-track). Please share the best university options, eligibility, and fees.'
  },
  'online-bba': {
    id: 'online-bba',
    title: 'Online BBA (Bachelor of Business Administration)',
    badge: 'Top Choice After 12th',
    duration: '3 Years (6 Semesters)',
    feeRange: '₹30,000 – ₹1,20,000 Total',
    avgPackage: '₹4.2 – 8.0 LPA',
    topRoles: ['Business Development Associate', 'Digital Marketer', 'HR Executive', 'Financial Analyst', 'Operations Associate'],
    topUnis: ['Chandigarh University', 'LPU Online', 'Amity Online', 'Jain University Online', 'DY Patil Online'],
    eligibility: '10+2 passed from any recognized board (Commerce, Science, or Arts).',
    description: 'Build a rock-solid business foundation right after Class 12th. Learn management fundamentals, corporate finance, digital marketing, and entrepreneurial strategy with corporate internships.',
    highlights: [
      'Affordable Fees starting just ₹12,500/semester',
      'Direct pathway to high-ROI MBA & Corporate Management roles',
      'Paid remote internships & portfolio development',
      '100% Online Exams from the comfort of home'
    ],
    defaultWaMessage: 'Hi Mohit Sir, I am interested in Online BBA (2026 Batch). Please guide me on the best accredited universities, fee waivers, and internship opportunities.'
  },
  'online-mca': {
    id: 'online-mca',
    title: 'Online MCA (Master of Computer Applications)',
    badge: 'High-Growth Tech Post-Graduation',
    duration: '2 Years (4 Semesters)',
    feeRange: '₹70,000 – ₹1,80,000 Total',
    avgPackage: '₹7.0 – 22.0 LPA',
    topRoles: ['Cloud Architect', 'Full Stack Developer', 'AI/ML Engineer', 'Data Scientist', 'DevOps Specialist'],
    topUnis: ['Manipal University Jaipur', 'Chandigarh University', 'Amity University Online', 'LPU Online', 'UPES Online'],
    eligibility: 'BCA / B.Sc (IT/CS) or any graduation with Mathematics at 10+2 or degree level (Bridge courses available).',
    description: 'Transform into a senior software engineer or tech leader. Specialize in cutting-edge domains like AI & Machine Learning, Cloud Architecture, Cyber Security, and Big Data Analytics.',
    highlights: [
      'Modern Curriculum: Python, AWS/Azure Cloud, React, GenAI',
      'Non-CS Grads eligible through University Bridge Courses',
      'Dedicated Tech Placement Drives with TCS, Wipro, Infosys, Accenture',
      'Capstone Projects & GitHub Portfolio Mentorship'
    ],
    defaultWaMessage: 'Hi Mohit Sir, I am planning to enroll in an Online MCA (2026 session). Please share colleges with top AI/Cloud specializations, fees, and placement tie-ups.'
  },
  'online-bca': {
    id: 'online-bca',
    title: 'Online BCA (Bachelor of Computer Applications)',
    badge: 'Premier Tech Degree After 12th',
    duration: '3 Years (6 Semesters)',
    feeRange: '₹40,000 – ₹1,25,000 Total',
    avgPackage: '₹4.5 – 9.5 LPA',
    topRoles: ['Software Engineer', 'Web Developer', 'App Developer', 'System Analyst', 'Database Admin'],
    topUnis: ['LPU Online', 'Amity Online', 'Chandigarh University', 'Jain University Online', 'Suresh Gyan Vihar'],
    eligibility: '10+2 in any stream (Mathematics not compulsory in many premier online universities).',
    description: 'Launch your high-paying tech career without needing JEE or science stream background. Master coding, database systems, web development, and cloud computing from scratch.',
    highlights: [
      'No Coding Background Required (Starts from Absolute Scratch)',
      'Maths Not Compulsory at 10+2 in many top universities',
      'Hands-on Virtual Coding Labs & Industry Certifications',
      'Pocket-Friendly EMI starting ₹2,999/month'
    ],
    defaultWaMessage: 'Hi Mohit Sir, I want to pursue an Online BCA (2026 session). Please help me select the best university with affordable fees and practical coding curriculum.'
  }
};

const BUDGET_OPTIONS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹1,75,000',
  'Above ₹1,75,000'
];

export function InquiryPageClient() {
  const searchParams = useSearchParams();
  const initialDegreeParam = searchParams.get('course') || searchParams.get('degree') || 'online-mba';

  const normalizeDegree = (param: string): TargetDegree => {
    const p = param.toLowerCase();
    if (p.includes('executive') || p.includes('emba')) return 'executive-mba';
    if (p.includes('bba')) return 'online-bba';
    if (p.includes('mca')) return 'online-mca';
    if (p.includes('bca')) return 'online-bca';
    return 'online-mba';
  };

  const [selectedDegree, setSelectedDegree] = useState<TargetDegree>('online-mba');

  useEffect(() => {
    setSelectedDegree(normalizeDegree(initialDegreeParam));
  }, [initialDegreeParam]);

  const currentDegree = DEGREES[selectedDegree];

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    highestQualification: 'Graduation Completed',
    budget: '₹50,000 – ₹1,00,000',
    needsPlacement: true,
    needsEmi: true,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      name: formData.name,
      number: formData.phone,
      phone: formData.phone,
      email: formData.email,
      location: formData.city,
      source: `Inquiry Page - ${currentDegree.title}`,
      course: currentDegree.title,
      budget: formData.budget,
      qualification: formData.highestQualification,
      message: `${formData.message ? formData.message + ' | ' : ''}Placement Needed: ${formData.needsPlacement ? 'Yes' : 'No'}, 0% EMI: ${formData.needsEmi ? 'Yes' : 'No'}`,
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

      // Auto redirect to WhatsApp after 1.5 seconds for instant conversion
      const waText = encodeURIComponent(
        `Hi Mohit Sir, I just submitted an inquiry on Online Shiksha for ${currentDegree.title}. My Name is ${formData.name}. Please share university details & fee quotes.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/919560020771?text=${waText}`, '_blank');
      }, 1500);

    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const waHref = `https://wa.me/919560020771?text=${encodeURIComponent(currentDegree.defaultWaMessage)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-lime-400 selection:text-black">
      {/* ── HERO BANNER ── */}
      <div className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs md:text-sm font-black uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            July – September 2026 Admissions Open | 100% Free Unbiased Counselling
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Get Direct Admission in <span className="text-[#ccff00]">UGC-Approved</span> Online Degrees
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-medium mb-10 leading-relaxed">
            Compare 50+ NAAC A++ / A+ accredited universities, calculate exact fees, unlock up to 25% scholarship fee waiver, and get 1-on-1 counseling from senior advisor <strong className="text-white">Mohit Jain</strong>.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#ccff00]">15,000+</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Students Guided</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#ccff00]">50+</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Partner Universities</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#ccff00]">0% Interest</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Monthly EMI Options</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#ccff00]">100% Free</div>
              <div className="text-xs text-slate-400 font-bold uppercase mt-1">Zero Hidden Charges</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Chat Directly on WhatsApp
            </a>
            <a
              href="tel:+919560020771"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-black px-6 py-3.5 rounded-xl text-sm uppercase tracking-wider border border-slate-700 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              Call Advisor: +91 95600 20771
            </a>
          </div>

        </div>
      </div>

      {/* ── COURSE SELECTOR TABS ── */}
      <div className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 py-4 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-black mb-3 text-center md:text-left">
            Select Your Target Program:
          </p>
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
            {(Object.keys(DEGREES) as TargetDegree[]).map((degKey) => {
              const isSelected = selectedDegree === degKey;
              return (
                <button
                  key={degKey}
                  onClick={() => setSelectedDegree(degKey)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all uppercase tracking-wider flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20 scale-105'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-slate-400'}`} />
                  {degKey === 'online-mba' && 'Online MBA'}
                  {degKey === 'executive-mba' && 'Executive MBA'}
                  {degKey === 'online-bba' && 'Online BBA'}
                  {degKey === 'online-mca' && 'Online MCA'}
                  {degKey === 'online-bca' && 'Online BCA'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT: DEGREE DETAILS & FORM ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT 7 COLS: PROGRAM SUMMARY & USPs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black uppercase tracking-wider mb-4">
                {currentDegree.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight">
                {currentDegree.title}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {currentDegree.description}
              </p>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Duration</span>
                  <span className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#ccff00]" />
                    {currentDegree.duration}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Average Fees</span>
                  <span className="text-sm sm:text-base font-black text-[#ccff00]">
                    {currentDegree.feeRange}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Avg CTC / Package</span>
                  <span className="text-sm sm:text-base font-black text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {currentDegree.avgPackage}
                  </span>
                </div>
              </div>
            </div>

            {/* Key USPs */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ccff00]" />
                Why Choose {currentDegree.title.split('(')[0]} with Us?
              </h3>
              <div className="space-y-3">
                {currentDegree.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                    <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Partner Universities for this program */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#ccff00]" />
                Top UGC-DEB Accredited Universities for {currentDegree.title.split('(')[0]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentDegree.topUnis.map((uni, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <span className="text-sm font-black text-white">{uni}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                      Admissions Open
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4 italic">
                * Eligibility: {currentDegree.eligibility}
              </p>
            </div>

            {/* Career Outcomes & Roles */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#ccff00]" />
                Target Job Roles & Career Trajectory
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentDegree.topRoles.map((role, idx) => (
                  <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                    💼 {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Advisor Profile Guarantee */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-900/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-indigo-600/30 shrink-0">
                MJ
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-black text-white">Mohit Jain</span>
                  <span className="text-[10px] bg-[#ccff00] text-black font-black px-2 py-0.5 rounded uppercase">
                    Senior Advisor
                  </span>
                </div>
                <p className="text-xs text-indigo-200 font-semibold mb-3">
                  8+ Years Experience | Specializing in Online MBA, Executive MBA, BBA, MCA & BCA Admissions
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "My goal is simple: ensure you don't overpay for your degree and pick a university that guarantees career acceleration and genuine placement assistance."
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: HIGH-CONVERTING INQUIRY FORM */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-slate-900 border-2 border-[#ccff00]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#ccff00]">
                    Free Application Assist
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    Session 2026
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                  Apply for {selectedDegree === 'online-mba' ? 'Online MBA' : selectedDegree === 'executive-mba' ? 'Exec MBA' : selectedDegree.replace('online-', 'Online ').toUpperCase()}
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Fill in your details below to get instant university fee comparisons and early-bird scholarship access.
                </p>

                {status === 'success' ? (
                  <div className="bg-slate-950 border border-lime-400/50 p-6 rounded-2xl text-center space-y-4">
                    <div className="w-14 h-14 bg-[#ccff00] text-black rounded-full flex items-center justify-center font-black text-2xl mx-auto">
                      ✓
                    </div>
                    <h4 className="text-xl font-black text-white">Application Received!</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Mohit Jain will contact you shortly on WhatsApp (<strong className="text-[#ccff00]">{formData.phone}</strong>).
                    </p>
                    <p className="text-[11px] text-slate-400 animate-pulse">
                      Redirecting to WhatsApp to start your counseling...
                    </p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider w-full justify-center"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      Open WhatsApp Now
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* WhatsApp Phone */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        WhatsApp Number * (For brochures & fee structures)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* City & State */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        Your City / State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Delhi NCR, Bangalore, Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Budget Preference */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                        Total Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-[#ccff00] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                      >
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b} className="bg-slate-900 text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Checkbox preferences */}
                    <div className="space-y-2 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.needsPlacement}
                          onChange={(e) => setFormData({ ...formData, needsPlacement: e.target.checked })}
                          className="w-4 h-4 rounded text-lime-400 bg-slate-950 border-slate-800 focus:ring-0"
                        />
                        <span className="text-xs text-slate-300 font-semibold">
                          I want 100% Placement & Interview Support
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.needsEmi}
                          onChange={(e) => setFormData({ ...formData, needsEmi: e.target.checked })}
                          className="w-4 h-4 rounded text-lime-400 bg-slate-950 border-slate-800 focus:ring-0"
                        />
                        <span className="text-xs text-slate-300 font-semibold">
                          I need 0% Interest Monthly EMI options
                        </span>
                      </label>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-[#ccff00] hover:bg-lime-400 text-black font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-[#ccff00]/20 active:scale-98 disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        'Submitting Application...'
                      ) : (
                        <>
                          <span>Get Free Shortlist & Scholarships</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center mt-2 font-bold">
                        Failed to submit. Please chat on WhatsApp directly or retry.
                      </p>
                    )}

                    {/* Privacy Guarantee */}
                    <p className="text-[11px] text-slate-500 text-center font-medium pt-2 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      100% Privacy Protected. No spam calls. Verified universities only.
                    </p>

                  </form>
                )}

                {/* Or Instant WhatsApp Button */}
                <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-3">
                    Prefer direct chat with Mohit Jain?
                  </span>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Instant WhatsApp: +91 95600 20771
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
