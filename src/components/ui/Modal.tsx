import { useEffect, useId, useRef, type ReactNode } from 'react';
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

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  primaryAction,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const accessibleDescriptionId = description ? descriptionId : undefined;

  useOnClickOutside(panelRef, onClose, open);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocusedElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusableElements = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
    );
    (focusableElements[0] ?? panelRef.current)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      const first = nodes[0] ?? panelRef.current;
      const last = nodes[nodes.length - 1] ?? panelRef.current;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocusedElement?.focus();
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
        aria-labelledby={titleId}
        aria-describedby={accessibleDescriptionId}
      >
        <div className="border-b border-[var(--border)] p-6">
          <h3 id={titleId} className="text-xl font-semibold text-[var(--text)]">
            {title}
          </h3>
          {description ? (
            <p id={descriptionId} className="mt-2 text-sm text-[var(--text-muted)]">
              {description}
            </p>
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
