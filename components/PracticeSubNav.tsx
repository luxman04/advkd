'use client';

import { useEffect, useState } from 'react';
import { practiceAreas } from '@/lib/practice-data';

export default function PracticeSubNav() {
  const [active, setActive] = useState(practiceAreas[0].id);

  useEffect(() => {
    function onScroll() {
      let current = practiceAreas[0].id;
      practiceAreas.forEach((p) => {
        const el = document.getElementById(p.id);
        if (el && window.scrollY >= el.offsetTop - 140) current = p.id;
      });
      setActive(current);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-white border-b border-black/[0.08] sticky top-[68px] z-40">
      <div className="flex overflow-x-auto px-[8%] no-scrollbar">
        {practiceAreas.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className={`flex-shrink-0 px-5 py-4 text-[0.78rem] uppercase tracking-wide font-medium border-b-2 whitespace-nowrap transition-colors ${
              active === p.id ? 'text-gold border-gold' : 'text-muted border-transparent hover:text-gold'
            }`}
          >
            {p.navLabel}
          </a>
        ))}
      </div>
    </div>
  );
}
