import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useThemeContext } from '../ThemeContext';

function ThemeConsumer() {
  const { theme, toggleTheme, setTheme } = useThemeContext();

  return (
    <div>
      <span>{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        Set dark
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  it('initializes from localStorage and updates DOM and storage', async () => {
    window.localStorage.setItem('design-system-theme', 'light');
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText('light')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('design-system-theme')).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'Set dark' }));
    expect(screen.getByText('dark')).toBeInTheDocument();
  });


  it('reads a saved dark theme directly from localStorage', () => {
    window.localStorage.setItem('design-system-theme', 'dark');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('falls back to system preference when localStorage has no saved theme', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('throws when useThemeContext is used outside the provider', () => {
    const BrokenConsumer = () => {
      useThemeContext();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow(
      'useThemeContext must be used inside ThemeProvider',
    );
  });
});
