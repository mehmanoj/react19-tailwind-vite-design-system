import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  StatCard,
} from '../components/ui/Card';

function IntroductionPage() {
  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-[var(--border)] bg-[var(--hero)]">
          <Badge variant="brand">Storybook included</Badge>
          <CardTitle className="mt-4 text-3xl">
            React 19 design system with Storybook, Tailwind, and Vite
          </CardTitle>
          <CardDescription className="max-w-3xl text-base">
            This Storybook turns the starter into a component workshop for development,
            documentation, accessibility review, and design-system adoption.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Component docs"
              value="Autodocs"
              hint="Every tagged story doubles as living documentation."
              trend={<Badge variant="success">Enabled</Badge>}
            />
            <StatCard
              label="Theme review"
              value="Light / Dark"
              hint="Use the toolbar to validate visual consistency quickly."
              trend={<Badge variant="brand">Toolbar</Badge>}
            />
            <StatCard
              label="Accessibility"
              value="A11y addon"
              hint="Review common issues from the Storybook panel while building."
              trend={<Badge variant="warning">Included</Badge>}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommended workflow</CardTitle>
              <CardDescription>
                Use Storybook as the day-to-day surface for evolving your system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[var(--text-muted)]">
              <p>1. Build primitives in isolation.</p>
              <p>2. Add edge-state stories before product integration.</p>
              <p>3. Review docs, controls, and accessibility together.</p>
              <p>4. Promote stable stories into your team’s source of truth.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Alert
          tone="info"
          title="What was added"
          description="Storybook config, themed preview decorators, and component stories for actions, forms, feedback, data display, navigation, and overlays."
        />

        <div className="flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button variant="outline">Secondary action</Button>
          <Button variant="ghost">Tertiary action</Button>
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'Introduction/Overview',
  component: IntroductionPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IntroductionPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
