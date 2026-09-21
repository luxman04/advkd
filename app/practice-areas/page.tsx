import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import PracticeSubNav from '@/components/PracticeSubNav';
import { practiceAreas } from '@/lib/practice-data';

export const metadata: Metadata = {
  title: 'Practice Areas | Criminal, Civil & NRI Lawyer in Chandigarh & Delhi',
  description:
    'Legal services in criminal defence, bail, High Court writs, NRI property disputes, civil litigation, and NGT environmental matters across Chandigarh, Delhi NCR, Punjab & Haryana.',
  keywords: [
    'Practice Areas Adv KD',
    'Criminal Lawyer Chandigarh',
    'Criminal Lawyer Delhi',
    'High Court Writs Chandigarh Delhi',
    'NRI Property Lawyer Chandigarh Delhi',
    'Civil Lawyer Chandigarh',
    'Anticipatory Bail Advocate Delhi Chandigarh',
    'Environmental Lawyer NGT Delhi',
  ],
  alternates: { canonical: '/practice-areas' },
};

const processSteps = [
  { num: '1', title: 'Book Consultation', desc: 'Call, WhatsApp, or walk in. We listen to your matter and give you an honest preliminary assessment.' },
  { num: '2', title: 'Case Evaluation', desc: 'We review documents, assess legal options, and explain the best strategy — in plain language, not legalese.' },
  { num: '3', title: 'Engagement & Filing', desc: 'Clear fee agreement. Documents prepared, filed, and served. You are updated at every stage.' },
  { num: '4', title: 'Hearing & Resolution', desc: 'Argued personally by Adv. KD. Post-hearing update provided. We pursue your matter diligently to conclusion.' },
];

export default function PracticeAreasPage() {
  return (
    <>
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <a href="/" className="text-gold hover:underline">Home</a> &rsaquo; Practice Areas
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Practice Areas</h1>
          <p className="text-[#8A9AAA] font-light max-w-[580px]">
            Comprehensive legal representation across criminal, civil, environmental, and NRI matters at the Punjab
            &amp; Haryana High Court, Delhi High Court, and District Courts.
          </p>
        </div>
      </div>

      <PracticeSubNav />

      <div className="bg-navy grid grid-cols-2 md:grid-cols-4 gap-8 px-[8%] py-12 text-center">
        {[
          { num: '7+', label: 'Years at the Bar' },
          { num: '6', label: 'Practice Areas' },
          { num: '100%', label: 'Personal Attention' },
          { num: '24h', label: 'Response Time' },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-serif text-4xl text-gold">{s.num}</div>
            <div className="text-[0.78rem] text-[#5A6A7A] uppercase tracking-wide mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {practiceAreas.map((area, idx) => (
        <div
          key={area.id}
          id={area.id}
          className={`px-[8%] py-20 scroll-mt-[110px] ${idx % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
        >
          <FadeUp className={`grid grid-cols-1 md:grid-cols-2 gap-14 items-start ${area.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
            <div>
              <div className="w-[60px] h-[60px] bg-gold-pale border border-gold/25 rounded-md flex items-center justify-center mb-6">
                <span className="font-serif text-gold text-xl">{area.num}</span>
              </div>
              <div className="text-[0.72rem] text-gold uppercase tracking-[2px] mb-2">{area.label}</div>
              <h2 className="font-serif text-navy mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>{area.title}</h2>
              {area.intro.map((p, i) => (
                <p key={i} className="text-muted font-light text-[0.95rem] mb-4 leading-relaxed">{p}</p>
              ))}
              <div className="my-6">
                <h4 className="font-serif text-navy text-[0.9rem] mb-3">Services Include</h4>
                <div className="space-y-2">
                  {area.services.map((s) => (
                    <div key={s} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
                      <span className="text-[0.85rem] text-muted font-light">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-2 bg-gold text-navy px-6 py-3 rounded-sm text-[0.85rem] font-medium hover:bg-[#D4A83A] transition-colors">
                {area.ctaLabel}
              </Link>
            </div>
            <div className="bg-navy p-8 rounded-md">
              <h4 className="font-serif text-gold-light mb-4 text-[1rem]">{area.infoTitle}</h4>
              {area.infoPoints.map((pt) => (
                <p key={pt.heading} className="text-[#7A8A9A] text-[0.83rem] font-light leading-relaxed mb-3">
                  <strong className="text-gold-light block mb-0.5">{pt.heading}</strong>
                  {pt.body}
                </p>
              ))}
              {area.faqs.length > 0 && (
                <div className="border-t border-gold/15 pt-4 mt-4 space-y-3">
                  {area.faqs.map((f) => (
                    <div key={f.q}>
                      <div className="text-[0.82rem] text-gold-light font-medium mb-1">⚡ {f.q}</div>
                      <div className="text-[0.8rem] text-[#5A6A7A] font-light leading-relaxed">{f.a}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      ))}

      <div className="bg-cream px-[8%] py-20">
        <FadeUp className="text-center">
          <span className="section-label">How It Works</span>
          <h2 className="section-title mx-auto mb-2">Our Process</h2>
          <p className="text-muted font-light text-[0.95rem]">
            Simple, transparent, and client-centred — from first contact to resolution.
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {processSteps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-[60px] h-[60px] rounded-full bg-white border-2 border-gold flex items-center justify-center mx-auto mb-4 font-serif text-xl text-gold font-bold">
                {s.num}
              </div>
              <h4 className="font-serif text-navy text-[0.95rem] mb-2">{s.title}</h4>
              <p className="text-[0.8rem] text-muted font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </FadeUp>
      </div>
    </>
  );
}
