import { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function StatCounter({ to, suffix = '', label, icon: Icon, progressMax }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const gradientId = useId(); // unique per instance, avoids duplicate SVG ids on the same page

  const max = progressMax || to;

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        setValue(Math.floor(v));
        setProgress(Math.min(v / max, 1));
      },
    });
    return () => controls.stop();
  }, [isInView, to, max]);

  const dashOffset = CIRCUMFERENCE - progress * CIRCUMFERENCE;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative h-20 w-20 mb-2">
        <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="4"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5a623" />
              <stop offset="100%" stopColor="#ff6b57" />
            </linearGradient>
          </defs>
        </svg>

        {Icon && (
          <span className="absolute inset-0 flex items-center justify-center text-white/90">
            <Icon className="h-6 w-6" />
          </span>
        )}
      </div>

      <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-marigold to-coral drop-shadow-[0_0_18px_rgba(255,107,87,0.35)]">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="text-white/70 text-sm mt-1">{label}</p>
    </div>
  );
}