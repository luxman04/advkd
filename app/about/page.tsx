import type { Metadata } from 'next';
import Image from 'next/image';
import FadeUp from '@/components/FadeUp';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'About Adv. KaranDeep | Advocate in Chandigarh & Delhi',
  description:
    'Adv. KaranDeep is an experienced advocate enrolled with the Bar Council of Punjab & Haryana, practising before the Punjab & Haryana High Court (Chandigarh), Delhi High Court, and District Courts for over 7 years.',
  keywords: [
    'About Adv KaranDeep',
    'Advocate in Chandigarh',
    'Advocate in Delhi',
    'Punjab and Haryana High Court Advocate',
    'Delhi High Court Advocate',
    'Bar Council of Punjab and Haryana',
    'Trial Court Lawyer Chandigarh Delhi',
  ],
  alternates: { canonical: '/about' },
};

const timeline = [
  { dot: 'LLB', title: 'LL.B. — Delhi University', desc: 'Graduated with distinction. Active in moot court and legal aid clinics.' },
  { dot: 'DHC', title: 'Began Practice — Delhi High Court', desc: 'Started his litigation career practising at the Delhi High Court.' },
  { dot: 'P&H', title: 'Simultaneous Practice — P&H High Court, Chandigarh', desc: 'Established a parallel practice at the Punjab & Haryana High Court alongside Delhi, developing a specialisation in criminal and NRI matters.' },
  { dot: 'Now', title: 'Active Practice — Delhi & P&H High Courts', desc: 'Maintaining a full practice across criminal, civil, matrimonial, and NRI matters at both courts. Available for video consultations.' },
];

const values = [
  { title: 'Integrity', desc: 'Every case is approached with complete honesty — to the court, to the client, and about outcomes.' },
  { title: 'Diligence', desc: 'Thorough preparation for every matter. No case is too small to deserve full attention.' },
  { title: 'Accessibility', desc: 'Clients can reach Adv. KD directly. No gatekeeping through juniors for important matters.' },
  { title: 'Clarity', desc: 'Legal strategy explained in plain language. Clients always know where they stand and why.' },
];

