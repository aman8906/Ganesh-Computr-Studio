import { useState, cloneElement, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// ---- Base controls — now forward their ref to the actual DOM element.
// This matters because react-hook-form's `register()` returns a `ref` that it
// uses to read/reset the native input directly (these are uncontrolled fields).
// Without forwardRef, that ref silently fails to attach, and calling reset()
// after a successful submit won't visually clear the fields. ----

export const Input = forwardRef(function Input({ id, error, placeholder, ...props }, ref) {
  return (
    <input
      ref={ref}
      id={id}
      placeholder=" "
      className={`input-field peer ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea({ id, error, placeholder, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      id={id}
      rows={4}
      placeholder=" "
      className={`input-field peer h-auto py-2.5 resize-none ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select({ id, error, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      id={id}
      className={`input-field peer bg-white ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
      {...props}
    >
      {children}
    </select>
  );
});

// ---- Field: wraps a single control, adds floating label, success check,
// animated error, and (for Textarea with maxLength) a character counter. ----
export function Field({ label, htmlFor, required, error, children, hint }) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(Boolean(children?.props?.defaultValue || children?.props?.value));
  const [length, setLength] = useState((children?.props?.defaultValue || '').length);

  const isTextarea = children?.type === Textarea;
  const isSelect = children?.type === Select;
  const maxLength = children?.props?.maxLength;

  const enhancedChild = cloneElement(children, {
    onFocus: (e) => {
      setFocused(true);
      children.props.onFocus?.(e);
    },
    onBlur: (e) => {
      setFocused(false);
      setFilled(e.target.value.length > 0);
      children.props.onBlur?.(e);
    },
    onChange: (e) => {
      setFilled(e.target.value.length > 0);
      setLength(e.target.value.length);
      children.props.onChange?.(e);
    },
  });

  const labelUp = focused || filled || isSelect;
  const showCheck = filled && !error && !focused && !isSelect;

  return (
    <div>
      <div className="relative">
        {enhancedChild}

        <motion.label
          htmlFor={htmlFor}
          initial={false}
          animate={labelUp ? 'up' : 'down'}
          variants={{
            up: { y: -21, scale: 0.82, color: error ? 'var(--color-danger)' : '#0b7c7c' },
            down: { y: 0, scale: 1, color: '#6b7280' },
          }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 origin-left pointer-events-none bg-white px-1 text-[15px] font-medium"
        >
          {label} {required && <span className="text-danger">*</span>}
        </motion.label>

        <AnimatePresence>
          {showCheck && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-success"
            >
              <CheckCircle2 className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-start justify-between mt-1 gap-3">
        <div className="flex-1">
          {hint && !error && <p className="text-sm text-muted">{hint}</p>}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="error-text"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {isTextarea && maxLength && (
          <span className={`text-xs shrink-0 pt-0.5 ${length > maxLength * 0.9 ? 'text-warning' : 'text-muted'}`}>
            {length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}