import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/ui/Button';
import { Checkbox } from '../components/ui/Checkbox';
import { Input } from '../components/ui/Input';
import { RadioGroup } from '../components/ui/RadioGroup';
import { Select } from '../components/ui/Select';
import { Switch } from '../components/ui/Switch';
import { Textarea } from '../components/ui/Textarea';

function FormDemo() {
  const [marketing, setMarketing] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [environment, setEnvironment] = useState('production');
  const [channel, setChannel] = useState('email');

  return (
    <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Project name</label>
          <Input placeholder="Checkout redesign" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Environment</label>
          <Select
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            options={[
              { label: 'Production', value: 'production' },
              { label: 'Staging', value: 'staging' },
              { label: 'Preview', value: 'preview' },
            ]}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Release notes</label>
          <Textarea placeholder="Summarize changes, risks, and rollback notes." />
        </div>
      </div>

      <div className="space-y-4">
        <RadioGroup
          name="channel"
          value={channel}
          onChange={setChannel}
          options={[
            { label: 'Email', value: 'email', description: 'Best for scheduled rollouts.' },
            { label: 'Slack', value: 'slack', description: 'Best for team coordination.' },
            { label: 'In-product', value: 'product', description: 'Best for launch guidance.' },
          ]}
        />

        <Checkbox
          checked={marketing}
          onChange={setMarketing}
          label="Notify customer success"
          description="Send a heads-up to internal stakeholders before deployment."
        />

        <div className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
          <Switch
            checked={notifications}
            onCheckedChange={setNotifications}
            label="Enable launch monitoring"
          />
        </div>

        <div className="flex gap-3">
          <Button>Submit</Button>
          <Button variant="outline">Save draft</Button>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/Forms/Form controls',
  component: FormDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
