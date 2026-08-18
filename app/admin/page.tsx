"use client";

import React, { useState, useEffect } from 'react';
import { 
  Lock, Search, RefreshCw, LogOut, Award, ShieldAlert, Users, 
  CheckCircle2, Filter, Clock, Eye, AlertOctagon, UserCheck, ChevronRight
} from 'lucide-react';

interface ExamRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  examName: string;
  score: number;
  maxScore: number;
  percentage: string;
  correctAnswers: number;
  totalQuestions: number;
  status: 'submitted' | 'terminated';
  reason?: string;
  timestamp: string;
}

export default function AdminDashboardPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Data states
  const [records, setRecords] = useState<ExamRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [kvMissing, setKvMissing] = useState(false);

  // Filters & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'terminated'>('all');
  const [examFilter, setExamFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Check existing session on mount
  useEffect(() => {
    document.title = "Admin Console | Online Shiksha";
    const sessionToken = sessionStorage.getItem('admin_auth_session');
    if (sessionToken === 'authenticated_careerwithmohit_2027') {
      setIsAuthenticated(true);
      fetchExamRecords();
    }
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'careerwithmohit' && password === '2027') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('admin_auth_session', 'authenticated_careerwithmohit_2027');
      fetchExamRecords();
    } else {
      setAuthError('Incorrect username or password. Please try again.');
    }
  };

  // Fetch Exam Records from Cloudflare KV API
  const fetchExamRecords = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const response = await fetch('/api/exams', {
        method: 'GET',
        headers: {
          'x-admin-secret': 'mohitadmin2026'
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const recordsArray = data.records || [];
      setKvMissing(data.kvStatus === 'missing');

      // Sort immediately by date descending
      const sortedData = [...recordsArray].sort(
        (a: ExamRecord, b: ExamRecord) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setRecords(sortedData);
    } catch (err: any) {
      console.error("Failed to fetch exam records:", err);
      setFetchError("Could not retrieve exam logs from the server. Check if LEADS_KV is configured.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth_session');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setRecords([]);
  };

  // Human readable date formatting
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (_) {
      return isoString;
    }
  };

  // Get distinct exam names for filters
  const uniqueExams = Array.from(new Set(records.map(r => r.examName)));

  // Filter & Sort Logic
  const filteredRecords = records
    .filter(record => {
      // Search filter
      const matchesSearch = 
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.phone.includes(searchTerm);
      
      // Status filter
      const matchesStatus = 
        statusFilter === 'all' || 
        record.status === statusFilter;
      
      // Exam name filter
      const matchesExam = 
        examFilter === 'all' || 
        record.examName === examFilter;

      return matchesSearch && matchesStatus && matchesExam;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortBy === 'score') {
        comparison = a.score - b.score;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

  // Calculate statistics
  const stats = (() => {
    const total = records.length;
    const submitted = records.filter(r => r.status === 'submitted').length;
    const terminated = records.filter(r => r.status === 'terminated').length;
    
    // Average score of submitted exams
    const submittedRecords = records.filter(r => r.status === 'submitted');
    const avgPercent = submittedRecords.length > 0 
      ? (submittedRecords.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / submittedRecords.length).toFixed(1)
      : '0.0';

    return { total, submitted, terminated, avgPercent };
  })();

  // Toggle sorting
  const handleSortToggle = (field: 'date' | 'score' | 'name') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // RENDER LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#fdfdfb] font-sans flex items-center justify-center p-6 pt-32 pb-24">
        <div className="bg-white border-8 border-black rounded-3xl p-8 max-w-md w-full shadow-[12px_12px_0px_#000]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#ccff00] p-3 rounded-xl border-2 border-black">
              <Lock className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Admin Portal</h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Examinee Records Log</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full border-4 border-black bg-[#fdfdfb] p-4 rounded-xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 transition-all text-black"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border-4 border-black bg-[#fdfdfb] p-4 rounded-xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 transition-all text-black"
              />
            </div>

            {authError && (
              <div className="bg-[#ff007f]/5 border-2 border-[#ff007f] p-3.5 rounded-xl text-xs font-bold text-[#ff007f] flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#ccff00] text-black border-4 border-black px-6 py-4 rounded-xl font-black uppercase text-sm hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Sign In to Console <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  // RENDER DASHBOARD
  return (
    <main className="min-h-screen bg-[#fdfdfb] font-sans pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-black">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-4 border-black">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            Exam <span className="text-[#00ffa3] underline decoration-8 decoration-black underline-offset-4">Control</span> Room
          </h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
            Monitor real-time candidate scores and anti-cheating alerts
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchExamRecords}
            disabled={loading}
            className="bg-white text-black border-4 border-black p-3.5 rounded-xl hover:bg-slate-50 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 font-black text-xs uppercase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Log
          </button>
          <button
            onClick={handleLogout}
            className="bg-black text-[#ff007f] border-4 border-black p-3.5 rounded-xl hover:bg-slate-900 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 font-black text-xs uppercase"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* DB Binding Warning Banner */}
      {kvMissing && (
        <div className="bg-[#ff007f]/10 border-4 border-[#ff007f] p-6 rounded-2xl shadow-[6px_6px_0px_#ff007f] space-y-3">
          <div className="flex items-center gap-3 text-[#ff007f]">
            <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
            <h2 className="text-xl font-black uppercase tracking-tight">Database Connection Missing!</h2>
          </div>
          <p className="font-bold text-slate-700 text-sm leading-relaxed">
            The exams database is not active because the <code className="bg-black text-white px-1.5 py-0.5 rounded font-mono">LEADS_KV</code> namespace is not bound to your Cloudflare Pages project. Activepieces webhooks are functioning correctly, but exam logs cannot be saved or read locally on this dashboard until KV is connected.
          </p>
          <div className="bg-white border-2 border-black p-4 rounded-xl text-xs space-y-2 font-bold text-slate-600">
            <p className="text-black uppercase font-black text-xs">How to bind it in Cloudflare Pages:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open your <strong>Cloudflare Dashboard</strong> and select your project <strong>onlinedegrees</strong> under Workers &amp; Pages.</li>
              <li>Go to <strong>Settings</strong> &rarr; <strong>Functions</strong> (scroll down to <strong>KV namespace bindings</strong>).</li>
              <li>Click <strong>Add binding</strong>. Enter variable name: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-black">LEADS_KV</code> and select your active KV namespace (create one in KV settings if needed).</li>
              <li>Save and trigger a redeployment in the <strong>Deployments</strong> tab.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Summary Statistics Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex items-center gap-4">
          <div className="bg-slate-100 p-3.5 rounded-xl border-2 border-black text-black">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Attempts</p>
            <p className="text-2xl font-black">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex items-center gap-4">
          <div className="bg-[#00ffa3]/10 p-3.5 rounded-xl border-2 border-black text-black">
            <CheckCircle2 className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Submitted Successfully</p>
            <p className="text-2xl font-black text-black">{stats.submitted}</p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex items-center gap-4">
          <div className="bg-[#ff007f]/10 p-3.5 rounded-xl border-2 border-black text-black">
            <ShieldAlert className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Cheating Terminations</p>
            <p className="text-2xl font-black text-black">{stats.terminated}</p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex items-center gap-4">
          <div className="bg-[#ccff00]/10 p-3.5 rounded-xl border-2 border-black text-black">
            <Award className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Average Submitted Score</p>
            <p className="text-2xl font-black text-black">{stats.avgPercent}%</p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5 stroke-[2.5]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate by name, email, or number..."
            className="w-full border-2 border-black bg-[#fdfdfb] pl-12 pr-4 py-3 rounded-xl font-bold placeholder-slate-400 focus:outline-none focus:bg-[#ccff00]/5 text-sm"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          
          {/* Exam Filter */}
          <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-[#fdfdfb] text-xs font-bold w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={examFilter}
              onChange={(e) => setExamFilter(e.target.value)}
              className="focus:outline-none bg-transparent font-bold cursor-pointer w-full"
            >
              <option value="all">All Exams</option>
              {uniqueExams.map((exName, idx) => (
                <option key={idx} value={exName}>{exName}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-[#fdfdfb] text-xs font-bold w-full sm:w-auto">
            <UserCheck className="w-3.5 h-3.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="focus:outline-none bg-transparent font-bold cursor-pointer w-full"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted Only</option>
              <option value="terminated">Violations Only</option>
            </select>
          </div>

        </div>

      </div>

      {/* Main Table Panel */}
      <div className="bg-white border-8 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_#000]">
        
        {fetchError ? (
          <div className="p-12 text-center">
            <ShieldAlert className="w-16 h-16 text-[#ff007f] mx-auto mb-4" />
            <p className="font-bold text-slate-700 text-lg">{fetchError}</p>
            <button 
              onClick={fetchExamRecords}
              className="bg-black text-[#ccff00] border-4 border-black px-6 py-2.5 rounded-xl font-black uppercase text-xs mt-4 hover:translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              Try Reconnecting
            </button>
          </div>
        ) : loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-12 h-12 text-black animate-spin stroke-[2.5]" />
            <p className="font-black text-sm uppercase tracking-widest text-slate-500">Retrieving log data...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-16 text-center">
            <AlertOctagon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="font-bold text-slate-500 text-base">No examinee records matched your query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-black">
              <thead className="bg-[#ccff00]/10 border-b-4 border-black text-xs font-black uppercase text-black tracking-wider">
                <tr>
                  <th 
                    onClick={() => handleSortToggle('name')}
                    className="p-4 cursor-pointer hover:bg-[#ccff00]/20 select-none transition-colors"
                  >
                    Candidate {sortBy === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Exam Name</th>
                  <th 
                    onClick={() => handleSortToggle('score')}
                    className="p-4 cursor-pointer hover:bg-[#ccff00]/20 select-none transition-colors"
                  >
                    Performance {sortBy === 'score' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                  </th>
                  <th className="p-4">Status / Alert</th>
                  <th 
                    onClick={() => handleSortToggle('date')}
                    className="p-4 cursor-pointer hover:bg-[#ccff00]/20 select-none transition-colors"
                  >
                    Timestamp {sortBy === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {filteredRecords.map((record) => {
                  const isViolation = record.status === 'terminated';
                  return (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      
                      {/* Name */}
                      <td className="p-4 font-black text-base max-w-[200px] truncate">
                        {record.name}
                      </td>

                      {/* Contact */}
                      <td className="p-4 space-y-1">
                        <p className="font-bold text-slate-700 select-all">{record.email}</p>
                        <p className="text-xs text-slate-500 select-all">{record.phone}</p>
                      </td>

                      {/* Exam Name */}
                      <td className="p-4 font-bold text-black max-w-[180px] truncate">
                        {record.examName}
                      </td>

                      {/* Performance */}
                      <td className="p-4">
                        {isViolation ? (
                          <span className="text-xs font-black uppercase tracking-wider text-[#ff007f] bg-[#ff007f]/5 px-2.5 py-1 rounded-lg border border-[#ff007f]">
                            Invalidated
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <p className="font-black text-base">{record.score} <span className="text-xs font-normal text-slate-400">/ {record.maxScore}</span></p>
                            <div className="flex items-center gap-1 text-xs font-black text-emerald-600">
                              <Award className="w-3.5 h-3.5" /> {record.percentage}%
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Status / Alert */}
                      <td className="p-4">
                        {isViolation ? (
                          <div className="space-y-1 max-w-[220px]">
                            <div className="inline-flex items-center gap-1 bg-[#ff007f] text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                              <ShieldAlert className="w-3 h-3 fill-white stroke-[#ff007f]" /> Terminated
                            </div>
                            <p className="text-[11px] font-bold text-[#ff007f] leading-normal truncate" title={record.reason}>
                              {record.reason || "cheating detected"}
                            </p>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg text-xs font-black uppercase">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Completed
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="p-4 font-bold text-slate-500 flex items-center gap-1.5 pt-6">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span>{formatDate(record.timestamp)}</span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </main>
  );
}
