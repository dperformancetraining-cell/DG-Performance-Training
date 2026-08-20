import { HERO_LOGO_ANIMATION } from '../config';

type LogoProps = {
  className?: string;
  /** Only the hero logo animates — the header and footer marks stay still. */
  animated?: boolean;
  alt?: string;
};

/** logo.png is alpha-cut, so the badge floats free on any background. */
export default function Logo({ className = '', animated = false, alt = 'DG Performance Training crest' }: LogoProps) {
  const turn = animated
    ? HERO_LOGO_ANIMATION === 'continuous'
      ? 'dg-logo-turn--loop'
      : 'dg-logo-turn'
    : '';

  return (
    <span className={`block ${turn} ${className}`}>
      <span className={`block h-full w-full ${animated ? 'dg-logo-tilt' : ''}`}>
        <img
          src="/logo.png"
          alt={alt}
          width={640}
          height={640}
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    </span>
  );
}
