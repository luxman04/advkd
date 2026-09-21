'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navLinks, siteConfig } from '@/lib/site-config';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-navy border-b border-gold/40 h-[68px] flex items-center justify-between px-[5%]">
        <Link href="/" className="font-serif text-gold text-[1.05rem]">
          {siteConfig.name}
        </Link>
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[0.8rem] tracking-wide uppercase font-medium transition-colors ${
                  pathname === link.href ? 'text-gold' : 'text-[#C9C2B5] hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="bg-gold text-navy px-5 py-2 rounded-sm hover:bg-[#D4A83A] text-[0.8rem] tracking-wide uppercase font-medium">
              Book Consultation
            </Link>
          </li>
        </ul>
        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`w-6 h-0.5 bg-gold-light transition-transform ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span className={`w-6 h-0.5 bg-gold-light transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`w-6 h-0.5 bg-gold-light transition-transform ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </nav>
      {open && (
        <div className="md:hidden fixed top-[68px] left-0 right-0 bg-navy px-[5%] py-6 z-[999] border-b border-gold/20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-[#C9C2B5] py-3 border-b border-white/[0.06] text-sm uppercase tracking-wide hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-gold font-medium py-3 text-sm uppercase tracking-wide"
          >
            Book Consultation →
          </Link>
        </div>
      )}
    </>
  );
}
