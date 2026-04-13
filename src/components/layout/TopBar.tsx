import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useThemeContext } from '../../contexts/ThemeContext';

export function TopBar() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface-overlay)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <Badge variant="brand">Design System</Badge>
            <Badge variant="neutral">React 19</Badge>
            <Badge variant="neutral">Tailwind v4</Badge>
            <Badge variant="neutral">Vite 8</Badge>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text)]">
            Extensive UI foundation for product teams
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-[var(--text-muted)]">
            Semantic tokens, reusable primitives, theme support, and a living
            documentation shell.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={toggleTheme}>
            {theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
          </Button>
          <Button
            onClick={() => {
              window.location.hash = '#overview';
            }}
          >
            Start building
          </Button>
        </div>
      </div>
    </header>
  );
}
