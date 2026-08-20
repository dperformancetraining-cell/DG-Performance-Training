import CtaButton from './CtaButton';
import Reveal from './Reveal';
import Section from './Section';
import { GOOGLE_FORM_URL } from '../config';

/** Prices live here. Every session is 60 minutes, and the price is per player. */
const TIERS = [
  {
    index: '01',
    name: 'Individual',
    detail: '1-on-1',
    price: '$50',
    unit: '/ hour',
    body: 'A fully personalised session, built around the specific weaknesses of that player.',
  },
  {
    index: '02',
    name: 'Pair',
    detail: '2 players',
    price: '$40',
    unit: '/ hour per player',
    body: 'Two players training together. Allows competitive and opposition-based drills. Common for siblings, teammates, or friends.',
  },
  {
    index: '03',
    name: 'Small group',
    detail: '3+ players',
    price: '$30',
    unit: '/ hour per player',
    body: 'Position-specific work and small-sided games. The lowest cost per player.',
  },
];

export default function Offer() {
  return (
    <Section id="offer" index="03" label="What we offer">
      <Reveal>
        <h2 className="text-[clamp(2.1rem,6vw,4rem)] text-fg">
          Three formats.
          <br />
          Sixty minutes.
          <br />
          One standard.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 90} className="h-full">
            <article className="ease-soft group flex h-full flex-col border border-hair bg-surface p-8 transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-brand hover:bg-surface-2 hover:shadow-[0_30px_60px_-32px_color-mix(in srgb, var(--color-brand) 60%, transparent)] sm:p-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
                {tier.index}
              </span>

              <h3 className="mt-7 text-3xl leading-none text-fg sm:text-4xl">{tier.name}</h3>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">
                {tier.detail}
              </p>

              <p className="mt-8 flex items-baseline gap-2">
                <span className="font-display text-5xl leading-none text-fg sm:text-6xl">
                  {tier.price}
                </span>
                <span className="text-[13px] text-muted">{tier.unit}</span>
              </p>

              <span
                aria-hidden="true"
                className="ease-soft mt-8 block h-px w-full origin-left scale-x-[0.18] bg-brand transition-transform duration-500 group-hover:scale-x-100"
              />

              <p className="mt-8 text-[15px] leading-[1.8] text-muted">{tier.body}</p>

              <p className="mt-auto pt-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                60 minutes &middot; per player
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <div className="relative mt-6 overflow-hidden border border-brand/40 bg-surface p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 140% at 0% 0%, color-mix(in srgb, var(--color-brand) 28%, transparent), transparent 62%)',
            }}
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
                No commitment
              </p>
              <h3 className="mt-6 text-[clamp(1.9rem,5vw,3rem)] text-fg">Free trial session</h3>
              <p className="mt-5 text-[15px] leading-[1.8] text-muted sm:text-base">
                A one-time introductory session for new families. Fill in the registration form and
                I will call you to arrange a time, then we meet on the field and you see if it is
                a fit.
              </p>
            </div>
            <CtaButton href={GOOGLE_FORM_URL} size="lg" className="self-start lg:self-auto">
              Request the free trial
            </CtaButton>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 grid gap-4 border-t border-hair pt-8 text-[13px] leading-[1.8] text-muted sm:grid-cols-2 sm:gap-10">
          <p>
            Sessions are sold as recurring packages, billed biweekly or monthly in advance, because
            progress comes from consistency rather than occasional sessions.
          </p>
          <p>Sessions cancelled with more than 24 hours notice are rescheduled at no cost.</p>
        </div>
      </Reveal>
    </Section>
  );
}
