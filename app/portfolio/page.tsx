import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Phone, 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Zap, 
  Sparkles, 
  BadgeCheck, 
  ArrowRight, 
  BookOpen, 
  Users,
  Compass,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Mohit Jain | Expert B-School Admissions Counselor & Career Mentor",
  description: "Meet Mohit Jain, founder of CareerWithMohit. Certified by FMS Delhi & aligned with IIM Bangalore benchmarks, Mohit provides elite B-school mapping, GD-PI-WAT prep, and career counseling for 15,000+ students.",
  keywords: [
    "Mohit Jain career counselor", "CareerWithMohit", "MBA admission consultant India", 
    "FMS Delhi Business Analytics", "Accenture", "Doubtnut", "B-school mapping profile evaluation",
    "GD-PI-WAT interview preparation", "Online MBA advisor"
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Mohit Jain | Expert B-School Admissions Counselor & Career Mentor",
    description: "Meet Mohit Jain, founder of CareerWithMohit. Certified by FMS Delhi & aligned with IIM Bangalore benchmarks, Mohit provides elite B-school mapping, GD-PI-WAT prep, and career counseling for 15,000+ students.",
    url: "https://onlineshiksha.online/portfolio",
    type: "profile",
    images: [
      {
        url: "/mohit-jain-avatar.jpg",
        width: 1000,
        height: 1000,
        alt: "Mohit Jain - Expert B-School Admissions Counselor & Career Mentor",
      },
    ],
  },
};

