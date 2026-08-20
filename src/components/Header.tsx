import { useEffect, useState } from 'react';
import Logo from './Logo';
import CtaButton from './CtaButton';
import { GOOGLE_FORM_URL } from '../config';

const NAV = [
  { href: '#who', label: 'Who we are' },
  { href: '#offer', label: 'Pricing' },
  { href: '#locations', label: 'Where' },
  { href: '#book', label: 'Video call' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ease-soft ${
        scrolled ? 'border-hair bg-ink/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="dg-container flex h-16 items-center justify-between gap-4 sm:h-20">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-[2px] opacity-90 transition-opacity duration-300 ease-soft hover:opacity-100"
        >
          <Logo className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" alt="DG Performance Training" />
          <span className="hidden font-display text-base leading-none tracking-[0.02em] text-fg sm:block sm:text-lg">
            DG Performance
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors duration-300 ease-soft hover:text-fg"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-soft group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <CtaButton href={GOOGLE_FORM_URL} size="sm" arrow={false} className="shrink-0">
          Register
        </CtaButton>
      </div>
    </header>
  );
}
