'use client';

import { useEffect, useState } from 'react';

export default function DisclaimerOverlay() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const agreed = sessionStorage.getItem('kd_disclaimer_agreed');
    if (!agreed) setVisible(true);
  }, []);

  function agree() {
    sessionStorage.setItem('kd_disclaimer_agreed', '1');
    setVisible(false);
  }

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[rgba(7,14,22,0.96)] backdrop-blur-sm flex items-center justify-center p-5">
      <div className="bg-navy border border-gold/40 rounded-md max-w-[600px] w-full p-10 max-h-[90vh] overflow-y-auto">
        <div className="text-center text-3xl text-gold mb-4">⚖</div>
        <h2 className="font-serif text-white text-center text-2xl mb-2">Legal Disclaimer</h2>
        <div className="text-center text-gold text-[0.72rem] tracking-[2px] uppercase mb-6">
          Please read before proceeding
        </div>
        <div className="text-[#8A9AAA] text-[0.84rem] leading-relaxed border-t border-gold/20 pt-6 max-h-[260px] overflow-y-auto space-y-3">
          <p>
            This website is intended solely for informational purposes and does not constitute legal advice. The
            information provided on this website should not be construed as legal counsel or a substitute for
            professional legal advice from a qualified advocate.
          </p>
          <p>
            The Bar Council of India prohibits advocates from advertising or soliciting work through communication
            in the public domain. This website is not intended to solicit clients and is provided purely as a means
            of information.
          </p>
          <p>
            By accessing this website, you acknowledge that you are seeking information of your own accord and free
            will, and that no form of solicitation has taken place on the part of Adv. KaranDeep or this firm.
          </p>
          <p>
            Any reliance you place on information provided on this site is strictly at your own risk. Transmission
            of this information is not intended to create, and receipt does not constitute, an advocate-client
            relationship.
          </p>
        </div>
        <div className="flex gap-4 mt-6 justify-center flex-wrap">
          <button
            onClick={agree}
            className="bg-gold text-navy px-7 py-2.5 rounded-sm font-medium text-sm hover:bg-[#D4A83A] transition-colors"
          >
            I Understand &amp; Agree
          </button>
          <a
            href="https://www.google.com"
            className="border border-white/10 text-[#5A6A7A] px-7 py-2.5 rounded-sm text-sm hover:text-[#8A9AAA] transition-colors"
          >
            Exit Website
          </a>
        </div>
      </div>
    </div>
  );
}