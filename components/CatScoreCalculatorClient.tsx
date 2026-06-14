"use client";

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  RefreshCw,
  Trophy,
  AlertCircle,
  ChevronRight,
  Zap,
  BarChart3,
  X,
  Lock,
  TrendingUp
} from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';

interface SectionConfig {
  key: 'varc' | 'dilr' | 'qa';
  label: string;
  fullName: string;
  totalMcq: number;
  totalTita: number;
  color: string;
  bg: string;
  border: string;
  shadow: string;
  accent: string;
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    key: 'varc',
    label: 'VARC',
    fullName: 'Verbal Ability & Reading Comprehension',
    totalMcq: 19,
    totalTita: 5,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-300',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(124,58,237,1)]',
    accent: '#7c3aed'
  },
  {
    key: 'dilr',
    label: 'DILR',
    fullName: 'Data Interpretation & Logical Reasoning',
    totalMcq: 16,
    totalTita: 4,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]',
    accent: '#2563eb'
  },
  {
    key: 'qa',
    label: 'QA',
    fullName: 'Quantitative Aptitude',
    totalMcq: 14,
    totalTita: 8,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]',
    accent: '#059669'
  }
];

interface SectionInput {
  correctMcq: string | number;
  wrongMcq: string | number;
  correctTita: string | number;
}

const INITIAL_INPUT: SectionInput = {
  correctMcq: '',
  wrongMcq: '',
  correctTita: ''
};

function calculateSectionRaw(input: SectionInput): number {
  const correctMcq = Number(input.correctMcq) || 0;
  const wrongMcq = Number(input.wrongMcq) || 0;
  const correctTita = Number(input.correctTita) || 0;
  return 3 * correctMcq - wrongMcq + 3 * correctTita;
}

