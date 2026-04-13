import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from '../components/ui/Accordion';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Tooltip } from '../components/ui/Tooltip';

function FeedbackDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Alert tone="info" title="Informational" description="Use for neutral product guidance and system messaging." />
        <Alert tone="success" title="Success" description="Use when an operation completed and the user can safely move on." />
        <Alert tone="warning" title="Warning" description="Use when a risky action needs attention or additional review." />
        <Alert tone="danger" title="Danger" description="Use when an action failed or blocked the intended workflow." />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="brand">Stable</Badge>
        <Badge variant="success">Accessible</Badge>
        <Badge variant="warning">Review needed</Badge>
        <Badge variant="danger">Deprecated</Badge>
        <Tooltip content="Use concise helper text to reduce friction on dense screens.">
          <button type="button" className="rounded-full border border-[var(--border)] px-3 py-2 text-sm">
            Hover for tooltip
          </button>
        </Tooltip>
      </div>

      <Accordion
        items={[
          {
            id: '1',
            title: 'When should I use an inline alert?',
            content:
              'Use inline alerts when the message is closely tied to a section, form, or task and does not need global visibility.',
          },
          {
            id: '2',
            title: 'When is a toast better?',
            content:
              'Use toasts for transient confirmations that should not interrupt flow or permanently occupy layout space.',
          },
          {
            id: '3',
            title: 'How should badges behave?',
            content:
              'Badges should summarize compact state. Avoid using them as the sole indicator for critical issues without supporting copy.',
          },
        ]}
      />
    </div>
  );
}

const meta = {
  title: 'Components/Feedback/Status and help',
  component: FeedbackDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FeedbackDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
