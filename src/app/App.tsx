import { useMemo, useState } from 'react';
import { Section } from '../components/layout/Section';
import { SidebarNav } from '../components/layout/SidebarNav';
import { TopBar } from '../components/layout/TopBar';
import { Alert } from '../components/ui/Alert';
import { Accordion } from '../components/ui/Accordion';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StatCard,
} from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { RadioGroup } from '../components/ui/RadioGroup';
import { Select } from '../components/ui/Select';
import { Switch } from '../components/ui/Switch';
import { DataTable } from '../components/ui/Table';
import { Tabs } from '../components/ui/Tabs';
import { Textarea } from '../components/ui/Textarea';
import { Tooltip } from '../components/ui/Tooltip';
import { useToast } from '../contexts/ToastContext';
import {
  colorTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyScale,
} from '../data/tokens';

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'actions', label: 'Actions' },
  { id: 'forms', label: 'Forms' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data-display', label: 'Data display' },
  { id: 'overlays', label: 'Overlays' },
];

export function App() {
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [environment, setEnvironment] = useState('production');
  const [deploymentTarget, setDeploymentTarget] = useState('web');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(2);
  const { showToast } = useToast();

  const tableRows = useMemo(
    () => [
      { component: 'Button', status: 'Ready', owner: 'Core UI', usage: '142 views' },
      { component: 'Card', status: 'Ready', owner: 'Dashboard', usage: '98 views' },
      { component: 'Modal', status: 'Beta', owner: 'Growth', usage: '34 views' },
      { component: 'Tooltip', status: 'Ready', owner: 'Analytics', usage: '67 views' },
      { component: 'Pagination', status: 'Ready', owner: 'Commerce', usage: '24 views' },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <TopBar />

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 xl:grid-cols-[250px_minmax(0,1fr)]">
        <SidebarNav items={navItems} />

        <div className="space-y-14">
          <Section
            id="overview"
            eyebrow="Overview"
            title="A practical starter for a scalable design system"
            description="This starter combines product-level UI foundations, accessible primitives, semantic tokens, and a documentation shell so teams can move from one-off screens to repeatable patterns."
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="overflow-hidden">
                <CardHeader className="border-b border-[var(--border)] bg-[var(--hero)]">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <Badge variant="brand">Composed example</Badge>
                      <CardTitle className="mt-3 text-2xl">
                        Dashboard shell built from the same primitives
                      </CardTitle>
                      <CardDescription className="mt-2 max-w-2xl">
                        A healthy design system is not just a bag of buttons. It
                        should compose into real product experiences with clear
                        hierarchy, consistent spacing, and a themeable visual language.
                      </CardDescription>
                    </div>

                    <Avatar name="Design Systems Team" size="lg" />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <StatCard
                      label="Adoption"
                      value="81%"
                      hint="Teams using shared primitives"
                      trend={<Badge variant="success">+12% QoQ</Badge>}
                    />
                    <StatCard
                      label="Build speed"
                      value="2.4x"
                      hint="Faster than bespoke screen work"
                      trend={<Badge variant="brand">Operational gain</Badge>}
                    />
                    <StatCard
                      label="Theme coverage"
                      value="100%"
                      hint="Light + dark ready foundations"
                      trend={<Badge variant="warning">Watch contrast</Badge>}
                    />
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
                    <div className="rounded-[var(--radius-xl)] border border-[var(--border)] p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">Recent system activity</h3>
                          <p className="text-sm text-[var(--text-muted)]">
                            Example table, badges, and action buttons.
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            showToast({
                              title: 'Starter action fired',
                              description: 'Wire this into your own analytics, API, or workflow.',
                              tone: 'success',
                            })
                          }
                        >
                          New release
                        </Button>
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
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Starter guidance</CardTitle>
                        <CardDescription>
                          These defaults keep the system extensible without becoming heavy.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Alert
                          tone="info"
                          title="Semantic first"
                          description="Use tokens like surface, border, text, and brand instead of scattering raw hex values."
                        />
                        <Alert
                          tone="success"
                          title="Compose over duplicate"
                          description="Prefer combining Button, Card, and Badge into screens before inventing new one-off components."
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>What makes this extensive</CardTitle>
                  <CardDescription>
                    Enough structure to act as a real internal starter, not just a demo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                    <li>• CSS variables for semantic theming</li>
                    <li>• Tailwind utilities for fast composition</li>
                    <li>• Multiple component categories out of the box</li>
                    <li>• Dark mode and toast context included</li>
                    <li>• Dashboard-style example for immediate product use</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Badge variant="neutral">Starter library</Badge>
                  <Badge variant="neutral">Docs shell</Badge>
                  <Badge variant="neutral">Theme-ready</Badge>
                </CardFooter>
              </Card>
            </div>
          </Section>

          <Section
            id="foundations"
            eyebrow="Foundations"
            title="Tokens and visual foundations"
            description="The system is grounded in a token layer that can scale across brands, themes, and products. Tokens are shown here as the canonical design contract."
          >
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Color tokens</CardTitle>
                  <CardDescription>
                    Keep primitive color values in one place, then map them to semantic roles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {colorTokens.map((token) => (
                      <div
                        key={token.name}
                        className="rounded-[var(--radius-lg)] border border-[var(--border)] p-3"
                      >
                        <div
                          className="h-20 rounded-[var(--radius-md)] border border-black/5"
                          style={{ backgroundColor: token.value }}
                        />
                        <div className="mt-3">
                          <p className="font-medium">{token.name}</p>
                          <p className="text-sm text-[var(--text-muted)]">{token.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Radius, spacing, and shadows</CardTitle>
                    <CardDescription>
                      These create the tactile feel of the system.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                        Radius
                      </h3>
                      <div className="grid gap-3">
                        {radiusTokens.map((token) => (
                          <div key={token.name} className="flex items-center gap-4">
                            <div
                              className="h-12 w-20 border border-[var(--border)] bg-brand-100 dark:bg-brand-950"
                              style={{ borderRadius: token.value }}
                            />
                            <div>
                              <p className="font-medium">{token.name}</p>
                              <p className="text-sm text-[var(--text-muted)]">{token.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                        Spacing
                      </h3>
                      <div className="grid gap-3">
                        {spacingTokens.map((token) => (
                          <div key={token.name} className="flex items-center gap-4">
                            <div
                              className="h-4 bg-brand-600"
                              style={{ width: token.value }}
                            />
                            <div>
                              <p className="font-medium">{token.name}</p>
                              <p className="text-sm text-[var(--text-muted)]">{token.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                        Shadows
                      </h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        {shadowTokens.map((token) => (
                          <div
                            key={token.name}
                            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5"
                            style={{ boxShadow: token.value }}
                          >
                            <p className="font-medium">{token.name}</p>
                            <p className="mt-2 text-sm text-[var(--text-muted)]">{token.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Typography scale</CardTitle>
                    <CardDescription>
                      A compact hierarchy suitable for product interfaces and docs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {typographyScale.map((token, index) => (
                      <div key={token.name} className="rounded-[var(--radius-lg)] border border-[var(--border)] p-4">
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                          {token.name}
                        </p>
                        <p
                          className="mt-2 font-semibold text-[var(--text)]"
                          style={{
                            fontSize: ['3rem', '2.25rem', '1.75rem', '1.25rem', '1rem', '0.875rem'][index],
                            lineHeight: ['1.05', '1.1', '1.15', '1.25', '1.65', '1.5'][index],
                          }}
                        >
                          The quick brown fox jumps over the lazy dog
                        </p>
                        <p className="mt-2 text-sm text-[var(--text-muted)]">{token.value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          <Section
            id="actions"
            eyebrow="Components"
            title="Actions and emphasis"
            description="Buttons, badges, cards, and stat surfaces define the system’s most common interaction language."
          >
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>
                    Primary, secondary, outline, ghost, and destructive treatments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Delete</Button>
                  <Tooltip content="Helpful metadata attached to an action">
                    <Button variant="outline" size="icon" aria-label="Information">
                      i
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>
                      Useful for statuses, filters, and compact labels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Badge>Neutral</Badge>
                    <Badge variant="brand">Brand</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stat cards</CardTitle>
                    <CardDescription>
                      Simple metrics surfaces that align to dashboards and analytics views.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <StatCard
                      label="Conversion"
                      value="6.4%"
                      hint="Checkout to payment"
                      trend={<Badge variant="success">+0.7%</Badge>}
                    />
                    <StatCard
                      label="Latency"
                      value="142ms"
                      hint="P95 client render"
                      trend={<Badge variant="warning">Needs watch</Badge>}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          <Section
            id="forms"
            eyebrow="Forms"
            title="Inputs, controls, and decision making"
            description="A system becomes useful when form primitives are consistent, legible, and easy to compose into product flows."
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Form primitives</CardTitle>
                  <CardDescription>
                    Mix and match simple fields into larger workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text)]">Project name</label>
                      <Input placeholder="Launch readiness audit" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[var(--text)]">Environment</label>
                      <Select
                        placeholder="Choose environment"
                        value={environment}
                        onChange={(event) => setEnvironment(event.target.value)}
                        options={[
                          { label: 'Production', value: 'production' },
                          { label: 'Staging', value: 'staging' },
                          { label: 'Development', value: 'development' },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--text)]">Notes</label>
                    <Textarea placeholder="Use this area for rollout notes, accessibility caveats, or migration guidance." />
                  </div>

                  <Checkbox
                    label="Enable lifecycle emails"
                    description="Send contributors release notes and migration warnings."
                    checked={marketingOptIn}
                    onChange={setMarketingOptIn}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-3 text-sm font-medium text-[var(--text)]">Deployment target</p>
                      <RadioGroup
                        name="deployment-target"
                        value={deploymentTarget}
                        onChange={setDeploymentTarget}
                        options={[
                          {
                            label: 'Web app',
                            description: 'Full product shell with docs and examples.',
                            value: 'web',
                          },
                          {
                            label: 'Package only',
                            description: 'Library bundle for downstream apps.',
                            value: 'package',
                          },
                        ]}
                      />
                    </div>

                    <Card className="p-5">
                      <h3 className="font-semibold">Preferences</h3>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">
                        Use switch controls for binary product settings.
                      </p>
                      <div className="mt-5">
                        <Switch
                          checked={notificationsEnabled}
                          onCheckedChange={setNotificationsEnabled}
                          label="Enable release notifications"
                        />
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Composable form pattern</CardTitle>
                  <CardDescription>
                    Pair primitives with guidance to create stronger user confidence.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert
                    tone="info"
                    title="Current state snapshot"
                    description={`Environment: ${environment}, target: ${deploymentTarget}, notifications: ${notificationsEnabled ? 'enabled' : 'disabled'}.`}
                  />
                  <Alert
                    tone={marketingOptIn ? 'success' : 'warning'}
                    title={marketingOptIn ? 'Lifecycle email is enabled' : 'Lifecycle email is off'}
                    description="This shows how semantic feedback can react to form state with minimal code."
                  />
                  <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                      Example snippet
                    </p>
                    <pre className="code-snippet mt-3 overflow-x-auto">
{`<Button variant="primary">Ship</Button>
<Input placeholder="Project name" />
<Select options={envOptions} />
<Switch checked={enabled} onCheckedChange={setEnabled} />`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section
            id="feedback"
            eyebrow="Feedback"
            title="Status, messaging, and guidance"
            description="Small pieces of feedback create trust. These patterns help teams provide clear success, warning, and error signals."
          >
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <Alert
                  tone="info"
                  title="Information"
                  description="Use for neutral guidance and release notes."
                />
                <Alert
                  tone="success"
                  title="Success"
                  description="Use after save, publish, or verified completion."
                />
                <Alert
                  tone="warning"
                  title="Warning"
                  description="Use when users can recover before a problem occurs."
                />
                <Alert
                  tone="danger"
                  title="Danger"
                  description="Use when action is blocked or destructive."
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Toast actions</CardTitle>
                    <CardDescription>
                      Lightweight, non-blocking confirmation surfaces.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button
                      onClick={() =>
                        showToast({
                          title: 'Published',
                          description: 'Your component release notes were posted.',
                          tone: 'success',
                        })
                      }
                    >
                      Success toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        showToast({
                          title: 'Validation issue',
                          description: 'A required token mapping is still missing.',
                          tone: 'danger',
                        })
                      }
                    >
                      Error toast
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>FAQs as collapsible guidance</CardTitle>
                    <CardDescription>
                      Accordions are useful when dense guidance should stay skimmable.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion
                      items={[
                        {
                          id: 'naming',
                          title: 'How should teams name components?',
                          content:
                            'Prefer semantic and reusable names such as Button, StatCard, PageHeader, or EmptyState. Avoid screen-specific names unless the pattern is truly unique.',
                        },
                        {
                          id: 'theming',
                          title: 'How should themes evolve?',
                          content:
                            'Keep primitives stable and swap semantic CSS variables per theme or brand. This reduces churn in component code.',
                        },
                        {
                          id: 'governance',
                          title: 'How should ownership work?',
                          content:
                            'Core components should be owned by a central group, while feature teams can propose extensions with evidence and usage context.',
                        },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </Section>

          <Section
            id="navigation"
            eyebrow="Navigation"
            title="Wayfinding and information architecture"
            description="Good systems also define how users move through information, not just how single controls look."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Breadcrumbs</CardTitle>
                  <CardDescription>
                    Useful for multi-level product and admin flows.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Breadcrumbs
                    items={[
                      { label: 'Home', href: '#overview' },
                      { label: 'Library', href: '#data-display' },
                      { label: 'Design system' },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tabs</CardTitle>
                  <CardDescription>
                    Helpful for mutually exclusive content groups that share context.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    tabs={[
                      {
                        id: 'tokens',
                        label: 'Tokens',
                        content: (
                          <p className="text-sm leading-7 text-[var(--text-muted)]">
                            Keep raw values and semantic aliases separate so the brand can shift
                            without breaking product code.
                          </p>
                        ),
                      },
                      {
                        id: 'components',
                        label: 'Components',
                        content: (
                          <p className="text-sm leading-7 text-[var(--text-muted)]">
                            Build primitives first, then patterns, then page templates. This reduces
                            duplication and improves adoption.
                          </p>
                        ),
                      },
                      {
                        id: 'governance',
                        label: 'Governance',
                        content: (
                          <p className="text-sm leading-7 text-[var(--text-muted)]">
                            Document contribution criteria, accessibility expectations, and ownership
                            boundaries early.
                          </p>
                        ),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section
            id="data-display"
            eyebrow="Data display"
            title="Structured content and analytics surfaces"
            description="Tables and cards give teams a consistent starting point for product dashboards, settings pages, and operational tooling."
          >
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Component inventory table</CardTitle>
                  <CardDescription>
                    Example usage for rollout dashboards or internal design system reporting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <DataTable
                    columns={[
                      { key: 'component', label: 'Component' },
                      { key: 'status', label: 'Status' },
                      { key: 'owner', label: 'Owner' },
                      { key: 'usage', label: 'Usage', align: 'right' },
                    ]}
                    rows={tableRows}
                  />
                  <Pagination page={page} pageCount={5} onPageChange={setPage} />
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section
            id="overlays"
            eyebrow="Overlays"
            title="Modal surfaces and blocking decisions"
            description="Overlays are useful when users must confirm an action or focus on a short task with less surrounding noise."
          >
            <Card>
              <CardHeader>
                <CardTitle>Modal example</CardTitle>
                <CardDescription>
                  Keep blocking UI intentional and sparse.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-4">
                <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
                <p className="text-sm text-[var(--text-muted)]">
                  This pattern includes an outside click handler, escape key support, and body scroll lock.
                </p>
              </CardContent>
            </Card>
          </Section>
        </div>
      </main>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Promote release candidate?"
        description="Use modals for critical confirmations, short forms, or content that deserves full attention."
        primaryAction={{
          label: 'Promote',
          onClick: () => {
            setIsModalOpen(false);
            showToast({
              title: 'Release promoted',
              description: 'The release candidate was marked ready for rollout.',
              tone: 'success',
            });
          },
        }}
      >
        <div className="space-y-4">
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            This example is intentionally compact: a clear title, supporting text,
            and a single primary action. Avoid overloading modals with dense workflows
            when an inline page would serve users better.
          </p>
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p className="font-medium">Release checklist</p>
            <ul className="mt-2 space-y-2 text-sm text-[var(--text-muted)]">
              <li>• Tokens validated</li>
              <li>• Contrast checked in light and dark themes</li>
              <li>• Docs examples refreshed</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}
