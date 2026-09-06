"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, GraduationCap, Sparkles, ArrowRight, Calendar, ArrowLeft } from 'lucide-react';

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export function BlogDirectoryClient({ posts }: { posts: PostSummary[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Compute categories and counts
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    posts.forEach(p => {
      const cat = p.category || 'Online Degrees';
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [posts]);

  const categories = useMemo(() => Object.keys(categoryCounts), [categoryCounts]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter(p => {
      const matchesCat = selectedCategory === 'All' || (p.category || 'Online Degrees') === selectedCategory;
      if (!matchesCat) return false;
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    });
  }, [posts, searchQuery, selectedCategory]);

  // Group filtered posts by category for organized display
  const groupedPosts = useMemo(() => {
    const map: Record<string, PostSummary[]> = {};
    filteredPosts.forEach(p => {
      const cat = p.category || 'Online Degrees';
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    });
    return map;
  }, [filteredPosts]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-20 font-body relative selection:bg-indigo-500/30">
      
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#ccff00] font-bold text-xs uppercase tracking-wider transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog Hub
          </Link>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {posts.length} Guides Indexed
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-[#ccff00] mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Complete Academic Archive
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase mb-6">
            All Reviews & <span className="bg-gradient-to-r from-[#ccff00] via-[#00ffa3] to-indigo-400 bg-clip-text text-transparent">Guides Directory</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
            Browse our complete directory of {posts.length} verified university reviews, fee breakdowns, UGC approvals, and placement analysis.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by university name, program (MBA, MCA, BBA), city, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#0e0e0e] border-2 border-slate-800 text-white placeholder-slate-500 font-medium text-base focus:border-[#ccff00] focus:outline-none transition-all shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => {
              const count = categoryCounts[cat] || 0;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20 scale-105'
                      : 'bg-[#121212] text-slate-400 hover:text-white hover:bg-[#1a1a1a] border border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
          <span className="text-sm font-bold text-slate-400">
            Showing <strong className="text-[#ccff00]">{filteredPosts.length}</strong> guides
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
            Direct 200-OK Canonical Links
          </span>
        </div>

        {/* Structured Directory Groupings */}
        {Object.keys(groupedPosts).length === 0 ? (
          <div className="text-center py-20 bg-[#0e0e0e] rounded-3xl border border-slate-800 p-8">
            <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No guides found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              We couldn't find any guides matching "{searchQuery}". Try searching for popular terms like "MBA", "Amity", "Fees", or "Placements".
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedPosts).map(([category, items]) => (
              <section key={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-[#ccff00]" />
                    </div>
                    <h2 className="text-xl font-black text-white tracking-tight uppercase">
                      {category}
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {items.length} Articles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}/`}
                      className="group p-5 rounded-2xl bg-[#0c0c0c] hover:bg-[#141414] border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
                          <span className="text-[#ccff00]/80 uppercase tracking-wider">{item.category}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-200 group-hover:text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#ccff00] transition-colors">
                        <span>Read Full Guide</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
