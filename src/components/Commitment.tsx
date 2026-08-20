import Reveal from './Reveal';

export default function Commitment() {
  return (
    <section id="commitment" className="relative overflow-hidden border-t border-hair py-28 sm:py-36 lg:py-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 20% 0%, color-mix(in srgb, var(--color-brand) 14%, transparent), transparent 65%), radial-gradient(50% 60% at 100% 100%, color-mix(in srgb, var(--color-brand) 8%, transparent), transparent 70%)',
        }}
      />

      <div className="dg-container relative">
        <Reveal>
          <p className="mb-12 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted sm:mb-16">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
            <span className="text-fg">02</span>
            <span>Our commitment</span>
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="max-w-[14ch] text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.9] tracking-[-0.02em] text-fg">
            Every player is our project
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <span aria-hidden="true" className="mt-12 block h-0.5 w-28 bg-brand" />
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-12 max-w-3xl text-[clamp(1.15rem,2.6vw,1.75rem)] leading-[1.5] text-fg">
            We are fully committed to doing our best work with each one &mdash; building not just a
            better player for this season, but the technical foundation of a great footballer.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-8 max-w-2xl text-[15px] leading-[1.8] text-muted sm:text-lg">
            One player at a time, with full attention on what each one needs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
