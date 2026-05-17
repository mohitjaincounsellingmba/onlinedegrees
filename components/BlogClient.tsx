"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, ArrowRight, GraduationCap, Compass, BookOpen } from 'lucide-react';

interface PostHeader {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export function BlogClient({ posts }: { posts: PostHeader[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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

  return (
    <div className="min-h-screen bg-[#f8f7f4] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ── HEADER SECTION ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-indigo-700 text-xs font-black uppercase tracking-wider mb-4">
            <GraduationCap className="h-4 w-4" /> Career Advice & Reviews
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Online Degree <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Hub Blog</span>
          </h1>
          <p className="text-slate-600 font-semibold mt-4 text-base md:text-lg">
            Stay updated with expert career guides, in-depth UGC-approved university reviews, fee structures, and placement analytics.
          </p>
        </div>

        {/* ── SEARCH & FILTER CONTROLS ── */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/50 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search college reviews, courses, or guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Total Results Counter */}
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 shrink-0">
              Showing {filteredPosts.length} of {posts.length} Articles
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-50 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white border border-indigo-500 shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── BLOG POSTS GRID ── */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <article 
                key={post.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="p-6 md:p-8 flex flex-col h-full flex-grow">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider">
                      {post.category || 'Online Degrees'}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {post.description || 'Read our complete in-depth review covering fees, programs, accreditation, placements and admission guidelines.'}
                  </p>

                  {/* Action Link */}
                  <div className="border-t border-slate-50 pt-4 mt-auto">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-xs font-black uppercase tracking-wider group/link transition-all"
                    >
                      Read Full Article 
                      <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-xl">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
              <Compass className="h-8 w-8 text-slate-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h3 className="text-xl font-black text-slate-900">No Articles Found</h3>
            <p className="text-slate-500 font-semibold mt-2 max-w-sm mx-auto text-sm">
              We couldn't find any reviews matching "{searchTerm}". Try exploring other categories or clearing your search.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="mt-6 bg-indigo-600 text-white border border-indigo-500 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
