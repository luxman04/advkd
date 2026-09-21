import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-gold/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 px-[8%] py-14">
        <div>
          <span className="font-serif text-gold text-[1.1rem] block mb-2">{siteConfig.name}</span>
          <p className="text-[#5A6A7A] text-[0.82rem] leading-relaxed max-w-[260px]">
            Advocate enrolled with the Bar Council of Punjab &amp; Haryana, practising at the P&amp;H High Court, Delhi High Court and
            District Courts of Chandigarh &amp; Delhi NCR.
          </p>
        </div>
        <div>
          <h5 className="font-serif text-gold-light text-[0.85rem] mb-4">Quick Links</h5>
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Home</Link>
            <Link href="/about" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">About</Link>
            <Link href="/practice-areas" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Practice Areas</Link>
            <Link href="/blog" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Reflections of Society</Link>
            <Link href="/contact" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Contact</Link>
          </div>
        </div>
        <div>
          <h5 className="font-serif text-gold-light text-[0.85rem] mb-4">Practice Areas</h5>
          <div className="flex flex-col gap-2">
            <Link href="/practice-areas#criminal" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Criminal Law</Link>
            <Link href="/practice-areas#environmental" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Environmental Law</Link>
            <Link href="/practice-areas#nri" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">NRI Services</Link>
            <Link href="/practice-areas#civil" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">Civil &amp; Property</Link>
            <Link href="/practice-areas#writs" className="text-[#5A6A7A] text-[0.8rem] hover:text-gold">High Court Writs</Link>
          </div>
        </div>
        <div>
          <h5 className="font-serif text-gold-light text-[0.85rem] mb-4">Contact</h5>
          <p className="text-[#5A6A7A] text-[0.8rem] mb-1">{siteConfig.phoneDisplay}</p>
          <p className="text-[#5A6A7A] text-[0.8rem] mb-1">{siteConfig.email}</p>
          <p className="text-[#5A6A7A] text-[0.8rem]">{siteConfig.address.office}</p>
        </div>
      </div>
      <div className="border-t border-white/5 px-[8%] py-5 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[#3A4A5A] text-[0.75rem]">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/disclaimer" className="text-[#3A4A5A] text-[0.75rem] hover:text-gold">Disclaimer</Link>
          <Link href="/privacy-policy" className="text-[#3A4A5A] text-[0.75rem] hover:text-gold">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
