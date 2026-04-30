import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const COMPANY_TYPES = {
  X: 'Company Type X',
  Y: 'Company Type Y',
};

const nodes = [
  { id: 'susceptible', label: 'Susceptible', x: '15%', y: '50%', color: 'from-sky-400 to-sky-600' },
  { id: 'infected', label: 'Infected', x: '50%', y: '18%', color: 'from-rose-400 to-rose-600' },
  { id: 'quarantined', label: 'Quarantined', x: '85%', y: '50%', color: 'from-amber-400 to-amber-600' },
  { id: 'damaged', label: 'Permanently Damaged', x: '50%', y: '84%', color: 'from-slate-500 to-slate-700' },
];

const edges = [
  { id: 's-i', from: 'susceptible', to: 'infected' },
  { id: 'i-q', from: 'infected', to: 'quarantined' },
  { id: 'q-s', from: 'quarantined', to: 'susceptible' },
  { id: 'q-d', from: 'quarantined', to: 'damaged' },
];

function getDuration(edgeId, companyType) {
  const base = {
    's-i': 8,
    'i-q': 8,
    'q-s': 10,
    'q-d': 12,
  }[edgeId] || 10;

  if (companyType === 'X' && edgeId === 's-i') {
    return base * 0.5; // faster infection
  }

  if (companyType === 'Y' && edgeId === 'i-q') {
    return base * 0.5; // faster quarantine
  }

  return base;
}

function getPath(edgeId) {
  switch (edgeId) {
    case 's-i':
      return {
        x: ['15%', '32%', '50%'],
        y: ['50%', '36%', '22%'],
      };
    case 'i-q':
      return {
        x: ['50%', '68%', '85%'],
        y: ['22%', '30%', '50%'],
      };
    case 'q-s':
      return {
        x: ['85%', '50%', '15%'],
        y: ['50%', '68%', '50%'],
      };
    case 'q-d':
      return {
        x: ['85%', '68%', '50%'],
        y: ['50%', '68%', '84%'],
      };
    default:
      return {
        x: ['50%', '50%'],
        y: ['50%', '50%'],
      };
  }
}

function FlowParticles({ edgeId, companyType }) {
  const duration = useMemo(() => getDuration(edgeId, companyType), [edgeId, companyType]);
  const path = useMemo(() => getPath(edgeId), [edgeId]);

  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          key={`${edgeId}-${index}`}
          className="absolute w-2 h-2 rounded-full bg-white/90 shadow-md"
          initial={{ opacity: 0 }}
          animate={{
            opacity: edgeId === 'q-d' ? [0, 1, 0] : [0, 1, 0],
            left: path.x,
            top: path.y,
          }}
          transition={{
            duration,
            // Particles along the Quarantined -> Permanently Damaged path
            // fade out at the damaged state and then re-start, representing
            // new computers getting damaged over time.
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
            delay: (duration / 4) * index,
          }}
          style={{
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}
    </>
  );
}

export default function InfiniticsVisualizer() {
  const [companyType, setCompanyType] = useState('X');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 shadow-inner p-3 sm:p-4 md:p-5 mt-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary-200 uppercase mb-1">Infinitics 8 Visual Learning</p>
          <h4 className="text-base sm:text-lg font-semibold text-white">Cyber State Transitions as a Markov Chain</h4>
        </div>

        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10 self-start sm:self-auto">
          {Object.entries(COMPANY_TYPES).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setCompanyType(key)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-[0.8rem] font-medium transition-colors ${
                companyType === key
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={companyType}
        initial={{ opacity: 0.8, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-800/80 via-slate-900/80 to-slate-950/90 border border-white/10 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.15)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        {/* Flow particles along each transition */}
        {edges.map((edge) => (
          <FlowParticles key={edge.id} edgeId={edge.id} companyType={companyType} />
        ))}

        {/* Node connection hints (glowing segments without arrowheads) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
          {/* Susceptible -> Infected */}
          <line x1="20" y1="38" x2="48" y2="20" stroke="rgba(56,189,248,0.8)" strokeWidth="1.4" />
          {/* Infected -> Quarantined */}
          <line x1="52" y1="20" x2="80" y2="38" stroke="rgba(248,113,113,0.8)" strokeWidth="1.4" />
          {/* Quarantined -> Susceptible */}
          <line x1="80" y1="38" x2="20" y2="38" stroke="rgba(251,191,36,0.75)" strokeWidth="1.4" />
          {/* Quarantined -> Damaged */}
          <line x1="80" y1="38" x2="52" y2="68" stroke="rgba(148,163,184,0.9)" strokeWidth="1.4" />
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute flex flex-col items-center ${
              node.id === 'quarantined' ? 'group' : ''
            }`}
            style={{
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(248,250,252,0.35)',
                  '0 0 0 12px rgba(248,250,252,0)',
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
                delay: node.id === 'infected' ? 0.1 : node.id === 'quarantined' ? 0.3 : 0,
              }}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center border border-white/25`}
            >
              <span className="text-[0.65rem] sm:text-[0.7rem] md:text-xs font-semibold text-white text-center px-2">
                {node.label}
              </span>

              {/* Quarantined tooltip */}
              {node.id === 'quarantined' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full hidden group-hover:flex flex-col items-center z-10">
                  <div className="rounded-xl bg-slate-900/95 border border-amber-400/60 px-3 py-2 shadow-xl max-w-xs">
                    <p className="text-[0.65rem] sm:text-xs text-amber-100 font-medium">
                      Financial Risk Point: Insurance pays out Rp1 per event here.
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-slate-900/95 border-b border-r border-amber-400/60 rotate-45 -mt-1" />
                </div>
              )}
            </motion.div>
          </div>
        ))}

        {/* Legend (overlay on larger screens) */}
        <div className="absolute bottom-3 left-4 right-4 hidden sm:flex flex-wrap items-center justify-between gap-3 text-[0.7rem] sm:text-xs text-slate-200/90">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-sky-400" />
              <span className="text-center">New infections</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-rose-400" />
              <span className="text-center">Detection & quarantine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-amber-400" />
              <span className="text-center">Recovery back to safe</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full bg-slate-400" />
              <span className="text-center">Permanently damaged systems</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legend below chart on mobile for a cleaner popup */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.7rem] text-slate-200/90 sm:hidden">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full bg-sky-400" />
          <span className="text-center">New infections</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full bg-rose-400" />
          <span className="text-center">Detection & quarantine</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full bg-amber-400" />
          <span className="text-center">Recovery back to safe</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full bg-slate-400" />
          <span className="text-center">Permanently damaged systems</span>
        </div>
      </div>

      <p className="mt-3 text-[0.7rem] sm:text-xs text-slate-300/90 italic">
        Model: Exponential Distribution validated via Q-Q Plots.
      </p>
    </motion.div>
  );
}
