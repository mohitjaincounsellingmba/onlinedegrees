"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, ArrowRight, GraduationCap, Award, MapPin, Sparkles } from 'lucide-react';
import { collegesData } from '@/lib/colleges';

export function ComparisonDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);

  // Toggle expanded college section
  const toggleExpand = (collegeId: string) => {
    setExpandedCollege(prev => (prev === collegeId ? null : collegeId));
  };

  // Helper to generate comparisons for a college
  const getComparisonsForCollege = (currentCollegeId: string) => {
    const current = collegesData.find(c => c.id === currentCollegeId);
    if (!current) return [];

    return collegesData
      .filter(c => c.id !== currentCollegeId)
      .map(other => {
        // Sort slugs alphabetically to match sitemap and canonical URLs exactly
        const sortedSlugs = [current.slug, other.slug].sort();
        const slugPair = `${sortedSlugs[0]}-vs-${sortedSlugs[1]}`;
        return {
          name: `${current.name} vs ${other.name}`,
          slug: slugPair,
          otherName: other.name,
          otherLogo: other.logo,
          otherColor: other.color,
        };
      });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-20 font-body genz-bg dot-pattern relative">
      {/* Dynamic Background Accents */}
      <style jsx global>{`
        .genz-bg {
          background-image: 
            radial-gradient(at 0% 0%, rgba(204, 255, 0, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(255, 0, 127, 0.05) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(0, 255, 163, 0.05) 0px, transparent 50%);
        }
        .dot-pattern {
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .neo-card-directory {
          background: #0d0d0d;
          border: 2px solid #222;
          border-radius: 20px;
          box-shadow: 4px 4px 0px rgba(255, 255, 255, 0.02);
          transition: all 0.2s ease-in-out;
        }
        .neo-card-directory:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px rgba(204, 255, 0, 0.6);
          border-color: rgba(204, 255, 0, 0.4);
        }
        .neo-card-directory-expanded {
          background: #0d0d0d;
          border: 2px solid rgba(204, 255, 0, 0.4);
          border-radius: 20px;
          box-shadow: 6px 6px 0px rgba(204, 255, 0, 0.6);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <span>/</span>
          <span className="text-[#ccff00]">Directory</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Search Index</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
            Comparison <span className="text-[#ccff00]">Directory</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-2xl text-sm md:text-base">
            Browse and compare all 34 UGC approved online universities side-by-side. Select any university below to view all its available comparison combinations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#ccff00] transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search universities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d0d0d] border-2 border-[#222] focus:border-[#ccff00] text-white rounded-2xl pl-12 pr-4 py-4 font-bold placeholder-gray-600 focus:outline-none transition-all shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
          />
        </div>

        {/* Directory Grid */}
        <div className="space-y-6">
          {collegesData.map(college => {
            const isExpanded = expandedCollege === college.id;
            const comparisons = getComparisonsForCollege(college.id);
            
            // Determine if the college card should be hidden based on search
            const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            return (
              <div 
                key={college.id} 
                className={`transition-all duration-300 ${matchesSearch ? 'block' : 'hidden'}`}
              >
                {/* College Header Row */}
                <div 
                  onClick={() => toggleExpand(college.id)}
                  className={`p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none ${
                    isExpanded ? 'neo-card-directory-expanded' : 'neo-card-directory'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${college.color} flex items-center justify-center text-white font-black text-xl shadow-md shrink-0`}>
                      {college.logo}
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
                        {college.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-bold text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-gray-500" /> {college.location}
                        </span>
                        <span className="text-[#333] hidden sm:inline">|</span>
                        <span className="flex items-center gap-1 text-amber-400">
                          ★ {college.rating} / 5.0
                        </span>
                        <span className="text-[#333] hidden sm:inline">|</span>
                        <span className="flex items-center gap-1 text-emerald-400 uppercase tracking-wider text-[10px]">
                          <Award size={12} /> {college.accreditation.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t border-gray-800/50 md:border-none pt-3 md:pt-0">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-wider">
                      {comparisons.length} Comparisons
                    </span>
                    <button className="h-10 w-10 rounded-xl bg-[#111] border border-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Comparisons List (CSS-Controlled Expand/Collapse to keep links in DOM) */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[1500px] mt-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="bg-[#0b0b0b]/60 border border-gray-800/80 rounded-2xl p-6 md:p-8">
                    <h3 className="text-xs font-black uppercase text-gray-500 tracking-wider mb-6 flex items-center gap-2">
                      <GraduationCap size={14} className="text-[#ccff00]" />
                      Compare {college.name} With
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {comparisons.map((comp, idx) => (
                        <Link 
                          key={`${college.id}-comp-${idx}`}
                          href={`/compare/${comp.slug}`}
                          className="group/link flex items-center justify-between p-4 bg-[#111]/40 border border-gray-800/50 rounded-xl hover:bg-[#ccff00]/5 hover:border-[#ccff00]/20 transition-all"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${comp.otherColor} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm`}>
                              {comp.otherLogo}
                            </div>
                            <span className="text-xs font-black text-gray-300 group-hover/link:text-white transition-colors truncate">
                              vs {comp.otherName}
                            </span>
                          </div>
                          <ArrowRight 
                            size={14} 
                            className="text-gray-600 group-hover/link:text-[#ccff00] group-hover/link:translate-x-1 transition-all shrink-0" 
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
