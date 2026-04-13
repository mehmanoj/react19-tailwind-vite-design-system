import { useId, useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(items[0]?.id ?? null);
  const accordionId = useId();

  return (
    <div className="divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
      {items.map((item) => {
        const isOpen = item.id === openItem;
        const triggerId = `${accordionId}-${item.id}-trigger`;
        const panelId = `${accordionId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenItem(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="font-medium text-[var(--text)]">{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    'text-lg text-[var(--text-muted)] transition',
                    isOpen && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
            </h3>

            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="px-5 pb-5 text-sm leading-7 text-[var(--text-muted)]"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
