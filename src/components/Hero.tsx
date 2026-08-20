import CtaButton from './CtaButton';
import ImagePlaceholder from './ImagePlaceholder';
import Logo from './Logo';
import Reveal from './Reveal';
import { CALENDLY_URL, GOOGLE_FORM_URL } from '../config';

const FACTS = ['Ages 7 to 16', '60-minute sessions', 'All equipment provided'];

export default function Hero() {
  return (
    <section
      id="top"
      className="dg-grain relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* The field at dusk — kept legible under the type, but clearly present. */}
      <div aria-hidden="true" className="absolute inset-0">
        <ImagePlaceholder
          src="/equipment.jpg"
          alt="Match balls, cones and kit bags laid out on a Bay Area field at dusk"
          label="equipment.jpg"
          loading="eager"
          className="h-full w-full object-cover opacity-[0.55]"
        />
        <div className="absolute inset-0 bg-brand-deep/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 55% at 50% 45%, color-mix(in srgb, var(--color-brand) 14%, transparent), transparent 65%)',
          }}
        />
      </div>

      <div className="dg-container relative flex flex-col items-center text-center">
        <Reveal>
          <Logo animated className="h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36" />
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
            <span className="sm:hidden">Private coaching &middot; Bay Area</span>
            <span className="hidden sm:inline">
              Private youth soccer coaching &middot; Bay Area
            </span>
          </p>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-6 text-[clamp(2.2rem,7.5vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-fg">
            European-style
            <br />
            individual training
            <br />
            comes to the Bay Area
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-[1.75] text-muted sm:text-base">
            One-on-one and small-group sessions for players in the Bay Area who want to improve
            faster than a team environment allows &mdash; built on the technique, first touch and
            decision-making that European academies train every week.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <CtaButton href={GOOGLE_FORM_URL} size="lg">
              Book a free trial session
            </CtaButton>
            <CtaButton href={CALENDLY_URL} variant="outline" size="lg">
              Talk to me first
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {FACTS.map((fact) => (
              <li key={fact} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-3 w-px bg-brand" />
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
