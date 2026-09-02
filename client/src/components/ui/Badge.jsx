const statusStyles = {
  New: 'bg-primary-light text-primary',
  Contacted: 'bg-accent/10 text-accent',
  'In Progress': 'bg-warning/10 text-warning',
  Waiting: 'bg-warning/10 text-warning',
  Ready: 'bg-success/10 text-success',
  Completed: 'bg-success/10 text-success',
  Cancelled: 'bg-danger/10 text-danger',
};

export default function Badge({ status, children }) {
  const style = statusStyles[status] || 'bg-surface text-muted';
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${style}`}>
      {children || status}
    </span>
  );
}
