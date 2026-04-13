import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cx(
      'min-h-28 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm text-[var(--text)] shadow-[var(--shadow-sm)]',
      'placeholder:text-[var(--text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
      className,
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
