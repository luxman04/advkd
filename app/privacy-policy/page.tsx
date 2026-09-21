import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Adv. KaranDeep collects, uses, and protects personal information submitted through this website.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="font-serif text-navy text-[1.15rem] border-l-[3px] border-gold pl-3 mb-3">{title}</h2>
      <div className="space-y-3 text-muted font-light text-[0.93rem] leading-[1.85]">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <Link href="/" className="text-gold hover:underline">Home</Link> &rsaquo; Privacy Policy
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Privacy Policy</h1>
          <p className="text-[#8A9AAA] font-light max-w-[580px]">
            How we collect, use, protect, and respect your personal information when you interact with this website.
          </p>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-[8%] md:px-0 py-16">
        <div className="bg-gold-pale border border-gold/25 rounded-md p-6 mb-10 flex flex-wrap gap-8 text-[0.78rem] text-muted">
          <span><strong className="text-navy">Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
          <span><strong className="text-navy">Applicable To:</strong> {siteConfig.url.replace('https://', '')} and all sub-pages</span>
          <span><strong className="text-navy">Framework:</strong> IT Act, 2000 &amp; IT (Amendment) Act, 2008</span>
        </div>

        <div className="bg-navy rounded-md p-7 mb-10">
          <p className="text-[#8A9AAA] text-[0.93rem]">
            <strong className="text-gold-light">Our Commitment:</strong> Adv. KaranDeep is committed to
            protecting the privacy and confidentiality of everyone who interacts with this website. This policy
            explains what personal data we collect, why we collect it, and how we handle it — in plain language.
          </p>
        </div>

        <Section title="1. Who We Are">
          <p>
            This website is operated by <strong>{siteConfig.fullName}</strong>, an advocate enrolled with the Bar
            Council of Punjab &amp; Haryana, with chambers at the Punjab &amp; Haryana High Court, Chandigarh, and
            office at {siteConfig.address.office}.
          </p>
          <p>
            &ldquo;We&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to {siteConfig.fullName} and this law
            practice. &ldquo;You&rdquo; refers to any person who visits or interacts with this website. This policy
            is published in compliance with the Information Technology Act, 2000 and the Information Technology
            (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
        </Section>

        <Section title="2. What Information We Collect">
          <p>
            When you fill in the contact form, call, WhatsApp, or email us, you may provide your name, phone number,
            email address, city or country of residence, the type of legal matter, your preferred consultation
            mode, and a brief description of your situation.
          </p>
          <p>
            Standard technical information (IP address, browser type, pages visited, device type, and referring
            page) may be collected automatically by our hosting provider&apos;s server logs. This website does not
            currently run any third-party analytics, advertising cookies, or tracking pixels. If that changes in
            future, this policy will be updated to describe exactly which tool is added and why.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information you provide solely to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Respond to your enquiry and schedule a consultation</li>
            <li>Manage and progress your legal matter, once an advocate-client relationship is established</li>
            <li>Send you relevant updates about your enquiry, appointment, or case</li>
            <li>Comply with applicable law, court order, or Bar Council regulations</li>
          </ul>
          <p>
            We do not use your information for marketing or advertising, and we do not sell, rent, or trade it to
            any third party.
          </p>
        </Section>

        <Section title="4. How Your Enquiry Reaches Us">
          <p>
            When you submit the contact form on this website, it is sent directly to our email inbox via a
            transactional email service (we currently use Resend). The submission is not stored in a public or
            third-party database, and it is not visible to anyone browsing the website.
          </p>
        </Section>

        <Section title="5. Confidentiality of Legal Matters">
          <p>
            Information shared with an advocate in the context of seeking legal advice is protected by professional
            privilege under Indian law once a formal advocate-client relationship is established, in accordance
            with the Advocates Act, 1961 and the Bar Council of India Rules.
          </p>
          <p>
            Communications sent through this website&apos;s contact form <em>before</em> a formal advocate-client
            relationship is established are not automatically covered by legal professional privilege. Please
            exercise discretion in what you share through this form, and avoid sending sensitive documents here.
          </p>
        </Section>

        <Section title="6. Who We Share Your Information With">
          <p>We do not share your personal information with third parties except:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>With your explicit consent</li>
            <li>Where required by applicable law, judicial order, or regulatory requirement</li>
            <li>With technical service providers (our email delivery and hosting providers) strictly to operate this website, under their own confidentiality and security obligations</li>
          </ul>
          <p>We never sell your data, and we never share it with marketers or data brokers.</p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            Contact form enquiries that do not result in a formal engagement are retained only as long as needed to
            respond to you, and are deleted from our inbox once resolved. Client files, once a formal engagement is
            established, are retained per applicable professional standards.
          </p>
        </Section>

        <Section title="8. Cookies and Browser Storage">
          <p>
            This website uses one piece of browser storage: a session-scoped flag that remembers you have
            acknowledged the legal disclaimer during your current visit. It is cleared automatically when you close
            your browser and is never shared or used to track you.
          </p>
          <p>This website does not use advertising cookies, social media tracking pixels, or third-party analytics.</p>
        </Section>

        <Section title="9. Your Rights">
          <p>
            You may request access to, correction of, or deletion of personal information we hold about you, and
            you may withdraw consent or object to processing at any time by contacting us at{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">{siteConfig.email}</a> or
            calling <a href={`tel:${siteConfig.phone}`} className="text-gold hover:underline">{siteConfig.phoneDisplay}</a>.
            We will respond within 30 days.
          </p>
        </Section>

        <Section title="10. Data Security">
          <p>
            This website is served over HTTPS. Access to enquiry emails is limited to those who need it to respond
            to you, and we do not ask you to submit sensitive financial or identification documents through this
            website. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </Section>

        <Section title="11. Children's Privacy">
          <p>
            This website is not directed at children under the age of 18. We do not knowingly collect personal
            information from minors.
          </p>
        </Section>

        <Section title="12. Third-Party Websites &amp; WhatsApp">
          <p>
            This website may link to external sites such as government court portals or WhatsApp. This policy
            applies only to this website; we are not responsible for third-party privacy practices. WhatsApp
            communications are governed by WhatsApp&apos;s own privacy policy (Meta Platforms, Inc.), and messages
            sent over WhatsApp are not covered by advocate-client privilege until a formal engagement is
            established.
          </p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>
            We may update this policy to reflect changes in our practices, technology, or legal requirements. The
            &ldquo;Last Updated&rdquo; date above will reflect any revisions.
          </p>
        </Section>

        <Section title="14. Governing Law">
          <p>
            This policy is governed by the laws of India. Disputes arising out of this policy are subject to the
            exclusive jurisdiction of the courts at Chandigarh, India.
          </p>
        </Section>

        <Section title="15. Contact Us">
          <p>For any questions about this Privacy Policy, please contact:</p>
          <ul className="list-none space-y-1">
            <li><strong className="text-navy">{siteConfig.name}</strong></li>
            <li>{siteConfig.address.office}</li>
            <li>{siteConfig.address.court}</li>
            <li>Phone / WhatsApp: <a href={`tel:${siteConfig.phone}`} className="text-gold hover:underline">{siteConfig.phoneDisplay}</a></li>
            <li>Email: <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">{siteConfig.email}</a></li>
          </ul>
        </Section>

        <div className="mt-10 pt-8 border-t border-black/[0.08] flex gap-6 flex-wrap">
          <Link href="/disclaimer" className="btn-outline-dark">Legal Disclaimer →</Link>
          <Link href="/contact" className="btn-primary">Contact Us →</Link>
        </div>
      </div>
    </>
  );
}