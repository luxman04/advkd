'use client';

import { useState } from 'react';

const MATTER_OPTIONS = [
  'Criminal Litigation / Bail',
  'Anticipatory Bail',
  'FIR Quashing',
  'Environmental Matter',
  'Child Custody',
  'NRI Property Dispute',
  'Civil / Property',
  'Consumer Forum',
  'High Court Writ',
  'Other',
];

const MODE_OPTIONS = ['In-Person (Chandigarh)', 'Video Call (Zoom / WhatsApp)', 'Phone Call'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const matter = String(data.get('matter') || '');
    const message = String(data.get('message') || '').trim();

    if (!name || !phone || !matter || !message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields (*).');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: data.get('email'),
          city: data.get('city'),
          matter,
          mode: data.get('mode'),
          message,
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong sending your message. Please call or WhatsApp us directly instead.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name *</label>
          <input name="name" type="text" placeholder="Your full name" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Phone *</label>
          <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="form-input" required />
        </div>
      </div>
      <div>
        <label className="form-label">Email Address</label>
        <input name="email" type="email" placeholder="your@email.com" className="form-input" />
      </div>
      <div>
        <label className="form-label">City / Country</label>
        <input name="city" type="text" placeholder="e.g. Chandigarh / Canada" className="form-input" />
      </div>
      <div>
        <label className="form-label">Type of Legal Matter *</label>
        <select name="matter" className="form-input" required defaultValue="">
          <option value="" disabled>
            Select a category…
          </option>
          {MATTER_OPTIONS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="form-label">Preferred Consultation</label>
        <select name="mode" className="form-input" defaultValue={MODE_OPTIONS[0]}>
          {MODE_OPTIONS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="form-label">Brief Description *</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Describe your situation briefly. Please do not share sensitive documents here."
          className="form-input resize-y min-h-[110px]"
          required
        />
      </div>

      {status === 'error' && (
        <p className="text-[0.8rem] text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2">{errorMsg}</p>
      )}
      {status === 'success' && (
        <p className="text-[0.8rem] text-green-700 bg-green-50 border border-green-200 rounded-sm px-3 py-2">
          Thank you! Your enquiry has been sent — we will contact you within 24 hours.
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="submit-btn w-full py-3.5 text-[0.9rem] bg-gold text-navy rounded-sm font-medium hover:bg-[#D4A83A] transition-colors disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
      </button>
      <p className="text-[0.72rem] text-gray-400 text-center">
        All information is kept strictly confidential. Submitting this form does not create an advocate-client
        relationship.
      </p>
    </form>
  );
}
