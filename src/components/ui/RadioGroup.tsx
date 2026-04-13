import { useId } from 'react';
import { cx } from '../../lib/cx';

type RadioOption = {
  label: string;
  description?: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  legend?: string;
};

export function RadioGroup({ name, value, onChange, options, legend }: RadioGroupProps) {
  const groupId = useId();

  return (
    <fieldset className="grid gap-3">
      {legend ? (
        <legend className="mb-1 text-sm font-medium text-[var(--text)]">{legend}</legend>
      ) : null}
      {options.map((option) => {
        const isChecked = value === option.value;
        const inputId = `${groupId}-${option.value}`;
        const descriptionId = option.description ? `${inputId}-description` : undefined;

        return (
          <label
            htmlFor={inputId}
            key={option.value}
            className={cx(
              'flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border p-4 transition',
              isChecked
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40'
                : 'border-[var(--border)] bg-[var(--surface)]',
            )}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => onChange(option.value)}
              className="mt-1 h-4 w-4 border-[var(--border)] text-brand-600 focus:ring-brand-500"
              aria-describedby={descriptionId}
            />
            <span className="space-y-1">
              <span className="block text-sm font-medium text-[var(--text)]">
                {option.label}
              </span>
              {option.description ? (
                <span
                  id={descriptionId}
                  className="block text-sm text-[var(--text-muted)]"
                >
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
