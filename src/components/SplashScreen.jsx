import { useEffect, useMemo, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const NAME = 'Keenan Jusak';
const HOLD_MS = 1500;
const LETTERS = [...NAME];

// Scramble pool draws from the subject's own field, so the name resolves out
// of math and stats symbols rather than arbitrary letters.
const SYMBOLS = ['Σ', 'π', 'μ', 'σ', '∞', '√', '∫', 'Ω', 'λ', 'θ', 'Δ', '±', '≈', '∂', 'ξ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DECODE_INITIAL_DELAY = 80;
const DECODE_STAGGER = 40;
const DECODE_SYMBOL_TICK = 40;

// Same beats, no travel: the name still fades in letter by letter but nothing
// slides, so the splash stays visible for people who ask for reduced motion.
const calmContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
  exit: { transition: { duration: 0.1 } },
};

const calmLetter = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } },
};

// Cycles each letter through scramble symbols before locking to its real
// character, staggered left to right. Driven by refs rather than React state
// — at a 40ms tick across 12 letters, state updates would be a re-render
// storm. Every letter starts pre-seeded with a symbol (see the JSX below) so
// there's never a blank or "real answer" frame before the first tick lands.
//
// Each letter gets its own gradient slice (a background-clip:text of its own,
// not inherited from the h1) instead of one gradient clipped through from an
// ancestor: an ancestor's background-clip:text silently drops the paint over
// any descendant currently mid-transform in Chromium — real, reproduced with
// both the rotateX flip and this scale-settle. Re-measured every frame,
// because glyph widths jitter as symbols cycle, shifting every letter after.
function useDecodeLetters(active) {
  const nameElRef = useRef(null);
  const letterRefs = useRef([]);
  const startRef = useRef(null);
  const lastTickRef = useRef(LETTERS.map(() => -Infinity));
  const lockedRef = useRef(LETTERS.map(() => false));

  useAnimationFrame((t) => {
    if (!active) return;
    if (startRef.current === null) startRef.current = t;
    const elapsed = t - startRef.current;

    LETTERS.forEach((ch, i) => {
      const el = letterRefs.current[i];
      if (!el || ch === ' ') return;
      const lockAt = DECODE_INITIAL_DELAY + i * DECODE_STAGGER;
      if (elapsed >= lockAt) {
        if (!lockedRef.current[i]) {
          el.textContent = ch;
          el.classList.add('decode-settle');
          lockedRef.current[i] = true;
        }
        return;
      }
      if (elapsed - lastTickRef.current[i] >= DECODE_SYMBOL_TICK) {
        el.textContent = SYMBOLS[(Math.random() * SYMBOLS.length) | 0];
        lastTickRef.current[i] = elapsed;
      }
    });

    const nameEl = nameElRef.current;
    if (nameEl) {
      const totalWidth = nameEl.offsetWidth;
      letterRefs.current.forEach((el) => {
        if (!el) return;
        el.style.backgroundSize = `${totalWidth}px 100%`;
        el.style.backgroundPosition = `${-el.offsetLeft}px 0`;
      });
    }
  });

  return { nameElRef, letterRefs };
}

/**
 * First-visit splash, shown once per browser session (gated in App.jsx).
 * Dismissable early with a click or any key, so it never feels like a wall.
 */
export default function SplashScreen({ onDone }) {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const { nameElRef, letterRefs } = useDecodeLetters(!reducedMotion);

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

      {reducedMotion ? (
        <motion.h1
          variants={calmContainer}
          initial="hidden"
          animate="show"
          className="relative text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent px-6 text-center"
        >
          {LETTERS.map((char, i) => (
            <motion.span key={i} variants={calmLetter} className="inline-block">
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h1>
      ) : (
        <h1
          ref={nameElRef}
          className="relative text-4xl sm:text-6xl md:text-7xl font-bold px-6 text-center"
        >
          {LETTERS.map((char, i) =>
            char === ' ' ? (
              <span key={i} className="inline-block">{' '}</span>
            ) : (
              <span
                key={i}
                ref={(el) => (letterRefs.current[i] = el)}
                className="inline-block"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #0369a1, #0ea5e9)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {SYMBOLS[i % SYMBOLS.length]}
              </span>
            ),
          )}
        </h1>
      )}

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
