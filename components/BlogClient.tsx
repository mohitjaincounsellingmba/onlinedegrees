"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  Compass, 
  BookOpen,
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Clock,
  X,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';

interface PostHeader {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

// Custom styling function for glowing dynamic tags based on category
const getCategoryStyles = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('mba')) {
    return {
      bg: 'bg-purple-950/40 border-purple-500/30 text-purple-300',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]',
      dot: 'bg-purple-400'
    };
  }
  if (cat.includes('mca') || cat.includes('bca') || cat.includes('tech')) {
    return {
      bg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
      dot: 'bg-cyan-400'
    };
  }
  if (cat.includes('review') || cat.includes('university')) {
    return {
      bg: 'bg-amber-950/40 border-amber-500/30 text-amber-300',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]',
      dot: 'bg-amber-400'
    };
  }
  if (cat.includes('mock') || cat.includes('test')) {
    return {
      bg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      dot: 'bg-emerald-400'
    };
  }
  if (cat.includes('exam') || cat.includes('coaching') || cat.includes('prep')) {
    return {
      bg: 'bg-rose-950/40 border-rose-500/30 text-rose-300',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]',
      dot: 'bg-rose-400'
    };
  }
  if (cat.includes('tool') || cat.includes('platform') || cat.includes('e-learning')) {
    return {
      bg: 'bg-sky-950/40 border-sky-500/30 text-sky-300',
      glow: 'shadow-[0_0_15px_rgba(14,165,233,0.15)]',
      dot: 'bg-sky-400'
    };
  }
  if (cat.includes('career') || cat.includes('guidance') || cat.includes('job') || cat.includes('salary')) {
    return {
      bg: 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300',
      glow: 'shadow-[0_0_15px_rgba(99,102,241,0.15)]',
      dot: 'bg-indigo-400'
    };
  }
  return {
    bg: 'bg-pink-950/40 border-pink-500/30 text-pink-300',
    glow: 'shadow-[0_0_15px_rgba(236,72,153,0.15)]',
    dot: 'bg-pink-400'
  };
};

