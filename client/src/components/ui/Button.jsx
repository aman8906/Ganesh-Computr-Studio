import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  whatsapp: 'btn-whatsapp',
};

export default function Button({
  as = 'button',
  href,
  variant = 'primary',
  loading = false,
  icon: Icon,
  children,
  className = '',
  ...props
}) {
  const classes = `${variants[variant]} ${className}`;
  const Tag = as === 'a' ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      whileTap={{ scale: 0.97 }}
      className={classes}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </Tag>
  );
}
