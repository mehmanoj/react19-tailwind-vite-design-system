import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Pagination } from '../components/ui/Pagination';
import { Tabs } from '../components/ui/Tabs';

function NavigationDemo() {
  const [page, setPage] = useState(2);

  return (
    <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          Navigation patterns
        </p>
        <Breadcrumbs
          items={[
            { label: 'Library', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Navigation' },
          ]}
        />
      </div>

      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: <p className="text-sm text-[var(--text-muted)]">Use tabs for peer views of the same content set.</p>,
          },
          {
            id: 'usage',
            label: 'Usage',
            content: <p className="text-sm text-[var(--text-muted)]">Keep labels short and avoid too many sibling tabs in one row.</p>,
          },
          {
            id: 'a11y',
            label: 'Accessibility',
            content: <p className="text-sm text-[var(--text-muted)]">Ensure tab order, focus treatment, and labels remain clear in dense layouts.</p>,
          },
        ]}
      />

      <div>
        <p className="mb-3 text-sm font-medium">Pagination</p>
        <Pagination page={page} pageCount={6} onPageChange={setPage} />
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Navigation/Navigation patterns',
  component: NavigationDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NavigationDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
