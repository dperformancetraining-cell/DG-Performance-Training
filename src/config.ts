/**
 * Every external link, contact detail and animation switch on the site lives here.
 * Nothing else in the codebase hardcodes a URL.
 */

/** Registration + waiver form. Parents must complete this before any session, trial included. */
export const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfPfrIxQtF1ZESa2ZyaodiSzYBj02XacXB0l6nGsHboRH5Uxg/viewform';

/**
 * The parents' intro video call — the only thing booked through Calendly.
 * Free trial sessions are arranged by phone after the registration form comes in.
 */
export const CALENDLY_URL = 'https://calendly.com/dperformancetraining';

export const INSTAGRAM_URL = 'https://www.instagram.com/dgperformance__';

export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61593566341096';

/**
 * Phone number. Leave it as an empty string and it stays hidden everywhere —
 * fill it in (e.g. '+1 650 555 0199') and it appears in the footer as a tap-to-call link.
 */
export const PHONE_NUMBER: string = '';

export const CONTACT_EMAIL = 'dgperformancetraining@gmail.com';

/**
 * Hero logo motion.
 *  'single-turn' — one slow 360 turn as the page loads, then it settles still (default).
 *  'continuous'  — slow, never-ending rotation.
 * Either way, `prefers-reduced-motion: reduce` disables it completely.
 */
export const HERO_LOGO_ANIMATION: 'single-turn' | 'continuous' = 'single-turn';