export function CatScoreCalculatorClient() {
  const [inputs, setInputs] = useState<Record<'varc' | 'dilr' | 'qa', SectionInput>>({
    varc: { ...INITIAL_INPUT },
    dilr: { ...INITIAL_INPUT },
    qa: { ...INITIAL_INPUT }
  });

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    number: '',
    email: '',
    location: ''
  });

  const [counsellingModalOpen, setCounsellingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'varc' | 'dilr' | 'qa'>('varc');
  const [linkUrl, setLinkUrl] = useState('');
  const [pageSource, setPageSource] = useState('');
  const [parseError, setParseError] = useState('');
  const [scanningLink, setScanningLink] = useState(false);
  const [parsingSource, setParsingSource] = useState(false);
  const [scannedData, setScannedData] = useState<{ totalFetched: number; answeredCount: number } | null>(null);

  // Analyze Answer Key Link (Method A)
  const handleScanLink = async () => {
    if (!linkUrl) {
      alert("Please enter the response sheet URL.");
      return;
    }
    setScanningLink(true);
    setParseError('');
    setScannedData(null);
    try {
      const res = await fetch("/api/analyze-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: linkUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setScannedData(data.data);
    } catch (err: any) {
      setParseError(err.message || "Could not connect to scanner. Please try Method B instead.");
    } finally {
      setScanningLink(false);
    }
  };

  // Parse Page Source (Method B)
  const handleParseSource = () => {
    if (!pageSource) {
      setParseError("Please paste the page source code first.");
      return;
    }
    setParsingSource(true);
    setParseError('');
    try {
      const answeredCount = (pageSource.match(/Answered/g) || []).length;
      const totalFetched = (pageSource.match(/Question ID/g) || []).length;

      if (answeredCount === 0 && totalFetched === 0) {
        throw new Error("Could not find any 'Answered' status in the pasted content. Make sure you pasted the full page source.");
      }

      setScannedData({
        totalFetched: totalFetched || 66,
        answeredCount
      });
    } catch (err: any) {
      setParseError(err.message);
    } finally {
      setParsingSource(false);
    }
  };

  // Perform calculations using memoized state
  const results = useMemo(() => {
    const sections = SECTION_CONFIGS.map(conf => {
      const raw = calculateSectionRaw(inputs[conf.key]);
      const maxRaw = 3 * conf.totalMcq + 3 * conf.totalTita;

      // Section-wise percentile mappings
      const getPercentile = (score: number, key: string) => {
        const mappings: Record<string, [number, number][]> = {
          varc: [[55, 99.9], [48, 99], [40, 97], [33, 93], [25, 85], [18, 70], [10, 50]],
          dilr: [[50, 99.9], [42, 99], [35, 97], [28, 93], [20, 85], [13, 70], [8, 50]],
          qa:   [[60, 99.9], [52, 99], [44, 97], [36, 93], [27, 85], [18, 70], [9, 50]]
        };
        for (const [cutoff, pct] of mappings[key] || []) {
          if (score >= cutoff) return pct;
        }
        return 30;
      };

      const percentile = getPercentile(raw, conf.key);
      return {
        key: conf.key,
        raw,
        maxRaw,
        percentile
      };
    });

    const totalRaw = sections.reduce((sum, s) => sum + s.raw, 0);
    const maxTotal = sections.reduce((sum, s) => sum + s.maxRaw, 0);

    // Overall percentile mappings
    const overallPercentile = totalRaw >= 195 ? 99.99 :
                             totalRaw >= 185 ? 99.97 :
                             totalRaw >= 170 ? 99.9 :
                             totalRaw >= 155 ? 99.5 :
                             totalRaw >= 140 ? 99 :
                             totalRaw >= 130 ? 98.5 :
                             totalRaw >= 120 ? 98 :
                             totalRaw >= 110 ? 97 :
                             totalRaw >= 100 ? 95.5 :
                             totalRaw >= 90  ? 93 :
                             totalRaw >= 80  ? 90 :
                             totalRaw >= 70  ? 85 :
                             totalRaw >= 60  ? 78 :
                             totalRaw >= 50  ? 70 :
                             totalRaw >= 40  ? 58 :
                             totalRaw >= 30  ? 45 : 30;

    const scaledScore = Math.min(Math.round(totalRaw), 228);

    return {
      sections,
      totalRaw,
      maxTotal,
      overallPercentile,
      scaledScore
    };
  }, [inputs]);

  const handleInputChange = (sectionKey: 'varc' | 'dilr' | 'qa', field: keyof SectionInput, value: string) => {
    const config = SECTION_CONFIGS.find(c => c.key === sectionKey)!;
    const maxVal = field === 'correctTita' ? config.totalTita : config.totalMcq;

    if (value === '') {
      setInputs(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [field]: ''
        }
      }));
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxVal) {
      setInputs(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          [field]: numericValue
        }
      }));
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadInfo.name,
          number: leadInfo.number,
          email: leadInfo.email,
          location: leadInfo.location,
          source: 'CAT 2026 Score Calculator',
          score: results.totalRaw,
          percentile: results.overallPercentile,
          timestamp: new Date().toISOString()
        })
      });
      setSubmitted(true);
      setShowForm(false);
    } catch {
      setSubmitted(true);
      setShowForm(false);
    }
  };

  const activeConfig = SECTION_CONFIGS.find(c => c.key === activeTab)!;
  const activeInput = inputs[activeTab];
  const activeSectionResult = results.sections.find(s => s.key === activeTab)!;

  // Check if user has entered any data
  const hasEnteredData = SECTION_CONFIGS.some(conf => {
    const sInput = inputs[conf.key];
    return sInput.correctMcq !== '' || sInput.wrongMcq !== '' || sInput.correctTita !== '';
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        {/* Banner Header */}
        <div className="bg-foreground text-white p-8 md:p-10 border-b-[8px] border-foreground">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-amber-400 p-3 border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
              <Calculator className="w-8 h-8 text-foreground" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                CAT 2026 Score Calculator
              </h2>
              <p className="text-amber-300 font-bold text-sm uppercase tracking-widest mt-1">
                Section-wise · Raw Score · Scaled Score · Percentile
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">✓ Correct MCQ: +3</span>
            <span className="bg-rose-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">✗ Wrong MCQ: −1</span>
            <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30 font-display">◇ TITA Correct: +3</span>
            <span className="bg-slate-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30 font-display">— TITA Wrong: 0</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-10">
          
          {/* STEP 1: Scan Options */}
          <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
              <h3 className="text-xl font-black uppercase tracking-tight">Step 1: Scan Your Answer Key</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Method A: Answer Key Link</label>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={e => setLinkUrl(e.target.value)}
                    placeholder="Paste your Answer Key Link here..."
                    className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
                  />
                  <button
                    onClick={handleScanLink}
                    disabled={scanningLink}
                    className="bg-amber-400 text-foreground border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-foreground hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                  >
                    {scanningLink ? "Scanning..." : "Get Attempts"}
                  </button>
                </div>
              </div>
              <div className="h-px bg-slate-200"></div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 mb-2">Method B: Paste Page Source (Backup)</label>
                <textarea
                  value={pageSource}
                  onChange={e => setPageSource(e.target.value)}
                  placeholder="Backup: Paste page source code here..."
                  className="w-full h-24 bg-white border-4 border-foreground p-4 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all mb-4"
                />
                {parseError && (
                  <p className="text-rose-600 font-black text-xs uppercase mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {parseError}
                  </p>
                )}
                <button
                  onClick={handleParseSource}
                  disabled={parsingSource}
                  className="w-full bg-slate-800 text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                >
                  {parsingSource ? "Scanning..." : "Parse My Score"}
                </button>
              </div>
            </div>

            {scannedData && (
              <div className="mt-6 bg-white border-4 border-amber-300 p-4 animate-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2 text-amber-600 font-black uppercase text-xs mb-4">
                  <Zap className="w-4 h-4" /> Answer Key Scanned!
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 border-2 border-slate-200">
                    <div className="text-[10px] font-black text-slate-400 uppercase">Total Detected</div>
                    <div className="text-xl font-black">{scannedData.totalFetched}</div>
                  </div>
                  <div className="bg-emerald-50 p-3 border-2 border-emerald-200">
                    <div className="text-[10px] font-black text-emerald-600 uppercase">Answered</div>
                    <div className="text-xl font-black">{scannedData.answeredCount}</div>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase italic mt-3 text-center">
                  Now distribute your {scannedData.answeredCount} answered questions across the sections below.
                </p>
              </div>
            )}
          </div>

          {/* STEP 2: Input Section Marks */}
          <div className="flex items-center gap-3 mb-10 transition-all">
            <div className="h-1 flex-1 bg-slate-200"></div>
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">STEP 2: ENTER SECTION MARKS</span>
            <div className="h-1 flex-1 bg-slate-200"></div>
          </div>

          {/* Tabs */}
          <div className="flex border-4 border-foreground mb-8 overflow-hidden">
            {SECTION_CONFIGS.map(tab => {
              const score = calculateSectionRaw(inputs[tab.key]);
              const isFilled = inputs[tab.key].wrongMcq !== '' || inputs[tab.key].correctMcq !== '' || inputs[tab.key].correctTita !== '';
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-4 px-2 font-black uppercase text-sm transition-all border-r-4 border-foreground last:border-r-0 ${
                    activeTab === tab.key ? 'bg-foreground text-white' : 'bg-white text-foreground hover:bg-slate-50'
                  }`}
                >
                  <div className="text-lg">{tab.label}</div>
                  <div className={`text-xs ${activeTab === tab.key ? 'text-amber-300' : 'text-slate-500'}`}>
                    {isFilled ? `${score} pts` : '0 pts'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Tab Container */}
          <div className={`${activeConfig.bg} border-4 ${activeConfig.border} p-6 md:p-8 mb-8`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`text-2xl font-black ${activeConfig.color}`}>{activeConfig.label}</div>
              <div className="text-sm font-bold text-slate-500">— {activeConfig.fullName}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Correct MCQ <span className="text-slate-400 ml-1 normal-case">(max {activeConfig.totalMcq})</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max={activeConfig.totalMcq}
                  value={activeInput.correctMcq}
                  onChange={e => handleInputChange(activeTab, 'correctMcq', e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all"
                />
                <p className="text-[10px] text-emerald-700 font-black uppercase mt-1">+3 each</p>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Wrong MCQ <span className="text-slate-400 ml-1 normal-case">(max {activeConfig.totalMcq})</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max={activeConfig.totalMcq}
                  value={activeInput.wrongMcq}
                  onChange={e => handleInputChange(activeTab, 'wrongMcq', e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all"
                />
                <p className="text-[10px] text-rose-600 font-black uppercase mt-1">−1 each</p>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Correct TITA <span className="text-slate-400 ml-1 normal-case">(max {activeConfig.totalTita})</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max={activeConfig.totalTita}
                  value={activeInput.correctTita}
                  onChange={e => handleInputChange(activeTab, 'correctTita', e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
                />
                <p className="text-[10px] text-amber-600 font-black uppercase mt-1">+3 each, no negative</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between bg-white border-4 border-foreground p-4">
              <span className="text-xs font-black uppercase text-slate-500">{activeConfig.label} Raw Score</span>
              <span className={`text-3xl font-black ${activeConfig.color}`}>
                {activeSectionResult.raw}
                <span className="text-sm text-slate-400 ml-1">/ {activeSectionResult.maxRaw}</span>
              </span>
            </div>
          </div>

          {/* Sub Navigation Buttons */}
          <div className="flex gap-3 mb-10">
            {SECTION_CONFIGS.map((s, idx) => (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key)}
                className={`flex-1 text-xs font-black uppercase py-2 border-2 border-foreground transition-all ${
                  activeTab === s.key ? 'bg-foreground text-white' : 'bg-white hover:bg-slate-50'
                }`}
              >
                {idx + 1}. {s.label}
              </button>
            ))}
          </div>

          {/* Reset and Action Row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => {
                setInputs({
                  varc: { ...INITIAL_INPUT },
                  dilr: { ...INITIAL_INPUT },
                  qa: { ...INITIAL_INPUT }
                });
                setSubmitted(false);
                setShowForm(false);
                setScannedData(null);
                setLinkUrl('');
                setPageSource('');
              }}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-foreground group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Reset All
            </button>

            {!submitted && hasEnteredData && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-amber-400 text-foreground border-4 border-foreground px-8 py-4 text-lg font-black uppercase hover:bg-foreground hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3"
              >
                <Lock className="w-5 h-5" /> See Full Results
              </button>
            )}
          </div>

          {/* State 1: No data entered */}
          {!hasEnteredData && !submitted && (
            <div className="border-4 border-dashed border-slate-200 p-12 text-center">
              <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-black uppercase text-slate-400 text-sm tracking-widest">
                Enter your answers above to see your score
              </p>
            </div>
          )}

          {/* State 2: Data entered but locked */}
          {hasEnteredData && !submitted && !showForm && (
            <div className="border-4 border-amber-300 bg-amber-50 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <Lock className="w-32 h-32" />
              </div>
              <p className="text-xs font-black uppercase text-amber-700 tracking-widest mb-2">Live Preview</p>
              <div className="text-5xl font-black text-foreground blur-[4px] select-none">{results.totalRaw}</div>
              <p className="text-sm font-bold text-amber-700 mt-3">
                Submit your details to reveal your full score & percentile
              </p>
            </div>
          )}

          {/* State 3: Show unlocking form */}
          {showForm && !submitted && (
            <div className="border-4 border-foreground bg-foreground text-white p-8 mb-8 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                <h3 className="text-xl font-black uppercase">Unlock Your CAT Score & Percentile</h3>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={leadInfo.name}
                    onChange={e => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={leadInfo.number}
                    onChange={e => setLeadInfo({ ...leadInfo, number: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={leadInfo.email}
                    onChange={e => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="City / Location"
                    value={leadInfo.location}
                    onChange={e => setLeadInfo({ ...leadInfo, location: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-400 text-foreground border-4 border-amber-200 p-4 text-xl font-black uppercase hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Reveal My CAT Score <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full text-[10px] font-bold text-white/40 uppercase hover:text-white transition-colors text-center cursor-pointer"
                >
                  ← Go Back
                </button>
              </form>
            </div>
          )}

          {/* State 4: Submitted & Unlocked Results */}
          {submitted && (
            <div className="animate-in fade-in zoom-in duration-500 space-y-8">
              <div className="bg-foreground text-white p-8 border-b-[12px] border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Trophy className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300 block mb-3 animate-pulse">
                    Overall Raw Score
                  </span>
                  <div className="flex items-end gap-4 flex-wrap">
                    <div className="text-8xl md:text-9xl font-black leading-none">{results.totalRaw}</div>
                    <div className="text-xl font-bold text-slate-400 pb-2">/ {results.maxTotal}</div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="bg-white/10 border border-white/20 px-4 py-2">
                      <div className="text-[10px] font-black uppercase text-amber-300">Expected Percentile</div>
                      <div className="text-2xl font-black">~{results.overallPercentile}+</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 px-4 py-2">
                      <div className="text-[10px] font-black uppercase text-amber-300">Scaled Score (Est.)</div>
                      <div className="text-2xl font-black">{results.scaledScore}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-slate-600">Section-Wise Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.sections.map((s, idx) => {
                    const conf = SECTION_CONFIGS[idx];
                    return (
                      <div key={s.key} className={`bg-white border-4 border-foreground p-6 ${conf.shadow}`}>
                        <div className={`text-xs font-black uppercase tracking-widest ${conf.color} mb-1`}>
                          {conf.label}
                        </div>
                        <div className="text-4xl font-black mb-1">
                          {s.raw}
                          <span className="text-sm text-slate-400 ml-1">/ {s.maxRaw}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${conf.color}`} />
                          <span className="text-sm font-black text-slate-500">~{s.percentile}+ %ile</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setCounsellingModalOpen(true)}
                className="w-full bg-amber-400 text-foreground p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-foreground hover:text-white transition-colors text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <div className="text-sm font-black uppercase tracking-widest mb-1">Need Admission Guidance?</div>
                  <div className="text-xl font-black uppercase">Book Free CAT 2026 Counselling →</div>
                </div>
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Counselling Lead Modal */}
      {counsellingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground text-foreground">
            <button
              onClick={() => setCounsellingModalOpen(false)}
              className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 stroke-[3px]" />
            </button>
            <div className="bg-white">
              <div className="bg-amber-400 p-8 text-center border-b-8 border-foreground text-foreground">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">CAT Admission Support 2026</h2>
                <p className="font-bold mt-2">Expert guidance for IIMs & Top B-Schools.</p>
              </div>
              <div className="p-4 md:p-8">
                <InquiryForm />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setCounsellingModalOpen(false)}></div>
        </div>
      )}

      {/* Expected Score vs Percentile Table */}
      <div className="mt-20">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-amber-400 pl-6">
          CAT 2026 Score vs Percentile (Expected)
        </h3>
        <div className="overflow-x-auto border-4 border-foreground">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Raw Score (out of 228)</th>
                <th className="p-5 border-r border-white/20">Expected Percentile</th>
                <th className="p-5">Target Colleges</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {[
                ["185 – 228", "99.97+", "IIM A, B, C"],
                ["155 – 184", "99.5 – 99.9", "IIM L, K, I, XLRI"],
                ["130 – 154", "98.5 – 99.4", "IIM Shillong, MDI, IIFT"],
                ["110 – 129", "97 – 98.4", "IIM Ranchi, Udaipur, NITIE"],
                ["90 – 109", "93 – 96.9", "IIM Raipur, Trichy, FMS"],
                ["70 – 89", "85 – 92.9", "JBIMS, SPJIMR, NMIMS"],
                ["50 – 69", "70 – 84.9", "Tier 2 B-schools"]
              ].map(([scoreRange, expectedPct, targetColleges], idx) => (
                <tr
                  key={idx}
                  className={`border-b-4 border-foreground ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-amber-50 transition-colors`}
                >
                  <td className="p-5 border-r-4 border-foreground">{scoreRange}</td>
                  <td className="p-5 border-r-4 border-foreground text-amber-600">{expectedPct}</td>
                  <td className="p-5">{targetColleges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exam Pattern Table */}
      <div className="mt-20">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-amber-400 pl-6">
          CAT 2026 Exam Pattern
        </h3>
        <div className="overflow-x-auto border-4 border-foreground">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Section</th>
                <th className="p-5 border-r border-white/20">Total Qs</th>
                <th className="p-5 border-r border-white/20">MCQ</th>
                <th className="p-5 border-r border-white/20">TITA</th>
                <th className="p-5 border-r border-white/20">Max Score</th>
                <th className="p-5">Duration</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {SECTION_CONFIGS.map((sec, idx) => (
                <tr
                  key={sec.key}
                  className={`border-b-4 border-foreground ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-amber-50 transition-colors`}
                >
                  <td className={`p-5 border-r-4 border-foreground font-black ${sec.color}`}>
                    {sec.label}
                  </td>
                  <td className="p-5 border-r-4 border-foreground">{sec.totalMcq + sec.totalTita}</td>
                  <td className="p-5 border-r-4 border-foreground">{sec.totalMcq}</td>
                  <td className="p-5 border-r-4 border-foreground">{sec.totalTita}</td>
                  <td className="p-5 border-r-4 border-foreground">{(sec.totalMcq + sec.totalTita) * 3}</td>
                  <td className="p-5">40 min</td>
                </tr>
              ))}
              <tr className="bg-foreground text-white">
                <td className="p-5 border-r-4 border-white/20 font-black">TOTAL</td>
                <td className="p-5 border-r-4 border-white/20">66</td>
                <td className="p-5 border-r-4 border-white/20">49</td>
                <td className="p-5 border-r-4 border-white/20">17</td>
                <td className="p-5 border-r-4 border-white/20">228</td>
                <td className="p-5 text-white">120 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
