import { type ChangeEvent } from 'react';
import { cx } from '../../lib/cx';

type CheckboxProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      className={cx(
        'flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border)] p-4',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-[var(--border)] text-brand-600 focus:ring-brand-500"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="space-y-1">
        <span className="block text-sm font-medium text-[var(--text)]">{label}</span>
        {description ? (
          <span className="block text-sm text-[var(--text-muted)]">{description}</span>
        ) : null}
      </span>
    </label>
  );
}
