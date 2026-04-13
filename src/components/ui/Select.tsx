import { type SelectHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  className,
  options,
  placeholder,
  value,
  defaultValue,
  ...props
}: SelectProps) {
  const initialValue = value === undefined ? defaultValue ?? '' : undefined;

  return (
    <div className="relative">
      <select
        className={cx(
          'h-11 w-full appearance-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 pr-10 text-sm text-[var(--text)] shadow-[var(--shadow-sm)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
          className,
        )}
        value={value}
        defaultValue={initialValue}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 stroke-current stroke-2">
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
