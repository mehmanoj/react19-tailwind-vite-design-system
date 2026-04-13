import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  colorTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyScale,
} from '../data/tokens';

function FoundationsGallery() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
            Foundations
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Token reference</h2>
          <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">
            These tokens provide a shared contract between design and engineering.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {colorTokens.map((token) => (
            <div key={token.name} className="rounded-[var(--radius-lg)] border border-[var(--border)] p-3">
              <div
                className="h-20 rounded-[var(--radius-md)] border border-black/5"
                style={{ backgroundColor: token.value }}
              />
              <p className="mt-3 font-medium">{token.name}</p>
              <p className="text-sm text-[var(--text-muted)]">{token.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
          <h3 className="text-lg font-semibold">Typography scale</h3>
          <div className="mt-4 grid gap-3">
            {typographyScale.map((token) => (
              <div key={token.name} className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] bg-[var(--surface-muted)] px-4 py-3">
                <span className="font-medium">{token.name}</span>
                <span className="text-sm text-[var(--text-muted)]">{token.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
          <h3 className="text-lg font-semibold">Radius and elevation</h3>
          <div className="mt-4 grid gap-3">
            {radiusTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-4 rounded-[var(--radius-md)] bg-[var(--surface-muted)] px-4 py-3">
                <div
                  className="h-12 w-12 border border-[var(--border)] bg-[var(--surface)]"
                  style={{ borderRadius: token.value }}
                />
                <div>
                  <p className="font-medium">radius.{token.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{token.value}</p>
                </div>
              </div>
            ))}

            {shadowTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-4 rounded-[var(--radius-md)] bg-[var(--surface-muted)] px-4 py-3">
                <div
                  className="h-12 w-12 rounded-[var(--radius-md)] bg-[var(--surface)]"
                  style={{ boxShadow: token.value }}
                />
                <div>
                  <p className="font-medium">shadow.{token.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{token.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
        <h3 className="text-lg font-semibold">Spacing scale</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {spacingTokens.map((token) => (
            <div key={token.name} className="rounded-[var(--radius-md)] border border-[var(--border)] p-4">
              <p className="font-medium">space.{token.name}</p>
              <div className="mt-3 bg-brand-100">
                <div className="bg-brand-600" style={{ width: token.value, height: '0.75rem' }} />
              </div>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{token.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundations/Tokens',
  component: FoundationsGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FoundationsGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Reference: Story = {};
