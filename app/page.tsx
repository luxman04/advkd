import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site-config';
import { getAllPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Adv. KD & Associates | Advocate in Chandigarh & Delhi | High Court Lawyer',
  description:
    'Advocate KaranDeep — legal representation across Chandigarh Tricity and Delhi NCR. Practice at Punjab & Haryana High Court, Delhi High Court, and District Courts in criminal defence, bail, NRI property disputes, and civil litigation.',
  keywords: siteConfig.keywords,
  alternates: { canonical: '/' },
};

const practiceAreas = [
  { num: '01', href: '/practice-areas#criminal', title: 'Criminal Litigation', desc: 'Bail, anticipatory bail, FIR quashing, and trial defence before Sessions Court and High Court.' },
  { num: '02', href: '/practice-areas#writs', title: 'High Court Writs', desc: 'Habeas corpus, mandamus, certiorari, and fundamental rights enforcement.' },
  { num: '03', href: '/practice-areas#nri', title: 'NRI Legal Services', desc: 'Property disputes, power of attorney, FIR matters, managed remotely for NRIs.' },
  { num: '04', href: '/practice-areas#civil', title: 'Civil & Property', desc: 'Land disputes, possession suits, injunctions, title declaration, revenue court matters.' },
  { num: '05', href: '/practice-areas#consumer', title: 'Consumer & Service Matters', desc: 'Consumer forum, service disputes, government service and pension matters.' },
  { num: '06', href: '/practice-areas#environmental', title: 'Environmental Law', desc: 'NGT litigation, pollution control compliance, and environmental clearance matters.' },
];

const testimonials = [
  { text: 'Handled my bail case with absolute expertise. Got anticipatory bail within 3 days. Very professional and always updated me on every step.', author: 'Harjinder Singh', meta: 'Criminal Matter, Jalandhar' },
  { text: 'As an NRI in Canada, I was worried about my property dispute back home. Adv. KD managed everything remotely and kept me fully informed.', author: 'Gurpreet K.', meta: 'NRI Property Dispute, Canada' },
  { text: 'Filed a consumer complaint against a builder for delayed possession. Adv. KD explained the process clearly and got us a fair settlement without a long court battle.', author: 'Rajesh Mehta', meta: 'Consumer Dispute, Mohali' },
];

