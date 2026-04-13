import { createPortal } from 'react-dom';
import { Button } from './Button';
import { cx } from '../../lib/cx';

export type ToastItem = {
  id: string;
  title: string;
  description: string;
  duration?: number;
  tone?: 'neutral' | 'success' | 'danger';
};

const toneClasses: Record<NonNullable<ToastItem['tone']>, string> = {
  neutral: 'border-slate-200 dark:border-slate-700',
  success: 'border-emerald-300 dark:border-emerald-700',
  danger: 'border-red-300 dark:border-red-700',
};

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4"
    >
      <div className="flex w-full max-w-md flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role={toast.tone === 'danger' ? 'alert' : 'status'}
            className={cx(
              'pointer-events-auto rounded-[var(--radius-lg)] border bg-[var(--surface)] p-4 shadow-[var(--shadow-lg)]',
              toneClasses[toast.tone ?? 'neutral'],
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-[var(--text)]">{toast.title}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {toast.description}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onDismiss(toast.id)}>
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>,
    document.body,
  );
}
