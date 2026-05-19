"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, Percent, ShieldCheck, Zap, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

export function EmiCalculatorClient() {
  const [courseFee, setCourseFee] = useState<number>(100000);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [tenure, setTenure] = useState<number>(12); // months
  const [interestRate, setInterestRate] = useState<number>(0); // 0% for No Cost EMI

  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);

  useEffect(() => {
    const principal = courseFee - downPayment;
    if (principal <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayable(downPayment);
      return;
    }

    if (interestRate === 0) {
      // No Cost EMI
      const monthlyEmi = principal / tenure;
      setEmi(Math.round(monthlyEmi));
      setTotalInterest(0);
      setTotalPayable(courseFee);
    } else {
      // Standard EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
      const r = interestRate / 12 / 100;
      const n = tenure;
      const calculatedEmi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      
      setEmi(Math.round(calculatedEmi));
      const totalAmount = calculatedEmi * n;
      setTotalInterest(Math.round(totalAmount - principal));
      setTotalPayable(Math.round(totalAmount + downPayment));
    }
  }, [courseFee, downPayment, tenure, interestRate]);

  const features = [
    { icon: <Zap className="h-5 w-5 text-amber-500" />, title: "Quick Approvals", desc: "Get approved in minutes, not days." },
    { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, title: "Secure Process", desc: "Bank-grade security for your data." },
    { icon: <CreditCard className="h-5 w-5 text-blue-500" />, title: "100% Digital", desc: "Zero paperwork, entirely online." },
    { icon: <Percent className="h-5 w-5 text-rose-500" />, title: "Best Interest Rates", desc: "No Cost EMI starting from ₹3,999." },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-indigo-200 pb-20">
      
      {/* ── HERO HEADER ── */}
      <div className="bg-slate-950 text-white pt-32 pb-24 px-6 relative overflow-hidden rounded-b-[3rem] lg:rounded-b-[4rem] shadow-2xl mb-12">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Calculator className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-widest text-indigo-100">
              Finance Your Education
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Education EMI Calculator
          </h1>
          <p className="text-indigo-200/80 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Plan your online degree with affordable monthly installments. Explore No Cost EMI options starting from just ₹150 per day!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-300">
             <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 0% Interest Available
             </div>
             <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Multiple Partners
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start -mt-20 relative z-20">
          
          {/* ── CALCULATOR CONTROLS (Left) ── */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-600 rounded-full inline-block"></span>
              Customize Your Plan
            </h2>

            <div className="space-y-10">
              
              {/* Course Fee */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold uppercase tracking-wide text-slate-500">Total Course Fee</label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                    <IndianRupee className="h-4 w-4 text-slate-900" />
                    <input 
                      type="number" 
                      value={courseFee}
                      onChange={(e) => setCourseFee(Number(e.target.value))}
                      className="bg-transparent font-black text-slate-900 text-lg w-28 focus:outline-none"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="10000" max="1000000" step="5000"
                  value={courseFee} 
                  onChange={(e) => setCourseFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2 text-xs font-semibold text-slate-400">
                  <span>₹10K</span>
                  <span>₹10L</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold uppercase tracking-wide text-slate-500">Down Payment</label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                    <IndianRupee className="h-4 w-4 text-slate-900" />
                    <input 
                      type="number" 
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="bg-transparent font-black text-slate-900 text-lg w-28 focus:outline-none"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" max={courseFee} step="1000"
                  value={downPayment} 
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2 text-xs font-semibold text-slate-400">
                  <span>₹0</span>
                  <span>Max</span>
                </div>
              </div>

              {/* Tenure (Months) */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold uppercase tracking-wide text-slate-500">Loan Tenure</label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                    <input 
                      type="number" 
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="bg-transparent font-black text-slate-900 text-lg w-16 text-right focus:outline-none"
                    />
                    <span className="font-bold text-slate-500">Months</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[3, 6, 9, 12, 18, 24, 36].map(t => (
                    <button
                      key={t}
                      onClick={() => setTenure(t)}
                      className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${tenure === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                    >
                      {t}M
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Interest Rate */}
              <div>
                 <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold uppercase tracking-wide text-slate-500">Interest Rate</label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                    <input 
                      type="number" 
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="bg-transparent font-black text-slate-900 text-lg w-16 text-right focus:outline-none"
                    />
                    <Percent className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
                <div className="flex gap-2">
                  {[0, 8, 10, 12, 14].map(r => (
                    <button
                      key={r}
                      onClick={() => setInterestRate(r)}
                      className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${interestRate === r ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                    >
                      {r === 0 ? 'No Cost' : `${r}%`}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── EMI SUMMARY (Right) ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 text-white rounded-[2rem] p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />
               <div className="relative z-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-white/10 pb-4">Your EMI Breakdown</h3>
                  
                  <div className="mb-8 text-center">
                     <p className="text-sm font-medium text-indigo-200 mb-2">Monthly Installment (EMI)</p>
                     <div className="flex items-center justify-center gap-1 text-5xl font-black text-white">
                        <span className="text-3xl text-indigo-400">₹</span>
                        {emi.toLocaleString('en-IN')}
                     </div>
                     {interestRate === 0 && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider">
                           <Zap className="h-3.5 w-3.5" /> No Cost EMI Applied
                        </div>
                     )}
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-sm font-semibold text-slate-400">Principal Amount</span>
                        <span className="font-bold">₹{(courseFee - downPayment).toLocaleString('en-IN')}</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-sm font-semibold text-slate-400">Total Interest</span>
                        <span className="font-bold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</span>
                     </div>
                     <div className="flex justify-between items-center py-3">
                        <span className="text-sm font-semibold text-slate-400">Total Payable</span>
                        <span className="font-black text-lg text-white">₹{totalPayable.toLocaleString('en-IN')}</span>
                     </div>
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-50 text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] flex items-center justify-center gap-2">
                     Check Eligibility <ChevronRight className="h-4 w-4" />
                  </button>
               </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
               <h3 className="text-lg font-black text-slate-900 mb-6">Why Finance With Us?</h3>
               <div className="space-y-5">
                  {features.map((feature, idx) => (
                     <div key={idx} className="flex gap-4 items-start">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                           {feature.icon}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 text-sm mb-1">{feature.title}</h4>
                           <p className="text-xs font-medium text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
