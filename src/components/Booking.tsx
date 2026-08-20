import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import Section from './Section';
import { CALENDLY_URL } from '../config';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * The parents' intro video call. The colour parameters are Calendly's own, and
 * match the palette in index.css — update them together.
 */
const EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=070b09&text_color=ffffff&primary_color=23b45c`;

function loadCalendlyScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Calendly) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Calendly failed to load')));
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Calendly failed to load'));
    document.head.appendChild(script);
  });
}

export default function Booking() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !host.current || !window.Calendly) return;
        host.current.innerHTML = '';
        window.Calendly.initInlineWidget({ url: EMBED_URL, parentElement: host.current });
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section id="book" index="05" label="Talk first">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <Reveal className="lg:col-span-6">
          <h2 className="text-[clamp(2.1rem,6vw,4rem)] text-fg">
            A call with
            <br />
            you first
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={80}>
          <p className="text-[15px] leading-[1.8] text-muted sm:text-base">
            This is a short video call with you, the parent &mdash; not a session for your player.
            Tell me what your son or daughter is working toward, what their team is asking of them,
            and what you want out of this. It is also where you get to know me before anyone steps
            on a field.
          </p>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="mt-12 overflow-hidden border border-hair bg-surface sm:mt-16">
          {failed ? (
            <div className="flex h-[420px] flex-col items-center justify-center gap-6 px-6 text-center">
              <p className="text-[15px] leading-[1.8] text-muted">
                The calendar could not load in this browser.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ease-soft border border-line-strong px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-fg transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-fg hover:bg-wash"
              >
                Open the calendar in a new tab
              </a>
            </div>
          ) : (
            <div ref={host} className="h-[1040px] w-full min-w-[280px] sm:h-[780px]" />
          )}
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-6 flex flex-col gap-3 text-[13px] leading-[1.8] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Want the free trial session on the field instead?{' '}
            <a
              href="#top"
              className="ease-soft text-fg underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
            >
              Book it at the top of the page
            </a>
            .
          </p>
          <p>
            Calendar not loading?{' '}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ease-soft text-fg underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
            >
              Open it in a new tab
            </a>
            .
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
