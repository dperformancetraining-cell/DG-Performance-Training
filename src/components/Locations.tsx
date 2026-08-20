import Reveal from './Reveal';
import Section from './Section';

const TOWNS = [
  'Atherton',
  'Menlo Park',
  'Palo Alto',
  'Mountain View',
  'Redwood City',
  'The wider South Bay',
];

export default function Locations() {
  return (
    <Section id="locations" index="04" label="Where we train">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="text-[clamp(2.1rem,6vw,4rem)] text-fg">
            On the fields
            <br />
            you already know
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={80}>
          <p className="text-[15px] leading-[1.8] text-muted sm:text-lg">
            Sessions run at public parks and open fields across the Peninsula and the wider South
            Bay. All equipment &mdash; balls, cones, goals, bibs &mdash; is provided by the coach.
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 flex flex-wrap gap-3 sm:mt-20 sm:gap-4">
        {TOWNS.map((town, i) => (
          <li key={town}>
            <Reveal delay={i * 60}>
              <span className="ease-soft block border border-hair px-5 py-3.5 font-display text-lg leading-none tracking-[0.02em] text-fg transition-[transform,border-color,background-color] duration-400 hover:-translate-y-0.5 hover:border-brand hover:bg-surface sm:px-7 sm:py-5 sm:text-2xl">
                {town}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
