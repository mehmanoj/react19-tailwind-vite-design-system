import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  StatCard,
} from '../components/ui/Card';
import { DataTable } from '../components/ui/Table';

const tableRows = [
  { component: 'Button', status: 'Ready', owner: 'Core UI', usage: '142 screens' },
  { component: 'Input', status: 'Ready', owner: 'Growth', usage: '81 screens' },
  { component: 'Modal', status: 'Beta', owner: 'Platform', usage: '24 screens' },
  { component: 'Tooltip', status: 'Ready', owner: 'Analytics', usage: '31 screens' },
];

function DataDisplayDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Adoption"
          value="81%"
          hint="Teams using the shared library"
          trend={<Badge variant="success">+12% QoQ</Badge>}
        />
        <StatCard
          label="Coverage"
          value="34"
          hint="Documented components"
          trend={<Badge variant="brand">Library</Badge>}
        />
        <StatCard
          label="Open requests"
          value="7"
          hint="Design-system issues in backlog"
          trend={<Badge variant="warning">Planned</Badge>}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component ownership</CardTitle>
          <CardDescription>
            Example of table, avatar, and status indicators working together.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Avatar name="Design Systems" size="lg" />
            <Avatar name="Growth Team" />
            <Avatar name="Analytics Platform" />
          </div>

          <DataTable
            columns={[
              { key: 'component', label: 'Component' },
              { key: 'status', label: 'Status' },
              { key: 'owner', label: 'Owner' },
              { key: 'usage', label: 'Usage', align: 'right' },
            ]}
            rows={tableRows}
          />
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: 'Components/Data Display/Cards and tables',
  component: DataDisplayDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DataDisplayDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
