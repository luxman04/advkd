import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#B8902A',
        'gold-light': '#E8D5A0',
        'gold-pale': '#FAF5E8',
        navy: '#0D1B2A',
        'navy-mid': '#1C2E45',
        cream: '#F9F6EF',
        muted: '#5A5A5A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(184,144,42,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;