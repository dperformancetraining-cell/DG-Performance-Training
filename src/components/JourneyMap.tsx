import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView } from './Reveal';

/* ------------------------------------------------------------------
   A hand-built North Atlantic map. Equirectangular, true at 40N, so
   every coastline below is just a list of [longitude, latitude] pairs.
   To reshape a coastline, edit its numbers — nothing here is imported.
   ------------------------------------------------------------------ */
const VIEW_W = 1000;
const VIEW_H = 480;
const LON_MIN = -148;
const LAT_MAX = 70;
const X_PER_DEG = VIEW_W / 170;
const Y_PER_DEG = X_PER_DEG / Math.cos((40 * Math.PI) / 180);

const x = (lon: number) => Number(((lon - LON_MIN) * X_PER_DEG).toFixed(1));
const y = (lat: number) => Number(((LAT_MAX - lat) * Y_PER_DEG).toFixed(1));

type Coast = [number, number][];

const outline = (coast: Coast) =>
  coast.map(([lon, lat], i) => `${i === 0 ? 'M' : 'L'}${x(lon)},${y(lat)}`).join(' ') + ' Z';

const NORTH_AMERICA: Coast = [
  [-148, 66], [-140, 61], [-136, 58.5], [-131, 55], [-127, 52], [-124.7, 48.5],
  [-124, 44], [-123, 40.5], [-122.4, 37.8], [-120.6, 34.5], [-118.2, 33.7], [-117.1, 32.5],
  [-116, 31], [-114.9, 29.5], [-113.4, 27.5], [-112, 25.5], [-109.9, 22.9],
  [-110.5, 24.5], [-112, 26.5], [-113.3, 28.5], [-114.6, 31.2],
  [-112.5, 29.5], [-110.5, 27.5], [-108.5, 26], [-106.4, 23.2], [-105.6, 21.5], [-104, 19.9],
  [-101, 17.5], [-99.9, 16.8], [-97, 15.9], [-94.5, 16.2], [-92.5, 14.6], [-90, 13.5],
  [-87.5, 13], [-85.5, 11], [-83.5, 9.5], [-81, 8.2], [-78, 8.5],
  [-79, 9.3], [-82, 9.8], [-83.6, 10.9], [-83.5, 13], [-85, 14.5], [-87.5, 16],
  [-88.3, 17.5], [-88.2, 18.5], [-87.5, 20.5], [-87, 21.4], [-89, 21.5], [-90.5, 21],
  [-91.5, 18.7], [-94.5, 18.2], [-96.5, 19.5], [-97.5, 22], [-97.2, 25.9],
  [-95.3, 28.9], [-93, 29.7], [-90.2, 29.2], [-89.1, 29.1], [-88, 30.3], [-85.5, 29.7],
  [-84, 29.7], [-82.8, 27.9], [-81.8, 25.2], [-80.1, 25.9], [-80.5, 28.5], [-81.4, 30.7],
  [-79.2, 33.2], [-77, 34.4], [-75.5, 35.2], [-76.2, 37], [-74, 39.6], [-72, 41],
  [-70.5, 41.7], [-70, 43], [-67.5, 44.5], [-66, 44.8], [-64, 45.3], [-61.5, 45.8],
  [-59.9, 46.2], [-56, 47], [-52.7, 47.6], [-55, 49.5], [-56.8, 51.4],
  [-60, 50.5], [-64, 52], [-66, 54], [-64, 57], [-66, 58.5], [-69, 59.5], [-72, 61], [-78, 62.5],
  [-79, 58], [-79, 55], [-79.5, 51.5], [-82, 53], [-85, 55], [-88, 57], [-92, 58.5],
  [-94, 60], [-94, 62], [-90, 64],
  [-95, 68], [-105, 68.5], [-115, 69.5], [-125, 70.5], [-135, 70], [-148, 68],
];

const GREENLAND: Coast = [
  [-43.9, 59.8], [-41, 62], [-38, 65], [-32, 68], [-25, 71],
  [-58, 71], [-55, 68.5], [-53, 66], [-50, 62], [-46, 60.5],
];

const ICELAND: Coast = [
  [-24.5, 65.5], [-22.5, 66.5], [-18, 66.5], [-14.5, 66.3], [-13.6, 65.1],
  [-16, 63.6], [-20, 63.4], [-22.7, 64],
];

const BRITAIN: Coast = [
  [-5.7, 50.1], [-4.5, 51.7], [-5, 53.4], [-3.1, 54.9], [-4.8, 55.9], [-5.6, 57.3],
  [-3.2, 58.6], [-2, 57.7], [-1.4, 55.7], [0.3, 53.6], [1.7, 52.7], [1.2, 51.4],
  [-1.3, 50.7], [-3.5, 50.6],
];