export default async function HomePage() {
  const recentPosts = (await getAllPosts()).slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="min-h-screen bg-navy hero-diagonal relative overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-[5%] md:px-[8%] py-16 md:py-20 order-2 md:order-1">
          <span className="inline-block w-fit bg-gold/15 border border-gold/40 text-gold text-[0.72rem] tracking-[2px] uppercase px-4 py-1.5 mb-8">
            P&amp;H High Court, Chandigarh &bull; Delhi High Court
          </span>
          <h1 className="font-serif text-white leading-[1.15] mb-2" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}>
            Committed to
            <br />
            <em className="text-gold not-italic italic">Justice.</em>
            <br />
            Built on Trust.
          </h1>
          <p className="text-[#9BA6B2] text-base mt-6 mb-10 max-w-[420px] font-light">
            Legal representation in criminal, civil, environmental law, and NRI matters across Chandigarh,
            Delhi NCR, Punjab &amp; Haryana.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link href="#book" className="btn-primary">Book Consultation</Link>
            <Link href="/practice-areas" className="btn-outline">View Practice Areas</Link>
          </div>
          <div className="flex gap-10 mt-14 pt-8 border-t border-white/[0.08]">
            <div>
              <div className="font-serif text-3xl text-gold leading-none">7+</div>
              <div className="text-[0.72rem] text-[#6A7A8A] uppercase tracking-wide mt-1">Years Experience</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-gold leading-none">500+</div>
              <div className="text-[0.72rem] text-[#6A7A8A] uppercase tracking-wide mt-1">Cases Handled</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center px-[5%] py-10 order-1 md:order-2">
          <div className="relative w-[340px] max-w-[90%]">
            <div className="absolute -top-4 -right-4 w-full h-full border border-gold/50 rounded-sm" />
            <div className="relative rounded-sm overflow-hidden bg-gradient-to-br from-navy-mid to-navy" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/kd-photo.jpeg"
                alt="Adv. KaranDeep, advocate at Punjab & Haryana High Court, Chandigarh and Delhi High Court"
                fill
                sizes="(max-width: 768px) 90vw, 340px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-gold py-2.5 overflow-hidden whitespace-nowrap" aria-hidden="true">
        <div className="inline-flex gap-12 ticker-inner">
          {Array(2).fill(null).map((_, i) => (
            <span key={i} className="text-[0.75rem] font-medium text-navy uppercase tracking-wide flex gap-12">
              <span>Criminal Litigation</span>
              <span>NRI Property Disputes</span>
              <span>Environmental Law</span>
              <span>Civil &amp; Property</span>
              <span>High Court Writs</span>
              <span>Consumer Matters</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT SNIPPET */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-[8%] py-[90px]">
        <FadeUp>
          <span className="section-label">About the Advocate</span>
          <h2 className="section-title max-w-[600px]">Personal Attention. No Hand-Offs.</h2>
          <p className="text-muted mt-5 max-w-[520px] font-light text-[0.97rem] leading-relaxed">
            Adv. KaranDeep has practised at the Punjab &amp; Haryana High Court, Delhi High Court, and District Courts of
            Chandigarh and Delhi NCR for over 7 years, personally handling every matter he takes on — from bail applications to
            complex property disputes.
          </p>
          <Link href="/about" className="btn-outline-dark inline-block mt-6">Read Full Profile →</Link>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="bg-navy p-10 rounded-md relative">
            <p className="font-serif text-[1.2rem] text-gold-light italic leading-relaxed relative z-10">
              &ldquo;My duty to the court and to my client are not in conflict — both demand the same thing: the
              truth, presented fearlessly.&rdquo;
            </p>
            <cite className="block mt-4 text-[0.78rem] text-[#6A7A8A] not-italic uppercase tracking-wide">
              — Adv. KD &amp; Associates
            </cite>
          </div>
        </FadeUp>
      </section>

      {/* PRACTICE AREAS */}
      <section className="bg-cream px-[8%] py-[90px]">
        <FadeUp className="flex justify-between items-end mb-12 gap-8 flex-wrap">
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Practice Areas</h2>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-gold/25 border border-gold/25">
            {practiceAreas.map((p) => (
              <Link key={p.num} href={p.href} className="bg-white p-8 hover:bg-gold-pale transition-colors relative group">
                <div className="font-serif text-[0.72rem] text-gold tracking-wide mb-4">{p.num}</div>
                <div className="font-serif text-[1.05rem] text-navy mb-3">{p.title}</div>
                <div className="text-[0.82rem] text-muted font-light leading-relaxed">{p.desc}</div>
                <div className="absolute bottom-6 right-7 text-gold opacity-0 group-hover:opacity-100 transition-opacity">→</div>
              </Link>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-navy grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-center px-[8%] py-[90px]">
        <FadeUp>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title !text-white max-w-[340px]">What Sets This Practice Apart</h2>
          <p className="text-[#9BA6B2] mt-6 font-light text-[0.95rem]">
            A boutique individual practice means you get direct, personal attention from your advocate — not a
            junior associate.
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { title: 'Direct Advocate Access', desc: 'Every case is handled personally. No hand-offs. Your advocate is reachable at every stage.' },
            { title: 'Prompt Case Updates', desc: 'Proactive updates after every hearing. No chasing, no silence between dates.' },
            { title: 'NRI-Friendly Practice', desc: 'Consultations via video call, documentation handled remotely — no need to fly in for everything.' },
            { title: 'Transparent Fees', desc: 'Clear fee structure discussed upfront. No surprise charges. Written engagement terms provided.' },
          ].map((f) => (
            <div key={f.title} className="bg-white/[0.04] border border-gold/20 p-6 rounded-sm">
              <h4 className="font-serif text-[#E8E0D5] text-[0.95rem] mb-1.5">{f.title}</h4>
              <p className="text-[0.78rem] text-[#6A7A8A] font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </FadeUp>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-[8%] py-[90px]">
        <FadeUp className="text-center">
          <span className="section-label">Client Voices</span>
          <h2 className="section-title mx-auto">What Clients Say</h2>
        </FadeUp>
        <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t) => (
            <div key={t.author} className="border border-black/[0.08] p-8 rounded-sm">
              <div className="text-gold text-[0.9rem] tracking-widest mb-4">★★★★★</div>
              <p className="font-serif italic text-muted text-[0.92rem] leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <strong className="block text-[0.82rem] font-medium text-navy">{t.author}</strong>
              <span className="text-[0.75rem] text-gray-400">{t.meta}</span>
            </div>
          ))}
        </FadeUp>
      </section>

      {/* BLOG PREVIEW */}
      {recentPosts.length > 0 && (
        <section className="bg-cream px-[8%] py-[90px]">
          <FadeUp className="flex justify-between items-end mb-12 gap-8 flex-wrap">
            <div>
              <span className="section-label">Legal Insights</span>
              <h2 className="section-title">
                Reflections of Society <span className="font-devanagari">(सामाजिक चेतना)</span>
              </h2>
            </div>
            <Link href="/blog" className="btn-outline-dark">All Articles →</Link>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-black/[0.07] rounded-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-40 bg-navy relative flex items-center justify-center">
                  <div className="font-serif text-gold/30 text-5xl italic select-none">{post.category.charAt(0)}</div>
                  <div className="absolute top-3 left-3 bg-gold text-navy text-[0.65rem] font-medium tracking-wide uppercase px-2.5 py-1 rounded-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[0.72rem] text-gray-400 mb-1.5">{post.displayDate}</div>
                  <div className="font-serif text-[1.02rem] text-navy leading-snug mb-3 flex-1">{post.title}</div>
                  <div className="text-[0.8rem] text-muted font-light leading-relaxed mb-4 line-clamp-3">{post.excerpt}</div>
                  <span className="text-[0.78rem] text-gold font-medium mt-auto">Read Article →</span>
                </div>
              </Link>
            ))}
          </FadeUp>
        </section>
      )}

      {/* CTA STRIP */}
      <div className="bg-gold px-[8%] py-14 flex justify-between items-center gap-8 flex-wrap">
        <div>
          <h2 className="font-serif text-navy" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Need Legal Help? Talk to Us Today.
          </h2>
          <p className="text-navy/70 text-[0.9rem] mt-1">Call, WhatsApp, or send a message — we respond within 24 hours.</p>
        </div>
        <Link href="#book" className="btn-navy">Book Consultation</Link>
      </div>

      {/* CONTACT SNAPSHOT */}
      <section id="book" className="bg-white grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-start px-[8%] py-[90px] scroll-mt-20">
        <FadeUp>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Book a Consultation</h2>
          <p className="text-muted font-light mt-5 max-w-[380px] text-[0.95rem]">
            Describe your matter and we&apos;ll guide you on the best path forward.
          </p>
          <div className="mt-10 space-y-4 text-[0.88rem] text-muted">
            <p><strong className="block text-navy text-[0.82rem] mb-0.5">Phone / WhatsApp</strong>{siteConfig.phoneDisplay}</p>
            <p><strong className="block text-navy text-[0.82rem] mb-0.5">Email</strong>{siteConfig.email}</p>
            <p><strong className="block text-navy text-[0.82rem] mb-0.5">Office</strong>{siteConfig.address.office}</p>
          </div>
          <div className="mt-8 p-5 bg-gold-pale border-l-4 border-gold rounded-sm">
            <p className="text-[0.82rem] text-muted">
              <strong className="text-navy block mb-1">Chamber Hours</strong>
              Monday – Saturday: 10:00 AM – 3:00 PM (Prior appointment preferred)
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="bg-cream p-10 border border-black/[0.08] rounded-md">
          <h3 className="font-serif text-navy text-[1.2rem] mb-6">Send a Message</h3>
          <ContactForm />
        </FadeUp>
      </section>
    </>
  );
}