import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { ToastProvider } from '../src/contexts/ToastContext';
import '../src/styles/index.css';

type ThemeGlobal = 'light' | 'dark';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          'Components',
          ['Actions', 'Forms', 'Feedback', 'Data Display', 'Navigation', 'Overlays'],
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Preview the design system in light or dark mode.',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as ThemeGlobal | undefined) ?? 'light';
      const isDark = theme === 'dark';

      document.documentElement.classList.toggle('dark', isDark);
      window.localStorage.setItem('design-system-theme', theme);

      return (
        <ThemeProvider key={theme}>
          <ToastProvider>
            <div className={isDark ? 'dark' : ''}>
              <div className="min-h-screen w-full bg-[var(--background)] px-6 py-8 text-[var(--text)]">
                <div className="mx-auto w-full max-w-6xl">
                  <Story />
                </div>
              </div>
            </div>
          </ToastProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
