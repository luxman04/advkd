'use client';

import { useState, useRef } from 'react';
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

type Status = 'idle' | 'success' | 'error';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [links, setLinks] = useState<{ waUrl: string; mailtoUrl: string; gmailUrl: string } | null>(null);

  function getFormData() {
    if (!formRef.current) return null;
    const form = formRef.current;
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
      setErrorMsg('Please fill in all required fields marked with (*).');
      return null;
    }

    return { name, phone, email, city, matter, mode, message };
  }

  function handleSendWhatsApp(e: React.MouseEvent) {
    e.preventDefault();
    const vals = getFormData();
    if (!vals) return;

    setStatus('idle');
    setErrorMsg('');

    const text = `⚖️ *LEGAL CONSULTATION BOOKING*
*Adv. KD & Associates*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${vals.name}
📞 *Phone:* ${vals.phone}
✉️ *Email:* ${vals.email || 'Not provided'}
📍 *City:* ${vals.city || 'Not provided'}
🏛️ *Matter:* ${vals.matter}
🗓️ *Preferred Mode:* ${vals.mode || 'In-Person (Chandigarh)'}

📝 *Case Description / Query:*
${vals.message}

---
Sent via ${siteConfig.name} Website`;

    const waUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    const subject = `Legal Consultation Booking — ${vals.matter} (${vals.name})`;
    const body = `Full Name: ${vals.name}
Phone: ${vals.phone}
Email: ${vals.email || 'Not provided'}
City / Location: ${vals.city || 'Not provided'}
Type of Legal Matter: ${vals.matter}
Preferred Consultation Mode: ${vals.mode || 'In-Person (Chandigarh)'}

Matter Description / Query:
${vals.message}

---
Sent via ${siteConfig.name} Website`;

    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setLinks({ waUrl, mailtoUrl, gmailUrl });
    setStatus('success');

    // Open WhatsApp in new tab/window
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  function handleSendEmail(e: React.MouseEvent) {
    e.preventDefault();
    const vals = getFormData();
    if (!vals) return;

    setStatus('idle');
    setErrorMsg('');

    const subject = `Legal Consultation Booking — ${vals.matter} (${vals.name})`;
    const body = `Full Name: ${vals.name}
Phone: ${vals.phone}
Email: ${vals.email || 'Not provided'}
City / Location: ${vals.city || 'Not provided'}
Type of Legal Matter: ${vals.matter}
Preferred Consultation Mode: ${vals.mode || 'In-Person (Chandigarh)'}

Matter Description / Query:
${vals.message}

---
Sent via ${siteConfig.name} Website`;

    const waText = `⚖️ *LEGAL CONSULTATION BOOKING*
*Adv. KD & Associates*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${vals.name}
📞 *Phone:* ${vals.phone}
✉️ *Email:* ${vals.email || 'Not provided'}
📍 *City:* ${vals.city || 'Not provided'}
🏛️ *Matter:* ${vals.matter}
🗓️ *Preferred Mode:* ${vals.mode || 'In-Person (Chandigarh)'}

📝 *Case Description / Query:*
${vals.message}`;

    const waUrl = `${siteConfig.whatsapp}?text=${encodeURIComponent(waText)}`;
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setLinks({ waUrl, mailtoUrl, gmailUrl });
    setStatus('success');

    // First attempt to open Gmail web, and also trigger mailto
    const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = mailtoUrl;
    }
  }

  return (
    <form ref={formRef} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name *</label>
          <input name="name" type="text" placeholder="Your full name" className="form-input" required />
        </div>
        <div>
          <label className="form-label">Phone / WhatsApp Number *</label>
          <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="form-input" required />
        </div>
      </div>
      <div>
        <label className="form-label">Email Address</label>
        <input name="email" type="email" placeholder="your@email.com" className="form-input" />
      </div>
      <div>
        <label className="form-label">City / Country</label>
        <input name="city" type="text" placeholder="e.g. Chandigarh / Delhi / Canada" className="form-input" />
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
        <p className="text-[0.82rem] text-red-600 bg-red-50 border border-red-200 rounded-sm px-3.5 py-2.5">{errorMsg}</p>
      )}

      {status === 'success' && links && (
        <div className="text-[0.85rem] text-green-900 bg-green-50 border border-green-300 rounded-sm p-4 space-y-3">
          <p className="font-semibold text-green-950 flex items-center gap-1.5">
            ✓ Your Consultation Details Are Ready!
          </p>
          <p className="text-[0.8rem] text-green-800 leading-relaxed">
            Click below to send your enquiry directly via WhatsApp or Email:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={links.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] text-white text-[0.8rem] font-medium rounded hover:bg-[#1EBE5D] transition-colors"
            >
              Open in WhatsApp →
            </a>
            <a
              href={links.gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-300 text-gray-800 text-[0.8rem] font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Open in Gmail Web →
            </a>
            <a
              href={links.mailtoUrl}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-navy text-gold text-[0.8rem] font-medium rounded hover:bg-navy-mid transition-colors"
            >
              Open in Default Mail App →
            </a>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={handleSendWhatsApp}
          className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-sm font-medium text-[0.88rem] flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff" className="flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.112 1.524 5.84L0 24l6.336-1.502A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 0 1-5.003-1.369l-.36-.214-3.72.882.939-3.618-.234-.372A9.782 9.782 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
          <span>Book via WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleSendEmail}
          className="w-full py-3.5 px-4 bg-gold hover:bg-[#D4A83A] text-navy rounded-sm font-medium text-[0.88rem] flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Send via Email</span>
        </button>
      </div>

      <p className="text-[0.74rem] text-gray-400 text-center leading-relaxed">
        Your information is kept strictly confidential. Clicking WhatsApp or Email will pre-fill your enquiry so you can send it instantly.
      </p>
    </form>
  );
}
