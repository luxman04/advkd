import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal | Adv. Karandeep (KD)',
  description: 'Hidden administration and publishing portal.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
