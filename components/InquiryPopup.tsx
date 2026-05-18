'use client';

import { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

const InquiryForm = dynamic(() => import('./InquiryForm').then(mod => mod.InquiryForm), {
  loading: () => <div className="h-[400px] flex items-center justify-center font-black text-[#ccff00] animate-pulse">LOADING...</div>,
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#050505] border-4 border-[#333] shadow-[0_0_80px_rgba(204,255,0,0.15)]">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[110] bg-[#111] border-2 border-[#333] p-2 rounded-xl hover:border-[#ff007f] hover:text-[#ff007f] text-gray-400 transition-all cursor-pointer shadow-[4px_4px_0px_#333] hover:shadow-[4px_4px_0px_#ff007f] active:translate-x-1 active:translate-y-1 active:shadow-none"
          aria-label="Close Pop-up"
        >
          <X className="h-6 w-6" />
        </button>

        <div>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ccff00] to-[#00ffa3] p-8 text-center text-black border-b-4 border-[#333]">
            <div className="mx-auto bg-black text-[#ccff00] w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
              <Zap className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Get Free Guidance 🔥
            </h2>
            <p className="text-black/80 font-bold mt-2 text-sm uppercase tracking-wide">
              Talk directly with top advisors & discover the right degree.
            </p>
          </div>
          
          {/* Form Area */}
          <div className="p-6 md:p-8 bg-[#0b0b0b]">
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
