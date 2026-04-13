import { cx } from '../../lib/cx';

type SidebarNavProps = {
  items: Array<{
    id: string;
    label: string;
  }>;
};

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <aside className="sticky top-24 hidden h-fit xl:block">
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]">
        <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          Sections
        </p>
        <nav className="mt-3 flex flex-col gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cx(
                'rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text-muted)] transition',
                'hover:bg-[var(--surface-muted)] hover:text-[var(--text)]',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
