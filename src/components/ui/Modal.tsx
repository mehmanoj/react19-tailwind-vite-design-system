import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Button } from './Button';

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
};

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  primaryAction,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(panelRef, onClose, open);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div
        ref={panelRef}
        className="w-full max-w-xl rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="border-b border-[var(--border)] p-6">
          <h3 id="dialog-title" className="text-xl font-semibold text-[var(--text)]">
            {title}
          </h3>
          {description ? (
            <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
          ) : null}
        </div>

        <div className="p-6">{children}</div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-[var(--border)] p-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          {primaryAction ? (
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
