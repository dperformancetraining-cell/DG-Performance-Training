# DG Performance Training

Single-page marketing site. React + Vite + TypeScript + Tailwind CSS v4. No backend, no CMS —
it builds to static files and deploys to Vercel or Netlify as-is.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static output in dist/
npm run preview  # serve the built site
```

## Deploying to Vercel (free, no domain purchase)

Vercel gives you a free address like `dg-performance-training.vercel.app`. No payment, no domain
needed. You can point a real domain at it later without rebuilding anything.

Already done for this project. For reference, the manual route from this folder is:

```bash
npx vercel login     # once, with your email or GitHub account
npx vercel --prod    # answers: link to a new project, keep the defaults
```

Vercel detects Vite on its own: build command `npm run build`, output directory `dist`. There is
nothing to configure and no `vercel.json` needed.

Or through the website: push this folder to a GitHub repo, then vercel.com → Add New → Project →
import the repo → Deploy. Every push after that redeploys automatically.

**Already deployed.** The site is live at **https://dgperformance.vercel.app**, the GitHub repo is
connected, and every push to `main` redeploys it automatically. If you later add a custom domain,
update the four `og:`/`twitter:` URLs in `index.html` to match.

---

## The four things you will actually want to change

### 1. Links, email, socials and phone

**File: `src/config.ts`** — every external URL and contact detail on the site lives in this one
file. No component hardcodes a link.

| Constant | What it feeds |
| --- | --- |
| `GOOGLE_FORM_URL` | The header Register button, "Book a free trial session" in the hero, "Request the free trial" in pricing, the big registration button, and the footer waiver link |
| `CALENDLY_URL` | "Talk to me first" in the hero and the embedded calendar in the "Talk first" section. Video calls only |
| `INSTAGRAM_URL` | Footer Instagram link |
| `FACEBOOK_URL` | Footer Facebook link |
| `PHONE_NUMBER` | Footer tap-to-call link. **Empty by default — the link stays hidden until you fill it in.** Put your US number in as a string, e.g. `'+1 650 555 0199'`, and it appears automatically |
| `CONTACT_EMAIL` | Footer email link |

**How the free trial flows:** every "free trial" button goes to the Google Form, not to Calendly.
A parent fills in their details, you phone them from the number on the form, and you set the time
together. Calendly is only ever used for the intro video call.

**The form must ask for a phone number.** The whole trial flow depends on it — check that field
exists in your Google Form before you send anyone to the site.

**Rename your Calendly event.** It is currently called "30 Minute Meeting", and that is the name
parents see inside the embed. In Calendly, rename it to something like "Intro video call — parents"
so it matches the section around it.

### 2. Prices

**File: `src/components/Offer.tsx`** — the `TIERS` array at the top of the file. Each entry has
`name`, `detail`, `price`, `unit` and `body`. Edit the numbers, nothing else moves.

The recurring-billing note and the 24-hour cancellation note are plain paragraphs at the bottom of
the same file.

### 3. The two photos

Both live in `public/`. Drop a replacement in with the same filename and the layout does not move —
`<ImagePlaceholder />` shows a labelled slot if a file is ever missing.

| File | Where it is used |
| --- | --- |
| `public/logo.png` | Header, hero, footer. **Must have a transparent background** — it was alpha-cut from your original black-plate badge so it floats free on any background instead of sitting in a black square. If you swap in a version with a solid black background, that square will come back. |
| `public/equipment.jpg` | The hero background photo. Any landscape or portrait photo works; it is cropped with `object-cover`. |
| `public/logo-dark.png` | The same badge inked dark, for use on a light background. Unused by default — only needed if you switch to a light palette. |
| `public/og-image.png` | The 1200×630 social preview card (WhatsApp, iMessage, Facebook). |
| `public/favicon.png` | The browser tab icon. |

To change how much of the hero photo shows: `src/components/Hero.tsx`, the `opacity-[0.55]` class on
the image, and the gradient line directly under it.

### 4. The logo animation

**File: `src/config.ts`** — the `HERO_LOGO_ANIMATION` constant.

- `'single-turn'` (default) — one slow 360° turn as the page loads, then it settles still.
- `'continuous'` — a slow, never-ending rotation.

Only the hero logo animates. The header and footer marks are always static. On desktop the hero
logo also tilts slightly on hover. Anyone browsing with "reduce motion" turned on gets the static
logo with no rotation at all.

Timings live in `src/index.css` under "Logo motion" (`dg-turn 1.9s` for the single turn, `26s` for
the continuous loop).

---

## Colours

**File: `src/index.css`** — the `@theme` block at the very top. Twelve values colour the entire
site; change them there and every section follows. Nothing else in the codebase hardcodes a colour.

Current palette: near-black base `#070b09`, white type, a single pitch-green accent `#23b45c`.

To try the alternatives, swap these values in that block:

```css
/* Red on black (the original) */
--color-ink: #0a0a0a;  --color-surface: #111112;  --color-surface-2: #17181a;
--color-muted: #9ca1a6;  --color-brand: #d91f2c;  --color-brand-deep: #7e0f17;
--color-map: #08090a;  --color-land: #1b2026;

/* Green on light — also switch the logo to /logo-dark.png in src/components/Logo.tsx */
--color-ink: #f4f4f0;  --color-surface: #ffffff;  --color-surface-2: #fbfbf7;
--color-fg: #0c1210;  --color-muted: #586159;
--color-hair: rgba(12,18,16,0.14);  --color-line-strong: rgba(12,18,16,0.28);
--color-wash: rgba(12,18,16,0.05);
--color-brand: #0f7a3d;  --color-brand-deep: #0a4f28;
--color-map: #e8eae3;  --color-land: #c7cfc2;
```

---

## Where the words are

One file per section, all in `src/components/`. Open the file, edit the sentence.

| Section | File |
| --- | --- |
| Sticky header + nav links | `Header.tsx` |
| Hero — headline, the two buttons, the three facts | `Hero.tsx` |
| Who we are — Diego's story, the two fronts | `WhoWeAre.tsx` |
| The animated journey map | `JourneyMap.tsx` |
| Our commitment | `Commitment.tsx` |
| What we offer — prices, free trial, fine print | `Offer.tsx` |
| Where we train — the town list | `Locations.tsx` |
| Talk first — the parents video call and Calendly embed | `Booking.tsx` |
| Registration | `Registration.tsx` |
| Footer | `Footer.tsx` |

Shared pieces: `CtaButton.tsx` (every button), `Section.tsx` (the section shell and its numbered
label), `Reveal.tsx` (fade-and-rise on scroll), `Logo.tsx`, `ImagePlaceholder.tsx`.

Page title, meta description and social card text are in `index.html`. See the deploy section above
for the one URL to update after your first Vercel deploy.

## The journey map

`src/components/JourneyMap.tsx` is hand-built inline SVG — no Google Maps, no Leaflet, nothing
loaded from outside. The coastlines are plain lists of `[longitude, latitude]` pairs near the top of
the file, so the map is edited by editing numbers. `MADRID` and `BAY_AREA` set the two pins; `ARC`
is the flight path. It draws itself once when it scrolls into view, with a plane travelling along
it, and shows the finished arc with no motion for reduce-motion visitors.

## Accessibility and motion

Every section has an `id` and the header nav smooth-scrolls to it. Headings run in order, all
interactive elements have hover, focus-visible and active states, and `prefers-reduced-motion` is
respected everywhere — the logo, the scroll reveals and the map flight all resolve to their finished
state with no animation.

No analytics, no cookie banner, no chat widget, no localStorage.
