import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

export default function StatCounter({ to, suffix = '', label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, to]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold text-white">
        {value.toLocaleString()}{suffix}
      </p>
      <p className="text-white/70 text-sm mt-1">{label}</p>
    </div>
  );
}
