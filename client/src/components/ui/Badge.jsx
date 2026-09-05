import { motion } from 'framer-motion';
import { Sparkles, Phone, Clock3, PackageCheck, CheckCircle2, XCircle } from 'lucide-react';

const statusConfig = {
  New: {
    style: 'bg-primary-light text-primary',
    dot: 'bg-primary',
    icon: Sparkles,
    pulse: true,
  },
  Contacted: {
    style: 'bg-accent/10 text-accent',
    dot: 'bg-accent',
    icon: Phone,
    pulse: false,
  },
  'In Progress': {
    style: 'bg-warning/10 text-warning',
    dot: 'bg-warning',
    icon: Clock3,
    pulse: false,
  },
  'Waiting for Customer': {
    style: 'bg-warning/10 text-warning',
    dot: 'bg-warning',
    icon: Clock3,
    pulse: false,
  },
  Ready: {
    style: 'bg-success/10 text-success',
    dot: 'bg-success',
    icon: PackageCheck,
    pulse: true,
  },
  Completed: {
    style: 'bg-success/10 text-success',
    dot: 'bg-success',
    icon: CheckCircle2,
    pulse: false,
  },
  Cancelled: {
    style: 'bg-danger/10 text-danger',
    dot: 'bg-danger',
    icon: XCircle,
    pulse: false,
  },
};

const fallback = {
  style: 'bg-surface text-muted',
  dot: 'bg-muted',
  icon: null,
  pulse: false,
};

export default function Badge({ status, children, showIcon = true }) {
  const config = statusConfig[status] || fallback;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.style}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        {config.pulse && (
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${config.dot}`}
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
      </span>

      {showIcon && Icon && <Icon className="h-3.5 w-3.5" />}

      {children || status}
    </span>
  );
}