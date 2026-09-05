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

// ---- New: depth & motion accents — use on top of the entrances above, not instead of them ----

// 3D tilt hover — pair with `style={{ perspective: 1000 }}` on the parent and
// `style={{ transformStyle: 'preserve-3d' }}` on this element.
// Usage: <motion.div whileHover="hover" initial="rest" variants={tilt3D}>
export const tilt3D = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    rotateX: -4,
    rotateY: 4,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 220, damping: 16 },
  },
};

// Bounce-in entrance — for icons, badges, success states, anything that should
// feel "alive" rather than just fade in. Heavier than heroItem, use sparingly
// (one hero icon per screen, not a whole grid).
export const bounceIn = {
  hidden: { opacity: 0, scale: 0.4, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 16 },
  },
};

// Gentle infinite float — for floating badges/cards that should feel light
// (e.g. the "Request confirmed" card on the Home hero). Loops forever, so
// only use on one or two small elements per screen.
export const floatY = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Pulsing glow ring — for a CTA that should draw the eye without being a full
// animation (e.g. a sticky "Request Service" button). Use on a pseudo-element
// or an absolutely-positioned sibling behind the button, not the button itself.
export const pulseGlow = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.5, 0, 0.5],
    transition: { duration: 2, repeat: Infinity, ease: 'easeOut' },
  },
};

// Scale + fade — softer than gridItem, good for modals/lightboxes/tooltips
// that shouldn't travel far, just materialize in place.
export const scaleFade = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};