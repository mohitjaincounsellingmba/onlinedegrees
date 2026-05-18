"use client";

import { useState } from 'react';
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap,
  Banknote,
  Briefcase,
  Trophy,
  Laptop
} from 'lucide-react';

const collegesData = [
  { 
    id: 'amity', 
    name: 'Amity University Online', 
    logo: 'A',
    color: 'from-orange-500 to-amber-500',
    feeNum: 1.75,
    feeText: '₹1.75 Lakhs', 
    accreditation: 'UGC-DEB, NAAC A+, WES', 
    packageNum: 9,
    packageText: '₹8-10 LPA', 
    topSpecialization: 'Finance & HR', 
    exams: 'Semester-wise', 
    mode: '100% Online', 
    lms: 'Amizone LMS',
    rating: 4.6
  },
  { 
    id: 'manipal', 
    name: 'Manipal University (MAHE)', 
    logo: 'M',
    color: 'from-orange-600 to-red-600',
    feeNum: 2.60,
    feeText: '₹2.60 Lakhs', 
    accreditation: 'UGC-DEB, NAAC A++', 
    packageNum: 11,
    packageText: '₹10-12 LPA', 
    topSpecialization: 'Business Analytics', 
    exams: 'Online Proctored', 
    mode: '100% Online', 
    lms: 'EduNxt Portal',
    rating: 4.8
  },
  { 
    id: 'jain', 
    name: 'Jain University Online', 
    logo: 'J',
    color: 'from-purple-600 to-indigo-600',
    feeNum: 1.50,
    feeText: '₹1.50 Lakhs', 
    accreditation: 'UGC-DEB, NAAC A++', 
    packageNum: 7,
    packageText: '₹6-8 LPA', 
    topSpecialization: 'Digital Marketing', 
    exams: 'Online / Flexi', 
    mode: '100% Online', 
    lms: 'Jain LMS',
    rating: 4.4
  },
  { 
    id: 'lpu', 
    name: 'LPU Online', 
    logo: 'L',
    color: 'from-yellow-500 to-orange-500',
    feeNum: 1.20,
    feeText: '₹1.20 Lakhs', 
    accreditation: 'UGC-DEB, NAAC A++', 
    packageNum: 6,
    packageText: '₹5-7 LPA', 
    topSpecialization: 'Marketing', 
    exams: 'Online', 
    mode: '100% Online', 
    lms: 'LPU e-Connect',
    rating: 4.2
  },
  { 
    id: 'nmims', 
    name: 'NMIMS Online (NGASCE)', 
    logo: 'N',
    color: 'from-red-600 to-rose-600',
    feeNum: 1.44,
    feeText: '₹1.44 Lakhs', 
    accreditation: 'UGC-DEB, NAAC A+', 
    packageNum: 9,
    packageText: '₹8-10 LPA', 
    topSpecialization: 'Marketing & Ops', 
    exams: 'Term End Proctored', 
    mode: '100% Online', 
    lms: 'Student Portal',
    rating: 4.5
  },
  { 
    id: 'opjindal', 
    name: 'OP Jindal Global', 
    logo: 'O',
    color: 'from-blue-600 to-cyan-600',
    feeNum: 3.50,
    feeText: '₹3.50 Lakhs', 
    accreditation: 'UGC-DEB, NAAC A, AACSB', 
    packageNum: 13.5,
    packageText: '₹12-15 LPA', 
    topSpecialization: 'Global Business', 
    exams: 'Online', 
    mode: '100% Online', 
    lms: 'Jindal LMS',
    rating: 4.7
  },
];

