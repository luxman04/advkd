import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Legal Disclaimer',
  description: 'Legal disclaimer for the website of Adv. KaranDeep, advocate at the Punjab & Haryana High Court.',
  alternates: { canonical: '/disclaimer' },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-9">
      <h2 className="font-serif text-navy text-[1.15rem] border-l-[3px] border-gold pl-3 mb-3">{title}</h2>
      <div className="space-y-3 text-muted font-light text-[0.93rem] leading-[1.85]">{children}</div>
    </section>
  );
}

export default function DisclaimerPage() {
  return (
    <>
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <Link href="/" className="text-gold hover:underline">Home</Link> &rsaquo; Disclaimer
          </div>
          <h1 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Legal Disclaimer</h1>
          <p className="text-[#8A9AAA] font-light max-w-[580px]">
            Please read this disclaimer carefully before using this website or relying on any information contained
            herein.
          </p>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-[8%] md:px-0 py-16">
        <div className="bg-gold-pale border border-gold/25 rounded-md p-6 mb-10 flex flex-wrap gap-8 text-[0.78rem] text-muted">
          <span><strong className="text-navy">Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
          <span><strong className="text-navy">Applicable To:</strong> {siteConfig.url.replace('https://', '')} and all sub-pages</span>
          <span><strong className="text-navy">Jurisdiction:</strong> India</span>
        </div>

        <div className="bg-navy rounded-md p-7 mb-10">
          <p className="text-[#8A9AAA] text-[0.93rem]">
            <strong className="text-gold-light">Important Notice:</strong> The Bar Council of India strictly
            prohibits advocates from advertising or soliciting work through any mode of communication, whether
            public or private. This website has been created solely to provide general legal information to the
            public and does not constitute an advertisement, solicitation, or invitation to engage legal services.
          </p>
        </div>

        <Section title="1. No Legal Advice">
          <p>
            The information on this website — including articles, blog posts, practice area descriptions, and
            general legal information — is for general informational and educational purposes only. Nothing here
            constitutes legal advice or a substitute for independent professional advice from a qualified advocate.
          </p>
          <p>
            Every legal matter is unique and fact-specific. Laws change frequently and may vary by jurisdiction.
            Please seek formal legal advice before acting, or refraining from acting, on anything you read here.
          </p>
        </Section>

        <Section title="2. No Advocate-Client Relationship">
          <p>
            Accessing or reading this website does not create an advocate-client relationship between you and{' '}
            {siteConfig.fullName} or this law practice. Such a relationship is formed only through a formal written
            engagement agreement, after a proper conflict-of-interest check and formal intake.
          </p>
          <p>
            Submitting an enquiry through this website&apos;s contact form, email, or phone call does not, by
            itself, create an advocate-client relationship. Please do not send confidential or time-sensitive
            information through any contact form until a formal engagement has been established.
          </p>
        </Section>

        <Section title="3. Bar Council of India Compliance">
          <p>In accordance with Bar Council of India rules, {siteConfig.fullName} does not:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Solicit work or advertise, directly or indirectly</li>
            <li>Make claims about the quality of legal services provided</li>
            <li>Guarantee results or outcomes in any legal matter</li>
            <li>Present this website as a medium for advertising legal services</li>
          </ul>
          <p>
            By using this website, you confirm that you are seeking information of your own free will, and that no
            solicitation or advertisement has been made to you.
          </p>
        </Section>

        <Section title="4. No Warranty on Accuracy">
          <p>
            While we make every effort to keep information on this website accurate and up to date, we make no
            representation or warranty as to its accuracy, reliability, or completeness. Laws and legal
            interpretations change over time, and articles may not reflect subsequent changes in legislation or
            judicial decisions.
          </p>
        </Section>

        <Section title="5. No Guarantee of Results">
          <p>
            Any references to past cases or outcomes on this website are provided solely for illustrative purposes.
            Past results do not guarantee similar outcomes in future matters — every case is decided on its own
            facts and merits.
          </p>
        </Section>

        <Section title="6. Third-Party Links">
          <p>
            This website may link to external websites or government portals for convenience. We do not endorse or
            take responsibility for the content or availability of any third-party website. Accessing such links is
            at your own risk.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, {siteConfig.fullName}, his staff, and associates shall not be
            liable for any direct, indirect, incidental, or consequential loss arising out of your use of, or
            reliance on, information on this website.
          </p>
        </Section>

        <Section title="8. Confidentiality of Communications">
          <p>
            Communications sent through this website&apos;s contact form or listed email address are not guaranteed
            to be confidential or privileged until a formal advocate-client relationship has been established.
            Please exercise discretion in sharing sensitive information through unsecured channels.
          </p>
        </Section>

        <Section title="9. Jurisdiction and Governing Law">
          <p>
            This website is operated from Chandigarh, India. Disputes arising from the use of this website are
            subject to the exclusive jurisdiction of the courts at Chandigarh and governed by the laws of India.
          </p>
        </Section>

        <Section title="10. Amendments">
          <p>
            This disclaimer may be amended at any time without prior notice. Continued use of this website after
            any amendment constitutes acceptance of the revised terms.
          </p>
        </Section>

        <Section title="11. Contact for Clarifications">
          <p>If you have questions about this disclaimer, please contact:</p>
          <ul className="list-none space-y-1">
            <li><strong className="text-navy">{siteConfig.name}</strong></li>
            <li>{siteConfig.address.office}</li>
            <li>Phone: <a href={`tel:${siteConfig.phone}`} className="text-gold hover:underline">{siteConfig.phoneDisplay}</a></li>
            <li>Email: <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">{siteConfig.email}</a></li>
          </ul>
        </Section>

        <div className="mt-10 pt-8 border-t border-black/[0.08] flex gap-6 flex-wrap">
          <Link href="/privacy-policy" className="btn-outline-dark">Privacy Policy →</Link>
          <Link href="/contact" className="btn-primary">Contact Us →</Link>
        </div>
      </div>
    </>
  );
}