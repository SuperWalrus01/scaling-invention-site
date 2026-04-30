import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRUE_DIFFICULTY = 0.7; // hidden ground truth, 0-1

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function generateUserId() {
  const id = Math.floor(100 + Math.random() * 900);
  return `User ${id}`;
}

export default function BayesQuizSimulator() {
  const [mean, setMean] = useState(0.6); // estimated difficulty 0-1
  const [confidence, setConfidence] = useState(0.4); // 0-1, higher = narrower
  const [step, setStep] = useState(1);
  const [flash, setFlash] = useState(null); // 'correct' | 'incorrect' | null
  const [logs, setLogs] = useState([
    'System initialized  Prior difficulty centred at 0.60',
  ]);

  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      const el = logContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  const isTooHard = mean > 0.8;

  const curveAnim = useMemo(() => {
    // Make motion visually obvious: larger horizontal shift and stronger narrowing
    const offset = (mean - 0.5) * 120; // shift curve left/right
    const scaleX = clamp(1 - confidence * 0.6, 0.4, 1); // narrower with more confidence
    return { offset, scaleX };
  }, [mean, confidence]);

  function handleAnswer(isCorrect) {
    setFlash(isCorrect ? 'correct' : 'incorrect');
    // Keep the notification visible a bit longer
    setTimeout(() => setFlash(null), 900);

    setStep((s) => s + 1);

    setMean((prev) => {
      const direction = isCorrect ? -1 : 1; // correct → easier (left), incorrect → harder (right)
      const magnitude = 0.05 + confidence * 0.04;
      return clamp(prev + direction * magnitude, 0.05, 0.95);
    });

    setConfidence((c) => clamp(c + 0.08, 0, 1));

    const userId = generateUserId();
    const newDifficulty = isCorrect
      ? clamp(mean - (0.03 + confidence * 0.02), 0.05, 0.95)
      : clamp(mean + (0.03 + confidence * 0.02), 0.05, 0.95);

    const entry = `${userId} answered ${isCorrect ? '✔ Correct' : '✖ Incorrect'} → Updating posterior → New difficulty: ${newDifficulty.toFixed(2)}`;
    setLogs((prev) => [...prev, entry]);
  }

  const difficultyLabel = `${Math.round(mean * 100)}%`;

  return (
    <div className="mt-4 space-y-4 text-sm">
      {/* Question card + true difficulty bar */}
      <div className="rounded-2xl bg-white/90 border border-sky-100 shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[0.65rem] uppercase tracking-wide text-sky-600 font-semibold">
                Bayesian Logic Simulator
              </p>
              <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                "How hard is this question really?"
              </h4>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-[0.8rem] text-slate-800">
            A mock multiple-choice question streaming live responses from students.
            BayesQuiz uses these responses to continuously update its belief about
            how difficult the item is.
          </div>

          {/* True vs estimated difficulty */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[0.7rem] text-slate-600">
              <span>True difficulty (hidden from system)</span>
              <span className="font-mono text-slate-400">{Math.round(TRUE_DIFFICULTY * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-300/50 via-amber-300/70 to-rose-300/80 opacity-60"
                style={{ width: `${TRUE_DIFFICULTY * 100}%` }}
              />
            </div>
            <p className="text-[0.65rem] text-slate-400 italic">
              This bar is ghosted here for explanation only – the algorithm never
              sees the true difficulty directly.
            </p>
          </div>
        </div>
      {/* Curve + live log row */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 items-stretch">
        {/* Estimated difficulty curve */}
        <div className="rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 shadow-sm p-4 pb-5 space-y-3 flex flex-col lg:h-[360px]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                Estimated Difficulty Distribution
              </h4>
              <p className="text-[0.7rem] text-slate-300">
                Current belief about difficulty based on observed answers.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[0.7rem] text-slate-300">Posterior mean</p>
              <p className="text-sm font-semibold text-emerald-300 font-mono">{difficultyLabel}</p>
            </div>
          </div>

          <div className="relative h-44 w-full overflow-hidden pt-2 pb-4">
            <div className="absolute inset-x-4 bottom-4 top-6 flex items-end z-20 pointer-events-none">
              {/* Axis */}
              <div className="relative w-full h-full border-b border-slate-600/60">
                <div className="absolute left-0 -bottom-4 text-[0.6rem] text-slate-400">Easy</div>
                <div className="absolute right-0 -bottom-4 text-[0.6rem] text-slate-400">Hard</div>
              </div>
            </div>
            <motion.svg
              viewBox="0 0 100 60"
              className="absolute inset-0 mx-auto z-10"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="bayes-curve" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Base reference curve */}
              <path
                d="M0 55 Q 20 5 40 18 T 80 32 T 100 55 L 100 60 L 0 60 Z"
                fill="rgba(30, 64, 175, 0.16)"
                stroke="rgba(148, 163, 184, 0.2)"
              />

              {/* Animated posterior curve */}
              <motion.path
                d="M0 55 Q 20 5 40 18 T 80 32 T 100 55 L 100 60 L 0 60 Z"
                fill="url(#bayes-curve)"
                stroke="#22d3ee"
                strokeWidth="1.4"
                style={{ originX: 0.5, originY: 1 }}
                animate={{
                  x: curveAnim.offset,
                  scaleX: curveAnim.scaleX,
                }}
                transition={{ type: 'spring', stiffness: 70, damping: 16 }}
              />
            </motion.svg>

            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-[0.65rem] text-cyan-200 font-medium z-20">
              Current belief (posterior)
            </div>
          </div>

          {/* Interaction buttons + reserved space for notification so layout doesn't shift */}
          <div className="mt-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handleAnswer(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white text-[0.8rem] font-medium px-3 py-2 shadow-sm transition-colors"
              >
                <span className="text-xs">✔</span>
                <span>Student answers correctly</span>
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500/90 hover:bg-rose-500 text-white text-[0.8rem] font-medium px-3 py-2 shadow-sm transition-colors"
              >
                <span className="text-xs">✖</span>
                <span>Student answers incorrectly</span>
              </button>
            </div>

            {/* Flash feedback */}
            <div className="min-h-[2.5rem] flex items-center justify-center">
              <AnimatePresence>
                {flash && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-[0.8rem]"
                  >
                    {flash === 'correct' ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 whitespace-nowrap">
                        ✔ Posterior updated: question estimated easier.
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/40 whitespace-nowrap">
                        ✖ Posterior updated: question estimated harder.
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Live data feed */}
        <div className="rounded-2xl bg-slate-900 text-slate-100 border border-slate-700 shadow-sm p-4 flex flex-col h-64 sm:h-72 lg:h-[360px]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Live Log (Firebase-style)
            </h4>
            <p className="text-[0.7rem] text-slate-300">
              Streaming events as each student response updates the posterior.
            </p>
          </div>
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40 font-mono">
            bayesquiz/events
          </span>
        </div>

        <div className="flex-1 rounded-xl bg-slate-950/60 border border-slate-800 overflow-hidden text-[0.7rem] font-mono">
          <div
            ref={logContainerRef}
            className="h-full overflow-y-auto px-3 py-2 space-y-1"
          >
            {logs.map((line, idx) => (
              <div key={idx} className="text-slate-300/90 whitespace-pre-wrap">
                {`> ${line}`}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Teacher insight panel below everything */}
      <AnimatePresence>
        {isTooHard && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-xl border border-amber-300/80 bg-amber-50/90 px-3 py-2 flex items-start gap-2 text-[0.75rem] text-amber-900 shadow-sm"
          >
            <span className="mt-0.5 text-xs">⚠</span>
            <div>
              <p className="font-semibold">Alert: topic flagged for review</p>
              <p>
                Estimated difficulty has climbed above 80% failure. BayesQuiz
                would highlight this skill for curriculum intervention.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
