"use client";

import { useState } from 'react';

interface SimpleInquiryFormProps {
  courseName?: string;
  source?: string;
}

const COURSE_LIST = [
  'Online MBA',
  'Executive MBA',
  'Online BBA',
  'Online MCA',
  'Online BCA',
  'Other Online Degree'
];

const SimpleInquiryForm = ({ courseName = 'Online MBA', source = 'Blog Sidebar Inquiry' }: SimpleInquiryFormProps) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    course: courseName,
    message: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      name: formData.name,
      number: formData.phone,
      phone: formData.phone,
      email: formData.email,
      course: formData.course,
      message: formData.message,
      source: `${source} (${formData.course})`,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setStatus('success');

      // Auto trigger WhatsApp connect
      const waMsg = encodeURIComponent(
        `Hi Mohit Sir, I am inquiring about ${formData.course}. My name is ${formData.name}. Please share university fee structures and placement details.`
      );
      setTimeout(() => {
        window.open(`https://wa.me/919560020771?text=${waMsg}`, '_blank');
      }, 1200);

      setFormData({ name: '', phone: '', email: '', course: courseName, message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputCls = "w-full bg-[#111] border-2 border-[#333] focus:border-[#ccff00] rounded-xl p-3 text-white text-sm outline-none transition-colors";

  if (status === 'success') {
    return (
      <div className="p-6 bg-[#111] border-2 border-lime-400 text-center text-lime-400 rounded-2xl shadow-lg space-y-3">
        <div className="text-2xl font-black">🎉 Request Received!</div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          Mohit Jain will connect with you shortly on WhatsApp.
        </p>
        <p className="text-[11px] text-slate-400 animate-pulse">
          Opening WhatsApp with your inquiry...
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs font-bold underline text-lime-400 hover:text-white pt-2 cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1">
          Select Degree *
        </label>
        <select
          value={formData.course}
          onChange={e => setFormData({ ...formData, course: e.target.value })}
          className={inputCls}
        >
          {COURSE_LIST.map((c) => (
            <option key={c} value={c} className="bg-slate-900 text-white">
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1">
          Full Name *
        </label>
        <input
          className={inputCls}
          placeholder="e.g. Rahul Sharma"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required 
        />
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1">
          WhatsApp Number *
        </label>
        <input
          type="tel"
          className={inputCls}
          placeholder="e.g. 9876543210"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          required 
        />
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1">
          Email Address *
        </label>
        <input
          className={inputCls}
          placeholder="e.g. rahul@gmail.com"
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required 
        />
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-300 mb-1">
          Questions / Preferred Colleges
        </label>
        <textarea
          className={inputCls + " h-20 resize-none"}
          placeholder="e.g. Fee concession, EMI options, placement support..."
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#ccff00] hover:bg-lime-400 text-black py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20 active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        {status === 'submitting' ? 'Submitting...' : 'Get Free Shortlist on WhatsApp'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-xs text-center mt-1">Failed to send. Please try again or WhatsApp directly.</p>
      )}
    </form>
  );
};

export default SimpleInquiryForm;
