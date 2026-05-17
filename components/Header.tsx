"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, GraduationCap } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md" role="banner">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12">
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
          <div className="bg-indigo-600 p-2 rounded-xl text-white flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-display text-xl font-black tracking-tight text-slate-900 uppercase">
            OnlineDegree<span className="text-indigo-600">Hub</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
          <button 
            onClick={() => scrollToSection('comparison-engine')} 
            className="hover:text-indigo-600 transition-colors font-bold text-left cursor-pointer"
          >
            Compare ODL
          </button>
          <button 
            onClick={() => scrollToSection('ugc-guidelines')} 
            className="hover:text-indigo-600 transition-colors font-bold text-left cursor-pointer"
          >
            UGC Guidelines
          </button>
          <button 
            onClick={() => scrollToSection('faqs')} 
            className="hover:text-indigo-600 transition-colors font-bold text-left cursor-pointer"
          >
            FAQs
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="tel:+919560020771" 
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 active:scale-95"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call Expert</span>
          </Link>
          <button 
            className="md:hidden flex items-center justify-center p-2 text-slate-800 hover:text-indigo-600 transition-colors bg-slate-50 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full border-b border-gray-100 bg-white shadow-xl z-50 h-[calc(100vh-80px)]">
          <nav className="flex flex-col px-8 py-8 gap-6 text-base font-bold text-slate-700">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition-colors flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-3"></span>Home
            </Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600 transition-colors flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-3"></span>Blog
            </Link>
            <button 
              onClick={() => scrollToSection('comparison-engine')} 
              className="hover:text-indigo-600 transition-colors flex items-center font-bold text-left cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-3"></span>Compare Universities
            </button>
            <button 
              onClick={() => scrollToSection('ugc-guidelines')} 
              className="hover:text-indigo-600 transition-colors flex items-center font-bold text-left cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-3"></span>UGC Guidelines
            </button>
            <button 
              onClick={() => scrollToSection('faqs')} 
              className="hover:text-indigo-600 transition-colors flex items-center font-bold text-left cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-3"></span>FAQs
            </button>

            <Link 
              href="tel:+919560020771" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-4 py-2 text-base font-bold text-white transition-all hover:bg-indigo-700"
            >
              <Phone className="h-5 w-5" />
              Call Advisor Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
