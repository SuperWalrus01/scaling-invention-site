/**
 * Small abstract graphic per project, so the Projects grid hints at the
 * interactive visualiser behind "More Details" instead of being pure text.
 * Decorative only: hidden from assistive tech.
 *
 * Continuous charts stretch to fill the strip; the state diagram and the bar
 * chart keep their aspect ratio, otherwise the circles render as ellipses.
 */

const W = 480;
const H = 72;
const BASE = 62;

// Sampled gaussian, so the curves are real rather than eyeballed beziers.
const bell = (mu, sigma, peak, n = 48) =>
  'M' +
  Array.from({ length: n + 1 }, (_, i) => {
    const x = (W * i) / n;
    const y = BASE - peak * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join('L');

const line = (values, top = 12, bottom = 60) => {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  return (
    'M' +
    values
      .map((v, i) => {
        const x = (W * i) / (values.length - 1);
        const y = bottom - ((v - lo) / (hi - lo)) * (bottom - top);
        return `${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join('L')
  );
};

const WALK = [
  4, 6.4, 9.1, 8.2, 4.7, 4.5, 5.8, 8.6, 5.4, 2, 3.9, 5.1, 9, 11.6, 11.3, 10.6,
  17, 16.2, 14.2, 11.2, 11.4, 11.8, 10.9, 10.7, 11.4, 13.2, 16, 16.6, 12, 13.8,
  10.1, 9.7, 5.9, 5.9, 3.9, 4.5, 12.9, 12.8, 15, 11.6, 10.8, 12.6, 12.3, 13.3,
  13.6, 11, 12.4, 10.4, 15.1,
];
const SMOOTH = WALK.map((_, i) => {
  const w = WALK.slice(Math.max(0, i - 3), i + 4);
  return w.reduce((a, b) => a + b, 0) / w.length;
});

// Susceptible -> Infected -> Quarantined -> Damaged
const STATES = ['S', 'I', 'Q', 'D'];
const NODE_R = 16;
const NODE_X = STATES.map((_, i) => 60 + (i * (W - 140)) / (STATES.length - 1));

const BARS = [26, 38, 47, 58, 44];

const previews = {
  'bayesquiz-sim': {
    stretch: true,
    art: (
      <>
        <path d={`${bell(224, 108, 32)}L${W} ${BASE}L0 ${BASE}Z`} fill="#e0f2fe" />
        <path d={bell(224, 108, 32)} fill="none" stroke="#7dd3fc" strokeWidth="2" />
        <path d={`${bell(296, 42, 44)}L${W} ${BASE}L0 ${BASE}Z`} fill="#bae6fd" fillOpacity="0.75" />
        <path d={bell(296, 42, 44)} fill="none" stroke="#0284c7" strokeWidth="2.5" />
      </>
    ),
  },

  'infinitics-8': {
    stretch: false,
    art: (
      <>
        {NODE_X.slice(0, -1).map((x, i) => (
          <line
            key={i}
            x1={x + NODE_R}
            y1="36"
            x2={NODE_X[i + 1] - NODE_R - 6}
            y2="36"
            stroke="#7dd3fc"
            strokeWidth="2.5"
            markerEnd="url(#pp-arrow)"
          />
        ))}
        {STATES.map((label, i) => (
          <g key={label}>
            <circle
              cx={NODE_X[i]}
              cy="36"
              r={NODE_R}
              fill={i === 0 ? '#e0f2fe' : i === STATES.length - 1 ? '#0369a1' : '#0284c7'}
            />
            <text
              x={NODE_X[i]}
              y="41"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={i === 0 ? '#0369a1' : '#ffffff'}
            >
              {label}
            </text>
          </g>
        ))}
      </>
    ),
  },

  'diabetes-benchmark': {
    stretch: false,
    art: (
      <>
        <line x1="40" y1={BASE} x2={W - 40} y2={BASE} stroke="#bae6fd" strokeWidth="2" />
        {BARS.map((h, i) => {
          const bw = 46;
          const span = W - 80;
          const gap = (span - BARS.length * bw) / (BARS.length - 1);
          const x = 40 + i * (bw + gap);
          return (
            <rect
              key={i}
              x={x}
              y={BASE - h}
              width={bw}
              height={h}
              rx="5"
              fill={h === Math.max(...BARS) ? '#0284c7' : '#bae6fd'}
            />
          );
        })}
      </>
    ),
  },

  'drw-crypto': {
    stretch: true,
    art: (
      <>
        <path d={`${line(WALK)}L${W} ${H}L0 ${H}Z`} fill="#e0f2fe" fillOpacity="0.7" />
        <path d={line(WALK)} fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
        <path d={line(SMOOTH)} fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
};

export default function ProjectPreview({ id, className = '' }) {
  const preview = previews[id];
  if (!preview) return null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={preview.stretch ? 'none' : 'xMidYMid meet'}
      className={`w-full h-16 sm:h-[72px] ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker id="pp-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0 1 L6.5 3.5 L0 6 Z" fill="#7dd3fc" />
        </marker>
      </defs>
      {preview.art}
    </svg>
  );
}
