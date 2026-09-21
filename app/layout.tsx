import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import SiteShell from '@/components/SiteShell';
import { siteConfig } from '@/lib/site-config';

const serif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

// Playfair Display has no Devanagari glyphs, so Hindi text needs its own font —
// otherwise the browser silently falls back to a generic system font mid-heading.
const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.name,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: '/images/kd-photo.jpeg', width: 1200, height: 1600, alt: 'Adv. KaranDeep - Advocate in Chandigarh and Delhi' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/kd-photo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: '/' },
  other: {
    'geo.region': 'IN-CH, IN-DL',
    'geo.placename': 'Chandigarh, New Delhi',
    'geo.position': '30.7333;76.7794',
    ICBM: '30.7333, 76.7794',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    '@id': `${siteConfig.url}/#attorney`,
    name: siteConfig.name,
    alternateName: siteConfig.fullName,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/kd-photo.jpeg`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '₹₹',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Office-1023, Sector 21-B',
        addressLocality: 'Chandigarh',
        postalCode: '160022',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '352, Munirka Village, South Extension',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110049',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Bar room no. 19, Punjab & Haryana High Court',
        addressLocality: 'Chandigarh',
        postalCode: '160001',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Opposite Government Boys High School',
        addressLocality: 'Tohana, Fatehabad',
        postalCode: '120120',
        addressCountry: 'IN',
      },
    ],
    geo: [
      {
        '@type': 'GeoCoordinates',
        latitude: 30.7259,
        longitude: 76.7716,
      },
      {
        '@type': 'GeoCoordinates',
        latitude: 28.5562,
        longitude: 77.1734,
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Chandigarh' },
      { '@type': 'City', name: 'New Delhi' },
      { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Panchkula' },
      { '@type': 'State', name: 'Punjab' },
      { '@type': 'State', name: 'Haryana' },
    ],
    knowsAbout: [
      'Criminal Law & Defence',
      'Anticipatory Bail & Regular Bail',
      'High Court Writ Petitions',
      'FIR Quashing under Section 482 CrPC',
      'NRI Property Disputes & Remote Representation',
      'Civil & Property Law Litigation',
      'Matrimonial & Divorce Law',
      'National Green Tribunal (NGT) Environmental Law',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Bar Council of Punjab & Haryana',
    },
  };

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${devanagari.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}