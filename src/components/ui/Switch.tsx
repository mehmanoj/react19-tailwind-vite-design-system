import { cx } from '../../lib/cx';

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
};

export function Switch({
  checked,
  onCheckedChange,
  label,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="inline-flex items-center gap-3"
    >
      <span
        className={cx(
          'relative inline-flex h-7 w-12 rounded-full transition',
          checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700',
        )}
      >
        <span
          className={cx(
            'absolute top-1 h-5 w-5 rounded-full bg-white transition',
            checked ? 'left-6' : 'left-1',
          )}
        />
      </span>
      {label ? <span className="text-sm text-[var(--text)]">{label}</span> : null}
    </button>
  );
}