export function BlogClient({ posts }: { posts: PostHeader[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // --- VIBE CHECK QUIZ STATES ---
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    goal: '',
    background: '',
    style: ''
  });
  const [recommendation, setRecommendation] = useState<{
    course: string;
    description: string;
    filterKeyword: string;
    vibeTag: string;
  } | null>(null);

  // Extract unique categories and sort them
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => {
      if (post.category) cats.add(post.category);
    });
    return ['All', ...Array.from(cats).sort()];
  }, [posts]);

  // Filter posts based on search term and active category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, activeCategory]);

  // --- QUIZ DATA & LOGIC ---
  const handleQuizAnswer = (key: 'goal' | 'background' | 'style', value: string) => {
    const updatedAnswers = { ...quizAnswers, [key]: value };
    setQuizAnswers(updatedAnswers);

    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate recommendation
      let recommendedCourse = '';
      let recommendedDesc = '';
      let filterKeyword = '';
      let vibeTag = '';

      const { goal, background, style } = updatedAnswers;

      if (goal === 'money') {
        if (background === 'tech') {
          recommendedCourse = 'Online MCA (AI & Data Science)';
          recommendedDesc = 'High-growth tech domains are hiring crazy fast. Get certified in cloud or AI to command the top brackets.';
          filterKeyword = 'MCA';
          vibeTag = '⚡️ Tech Mogul';
        } else {
          recommendedCourse = 'Online MBA (Finance / Marketing)';
          recommendedDesc = 'The ultimate business toolkit. High placement packages with UGC double accreditations.';
          filterKeyword = 'MBA';
          vibeTag = '💼 Wolf of Wall Street';
        }
      } else if (goal === 'startup') {
        recommendedCourse = 'Online MBA in Entrepreneurship & Marketing';
        recommendedDesc = 'Understand scaling, digital customer acquisition, and venture capital while building your network.';
        filterKeyword = 'MBA';
        vibeTag = '🚀 Unicorn Founder';
      } else if (goal === 'easy') {
        recommendedCourse = 'Online BBA / General Online MBA';
        recommendedDesc = 'Maximize flex and get your degree sorted with structured syllabus & absolute flexibility.';
        filterKeyword = 'BBA';
        vibeTag = '🧘 Zen Learner';
      } else {
        // Career switch
        if (background === 'arts' || background === 'other') {
          recommendedCourse = 'Online BCA / BBA in Data Analytics';
          recommendedDesc = 'Sleek bridge programs that teach analytics and management from absolute zero. Safe & future-proof.';
          filterKeyword = 'BBA';
          vibeTag = '🔄 Career Shifter';
        } else {
          recommendedCourse = 'Online MCA / Executive MBA';
          recommendedDesc = 'Deep technical or strategic upgrade to unlock management fast track.';
          filterKeyword = 'MCA';
          vibeTag = '📈 Corporate Accelerator';
        }
      }

      setRecommendation({
        course: recommendedCourse,
        description: recommendedDesc,
        filterKeyword,
        vibeTag
      });
      setQuizStep(4);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ goal: '', background: '', style: '' });
    setRecommendation(null);
  };

  const applyQuizFilter = () => {
    if (recommendation) {
      setSearchTerm(recommendation.filterKeyword);
      setActiveCategory('All'); // Reset category pill to find matching keyword
      setShowQuiz(false);
      // Smooth scroll to blog grid
      const element = document.getElementById('blog-grid-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 relative overflow-hidden font-display selection:bg-cyan-500 selection:text-[#080C14]">
      
      {/* ── BACKGROUND MESH AURAS & GLOWING BLOBS ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Animated Radial blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[25%] right-[-10%] w-[45%] h-[45%] bg-cyan-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[10%] left-[15%] w-[40%] h-[40%] bg-pink-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        
        {/* Subtle grid lines background overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        
        {/* ── HERO ZONE: TYPOGRAPHY & SYMLINKED ILLUSTRATION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} /> 
              No BS. Real Career Analytics.
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Uncensored Review <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Career Intel Hub
              </span> ⚡️
            </h1>
            
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
              We cut through the marketing jargon. Real UGC-approved university audits, updated fee structure spreadsheets, placements analytics, and honest student critiques. Build your future on cold, hard data.
            </p>
            
            {/* Call to action & Vibe Check button */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setShowQuiz(true)}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#080C14] font-black rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  Take Career Vibe Check <Flame className="h-4 w-4 fill-current text-[#080C14]" />
                </span>
              </button>
              
              <a 
                href="#blog-grid-anchor"
                className="px-6 py-3.5 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                Read Raw Reviews <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Cyberpunk vector illustration showcase */}
          <div className="lg:col-span-5 relative w-full aspect-square flex items-center justify-center">
            {/* Outer Glowing Rings */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-70 animate-pulse pointer-events-none" />
            
            {/* Monitor Mockup Wrapper */}
            <div className="w-full h-full max-w-[420px] aspect-square rounded-3xl p-2.5 bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-2.5 left-4 flex gap-1.5 z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="absolute top-1.5 right-4 text-[9px] font-bold text-slate-500 select-none uppercase tracking-wider z-20">
                future_forge.exe
              </div>
              
              {/* Graphic Container */}
              <div className="w-full h-full rounded-2xl overflow-hidden mt-3 relative border border-white/[0.05] bg-[#050811] flex items-center justify-center">
                
                {/* Embedded Responsive High-Tech SVG illustration */}
                <svg className="w-full h-full p-4" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="cyberCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="cyberPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="cyberGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <filter id="neonFilter" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <style>{`
                    .grid-line { stroke: rgba(255, 255, 255, 0.03); stroke-width: 1; }
                    .hologram-glow { animation: pulseGlow 4s ease-in-out infinite alternate; }
                    .spin-ring { transform-origin: 200px 200px; animation: spinCW 20s linear infinite; }
                    .spin-ring-counter { transform-origin: 200px 200px; animation: spinCCW 15s linear infinite; }
                    .node-pulse { animation: nodePulse 2s ease-in-out infinite; }
                    .data-bar { animation: barGrow 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; transform-origin: bottom; }
                    
                    @keyframes pulseGlow {
                      0% { opacity: 0.15; filter: drop-shadow(0 0 5px rgba(34, 211, 238, 0.1)); }
                      100% { opacity: 0.35; filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.3)); }
                    }
                    @keyframes spinCW {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    @keyframes spinCCW {
                      0% { transform: rotate(360deg); }
                      100% { transform: rotate(0deg); }
                    }
                    @keyframes nodePulse {
                      0%, 100% { transform: scale(1); opacity: 0.7; }
                      50% { transform: scale(1.3); opacity: 1; }
                    }
                    @keyframes barGrow {
                      0% { transform: scaleY(0); }
                      100% { transform: scaleY(1); }
                    }
                  `}</style>

                  {/* Backdrop Matrix Grid */}
                  <g>
                    {Array.from({ length: 13 }).map((_, i) => (
                      <line key={`x-${i}`} x1={i * 33.3} y1="0" x2={i * 33.3} y2="400" className="grid-line" />
                    ))}
                    {Array.from({ length: 13 }).map((_, i) => (
                      <line key={`y-${i}`} x1="0" y1={i * 33.3} x2="400" y2={i * 33.3} className="grid-line" />
                    ))}
                  </g>

                  {/* Tech circles / orbits underlay */}
                  <circle cx="200" cy="200" r="140" stroke="url(#cyberCyan)" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 5" className="spin-ring" />
                  <circle cx="200" cy="200" r="110" stroke="url(#cyberPurple)" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="40 10" className="spin-ring-counter" />
                  <circle cx="200" cy="200" r="80" stroke="url(#cyberGold)" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="3 3" />

                  {/* Glowing central radial mesh */}
                  <circle cx="200" cy="200" r="90" fill="url(#cyberCyan)" fillOpacity="0.05" className="hologram-glow" />

                  {/* Central Avatar & Rig Representation */}
                  <g transform="translate(100, 110)">
                    {/* Floating Holo-Terminal Screen 1 */}
                    <rect x="0" y="10" width="200" height="130" rx="12" fill="#090e1c" fillOpacity="0.9" stroke="url(#cyberCyan)" strokeWidth="1.5" filter="url(#neonFilter)" className="transition-all duration-300 group-hover:stroke-cyan-300" />
                    
                    {/* Screen 1 text elements */}
                    <text x="15" y="32" fill="#22d3ee" fontSize="10" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">FUTURE_FORGE // SYS_AUDIT</text>
                    
                    {/* Mock degree categories with progress charts */}
                    <text x="15" y="55" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">ONLINE MBA (FINANCE)</text>
                    <rect x="15" y="62" width="130" height="4" rx="2" fill="#1e293b" />
                    <rect x="15" y="62" width="115" height="4" rx="2" fill="url(#cyberPurple)" className="data-bar" style={{ animationDelay: '0.1s' }} />
                    <text x="155" y="66" fill="#a855f7" fontSize="8" fontWeight="900" fontFamily="sans-serif">92%</text>

                    <text x="15" y="85" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">ONLINE MCA (AI/ML)</text>
                    <rect x="15" y="92" width="130" height="4" rx="2" fill="#1e293b" />
                    <rect x="15" y="92" width="125" height="4" rx="2" fill="url(#cyberCyan)" className="data-bar" style={{ animationDelay: '0.3s' }} />
                    <text x="155" y="96" fill="#22d3ee" fontSize="8" fontWeight="900" fontFamily="sans-serif">98%</text>

                    <text x="15" y="115" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PLACEMENTS CONFIDENCE</text>
                    <rect x="15" y="122" width="130" height="4" rx="2" fill="#1e293b" />
                    <rect x="15" y="122" width="105" height="4" rx="2" fill="url(#cyberGold)" className="data-bar" style={{ animationDelay: '0.5s' }} />
                    <text x="155" y="126" fill="#fbbf24" fontSize="8" fontWeight="900" fontFamily="sans-serif">84%</text>

                    {/* Small dashboard items */}
                    <circle cx="185" cy="30" r="3" fill="#34d399" className="node-pulse" />
                  </g>

                  {/* Sidebar floating metrics bento window (Right) */}
                  <g transform="translate(255, 60)" className="transition-transform duration-500 group-hover:translate-y-[-5px]">
                    <rect x="0" y="0" width="80" height="90" rx="10" fill="#090e1c" fillOpacity="0.8" stroke="url(#cyberPurple)" strokeWidth="1" />
                    <text x="10" y="18" fill="#a855f7" fontSize="7" fontWeight="900" fontFamily="sans-serif">AVG PACKAGE</text>
                    <text x="10" y="38" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">₹12L</text>
                    <text x="10" y="48" fill="#94a3b8" fontSize="6" fontWeight="bold" fontFamily="sans-serif">ANNUAL RECORD</text>
                    
                    {/* Stylized bar mini-chart */}
                    <g transform="translate(10, 60)">
                      <rect x="0" y="5" width="8" height="15" rx="1" fill="url(#cyberPurple)" className="data-bar" />
                      <rect x="12" y="10" width="8" height="10" rx="1" fill="url(#cyberCyan)" className="data-bar" style={{ animationDelay: '0.2s' }} />
                      <rect x="24" y="0" width="8" height="20" rx="1" fill="url(#cyberGold)" className="data-bar" style={{ animationDelay: '0.4s' }} />
                      <rect x="36" y="8" width="8" height="12" rx="1" fill="url(#cyberPurple)" className="data-bar" style={{ animationDelay: '0.6s' }} />
                      <rect x="48" y="3" width="8" height="17" rx="1" fill="#38bdf8" className="data-bar" style={{ animationDelay: '0.8s' }} />
                    </g>
                  </g>

                  {/* Sidebar floating credentials window (Left) */}
                  <g transform="translate(20, 240)" className="transition-transform duration-500 group-hover:translate-y-[5px]">
                    <rect x="0" y="0" width="90" height="70" rx="10" fill="#090e1c" fillOpacity="0.8" stroke="url(#cyberGold)" strokeWidth="1" />
                    <text x="10" y="18" fill="#fbbf24" fontSize="7" fontWeight="900" fontFamily="sans-serif">CREDENTIALS</text>
                    
                    <g transform="translate(10, 28)">
                      {/* Check 1 */}
                      <circle cx="4" cy="4" r="3.5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.5" />
                      <path d="M2.5 4 L3.5 5 L5.5 3" stroke="#10b981" strokeWidth="0.8" strokeLinecap="round" />
                      <text x="12" y="6" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">UGC-DEB APPROVED</text>
                    </g>
                    <g transform="translate(10, 42)">
                      {/* Check 2 */}
                      <circle cx="4" cy="4" r="3.5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.5" />
                      <path d="M2.5 4 L3.5 5 L5.5 3" stroke="#10b981" strokeWidth="0.8" strokeLinecap="round" />
                      <text x="12" y="6" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">NAAC A++ STATUS</text>
                    </g>
                    <g transform="translate(10, 56)">
                      {/* Check 3 */}
                      <circle cx="4" cy="4" r="3.5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="0.5" />
                      <path d="M2.5 4 L3.5 5 L5.5 3" stroke="#10b981" strokeWidth="0.8" strokeLinecap="round" />
                      <text x="12" y="6" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">WES CREDENTIALLING</text>
                    </g>
                  </g>

                  {/* Connective nodes and network visual indicators */}
                  <g stroke="#22d3ee" strokeWidth="0.5" strokeOpacity="0.4">
                    <line x1="120" y1="120" x2="60" y2="240" strokeDasharray="3 3" />
                    <line x1="300" y1="150" x2="255" y2="190" strokeDasharray="3 3" />
                    <line x1="200" y1="110" x2="255" y2="80" strokeDasharray="3 3" />
                  </g>

                  {/* Micro blinking dots on nodes */}
                  <circle cx="120" cy="120" r="3.5" fill="#22d3ee" className="node-pulse" />
                  <circle cx="60" cy="240" r="3" fill="#fbbf24" className="node-pulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="300" cy="150" r="3" fill="#a855f7" className="node-pulse" style={{ animationDelay: '1s' }} />
                  <circle cx="255" cy="80" r="3.5" fill="#22d3ee" className="node-pulse" style={{ animationDelay: '1.5s' }} />
                </svg>

                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-80 pointer-events-none" />
                
                {/* In-Illustration overlay metrics */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 border border-white/10 backdrop-blur-md p-3.5 rounded-xl space-y-1.5 z-10">
                  <div className="flex justify-between items-center text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                    <span>Active Audit Engine</span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                    </span>
                  </div>
                  <div className="text-xs font-black text-white leading-tight">
                    🔥 Verified 2026 Salary Packages Analytics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── WIDGET 1: POPUP/SLIDEOUT CAREER VIBE CHECK QUIZ ── */}
        {showQuiz && (
          <div className="fixed inset-0 z-50 bg-[#04060b]/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
              <button 
                onClick={() => setShowQuiz(false)}
                className="absolute top-4 right-4 bg-slate-800/80 text-slate-400 hover:text-white p-2 rounded-xl transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8">
                {/* Header state */}
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="h-5 w-5 text-cyan-400 animate-bounce" />
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
                    Vibe Check {quizStep <= 3 ? `[Step ${quizStep}/3]` : `[Vibe Matcher]`}
                  </span>
                </div>

                {/* Progress bar */}
                {quizStep <= 3 && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full transition-all duration-300"
                      style={{ width: `${(quizStep / 3) * 100}%` }}
                    />
                  </div>
                )}

                {/* Step 1: Goal */}
                {quizStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white">What's your primary career hustle goal?</h3>
                      <p className="text-xs text-slate-400">Be honest. No judgment. We optimize for results.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      <button 
                        onClick={() => handleQuizAnswer('goal', 'money')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">💰 Max Salary & Placements</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Show me online degrees that print cash</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('goal', 'startup')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">🚀 Launch My Own Startup</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Learn to build products, scale, and capture VC attention</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('goal', 'easy')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">🎓 Smooth & Flexible Degree</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Just need the certified papers, keep workload chill</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('goal', 'switch')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">🔄 Quick Career Pivot</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Transition to high-paying domains without tech history</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Background */}
                {quizStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white">What's your current intellectual vibe?</h3>
                      <p className="text-xs text-slate-400">Select the closest match. We bridge all gap disciplines.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      <button 
                        onClick={() => handleQuizAnswer('background', 'commerce')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <span className="text-white">💼 Commerce, Finance & Business Ops</span>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('background', 'tech')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <span className="text-white">💻 Coding, Science & Analytics</span>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('background', 'arts')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <span className="text-white">🎨 Arts, Design & Humanities</span>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('background', 'other')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <span className="text-white">🤷 Anything else / Undecided</span>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Work Style */}
                {quizStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-white">How do you want to handle the grind?</h3>
                      <p className="text-xs text-slate-400">Match your energy level to the study structure.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      <button 
                        onClick={() => handleQuizAnswer('style', 'fast')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">⚡️ Speedrun & High Output</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Finish program ASAP, max hours weekly</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('style', 'chill')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">🧘 Chill & Balanced</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Steady progression alongside side-hustles & gym</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button 
                        onClick={() => handleQuizAnswer('style', 'flexible')}
                        className="p-4 bg-slate-950/40 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-2xl text-left text-sm font-bold transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <div>
                          <p className="text-white">🕒 Ultra Flexible / Mobile</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">Study from anywhere in the world on a fluid timetable</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Results */}
                {quizStep === 4 && recommendation && (
                  <div className="space-y-6 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                    </div>

                    <div className="space-y-2">
                      <div className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        VIBE: {recommendation.vibeTag}
                      </div>
                      <h3 className="text-2xl font-black text-white">Your Ideal Degree Vibe</h3>
                      <p className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-1">
                        {recommendation.course}
                      </p>
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      {recommendation.description}
                    </p>

                    <div className="pt-6 space-y-3">
                      <button 
                        onClick={applyQuizFilter}
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-[#080C14] font-black rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30"
                      >
                        Search reviews matching this vibe ⚡️
                      </button>

                      <button 
                        onClick={resetQuiz}
                        className="w-full py-3 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Reset & Retake Vibe Check
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* ── BENTO 2-COLUMN SECTION: LIVE METRICS & TRUTH INDICATOR ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Truth/BS Meter Glass Card */}
          <div className="md:col-span-7 bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group">
            {/* Dot grid in bento card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" /> Editorial Promise
                </span>
                <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg text-[9px] font-black text-slate-400 uppercase">
                  Verified 2026
                </span>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                100% Unbiased Auditing. <br />
                <span className="text-slate-400">Zero sponsored hype or corporate puff.</span>
              </h2>
              
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                Unlike sponsored comparison sites, we review based on direct UGC transcripts, actual student reviews, and official fee ledgers. If a degree fails our placement metrics, we label it.
              </p>
            </div>
            
            {/* Visual BS-Meter scale */}
            <div className="mt-8 bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Audit Confidence</div>
                  <div className="text-xs font-bold text-white">99.8% Legitimacy Index</div>
                </div>
              </div>
              
              {/* Fake visual spectrum line */}
              <div className="w-full sm:w-44 flex flex-col gap-1.5">
                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                  <span>Sponsored fluff</span>
                  <span>Pure raw data</span>
                </div>
                <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 h-full rounded-full w-[95%]" />
                  {/* Glowing needle dot */}
                  <span className="absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 bg-white border border-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)] animate-ping" />
                  <span className="absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-white border border-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Metrics Bento Glass Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-slate-900/60 to-purple-950/10 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
            
            <span className="text-[10px] font-black text-purple-400 tracking-widest uppercase flex items-center gap-1.5 mb-4">
              <TrendingUp className="h-4 w-4" /> Live Market Metrics
            </span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-2xl relative group-hover:border-purple-500/20 transition-colors">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Audits</div>
                <div className="text-2xl font-black text-white mt-1">27+</div>
                <div className="text-[9px] font-bold text-cyan-400 mt-1 flex items-center gap-0.5">
                  Top Colleges <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>
              
              <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-2xl relative group-hover:border-purple-500/20 transition-colors">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">High Package</div>
                <div className="text-2xl font-black text-white mt-1">₹12 LPA</div>
                <div className="text-[9px] font-bold text-purple-400 mt-1">
                  Average Placement
                </div>
              </div>
              
              <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-2xl relative group-hover:border-purple-500/20 transition-colors">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Accreditations</div>
                <div className="text-2xl font-black text-white mt-1">NAAC A++</div>
                <div className="text-[9px] font-bold text-emerald-400 mt-1">
                  UGC-DEB Approved
                </div>
              </div>
              
              <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-2xl relative group-hover:border-purple-500/20 transition-colors">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reading Intel</div>
                <div className="text-2xl font-black text-white mt-1">89+</div>
                <div className="text-[9px] font-bold text-slate-400 mt-1">
                  Deep Dive Articles
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEARCH & FILTER ENGINE BAR ── */}
        <div id="blog-grid-anchor" className="bg-slate-900/30 border border-slate-800/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Input Box */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search college reviews, specific courses, or guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 focus:bg-slate-950 transition-all shadow-inner"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-3.5 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Total Results Counter */}
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider text-slate-500 shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>Showing {filteredPosts.length} of {posts.length} Curated Reviews</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mt-6 border-t border-slate-800/50 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-[#080C14] shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-[1.03]'
                    : 'bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── BLOG POSTS GRID: BENTO CARDS ── */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => {
              const catStyles = getCategoryStyles(post.category);
              return (
                <article 
                  key={post.slug}
                  className="group bg-slate-900/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2 relative"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Top Glowing Mesh Strip */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-6 sm:p-8 flex flex-col h-full flex-grow space-y-5">
                    {/* Category & Date Row */}
                    <div className="flex items-center justify-between gap-4">
                      <span className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${catStyles.bg} ${catStyles.glow}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${catStyles.dot} animate-pulse`} />
                        {post.category || 'Online Degrees'}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-300 flex-grow min-h-[50px] line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3">
                      {post.description || 'Read our complete in-depth review covering fees, programs, accreditation, placements and admission guidelines.'}
                    </p>

                    {/* Bottom Link and Read Time mock */}
                    <div className="border-t border-slate-800/80 pt-4 mt-auto flex items-center justify-between">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-black uppercase tracking-wider group/link transition-all"
                      >
                        Read Intel 
                        <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                      
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 4 Min Read
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="bg-slate-900/20 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
            
            <div className="mx-auto bg-slate-950/60 border border-slate-850 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Compass className="h-8 w-8 text-cyan-500 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            
            <h3 className="text-xl font-black text-white tracking-tight">Vibe Search Failed</h3>
            <p className="text-slate-400 font-semibold mt-2 max-w-sm mx-auto text-xs sm:text-sm leading-relaxed">
              We couldn't find any reviews matching "{searchTerm}". Try clearing your filters or take the vibe check quiz.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="bg-cyan-500 hover:bg-cyan-400 text-[#080C14] border border-cyan-400 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:scale-[1.02] transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
              >
                Reset Filters
              </button>
              
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                Launch Vibe Quiz
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
