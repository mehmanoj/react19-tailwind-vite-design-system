import { type HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

type AlertTone = 'info' | 'success' | 'warning' | 'danger';

const toneClasses: Record<AlertTone, string> = {
  info: 'border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-900 dark:bg-brand-950/30 dark:text-brand-100',
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100',
  warning:
    'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100',
  danger:
    'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100',
};

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  tone?: AlertTone;
};

export function Alert({
  className,
  title,
  description,
  tone = 'info',
  ...props
}: AlertProps) {
  return (
    <div
      className={cx(
        'rounded-[var(--radius-lg)] border px-4 py-4 shadow-[var(--shadow-sm)]',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm opacity-90">{description}</p>
    </div>
  );
}