export default function PortfolioPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohit Jain",
    "jobTitle": "Expert Admissions Counselor & Career Mentor",
    "url": "https://onlineshiksha.online/portfolio",
    "image": "https://onlineshiksha.online/mohit-jain-avatar.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/mohit-jain-264a7315b/",
      "https://www.instagram.com/careerwithmohit.online/",
      "https://www.facebook.com/profile.php?id=61575525271998",
      "https://www.youtube.com/@careerwithmohit.online",
      "https://www.careerwithmohit.online"
    ],
    "knowsAbout": [
      "Career Counseling",
      "B-School Admissions Strategy",
      "GD-PI-WAT Mentorship",
      "Profile Evaluation",
      "Business Analytics",
      "Digital Marketing"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "CareerWithMohit",
      "url": "https://www.careerwithmohit.online"
    }
  };

  const stats = [
    { value: "6+", label: "Years Experience", color: "text-[#ccff00]", border: "border-[#ccff00]" },
    { value: "15K+", label: "Aspirants Guided", color: "text-[#ff007f]", border: "border-[#ff007f]" },
    { value: "98%", label: "GD-PI Success Rate", color: "text-[#00ffa3]", border: "border-[#00ffa3]" },
    { value: "45+", label: "B-Schools Partnered", color: "text-[#00e5ff]", border: "border-[#00e5ff]" }
  ];

  const credentials = [
    {
      title: "Executive Certificate in Business Analytics",
      issuer: "Faculty of Management Studies (FMS), Delhi",
      description: "Advanced analytics modeling, statistical forecasting, and database-driven decision mapping designed for high-performing operations.",
      icon: <Award className="h-6 w-6 text-[#ccff00]" />,
      badge: "Analytics"
    },
    {
      title: "Admissions Mentorship & Advisory Benchmarks",
      issuer: "IIM Bangalore Program Alignment",
      description: "Mentoring methodologies structured around executive business school metrics, profile indices, and structured evaluation rubrics.",
      icon: <GraduationCap className="h-6 w-6 text-[#ff007f]" />,
      badge: "Mentorship"
    },
    {
      title: "Six Sigma Operational Excellence",
      issuer: "Yellow/White Belt Certification",
      description: "Application of lean management workflows, process optimization, and system quality control to career pipelines and academic counseling.",
      icon: <ShieldCheck className="h-6 w-6 text-[#00ffa3]" />,
      badge: "Lean Operations"
    },
    {
      title: "Advanced Growth & Digital Architecture",
      issuer: "Performance Marketing Systems",
      description: "Decade-long experience (since 2011) building high-traffic web apps, score calculators, and conversion rate systems for national educational brands.",
      icon: <Zap className="h-6 w-6 text-[#00e5ff]" />,
      badge: "Growth Tech"
    }
  ];

  const services = [
    {
      title: "1-on-1 Profile Mapping",
      desc: "Comprehensive evaluation of your academic credentials, extra-curricular gaps, and career spikes. We map your trajectory and classify B-schools into Dream, Target, and Safe categories.",
      highlight: "Custom Roadmap",
      badgeColor: "bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30"
    },
    {
      title: "GD-PI-WAT Bootcamps",
      desc: "Simulated interview drills, case study reviews, written analysis checks, and live group discussion round-tables. Get direct feedback modeled after actual B-school evaluation criteria.",
      highlight: "98% Crack Rate",
      badgeColor: "bg-[#ff007f]/10 text-[#ff007f] border-[#ff007f]/30"
    },
    {
      title: "Online MBA & ODL Consulting",
      desc: "Navigating UGC-DEB approved executive programs, comparing fee matrices (ranging ₹60K to ₹2.5L), NAAC grades, and corporate recognition to choose the right university.",
      highlight: "UGC-DEB Expert",
      badgeColor: "bg-[#00ffa3]/10 text-[#00ffa3] border-[#00ffa3]/30"
    },
    {
      title: "Direct Admission & Quota Advisory",
      desc: "Strategic guidance for corporate/institutional sponsorships, NRI seats, and management quota options in premium business schools across major metro hubs.",
      highlight: "Direct Access",
      badgeColor: "bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30"
    }
  ];

  const tools = [
    {
      title: "CAT 2026 Score & Percentile Predictor",
      desc: "Simulate entrance metrics, map score outputs to B-school cutoffs, and evaluate your percentile prospects instantly.",
      href: "/tools/cat-score-calculator",
      color: "hover:border-[#ccff00] group"
    },
    {
      title: "Premium MBA Mock Test Series",
      desc: "Real-time mock tests for CAT, XAT, NMAT, and SNAP with full dashboards and data analytics.",
      href: "https://www.careerwithmohit.online/tools/mock-tests",
      color: "hover:border-[#ff007f] group",
      external: true
    },
    {
      title: "Instant Resume & CV Builder",
      desc: "Build recruiter-approved CVs matching the standards of top-tier consulting and finance recruiter panels.",
      href: "/create-resume",
      color: "hover:border-[#00ffa3] group"
    }
  ];

  const experience = [
    {
      role: "Founder & Principal Admissions Consultant",
      company: "CareerWithMohit",
      duration: "2020 - Present",
      description: "Pioneered a data-driven counseling framework mapping scores to optimal B-schools. Scaled the network to guide over 15,000 students, conducting intense GD-PI prep and profile evaluations."
    },
    {
      role: "Business Development Manager",
      company: "Doubtnut (EdTech)",
      duration: "2019 - 2020",
      description: "Formulated growth models, managed core acquisition pipelines, and streamlined regional support networks to expand educational services to millions."
    },
    {
      role: "Operations Analyst (Client: Amazon)",
      company: "Accenture",
      duration: "2018 - 2019",
      description: "Optimized operational SLA metrics, conducted root-cause quality analysis, and maintained data compliance structures for the primary Amazon operational pipeline."
    },
    {
      role: "Tech Entrepreneur & Growth Consultant",
      company: "Independent Web Architect",
      duration: "2011 - 2018",
      description: "Developed custom web applications, calculators, and SEO systems. Designed digital systems for multiple content outlets and coaching institutions."
    }
  ];

  return (
    <>
      <JsonLd data={personSchema} />
      
      <div className="bg-[#050505] text-white min-h-screen font-body overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
        {/* ── STYLES ── */}
        <style>{`
          .genz-bg {
            background-image: 
              radial-gradient(at 0% 0%, rgba(204, 255, 0, 0.07) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(255, 0, 127, 0.07) 0px, transparent 50%),
              radial-gradient(at 50% 100%, rgba(121, 40, 202, 0.08) 0px, transparent 50%);
          }

          .dot-pattern {
            background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
            background-size: 24px 24px;
          }

          .neo-card {
            background: #111;
            border: 2px solid #222;
            border-radius: 24px;
            box-shadow: 6px 6px 0px rgba(255, 255, 255, 0.03);
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .neo-card:hover {
            transform: translate(-3px, -3px);
            box-shadow: 8px 8px 0px rgba(204, 255, 0, 0.85);
            border-color: rgba(204, 255, 0, 0.5);
          }
          
          .neo-card-pink:hover {
            box-shadow: 8px 8px 0px rgba(255, 0, 127, 0.85);
            border-color: rgba(255, 0, 127, 0.5);
          }

          .neo-card-teal:hover {
            box-shadow: 8px 8px 0px rgba(0, 255, 163, 0.85);
            border-color: rgba(0, 255, 163, 0.5);
          }

          .neo-card-cyan:hover {
            box-shadow: 8px 8px 0px rgba(0, 229, 255, 0.85);
            border-color: rgba(0, 229, 255, 0.5);
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

          .float-animation {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(1deg); }
          }
        `}</style>

        {/* ── HERO BANNER TICKER ── */}
        <div className="bg-[#ccff00] text-black py-2 font-black uppercase text-xs tracking-widest text-center border-b-2 border-black z-30 relative">
          <span>⚡ EXPERT ADMISSIONS COUNSELING • CAREER MENTORSHIP • 100% PERSONALIZED PATHWAYS ⚡</span>
        </div>

        {/* ── HERO SECTION ── */}
        <section className="genz-bg pt-16 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Bio Columns */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 text-[#ccff00] px-4 py-2 rounded-full border border-[#ccff00]/30 text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} /> Founder & Chief Advisor
                </div>
                
                <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none">
                  MOHIT <span className="text-gradient-genz">JAIN</span>
                </h1>
                
                <p className="text-xl sm:text-2xl font-bold text-gray-300 tracking-tight leading-snug">
                  Expert B-School Admissions Counselor & Career Mentor. Aligned with FMS Delhi & IIM-B Advisory Standards.
                </p>
                
                <p className="text-gray-400 font-medium leading-relaxed text-base max-w-2xl">
                  I map complex admission matrix grids, diagnose profile weaknesses, and build step-by-step roadmaps to guide candidates toward elite MBA/PGDM programs and corporate roles. By leveraging process analytics learned at Accenture and EdTech operations from Doubtnut, I provide an uncompromised guidance blueprint for over 15,000 students.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#consultation"
                    className="bg-[#ccff00] text-black border-2 border-[#ccff00] hover:bg-transparent hover:text-[#ccff00] px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-sm transition-all shadow-[6px_6px_0px_rgba(204,255,0,0.2)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0 cursor-pointer"
                  >
                    Get Free Profile Evaluation
                  </a>
                  <a
                    href="https://wa.me/919560020771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#111] text-white border-2 border-[#333] hover:border-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Phone size={16} className="text-[#ccff00]" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Avatar Photo Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative float-animation max-w-[380px] w-full aspect-square">
                  {/* Glowing background */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#ccff00] to-[#00ffa3] rounded-[32px] blur-xl opacity-30 animate-pulse" />
                  
                  {/* Brutalist image frame */}
                  <div className="relative bg-[#111] border-4 border-black rounded-[32px] overflow-hidden shadow-[12px_12px_0px_#ccff00] w-full h-full">
                    <Image
                      src="/mohit-jain-avatar.jpg"
                      alt="Mohit Jain Career Counselor"
                      fill
                      priority
                      sizes="(max-w-768px) 100vw, 380px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Floating Experience Tag */}
                  <div className="absolute -bottom-4 -left-4 bg-[#ff007f] text-white font-black uppercase tracking-widest text-xs py-2.5 px-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] rotate-[-3deg]">
                    🔥 6+ Years Exp
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STATS SECTION ── */}
        <section className="bg-black py-12 border-t-2 border-b-2 border-[#222]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-6 border border-[#1a1a1a] rounded-2xl bg-[#090909]">
                  <div className={`text-4xl sm:text-5xl font-black ${stat.color} tracking-tight mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CREDENTIALS SECTION ── */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-[10px] font-black uppercase text-[#ff007f] tracking-widest bg-[#ff007f]/10 px-3.5 py-1.5 rounded-full border border-[#ff007f]/20">
                Verified Expertise
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                Certifications & <span className="text-gradient-genz">Qualifications</span>
              </h2>
              <p className="text-gray-400 text-sm font-semibold">
                An analytical core, backed by top institutions, configured to deliver optimal advisory quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {credentials.map((cred, idx) => {
                const colors = ["neo-card", "neo-card neo-card-pink", "neo-card neo-card-teal", "neo-card neo-card-cyan"];
                return (
                  <div key={idx} className={`${colors[idx]} p-8 space-y-5`}>
                    <div className="flex items-center justify-between">
                      <div className="bg-black/40 p-3.5 rounded-xl border border-[#333]">
                        {cred.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-400">
                        {cred.badge}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#ccff00]">
                        {cred.title}
                      </h3>
                      <div className="text-xs font-black text-[#ccff00] uppercase tracking-wide">
                        {cred.issuer}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      {cred.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CORE SERVICES ── */}
        <section className="py-24 bg-[#090909] border-t-2 border-b-2 border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-[10px] font-black uppercase text-[#00ffa3] tracking-widest bg-[#00ffa3]/10 px-3.5 py-1.5 rounded-full border border-[#00ffa3]/20">
                Core Verticals
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                What I Help You <span className="text-gradient-pink">Achieve</span>
              </h2>
              <p className="text-gray-400 text-sm font-semibold">
                Strategic frameworks designed to evaluate profiles, eliminate gaps, and crack selections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((srv, idx) => (
                <div key={idx} className="bg-[#111] border-2 border-[#222] hover:border-[#333] p-8 rounded-3xl space-y-4 hover:translate-y-[-2px] transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">{srv.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    {srv.desc}
                  </p>
                  <div className="pt-2">
                    <span className={`inline-block text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full ${srv.badgeColor}`}>
                      {srv.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE TIMELINE ── */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-[10px] font-black uppercase text-[#00e5ff] tracking-widest bg-[#00e5ff]/10 px-3.5 py-1.5 rounded-full border border-[#00e5ff]/20">
                Professional Journey
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                Career <span className="text-gradient-genz">Timeline</span>
              </h2>
              <p className="text-gray-400 text-sm font-semibold">
                A track record spanning corporate analytics, fast-scaling EdTech, and founder-led admissions consultancy.
              </p>
            </div>

            <div className="relative border-l-2 border-[#222] ml-4 md:ml-12 pl-8 md:pl-12 space-y-12 max-w-4xl mx-auto">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[41px] md:-left-[57px] top-1.5 bg-[#111] border-2 border-[#ccff00] w-6 h-6 rounded-full flex items-center justify-center group-hover:bg-[#ccff00] transition-colors duration-200">
                    <span className="w-2 h-2 rounded-full bg-black" />
                  </span>

                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/20 px-2.5 py-0.5 rounded-md">
                      {exp.duration}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                      {exp.company}
                    </div>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-3xl pt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS SECTION ── */}
        <section className="py-24 bg-[#090909] border-t-2 border-b-2 border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-[10px] font-black uppercase text-[#ff007f] tracking-widest bg-[#ff007f]/10 px-3.5 py-1.5 rounded-full border border-[#ff007f]/20">
                Self-Service Suite
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                Free Evaluation <span className="text-gradient-genz">Tools</span>
              </h2>
              <p className="text-gray-400 text-sm font-semibold">
                Access calculators and resources designed to test score thresholds and prepare your profile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tools.map((tool, idx) => {
                const Wrapper = tool.external ? 'a' : Link;
                return (
                  <Wrapper
                    key={idx}
                    href={tool.href}
                    {...(tool.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`${tool.color} bg-[#111] border-2 border-[#222] p-8 rounded-3xl space-y-4 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-200 cursor-pointer`}
                  >
                    <div className="space-y-4">
                      <div className="bg-black/40 w-12 h-12 rounded-xl flex items-center justify-center border border-[#333]">
                        <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-white">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#ccff00]">
                      Explore Tool <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CONSULTATION LEAD FORM ── */}
        <section id="consultation" className="py-24 relative genz-bg">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="bg-[#111]/90 backdrop-blur-md border-2 border-[#333] p-8 sm:p-12 rounded-[32px] shadow-[10px_10px_0px_rgba(204,255,0,0.15)] space-y-8">
              <div className="text-center space-y-3">
                <span className="text-[10px] font-black uppercase text-[#ccff00] tracking-widest bg-[#ccff00]/10 px-3.5 py-1.5 rounded-full border border-[#ccff00]/20">
                  Free 1-on-1 Session
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">
                  Lock In Your Profile <span className="text-gradient-genz">Review</span>
                </h2>
                <p className="text-gray-400 text-sm font-semibold max-w-xl mx-auto">
                  Submit your academic profile stats. I will review it personally and contact you on WhatsApp to map out your Safe, Dream, and Target schools.
                </p>
              </div>

              <div className="border-t border-[#222] pt-8">
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── PROFILE FOOTER CHANNELS ── */}
        <section className="py-16 bg-black border-t-2 border-[#222]">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center space-y-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-gray-500">Connect with Mohit Directly</h3>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/mohit-jain-264a7315b/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] hover:bg-[#0077b5] border-2 border-[#333] hover:border-[#0077b5] p-4 rounded-2xl text-gray-400 hover:text-white transition-all hover:scale-115 shadow-[4px_4px_0px_#000]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:info@careerwithmohit.online"
                className="bg-[#111] hover:bg-[#ea4335] border-2 border-[#333] hover:border-[#ea4335] p-4 rounded-2xl text-gray-400 hover:text-white transition-all hover:scale-115 shadow-[4px_4px_0px_#000]"
                aria-label="Email Counselor"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://wa.me/919560020771"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] hover:bg-[#25d366] border-2 border-[#333] hover:border-[#25d366] p-4 rounded-2xl text-gray-400 hover:text-white transition-all hover:scale-115 shadow-[4px_4px_0px_#000]"
                aria-label="WhatsApp Contact"
              >
                <Phone size={24} />
              </a>
              <a
                href="https://www.careerwithmohit.online"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] hover:bg-[#ccff00] hover:text-black border-2 border-[#333] hover:border-[#ccff00] p-4 rounded-2xl text-gray-400 transition-all hover:scale-115 shadow-[4px_4px_0px_#000]"
                aria-label="Personal Website"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
