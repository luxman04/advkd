import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Adv. KD | Legal Chambers in Chandigarh & Delhi',
  description:
    'Book a legal consultation with Adv. KaranDeep. Offices in Chandigarh Sector 21-B and South Extension, New Delhi. Reach us via phone, WhatsApp, or email.',
  keywords: [
    'Contact Advocate Chandigarh',
    'Contact Lawyer Delhi',
    'Law Office Chandigarh Sector 21',
    'Advocate Office Delhi',
    'Legal Consultation Chandigarh Delhi',
    'Advocate Phone Number Chandigarh Delhi',
  ],
  alternates: { canonical: '/contact' },
};

const channels = [
  {
    title: 'Call Us',
    desc: 'Speak directly with Adv. KD or the office manager for urgent matters.',
    href: `tel:${siteConfig.phone}`,
    label: siteConfig.phoneDisplay,
  },
  {
    title: 'WhatsApp',
    desc: 'Send a message at any time. We typically respond within a few hours.',
    href: `${siteConfig.whatsapp}?text=Hello%20Adv.%20KD%2C%20I%20need%20legal%20assistance.`,
    label: 'Message on WhatsApp',
  },
  {
    title: 'Email',
    desc: 'Describe your matter in detail and we will revert within 24 hours.',
    href: `mailto:${siteConfig.email}`,
    label: siteConfig.email,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-navy hero-diagonal px-[8%] pt-16 pb-16 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-[0.75rem] text-[#5A6A7A] mb-4">
            <a href="/" className="text-gold hover:underline">
              Home
            </a>{' '}
            &rsaquo; Contact
          </div>

          <h1
            className="font-serif text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Get in Touch
          </h1>

          <p className="text-[#8A9AAA] font-light max-w-[580px]">
            Reach us by phone, WhatsApp, email, or visit one of our offices
            and chambers — we&apos;ll guide you to the right path.
          </p>
        </div>
      </div>

      {/* Contact Channels */}
      <div className="bg-navy grid grid-cols-1 md:grid-cols-3 gap-8 px-[8%] py-14">
        {channels.map((c) => (
          <div
            key={c.title}
            className="text-center p-8 border border-gold/20 rounded-md bg-white/[0.03]"
          >
            <h4 className="font-serif text-gold-light text-base mb-1.5">
              {c.title}
            </h4>

            <p className="text-[0.82rem] text-[#5A6A7A] font-light mb-5">
              {c.desc}
            </p>

            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-gold text-navy rounded-sm text-[0.8rem] font-medium hover:bg-[#D4A83A] transition-colors"
            >
              {c.label}
            </a>
          </div>
        ))}
      </div>

      {/* Contact Information + Form */}
      <div className="bg-white grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-16 px-[8%] py-20 items-start">
        {/* Left Column */}
        <div>
          <span className="section-label">Contact Information</span>

          <h2
            className="font-serif text-navy mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
          >
            Offices &amp; Chambers
          </h2>

          <p className="text-muted font-light text-[0.95rem] mb-8">
            With practice across Delhi NCR and the Chandigarh Tricity,
            consultations are available in person or remotely by prior
            appointment.
          </p>

          <div className="space-y-3">
            {/* Chandigarh Office */}
            <div className="bg-cream border border-black/[0.07] rounded-md p-6">
              <h4 className="font-serif text-navy text-[0.9rem] mb-1">
                Chandigarh Office
              </h4>

              <p className="text-[0.85rem] text-muted font-light">
                Office-1023, Sector 21-B, Chandigarh – 160022
              </p>
            </div>

            {/* Delhi Address */}
            <div className="bg-cream border border-black/[0.07] rounded-md p-6">
              <h4 className="font-serif text-navy text-[0.9rem] mb-1">
                Delhi Address
              </h4>

              <p className="text-[0.85rem] text-muted font-light">
                352, Munirka Village, South Extension, New Delhi
              </p>
            </div>

            {/* Tohana Address */}
            <div className="bg-cream border border-black/[0.07] rounded-md p-6">
              <h4 className="font-serif text-navy text-[0.9rem] mb-1">
                Tohana Address
              </h4>

              <p className="text-[0.85rem] text-muted font-light">
                Opposite Government Boys High School, Tohana, Fatehabad –
                120120
              </p>
            </div>

            {/* Phone & WhatsApp */}
            <div className="bg-cream border border-black/[0.07] rounded-md p-6">
              <h4 className="font-serif text-navy text-[0.9rem] mb-1">
                Phone &amp; WhatsApp
              </h4>

              <a
                href={`tel:${siteConfig.phone}`}
                className="text-[0.85rem] text-muted font-light hover:text-gold"
              >
                {siteConfig.phoneDisplay} (Office Manager)
              </a>
            </div>

            {/* Email */}
            <div className="bg-cream border border-black/[0.07] rounded-md p-6">
              <h4 className="font-serif text-navy text-[0.9rem] mb-1">
                Email
              </h4>

              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[0.85rem] text-muted font-light hover:text-gold"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <h4 className="font-serif text-navy text-base mt-8 mb-3">
            Working Hours
          </h4>

          <table className="w-full">
            <tbody>
              {[
                ['Monday – Friday', '10:00 AM – 5:00 PM'],
                ['Saturday', '10:00 AM – 3:00 PM'],
                ['Sunday', 'By appointment only'],
                ['Court Holidays', 'Office open; Chamber closed'],
              ].map(([day, hours]) => (
                <tr
                  key={day}
                  className="border-b border-black/[0.06] last:border-0"
                >
                  <td className="py-2 text-[0.83rem] text-navy font-medium">
                    {day}
                  </td>

                  <td className="py-2 text-[0.83rem] text-muted text-right">
                    {hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact Form */}
        <div className="bg-cream p-10 rounded-md border border-black/[0.07]">
          <h3 className="font-serif text-navy text-[1.3rem] mb-1">
            Send an Enquiry
          </h3>

          <p className="text-[0.82rem] text-muted mb-7">
            Fill in the form below and we&apos;ll get back to you within 24
            hours.
          </p>

          <ContactForm />
        </div>
      </div>
    </>
  );
}
