import JourneyMap from './JourneyMap';
import Reveal from './Reveal';
import Section from './Section';

const FRONTS = [
  {
    label: 'Right now',
    body: 'Immediate performance with their current team, so the improvement shows up in the next match — not next season.',
  },
  {
    label: 'Long term',
    body: 'The technical foundation that decides how far a player can go: high school, club, or college soccer.',
  },
];

export default function WhoWeAre() {
  return (
    <Section id="who" index="01" label="Who we are">
      <Reveal>
        <JourneyMap />
      </Reveal>

      <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="text-[clamp(2.1rem,5.5vw,3.6rem)] text-fg">
            From Madrid
            <br />
            to the Bay Area
          </h2>
          <span aria-hidden="true" className="mt-8 block h-0.5 w-20 bg-brand" />
        </Reveal>

        <Reveal className="lg:col-span-7" delay={80}>
          <div className="space-y-7 text-[15px] leading-[1.8] text-muted sm:text-base">
            <p className="text-lg leading-[1.7] text-fg sm:text-xl">
              I&rsquo;m Diego. I grew up in Madrid and trained in Spain from a young age, playing
              competitive league football there for nearly my whole life. I brought that same
              methodology to the Bay Area, and now I coach players here.
            </p>
            <p>
              Youth soccer in the US is heavily oriented toward game volume and team tactics. Very
              little of the week goes to individual technique, first touch, body positioning and
              decision-making under pressure. European academy training inverts that ratio: the
              hours go into the individual player, and the team performance follows.
            </p>
            <p>That inversion is what this is built on.</p>
            <p>
              Sessions run in English, for players roughly 7 to 16 years old, and they
              work on two fronts at once.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px border border-hair bg-hair sm:grid-cols-2">
        {FRONTS.map((front, i) => (
          <Reveal key={front.label} delay={i * 90} className="h-full">
            <div className="h-full bg-ink p-8 sm:p-10">
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-brand" />
                {front.label}
              </p>
              <p className="mt-5 text-[15px] leading-[1.8] text-muted sm:text-base">{front.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
