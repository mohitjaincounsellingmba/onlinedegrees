"use client";

import { useState, FormEvent } from 'react';
const SimpleInquiryForm = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      source: 'Simple Inquiry Form',
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
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const inputCls = "w-full bg-[#111] border-2 border-[#333] focus:border-[#ccff00] rounded-xl p-3 text-white mb-4";

  if (status === 'success') {
    return (
      <div className="p-6 bg-[#111] text-center text-green-400 rounded-xl">
        🎉 Your request has been sent! We'll contact you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className={inputCls}
          placeholder="Your Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required />
        <input
          className={inputCls}
          placeholder="Phone (WhatsApp)"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          required />
        <input
          className={inputCls}
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required />
      <textarea
        className={inputCls + " h-24"}
        placeholder="Your question or message"
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#ccff00] text-black py-2 rounded-xl font-bold"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2">Failed to send. Please try again.</p>
      )}
    </form>
  );
};

export default SimpleInquiryForm;
