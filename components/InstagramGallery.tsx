"use client";

import { GraduationCap, Award, Compass, MessageSquare } from 'lucide-react';

export function InstagramGallery() {
  const tiles = [
    {
      icon: <GraduationCap size={20} className="text-pink-400" />,
      title: "UGC Valid?",
      desc: "Yes! Equals regular degrees.",
      color: "from-pink-500/10 to-pink-500/5 hover:border-pink-500/30"
    },
    {
      icon: <Award size={20} className="text-purple-400" />,
      title: "NAAC A++",
      desc: "Top Grade Indian Colleges.",
      color: "from-purple-500/10 to-purple-500/5 hover:border-purple-500/30"
    },
    {
      icon: <Compass size={20} className="text-indigo-400" />,
      title: "WES Approved",
      desc: "For jobs in US & Canada.",
      color: "from-indigo-500/10 to-indigo-500/5 hover:border-indigo-500/30"
    },
    {
      icon: <MessageSquare size={20} className="text-cyan-400" />,
      title: "Counselling",
      desc: "1-on-1 career assistance.",
      color: "from-cyan-500/10 to-cyan-500/5 hover:border-cyan-500/30"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-pink-500 flex items-center gap-2">
        <span className="w-3.5 h-[2px] bg-pink-500"></span> Career Hub Insights
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        {tiles.map((tile, idx) => (
          <button 
            key={idx} 
            onClick={() => {
              const el = document.getElementById('comparison-engine');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`group relative aspect-square overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br ${tile.color} p-4 flex flex-col justify-between text-left transition-all duration-300 hover:scale-102 hover:-translate-y-0.5 cursor-pointer`}
          >
            <div className="bg-slate-900/60 p-2 rounded-xl w-fit border border-slate-700/50">
              {tile.icon}
            </div>
            <div>
              <span className="block text-[11px] font-black uppercase text-slate-200 tracking-wider mb-0.5">{tile.title}</span>
              <span className="block text-[9px] font-semibold text-slate-400 leading-normal">{tile.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
