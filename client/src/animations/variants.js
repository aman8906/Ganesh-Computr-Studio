// Shared Framer Motion variants — used sparingly and deliberately.
// One orchestrated entrance per section, not scattered per-element effects.

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const heroReveal = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const heroItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerGrid = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

export const gridItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const drawerVariants = {
  closed: { x: '100%' },
  open: { x: 0, transition: { type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

export const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};
