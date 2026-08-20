import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Purely decorative arrow, on by default. */
  arrow?: boolean;
};

const BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-semibold uppercase leading-none tracking-[0.16em] ease-soft ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-300 will-change-transform active:translate-y-0 active:scale-[0.985]';

const SIZES: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-4 py-2.5 text-[11px]',
  md: 'px-6 py-3.5 text-[12px]',
  lg: 'px-8 py-4.5 text-[13px]',
};

const VARIANTS: Record<NonNullable<Props['variant']>, string> = {
  solid:
    'bg-brand text-fg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_16px_36px_-18px_color-mix(in srgb, var(--color-brand) 95%, transparent)] ' +
    'hover:-translate-y-0.5 hover:bg-[#e8313e] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.28),0_26px_52px_-16px_color-mix(in srgb, var(--color-brand) 100%, transparent)] ' +
    'focus-visible:outline-fg',
  outline:
    'border border-line-strong text-fg hover:-translate-y-0.5 hover:border-fg hover:bg-wash ' +
    'shadow-[0_16px_36px_-24px_rgba(255,255,255,0.5)]',
};

/** Every call to action on the page is an outbound link to the form or to Calendly. */
export default function CtaButton({
  href,
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  arrow = true,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="ease-soft transition-transform duration-300 group-hover:translate-x-1"
        >
          &#8594;
        </span>
      )}
    </a>
  );
}
