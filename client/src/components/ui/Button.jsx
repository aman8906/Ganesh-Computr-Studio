import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  whatsapp: 'btn-whatsapp',
  ghost: 'btn-ghost',
  gradient: 'btn-primary', // gradient IS the primary style in this theme — alias kept for readability
};

let rippleId = 0;

export default function Button({
  as = 'button',
  href,
  variant = 'primary',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) {
  const [ripples, setRipples] = useState([]);
  const classes = `${variants[variant]} relative overflow-hidden ${className}`;
  const Tag = as === 'a' ? motion.a : motion.button;

  const handleClick = (e) => {
    // Spawn a ripple at the click position, then clean it up after the animation ends.
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = rippleId++;
    const ripple = {
      id,
      size,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    props.onClick?.(e);
  };

  const iconEl = loading ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : (
    Icon && <Icon className="h-4 w-4" />
  );

  return (
    <Tag
      href={href}
      whileTap={{ scale: 0.97 }}
      className={classes}
      disabled={loading || props.disabled}
      {...props}
      onClick={handleClick}
    >
      {/* Ripple layer */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
        />
      ))}

      <span className="relative z-10 flex items-center gap-2">
        {iconPosition === 'left' && iconEl}
        {children}
        {iconPosition === 'right' && iconEl}
      </span>
    </Tag>
  );
}