'use client';

import { useState, useEffect } from 'react';
import { X, GraduationCap } from 'lucide-react';
import dynamic from 'next/dynamic';

const InquiryForm = dynamic(() => import('./InquiryForm').then(mod => mod.InquiryForm), {
  loading: () => <div className="h-[400px] flex items-center justify-center font-bold text-slate-500">Loading Form...</div>,
  ssr: false
});

export function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenInquiryPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenInquiryPopup', 'true');
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/20 bg-white">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[110] bg-slate-100 p-2 rounded-xl hover:bg-slate-200 hover:text-slate-900 text-slate-500 transition-all cursor-pointer"
          aria-label="Close Pop-up"
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-center text-white">
            <div className="mx-auto bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-3">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Get Free Admission Guidance
            </h2>
            <p className="text-indigo-100 text-sm font-semibold mt-1.5">
              Talk directly with top advisors & discover the right online degree program.
            </p>
          </div>
          
          {/* Form Area */}
          <div className="p-6 md:p-8">
            <InquiryForm />
          </div>
        </div>
      </div>

      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={() => setIsOpen(false)} 
      />
    </div>
  );
}