const credentials = [
  { title: 'LL.B. — Delhi University', desc: 'Bachelor of Laws with distinction. Specialised coursework in criminal procedure, constitutional law, and evidence.' },
  { title: 'Bar Council of Punjab & Haryana', desc: 'Enrolled advocate in good standing. Subject to professional code of conduct under the Advocates Act, 1961.' },
  { title: 'District Courts — Chandigarh & Delhi', desc: 'Regular practice before the District & Sessions Courts in Chandigarh and Delhi NCR, handling trial-stage criminal and civil matters.' },
  { title: 'P&H High Court Bar Association', desc: 'Active member of the PHHCBA. Participates in bar activities and continuing legal education programmes.' },
  { title: 'NRI Legal Services', desc: 'Recognised by the NRI community in Canada, UK, and Australia for reliable, remote legal services in India.' },
  { title: 'Legal Aid Services', desc: 'Contributes to legal aid work for underprivileged clients through empanelled legal aid schemes.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <a href="/" className="text-gold hover:underline">Home</a> &rsaquo; About
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>About the Advocate</h1>
          <p className="text-[#8A9AAA] font-light max-w-[580px]">
            Over 7 years of dedicated practice at the Punjab &amp; Haryana High Court (Chandigarh), Delhi High Court, and District Courts across
            Chandigarh Tricity and Delhi NCR.
          </p>
        </div>
      </div>

      <div className="bg-white grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 px-[8%] py-20 items-start">
        <FadeUp>
          <div className="relative">
            <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border border-gold/40 rounded-sm" />
            <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image src="/images/kd-photo.jpeg" alt="Adv. KaranDeep" fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover object-top" />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center gap-2.5 p-3 bg-gold-pale border border-gold/25 rounded-sm">
              <span className="text-[0.8rem] text-navy font-medium">Bar Council of Punjab &amp; Haryana</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-gold-pale border border-gold/25 rounded-sm">
              <span className="text-[0.8rem] text-navy font-medium">7+ Years of Practice</span>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <span className="section-label">The Advocate</span>
          <h2 className="font-serif text-navy mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{siteConfig.name}</h2>
          <div className="space-y-4 text-muted font-light text-[0.97rem] leading-relaxed">
            <p>
              Adv. KaranDeep comes from a small town in Haryana and has built his legal career from the ground up. 
              He pursued his LL.B. from Delhi University and began practising at the Delhi High Court, before going 
              on to establish a simultaneous practice at the Punjab &amp; Haryana High Court, Chandigarh. Over the course 
              of his career, he has practised extensively across various courts and forums in the Delhi NCR and Chandigarh 
              Tricity, including the Hon’ble High Courts, tribunals, and District Courts. He has now been in active legal 
              practice for over 7 years, with experience spanning diverse legal forums and jurisdictions.

            </p>
            <p>
              His practice is built on three pillars: thorough legal research, strategic courtroom advocacy, and
              unwavering client commitment. He is known among peers and clients alike for the personal attention he
              gives to every matter — refusing to delegate core advocacy work to juniors.
            </p>
            <p>
              Adv. KD specialises in criminal litigation, NRI property disputes, matrimonial matters, and High Court
              writ petitions, including anticipatory bail petitions in high-profile cases, FIR quashing petitions,
              and property partition disputes.
            </p>
            <p>
              He also maintains a strong NRI practice, advising and representing the Punjabi diaspora in Canada, UK,
              Australia, and the United States in their property, criminal, and environmental matters in India — all
              managed remotely.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-navy text-[1.1rem] mb-6">Career Timeline</h3>
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div key={t.title} className="flex gap-5 relative">
                  {i !== timeline.length - 1 && (
                    <div className="absolute left-5 top-9 bottom-[-1.5rem] w-px bg-gold/25" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-gold-pale border-2 border-gold flex items-center justify-center flex-shrink-0 font-serif text-[0.65rem] text-gold font-bold">
                    {t.dot}
                  </div>
                  <div className="pt-2">
                    <div className="text-[0.9rem] font-medium text-navy">{t.title}</div>
                    <div className="text-[0.82rem] text-muted font-light mt-0.5">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="bg-navy grid grid-cols-1 md:grid-cols-2 gap-14 items-center px-[8%] py-16">
        <FadeUp>
          <blockquote className="font-serif text-[1.5rem] text-gold-light italic leading-relaxed pl-8 border-l-[3px] border-gold">
            &ldquo;My duty to the court and to my client are not in conflict — both demand the same thing: the
            truth, presented fearlessly.&rdquo;
          </blockquote>
          <div className="text-[#5A6A7A] text-[0.82rem] mt-4 pl-8">— {siteConfig.name}</div>
        </FadeUp>
        <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white/[0.04] border border-gold/20 p-6 rounded-sm">
              <h4 className="font-serif text-gold-light text-[0.9rem] mb-1.5">{v.title}</h4>
              <p className="text-[0.78rem] text-[#5A6A7A] font-light leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </FadeUp>
      </div>

      <div className="bg-cream px-[8%] py-20">
        <FadeUp className="text-center">
          <span className="section-label">Qualifications</span>
          <h2 className="section-title mx-auto">Credentials &amp; Memberships</h2>
        </FadeUp>
        <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {credentials.map((c) => (
            <div key={c.title} className="bg-white border border-black/[0.07] p-8 rounded-md">
              <h4 className="font-serif text-navy text-[0.95rem] mb-1.5">{c.title}</h4>
              <p className="text-[0.82rem] text-muted font-light">{c.desc}</p>
            </div>
          ))}
        </FadeUp>
      </div>
    </>
  );
}