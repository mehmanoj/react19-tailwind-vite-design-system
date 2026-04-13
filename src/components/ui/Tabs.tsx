import { useState, type ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultTab?: string;
};

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? '');

  return (
    <div>
      <div className="inline-flex flex-wrap gap-2 rounded-[var(--radius-lg)] bg-[var(--surface-muted)] p-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cx(
                'rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-sm)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
