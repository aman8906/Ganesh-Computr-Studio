export function Field({ label, htmlFor, required, error, children, hint }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-sm text-muted mt-1">{hint}</p>}
      {error && <p className="error-text" role="alert">{error}</p>}
    </div>
  );
}

export function Input({ id, error, ...props }) {
  return (
    <input
      id={id}
      className={`input-field ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
      {...props}
    />
  );
}

export function Textarea({ id, error, ...props }) {
  return (
    <textarea
      id={id}
      rows={4}
      className={`input-field h-auto py-2.5 resize-none ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
      {...props}
    />
  );
}

export function Select({ id, error, children, ...props }) {
  return (
    <select
      id={id}
      className={`input-field bg-white ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
      {...props}
    >
      {children}
    </select>
  );
}
