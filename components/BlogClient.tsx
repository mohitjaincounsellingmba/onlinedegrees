"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import styles from "@/app/blog/blog.module.css";

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
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden font-display selection:bg-indigo-500/30">
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] left-[50%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[150px] -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Premium Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide">
            <Sparkles className="h-4 w-4" />
            <span>Premium Degree Intel</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              Future Potential
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed font-light">
            In-depth reviews, fee structures, and placement analytics for top UGC-approved online degrees. Make your next career move with data-backed confidence.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-16 space-y-8">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 flex items-center shadow-2xl">
              <div className="pl-4 pr-3 text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search for MBA, MCA, universities, or specific reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-slate-500 text-lg py-3"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-500'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className={styles.blogGrid}>
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-900/30 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-xl">
              <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No reviews found</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                We couldn't find any reviews matching your search criteria. Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="mt-8 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors border border-indigo-400 shadow-lg shadow-indigo-500/20"
              >
                Clear Filters
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
