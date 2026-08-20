import CtaButton from './CtaButton';
import Reveal from './Reveal';
import { GOOGLE_FORM_URL } from '../config';

const COVERS = ['Liability waiver', 'Medical information', 'Emergency contact', 'Photo consent'];

export default function Registration() {
  return (
    <section
      id="register"
      className="dg-grain relative overflow-hidden border-t border-brand/30 py-28 sm:py-36 lg:py-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 110% at 50% 0%, color-mix(in srgb, var(--color-brand) 16%, transparent), transparent 62%), radial-gradient(60% 80% at 50% 100%, color-mix(in srgb, var(--color-brand) 7%, transparent), transparent 70%)',
        }}
      />

      <div className="dg-container relative text-center">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
            <span className="text-fg">06</span>
            <span>Registration</span>
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mx-auto mt-10 max-w-[16ch] text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-fg">
            Every player registers first
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-[1.8] text-muted sm:text-lg">
            No player trains until the registration form is completed by a parent or legal guardian
            &mdash; trial sessions included. It is standard practice and takes about five minutes.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {COVERS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-3 w-px bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-14">
            <CtaButton href={GOOGLE_FORM_URL} size="lg">
              Complete registration form
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-8 text-[12px] uppercase tracking-[0.2em] text-muted">
            Opens in a new tab
          </p>
        </Reveal>
      </div>
    </section>
  );
}
