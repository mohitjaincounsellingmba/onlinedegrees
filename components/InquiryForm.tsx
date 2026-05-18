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
      <div className="bg-[#111] border-2 border-[#ccff00] p-8 rounded-2xl text-center shadow-[6px_6px_0px_#ccff00]">
        <div className="mx-auto w-16 h-16 bg-[#ccff00] rounded-full flex items-center justify-center mb-4 text-black font-black text-3xl border-2 border-black">
          ✓
        </div>
        <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">W! Success!</h3>
        <p className="text-sm font-semibold text-gray-400 mb-6">
          Your inquiry is locked in. Our experts will hit you up on WhatsApp shortly. 🚀
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-transparent border-2 border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[4px_4px_0px_rgba(204,255,0,0.2)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0"
        >
          Send Another
        </button>
      </div>
    );
  }

  const inputClasses = "w-full h-12 bg-[#050505] border-2 border-[#333] focus:border-[#ccff00] focus:bg-[#111] transition-all rounded-xl px-4 text-sm font-bold text-white outline-none focus:shadow-[4px_4px_0px_rgba(204,255,0,0.5)] focus:-translate-y-1";
  const labelClasses = "block text-xs font-black uppercase tracking-wider text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClasses}>Full Name</label>
          <input
            id="name"
            name="name"
            required
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        {/* Number */}
        <div>
          <label htmlFor="number" className={labelClasses}>Phone (WhatsApp)</label>
          <input
            id="number"
            name="number"
            required
            type="tel"
            placeholder="e.g. 9876543210"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <input
            id="email"
            name="email"
            required
            type="email"
            placeholder="e.g. name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className={labelClasses}>Current City</label>
          <input
            id="location"
            name="location"
            required
            type="text"
            placeholder="e.g. Mumbai"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={inputClasses}
          />
        </div>

        {/* Preferred Location */}
        <div>
          <label htmlFor="preferredLocation" className={labelClasses}>Preferred City / Remote</label>
          <input
            id="preferredLocation"
            name="preferredLocation"
            required
            type="text"
            placeholder="e.g. Online / Pune"
            value={formData.preferredLocation}
            onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
            className={inputClasses}
          />
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className={labelClasses}>Budget Range</label>
          <select
            id="budget"
            name="budget"
            required
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className={inputClasses + " cursor-pointer appearance-none"}
          >
            <option value="" disabled>Select Budget</option>
            {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Course */}
        <div className="md:col-span-2">
          <label htmlFor="course" className={labelClasses}>Course Interest</label>
          <select
            id="course"
            name="course"
            required
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className={inputClasses + " cursor-pointer appearance-none"}
          >
            <option value="" disabled>Select Program</option>
            {COURSE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className={labelClasses}>Any Questions? (Optional)</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us about your career goals..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`${inputClasses} h-auto py-3 resize-none`}
          />
        </div>
      </div>

      <button
        disabled={status === 'submitting'}
        type="submit"
        className="w-full h-14 bg-[#ccff00] text-black border-2 border-[#ccff00] hover:bg-transparent hover:text-[#ccff00] rounded-xl text-lg font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Processing...' : 'Submit Inquiry 🔥'}
      </button>
      <div className="text-center">
        <span className="text-[10px] font-black uppercase text-[#ff007f] tracking-widest bg-[#ff007f]/10 px-3 py-1 rounded-full border border-[#ff007f]/20">
          Secure 256-bit Encrypted
        </span>
      </div>
    </form>
  );
}
