import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, Cpu, LineChart } from 'lucide-react';

const stages = [
  {
    id: 'raw',
    title: 'Raw Input',
    label: 'Feature Engineering',
    icon: SlidersHorizontal,
    description:
      'Engineered technical indicators, rolling statistics, and lagged returns to capture short-term and long-term crypto dynamics.',
  },
  {
    id: 'pca',
    title: 'Dimensionality Reduction',
    label: 'PCA',
    icon: Search,
    description:
      'Compressed hundreds of noisy features into a few principal components that explain most market variance.',
  },
  {
    id: 'ensemble',
    title: 'The Ensemble',
    label: 'LightGBM + XGBoost',
    icon: Cpu,
    description:
      'Trained gradient-boosted trees on principal components, using LightGBM and XGBoost ensembles to balance bias and variance.',
  },
  {
    id: 'forecast',
    title: 'Output',
    label: 'Forecast',
    icon: LineChart,
    description:
      'Generated probabilistic forecasts for future price movement, tuned for directional accuracy and robustness.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
};

export default function DRWPipelineVisualizer() {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      className="w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/60 shadow-inner p-3 sm:p-4 md:p-5 mt-4"
    >
      <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-emerald-300/90 uppercase mb-1">
            DRW Forecasting Visual
          </p>
          <h4 className="text-base sm:text-lg font-semibold text-slate-50">
            Simple Data Pipeline
          </h4>
        </div>

        {/* Horizontal pipeline */}
        <div className="relative w-full">
          {/* Subtle animated flow bar under the pipeline */}
          <motion.div
            className="pointer-events-none absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-sky-500/40 via-emerald-400/70 to-sky-500/40"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.4, 0.9, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage((prev) => (prev === stage.id ? null : stage.id))}
                  className="group flex flex-col items-center gap-2 focus:outline-none"
                >
                  <motion.div
                    className="flex flex-col items-center justify-center rounded-2xl bg-slate-900/80 border shadow-lg w-full h-20 sm:h-24 md:h-24"
                    animate={{
                      borderColor: isActive ? '#22c55e' : 'rgba(148, 163, 184, 0.6)',
                      boxShadow: isActive
                        ? '0 0 18px rgba(16,185,129,0.6)'
                        : '0 0 10px rgba(15,23,42,0.8)',
                      scale: isActive ? 1.04 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800/90 mb-1 text-base sm:text-lg">
                      {(() => {
                        const Icon = stage.icon;
                        return <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-300" />;
                      })()}
                    </div>
                    <span className="text-[0.7rem] sm:text-xs font-semibold text-slate-50 text-center">
                      {stage.label}
                    </span>
                    <span className="text-[0.6rem] sm:text-[0.65rem] text-slate-300/90 text-center">
                      {stage.title}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail cards under pipeline */}
      <div className="mt-2 sm:mt-3 min-h-[3rem]">
        <AnimatePresence initial={false} mode="wait">
          {activeStage && (
            <motion.div
              key={activeStage}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-slate-700/70 bg-slate-900/85 px-3 py-2.5 sm:px-4 sm:py-3 text-[0.7rem] sm:text-xs text-slate-100 shadow-lg"
            >
              {(() => {
                const stage = stages.find((s) => s.id === activeStage);
                if (!stage) return null;
                return (
                  <>
                    <p className="font-semibold text-emerald-300 mb-1 text-[0.7rem] sm:text-xs">
                      {stage.title} · {stage.label}
                    </p>
                    <p className="leading-relaxed text-slate-200/90">{stage.description}</p>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
