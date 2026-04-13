import { useId, useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
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
  const fallbackTab = useMemo(() => defaultTab ?? tabs[0]?.id ?? '', [defaultTab, tabs]);
  const [activeTab, setActiveTab] = useState(fallbackTab);
  const tabGroupId = useId();

  const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const moveToIndex = (index: number) => {
    const nextTab = tabs[index];
    if (nextTab) {
      setActiveTab(nextTab.id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        moveToIndex((index + 1) % tabs.length);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        moveToIndex((index - 1 + tabs.length) % tabs.length);
        break;
      case 'Home':
        event.preventDefault();
        moveToIndex(0);
        break;
      case 'End':
        event.preventDefault();
        moveToIndex(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  if (tabs.length === 0) {
    return <div />;
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="inline-flex flex-wrap gap-2 rounded-[var(--radius-lg)] bg-[var(--surface-muted)] p-1"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          const tabId = `${tabGroupId}-${tab.id}-tab`;
          const panelId = `${tabGroupId}-${tab.id}-panel`;

          return (
            <button
              key={tab.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
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

      <div
        id={`${tabGroupId}-${tabs[currentIndex]?.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${tabGroupId}-${tabs[currentIndex]?.id}-tab`}
        className="mt-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
