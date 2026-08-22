/**
 * Shared entrance animations, so every tab enters the same way instead of
 * Projects being the only page with a stagger.
 *
 * Used as variants: put `staggerList` on a container with initial="hidden"
 * animate="show", and `riseIn` on each child. MotionConfig reducedMotion="user"
 * in App.jsx neutralises the transforms for anyone who asks for less motion.
 */

export const staggerList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const riseIn = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

// Headings lead the list rather than arriving with it.
export const headingIn = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};
