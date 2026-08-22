import { useEffect } from 'react';
import { motion } from 'framer-motion';

const NAME = 'Keenan Jusak';
const HOLD_MS = 1500;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
  exit: { transition: { duration: 0.1 } },
};

const letter = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * First-visit splash. Shown once per browser session and skipped entirely for
 * anyone who prefers reduced motion; both decisions are made in App.jsx.
 * Dismissable early with a click or any key, so it never feels like a wall.
 */
export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, HOLD_MS);
    const skip = () => onDone();

    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      aria-hidden="true"
    >
      {/* Same pale wash the profile tab uses, so the hand-off is seamless */}
      <div className="absolute inset-0 stats-grid-bg opacity-40" />

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="relative text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent px-6 text-center"
      >
        {NAME.split('').map((char, i) => (
          <motion.span key={i} variants={letter} className="inline-block">
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        className="relative mt-6 h-[3px] w-32 sm:w-44 overflow-hidden rounded-full bg-primary-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        <motion.div
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary-700 to-primary-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: (HOLD_MS - 500) / 1000, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>

      <motion.p
        className="relative mt-5 text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.4 } }}
      >
        Mathematics &amp; Statistics
      </motion.p>
    </motion.div>
  );
}
