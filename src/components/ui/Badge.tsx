import { type HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-200',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200',
  danger: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200',
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
