import { useRef, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'bottom';
};

export function Tooltip({
  content,
  children,
  side = 'top',
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const show = () => {
    timeoutRef.current = window.setTimeout(() => setOpen(true), 100);
  };

  const hide = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setOpen(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open ? (
        <span
          role="tooltip"
          className={cx(
            'absolute left-1/2 z-20 -translate-x-1/2 rounded-[var(--radius-sm)] bg-slate-950 px-3 py-2 text-xs text-white shadow-[var(--shadow-md)] dark:bg-white dark:text-slate-950',
            side === 'top' ? '-top-11' : 'top-11',
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
