'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import DisclaimerOverlay from './DisclaimerOverlay';
import WhatsAppButton from './WhatsAppButton';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    // The Sanity Studio renders its own full-screen UI — no marketing nav/footer here.
    return <>{children}</>;
  }

  return (
    <>
      <DisclaimerOverlay />
      <Navbar />
      <main className="pt-[68px]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
