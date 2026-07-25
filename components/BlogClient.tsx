"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, ArrowRight, BookOpen, GraduationCap, Sparkles } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import blogStyles from "@/app/blog/blog.module.css";
import genzStyles from "@/app/blog/blog-genz.module.css";

interface PostHeader {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export function BlogClient({ posts, totalBlogs }: { posts: PostHeader[]; totalBlogs: number }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 12;

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

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Paginated slice
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden font-display selection:bg-indigo-500/30">
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[30%] left-[50%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[150px] -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Gen Z Hero Section */}
        <section className={genzStyles.genzHero}>
          <div className={genzStyles.heroBadge}>
            <Sparkles className="h-4 w-4 text-[#ccff00] animate-pulse shrink-0" />
            <span>{totalBlogs} Verified Guides & Reviews Live</span>
          </div>

          <h1 className={genzStyles.genzTitle}>
            Unlock Your <span className="bg-gradient-to-r from-[#ccff00] via-[#00ffa3] to-indigo-400 bg-clip-text text-transparent">Future Potential</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            In‑depth reviews, fee structures, and placement analytics for top UGC‑approved online degrees. Make your next career move with data‑backed confidence.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('search-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={genzStyles.genzCTA}
          >
            Explore Guides
          </button>
        </section>

        {/* Search and Filters */}
        <div id="search-section" className="mb-16 space-y-8 scroll-mt-24">
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
                onChange={handleSearchChange}
                className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 placeholder-slate-500 text-lg py-3"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`${genzStyles.filterChip} ${activeCategory === cat ? genzStyles.activeChip : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="space-y-12">
            <div className={blogStyles.blogGrid}>
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-12 bg-slate-900/20 p-4 rounded-2xl border border-slate-800/50 backdrop-blur-sm max-w-2xl mx-auto">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-bold bg-[#111] hover:bg-[#ccff00] hover:text-black disabled:opacity-50 disabled:hover:bg-[#111] disabled:hover:text-slate-400 text-slate-300 rounded-xl transition-all border border-slate-800/80 cursor-pointer disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {pageNumbers.map((num, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof num === 'number' && setCurrentPage(num)}
                    disabled={num === '...'}
                    className={`h-10 min-w-10 px-2 rounded-xl text-sm font-bold flex items-center justify-center transition-all border ${
                      currentPage === num
                        ? 'bg-[#ccff00] text-black border-[#ccff00]'
                        : num === '...'
                        ? 'text-slate-500 border-transparent bg-transparent cursor-default'
                        : 'bg-[#111] text-slate-300 border-slate-800/80 hover:bg-slate-800 hover:text-white cursor-pointer'
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-bold bg-[#111] hover:bg-[#ccff00] hover:text-black disabled:opacity-50 disabled:hover:bg-[#111] disabled:hover:text-slate-400 text-slate-300 rounded-xl transition-all border border-slate-800/80 cursor-pointer disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-900/30 rounded-3xl border border-slate-800 backdrop-blur-sm shadow-xl">
            <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No reviews found</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              We couldn't find any reviews matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); setCurrentPage(1); }}
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
