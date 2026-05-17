'use client';

import { useState } from 'react';

const BUDGET_OPTIONS = [
  'Under ₹1 Lakh',
  '₹1 Lakh - ₹1.5 Lakhs',
  '₹1.5 Lakhs - ₹2 Lakhs',
  'Above ₹2 Lakhs'
];

const COURSE_OPTIONS = [
  'Online MBA',
  'Online PGDM',
  'Online MCA',
  'Online BBA',
  'Online BCA',
  'Online B.Com',
  'Online M.Com',
  'Executive MBA',
  'Other Professional Certificate'
];

export function InquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    location: '',
    preferredLocation: '',
    budget: '',
    course: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const leadPayload = {
      name: formData.name,
      number: formData.number,
      email: formData.email,
      location: formData.location,
      source: `Online Shiksha Inquiry (${formData.course})`,
      budget: formData.budget,
      preferredLocation: formData.preferredLocation,
      course: formData.course,
      message: formData.message,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`);
      }

      setStatus('success');
      setFormData({
        name: '',
        number: '',
        email: '',
        location: '',
        preferredLocation: '',
        budget: '',
        course: '',
        message: ''
      });
    } catch (e) {
      console.error('Webhook Error:', e);
      setStatus('error');
      alert('Form submission failed. Please check your connection or try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center">
        <div className="mx-auto w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">
          ✓
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Success!</h3>
        <p className="text-sm font-semibold text-slate-600 mb-6">
          Your inquiry has been received. Our senior counselling experts will call or WhatsApp you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none"
          />
        </div>

        {/* Number */}
        <div className="space-y-1.5">
          <label htmlFor="number" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number (WhatsApp)</label>
          <input
            id="number"
            name="number"
            required
            type="tel"
            placeholder="e.g. 9876543210"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder="e.g. name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Current Location</label>
          <input
            id="location"
            name="location"
            required
            type="text"
            placeholder="e.g. Mumbai"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none"
          />
        </div>

        {/* Preferred Location */}
        <div className="space-y-1.5">
          <label htmlFor="preferredLocation" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Preferred Location / Remote</label>
          <input
            id="preferredLocation"
            name="preferredLocation"
            required
            type="text"
            placeholder="e.g. Online / Pune"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none"
          />
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Budget Range</label>
          <select
            id="budget"
            name="budget"
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="" disabled>Select Budget</option>
            {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Course */}
        <div className="space-y-1.5 md:col-span-2">
          <label htmlFor="course" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Course Interest</label>
          <select
            id="course"
            name="course"
            required
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl px-4 text-sm font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="" disabled>Select Program</option>
            {COURSE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1.5 md:col-span-2">
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500">Questions (Optional)</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us about your career goals..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all rounded-xl p-4 text-sm font-semibold text-slate-800 outline-none resize-none"
          />
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-base font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center"
      >
        {status === 'submitting' ? 'Processing Lead...' : 'Submit Form'}
      </button>
      <div className="text-center">
        <span className="text-[9px] font-bold uppercase text-slate-400">Secure 256-bit Encrypted Admission Portal</span>
      </div>
    </form>
  );
}
