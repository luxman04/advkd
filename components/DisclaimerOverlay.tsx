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
            The Advocates Act, 1961, and the rules and regulations framed by the Bar Council of India and the Bar Council of Punjab & Haryana do not permit advertisement or solicitation by advocates in any form or manner.
          </p>
          <p>
            This website, www.advkd.com, and the information and content contained herein are provided solely for informational purposes and should not be construed as an advertisement, solicitation, invitation, inducement or legal advice.
            The information presented on this website is intended to provide general information about Adv. KD & Associates and its areas of legal practice. Any information, material or content available on this website shall not be treated as a substitute for professional legal advice from a qualified legal practitioner.
          </p>
          <p>
            Adv. KD & Associates does not assume any responsibility or liability for any loss, consequence or action taken by any person relying upon the information or content available on this website. The information provided may not necessarily be complete, exhaustive or applicable to every individual matter or circumstance.
          </p>
          <p>
            By entering and accessing this website, you acknowledge and confirm that you have voluntarily sought access to the information relating to Adv. KD & Associates, and that such access has not been made pursuant to any advertisement, solicitation, inducement or invitation by the Advocate, the firm, its associates, partners, members or representatives.
          </p>
          <p>
            No information contained on this website shall be construed as creating an advocate-client relationship. Any professional engagement or legal representation shall arise only upon formal consultation and acceptance of the matter in accordance with applicable law and professional rules.
          </p>
          <p>
            By clicking “I Agree / Enter Website”, you confirm that you have read and understood the above disclaimer and voluntarily wish to access this website.
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