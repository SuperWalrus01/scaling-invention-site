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

// Plots against a fixed domain, so several series stay on one shared scale.
const scaled = (values, lo, hi, top = 10, bottom = 62, offset = 0) =>
  'M' +
  values
    .map((v, i) => {
      const x = (W * i) / (values.length - 1);
      const y = bottom - ((v + offset - lo) / (hi - lo)) * (bottom - top);
      return `${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join('L');

// Mean-reverting price around an EMA fair value, with the market-making band.
const IMC_PRICE = [
  50.19, 50.63, 48.58, 49.36, 50.98, 47.87, 48.64, 49.32, 49.01, 50.41, 50.45,
  48.88, 50.46, 51.16, 51.87, 52.85, 51.7, 50.56, 48.27, 49.38, 48.56, 48.39,
  47.51, 47.35, 47.87, 50.29, 47.44, 47.18, 49.11, 51.59, 51.58, 48.56, 46.43,
  48.76, 48.67, 48.23, 50.36, 51.27, 50.5, 50.51, 50.57,
];
const IMC_EMA = [
  49.91, 49.96, 49.97, 49.95, 49.86, 49.78, 49.82, 49.89, 50.03, 50.15, 50.27,
  50.37, 50.28, 50.29, 50.34, 50.41, 50.31, 50.08, 49.84, 49.63, 49.51, 49.44,
  49.44, 49.39, 49.39, 49.44, 49.42, 49.56, 49.72, 49.94, 50.05, 50.05, 50.03,
  50.0, 50.03, 50.08, 50.07, 49.98, 49.87, 49.9, 49.86,
];
const IMC_LO = 45.6;
const IMC_HI = 53.7;
const IMC_SPREAD = 2.1;
// Points that broke the band are where mean-reversion fires.
const IMC_SIGNALS = [15, 27, 32];

// Full-stack tiers, top to bottom.
const STACK = [
  { label: 'React / Vite', fill: '#bae6fd', text: '#0369a1' },
  { label: 'Supabase · auth', fill: '#38bdf8', text: '#ffffff' },
  { label: 'Stripe billing', fill: '#0369a1', text: '#ffffff' },
];

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

  'imc-prosperity': {
    stretch: true,
    art: (
      <>
        {/* Quoted band around fair value: the market-making spread */}
        <path
          d={`${scaled(IMC_EMA, IMC_LO, IMC_HI, 10, 62, IMC_SPREAD)}L${W} 62L0 62Z`}
          fill="#e0f2fe"
        />
        <path
          d={`${scaled(IMC_EMA, IMC_LO, IMC_HI, 10, 62, -IMC_SPREAD)}L${W} 62L0 62Z`}
          fill="#f8fdff"
        />
        <path
          d={scaled(IMC_EMA, IMC_LO, IMC_HI, 10, 62, IMC_SPREAD)}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <path
          d={scaled(IMC_EMA, IMC_LO, IMC_HI, 10, 62, -IMC_SPREAD)}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        {/* EMA fair value */}
        <path
          d={scaled(IMC_EMA, IMC_LO, IMC_HI)}
          fill="none"
          stroke="#0369a1"
          strokeWidth="2.5"
        />
        {/* Traded price */}
        <path
          d={scaled(IMC_PRICE, IMC_LO, IMC_HI)}
          fill="none"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeOpacity="0.75"
        />
        {IMC_SIGNALS.map((i) => {
          const x = (W * i) / (IMC_PRICE.length - 1);
          const y = 62 - ((IMC_PRICE[i] - IMC_LO) / (IMC_HI - IMC_LO)) * 52;
          return <circle key={i} cx={x} cy={y} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />;
        })}
      </>
    ),
  },

  'tmua-wizzz': {
    stretch: false,
    art: (
      <>
        {STACK.map((tier, i) => {
          const h = 17;
          const gap = 4;
          const y = 7 + i * (h + gap);
          const inset = 40 + i * 26;
          return (
            <g key={tier.label}>
              <rect x={inset} y={y} width={W - inset * 2} height={h} rx={h / 2} fill={tier.fill} />
              <text
                x={W / 2}
                y={y + 12.5}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={tier.text}
              >
                {tier.label}
              </text>
            </g>
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