const IRELAND: Coast = [
  [-10.4, 51.7], [-10, 53.5], [-9.1, 54.4], [-8.3, 55.2], [-6.2, 55.2],
  [-5.5, 54.1], [-6.1, 52.7], [-6.6, 52.1], [-8.9, 51.5],
];

const EUROPE: Coast = [
  [-5.6, 36.1], [-6.4, 36.8], [-7.4, 37.2], [-8.9, 37], [-9, 38.5], [-9.5, 39.4],
  [-8.9, 41.2], [-8.9, 42.6], [-9.3, 43], [-7.9, 43.8], [-5, 43.6], [-3, 43.5],
  [-1.8, 43.4], [-1.2, 44.7], [-1.1, 45.7], [-1.2, 46.3], [-2.1, 47], [-3, 47.5],
  [-4.8, 48.4], [-2.5, 48.7], [-1.2, 49.5], [0.2, 49.7], [1.6, 50.9], [3.2, 51.4],
  [4.2, 52.2], [4.8, 53], [6.5, 53.5], [8.2, 53.7], [8.4, 55.4], [8.6, 57],
  [10.6, 57.7], [12.6, 56.2], [13.5, 54.5], [16, 54.6], [19, 54.5], [22, 55.5], [26, 56],
  [26, 43], [22, 42], [19.5, 41], [19, 42], [17, 43], [15, 44.5], [13.6, 45.4],
  [12.3, 44.5], [14, 42.3], [15.5, 41.9], [18.4, 40.2], [17.2, 40.5], [16.6, 39],
  [15.6, 38], [14.9, 40.6], [13.1, 41.2], [11.2, 42.4], [10.3, 43.6], [9.9, 44],
  [8.7, 44.4], [7.6, 43.8], [5.4, 43.2], [3, 43], [3.2, 42.4], [1.2, 41.2], [0.9, 40.7],
  [-0.3, 39.4], [-0.5, 38.3], [-1, 37.6], [-2.5, 36.8], [-4.4, 36.7],
];

const AFRICA: Coast = [
  [-5.9, 35.8], [-2.9, 35.3], [0.1, 36], [3.1, 36.8], [5.8, 36.9], [8.6, 37.1],
  [10.3, 37.2], [11, 37], [10.8, 34.7], [10.1, 33.9], [11.5, 33.2], [15, 32.4],
  [16.6, 31.2], [20, 32.1], [26, 32.4], [26, 4], [-2, 4], [-4, 5.2], [-7.5, 4.4],
  [-9, 5], [-11, 6.5], [-13, 8.5], [-13.7, 9.5], [-15, 11], [-16.7, 12.5], [-17.5, 14.7],
  [-16.5, 16], [-16.2, 19], [-16.7, 21], [-15.5, 23.5], [-14, 26], [-12, 28],
  [-10.5, 29.5], [-9.6, 30.4], [-8.5, 32.5], [-7, 33.7], [-6.2, 34.5],
];

const SOUTH_AMERICA: Coast = [
  [-77, 8], [-76, 9], [-75.5, 10.8], [-74.2, 11], [-71.3, 12.4], [-70, 12],
  [-68, 10.6], [-64, 10.6], [-62, 10.7], [-60, 9], [-58, 6], [-77, 6],
];

const CUBA: Coast = [
  [-84.9, 21.9], [-83, 22.4], [-81, 23.2], [-79, 22.6], [-77, 21.6], [-74.2, 20.3],
  [-75.5, 19.9], [-77.7, 19.9], [-80.5, 21.5],
];

const LAND = [
  NORTH_AMERICA, GREENLAND, ICELAND, BRITAIN, IRELAND, EUROPE, AFRICA, SOUTH_AMERICA, CUBA,
];

/* ------------------------------------------------------------------
   The two pins and the flight path between them.
   ------------------------------------------------------------------ */
const MADRID = { lon: -3.7, lat: 40.4 };
const BAY_AREA = { lon: -122.4, lat: 37.8 };

/** Written Madrid-first, so the arc draws and the plane flies westward. */
const ARC = `M${x(MADRID.lon)},${y(MADRID.lat)} C700,40 350,40 ${x(BAY_AREA.lon)},${y(BAY_AREA.lat)}`;

/** A small jet, drawn around its own origin, nose pointing along +x. */
const PLANE =
  'M15,0 L2,-3 L-1.5,-9 L-4.5,-9 L-3,-3 L-8,-3 L-11,-6.5 L-13.5,-6.5 L-11.5,0 ' +
  'L-13.5,6.5 L-11,6.5 L-8,3 L-3,3 L-4.5,9 L-1.5,9 L2,3 Z';

