import Logo from './Logo';
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  GOOGLE_FORM_URL,
  INSTAGRAM_URL,
  PHONE_NUMBER,
} from '../config';

const LINK =
  'ease-soft text-[13px] text-muted transition-colors duration-300 hover:text-fg focus-visible:text-fg';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-hair py-16 sm:py-20">
      <div className="dg-container">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-14 w-14" alt="" />
            <span className="font-display text-xl leading-none tracking-[0.02em] text-fg">
              DG Performance
              <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
                Training
              </span>
            </span>
          </div>

          <nav aria-label="Contact and registration" className="flex flex-col gap-3 sm:items-end">
            <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
              {CONTACT_EMAIL}
            </a>

            {/* Appears only once PHONE_NUMBER is filled in, in src/config.ts */}
            {PHONE_NUMBER && (
              <a href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, '')}`} className={LINK}>
                {PHONE_NUMBER}
              </a>
            )}

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              Instagram
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              Facebook
            </a>
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              Registration &amp; waiver
            </a>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hair pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
            &copy; {new Date().getFullYear()} DG Performance Training
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
            Bay Area, California &middot; Ages 7 to 16
          </p>
        </div>
      </div>
    </footer>
  );
}
