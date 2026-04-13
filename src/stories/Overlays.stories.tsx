import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';

function OverlayDemo() {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Button
        variant="outline"
        onClick={() =>
          showToast({
            title: 'Release scheduled',
            description: 'The deployment window was queued successfully.',
            tone: 'success',
          })
        }
      >
        Trigger toast
      </Button>

      <Modal
        open={open}
        title="Schedule release"
        description="Confirm the release window and notify stakeholders."
        onClose={() => setOpen(false)}
        primaryAction={{
          label: 'Confirm release',
          onClick: () => {
            setOpen(false);
            showToast({
              title: 'Release confirmed',
              description: 'Stakeholders were notified and monitoring was enabled.',
              tone: 'success',
            });
          },
        }}
      >
        <div className="space-y-3 text-sm text-[var(--text-muted)]">
          <p>Use modals for focused, interruptive tasks that require acknowledgment.</p>
          <p>
            Pair them with clear titles, concise descriptions, and action labels that
            reduce ambiguity.
          </p>
        </div>
      </Modal>
    </div>
  );
}

const meta = {
  title: 'Components/Overlays/Modal and toast',
  component: OverlayDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OverlayDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};