const MERIDIANS = [-140, -120, -100, -80, -60, -40, -20, 0, 20];
const PARALLELS = [10, 20, 30, 40, 50, 60, 70];

function Pin({ lon, lat, arriving = false }: { lon: number; lat: number; arriving?: boolean }) {
  return (
    <g>
      {arriving && (
        <circle
          className="dg-arrive-ring"
          cx={x(lon)}
          cy={y(lat)}
          r="12"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
        />
      )}
      <circle
        cx={x(lon)}
        cy={y(lat)}
        r="13"
        fill="none"
        stroke="var(--color-brand)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <circle cx={x(lon)} cy={y(lat)} r="5" fill="var(--color-brand)" />
    </g>
  );
}

export default function JourneyMap() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const arcRef = useRef<SVGPathElement>(null);
  const [arcLength, setArcLength] = useState(800);

  useLayoutEffect(() => {
    if (arcRef.current) setArcLength(Math.ceil(arcRef.current.getTotalLength()));
  }, []);

  return (
    <figure ref={ref} data-flight={inView} className="m-0">
      <div className="dg-grain relative overflow-hidden border border-hair bg-map">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 90% at 50% 8%, color-mix(in srgb, var(--color-brand) 10%, transparent), transparent 62%), radial-gradient(50% 70% at 88% 55%, color-mix(in srgb, var(--color-brand) 8%, transparent), transparent 70%)',
          }}
        />

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="relative block h-auto w-full"
          role="img"
          aria-labelledby="journey-map-title"
          style={{ '--dg-arc-length': arcLength } as CSSProperties}
        >
          <title id="journey-map-title">
            A stylised North Atlantic map with a dashed flight path drawn from Madrid, Spain to the
            San Francisco Bay Area.
          </title>

          <mask id="dg-arc-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW_W} height={VIEW_H}>
            <path
              ref={arcRef}
              className="dg-arc-mask"
              d={ARC}
              fill="none"
              stroke="#fff"
              strokeWidth="28"
              strokeLinecap="round"
            />
          </mask>

          <g stroke="rgba(255,255,255,0.045)" strokeWidth="1">
            {MERIDIANS.map((lon) => (
              <line key={lon} x1={x(lon)} y1="0" x2={x(lon)} y2={VIEW_H} />
            ))}
            {PARALLELS.map((lat) => (
              <line key={lat} x1="0" y1={y(lat)} x2={VIEW_W} y2={y(lat)} />
            ))}
          </g>

          <g fill="var(--color-land)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinejoin="round">
            {LAND.map((coast, i) => (
              <path key={i} d={outline(coast)} />
            ))}
          </g>

          <g mask="url(#dg-arc-mask)">
            <path
              d={ARC}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="2.5"
              strokeDasharray="9 11"
              strokeLinecap="round"
            />
          </g>

          <Pin lon={MADRID.lon} lat={MADRID.lat} />
          <Pin lon={BAY_AREA.lon} lat={BAY_AREA.lat} arriving />

          <g className="dg-plane" style={{ offsetPath: `path("${ARC}")` }}>
            <path d={PLANE} fill="var(--color-fg)" />
          </g>
        </svg>

        {/* Labels live in HTML so they stay legible at every width. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute translate-y-3 sm:translate-y-4"
            style={{
              left: `${(x(BAY_AREA.lon) / VIEW_W) * 100}%`,
              top: `${(y(BAY_AREA.lat) / VIEW_H) * 100}%`,
            }}
          >
            <span className="block font-display text-[11px] leading-[1.05] tracking-[0.03em] text-fg sm:text-base md:text-lg">
              San Francisco
              <br />
              Bay Area
            </span>
            <span className="mt-1 block whitespace-nowrap text-[8px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
              37.8&deg;N 122.4&deg;W
            </span>
          </div>

          <div
            className="absolute -translate-x-full translate-y-3 pr-4 text-right sm:translate-y-4 sm:pr-5"
            style={{
              left: `${(x(MADRID.lon) / VIEW_W) * 100}%`,
              top: `${(y(MADRID.lat) / VIEW_H) * 100}%`,
            }}
          >
            <span className="block font-display text-[11px] leading-[1.05] tracking-[0.03em] text-fg sm:text-base md:text-lg">
              Madrid
              <br />
              Spain
            </span>
            <span className="mt-1 block whitespace-nowrap text-[8px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
              40.4&deg;N 3.7&deg;W
            </span>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 text-[13px] leading-[1.7] text-muted sm:text-sm">
        From Madrid to the Bay Area &mdash; bringing European football to California.
      </figcaption>
    </figure>
  );
}
