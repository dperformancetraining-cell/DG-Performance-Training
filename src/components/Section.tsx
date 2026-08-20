import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  id: string;
  /** Small running number in the section label, e.g. "01". */
  index?: string;
  label?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, index, label, children, className = '' }: Props) {
  return (
    <section id={id} className={`relative border-t border-hair py-24 sm:py-32 lg:py-40 ${className}`}>
      <div className="dg-container">
        {label && (
          <Reveal>
            <p className="mb-12 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted sm:mb-16">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
              {index && <span className="text-fg">{index}</span>}
              <span>{label}</span>
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