export function CompareClient() {
  const [col1Id, setCol1Id] = useState(collegesData[0].id);
  const [col2Id, setCol2Id] = useState(collegesData[1].id);

  const col1 = collegesData.find(c => c.id === col1Id) || collegesData[0];
  const col2 = collegesData.find(c => c.id === col2Id) || collegesData[1];

  // For charts max bounds
  const MAX_FEE = 4.0;
  const MAX_PACKAGE = 16;

  const renderBar = (value: number, max: number, colorClass: string, isInverse: boolean = false) => {
    const percentage = Math.min((value / max) * 100, 100);
    return (
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-2 relative border border-slate-200">
        <div 
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-display pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 pt-24 pb-16 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[150%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[120%] bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase">
            <ArrowRightLeft className="h-4 w-4" />
            <span>Interactive Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Compare Online Universities
          </h1>
          <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto">
            Place two premium universities head-to-head. Analyze placement packages, total tuition fees, accreditations, and learning systems.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Selector 1 */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Select First University
            </label>
            <select 
              value={col1Id}
              onChange={(e) => setCol1Id(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-lg font-bold rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
            >
              {collegesData.map(c => (
                <option key={`c1-${c.id}`} value={c.id} disabled={c.id === col2Id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Selector 2 */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 border border-slate-100">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Select Second University
            </label>
            <select 
              value={col2Id}
              onChange={(e) => setCol2Id(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-lg font-bold rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
            >
              {collegesData.map(c => (
                <option key={`c2-${c.id}`} value={c.id} disabled={c.id === col1Id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Charts Comparison */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 mb-10">
          <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-indigo-500" />
            Performance & Value Charts
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Average Package Chart */}
            <div className="space-y-6 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                <Briefcase className="h-5 w-5 text-indigo-500" />
                Average Package Comparison
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-slate-800">{col1.name}</span>
                    <span className="text-indigo-600 font-black">{col1.packageText}</span>
                  </div>
                  {renderBar(col1.packageNum, MAX_PACKAGE, col1.color)}
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-slate-800">{col2.name}</span>
                    <span className="text-indigo-600 font-black">{col2.packageText}</span>
                  </div>
                  {renderBar(col2.packageNum, MAX_PACKAGE, col2.color)}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">Higher is better. Based on verified placement reports.</p>
            </div>

            {/* Total Fees Chart */}
            <div className="space-y-6 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                <Banknote className="h-5 w-5 text-rose-500" />
                Total Tuition Fee Comparison
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-slate-800">{col1.name}</span>
                    <span className="text-rose-600 font-black">{col1.feeText}</span>
                  </div>
                  {renderBar(col1.feeNum, MAX_FEE, 'from-rose-400 to-rose-600', true)}
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-slate-800">{col2.name}</span>
                    <span className="text-rose-600 font-black">{col2.feeText}</span>
                  </div>
                  {renderBar(col2.feeNum, MAX_FEE, 'from-rose-400 to-rose-600', true)}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">Lower indicates more affordable tuition for full program.</p>
            </div>
          </div>
        </div>

        {/* Detailed Matrix Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 text-sm font-bold text-slate-400 uppercase tracking-widest w-1/4">Features</th>
                  <th className="p-6 w-[37.5%] border-l border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${col1.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {col1.logo}
                      </div>
                      <div>
                        <div className="text-lg font-black text-slate-900">{col1.name}</div>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          ★ {col1.rating} / 5.0
                        </div>
                      </div>
                    </div>
                  </th>
                  <th className="p-6 w-[37.5%] border-l border-slate-200 bg-indigo-50/30">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${col2.color} flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                        {col2.logo}
                      </div>
                      <div>
                        <div className="text-lg font-black text-slate-900">{col2.name}</div>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          ★ {col2.rating} / 5.0
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-slate-500 font-bold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Accreditations
                  </td>
                  <td className="p-6 text-slate-800 border-l border-slate-100">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {col1.accreditation}
                    </span>
                  </td>
                  <td className="p-6 text-slate-800 border-l border-slate-100 bg-indigo-50/30">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {col2.accreditation}
                    </span>
                  </td>
                </tr>
                
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-slate-500 font-bold flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" /> Top Specialization
                  </td>
                  <td className="p-6 text-slate-800 border-l border-slate-100 font-bold">{col1.topSpecialization}</td>
                  <td className="p-6 text-slate-800 border-l border-slate-100 bg-indigo-50/30 font-bold">{col2.topSpecialization}</td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-slate-500 font-bold flex items-center gap-2">
                    <Laptop className="h-4 w-4" /> Learning System (LMS)
                  </td>
                  <td className="p-6 text-slate-800 border-l border-slate-100">{col1.lms}</td>
                  <td className="p-6 text-slate-800 border-l border-slate-100 bg-indigo-50/30">{col2.lms}</td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-slate-500 font-bold flex items-center gap-2">
                    <Banknote className="h-4 w-4" /> Exam Mode
                  </td>
                  <td className="p-6 text-slate-800 border-l border-slate-100">{col1.exams}</td>
                  <td className="p-6 text-slate-800 border-l border-slate-100 bg-indigo-50/30">{col2.exams}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
