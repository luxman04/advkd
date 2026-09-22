'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';

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
  const [lastMailto, setLastMailto] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const city = String(data.get('city') || '').trim();
    const matter = String(data.get('matter') || '').trim();
    const mode = String(data.get('mode') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !phone || !matter || !message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields (*).');
      return;
    }

    setStatus('submitting');

    const subject = `Legal Consultation Booking — ${matter} (${name})`;
    const body = `Full Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email || 'Not provided'}
City / Location: ${city || 'Not provided'}
Type of Legal Matter: ${matter}
Preferred Consultation Mode: ${mode || 'In-Person (Chandigarh)'}

Brief Description / Query:
${message}

---
Sent via ${siteConfig.name} Website`;

    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setLastMailto(mailtoUrl);

    // Redirect user to their email client with pre-filled consultation details
    window.location.href = mailtoUrl;

    setStatus('success');
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
        <div className="text-[0.85rem] text-green-800 bg-green-50 border border-green-200 rounded-sm p-4 space-y-2">
          <p className="font-medium">Redirecting to your email app with your enquiry details pre-filled...</p>
          <p className="text-[0.8rem] text-green-700">
            If your email app did not open automatically,{' '}
            <a
              href={lastMailto || `mailto:${siteConfig.email}`}
              className="underline font-medium text-navy hover:text-gold"
            >
              click here to send email to {siteConfig.email}
            </a>
            , or reach us directly on{' '}
            <a
              href={`${siteConfig.whatsapp}?text=${encodeURIComponent('Hello Adv. KD, I would like to book a legal consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium text-green-800 hover:text-green-950"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="submit-btn w-full py-3.5 text-[0.9rem] bg-gold text-navy rounded-sm font-medium hover:bg-[#D4A83A] transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Opening Email…' : 'Book Consultation & Send Email →'}
      </button>
      <p className="text-[0.72rem] text-gray-400 text-center">
        All information is kept strictly confidential. Submitting this form does not create an advocate-client
        relationship.
      </p>
    </form>
  );
}
