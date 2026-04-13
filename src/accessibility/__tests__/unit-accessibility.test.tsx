import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { App } from '../../app/App';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ToastProvider } from '../../contexts/ToastContext';

function renderWithProviders(node: ReactNode) {
  return render(
    <ThemeProvider>
      <ToastProvider>{node}</ToastProvider>
    </ThemeProvider>,
  );
}

describe('accessibility smoke tests', () => {
  it('has no automatically detectable accessibility violations on the application shell', async () => {
    const { container } = renderWithProviders(<App />);

    const results = await axe(container);

    expect(results.violations).toHaveLength(0);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has no automatically detectable accessibility violations for the modal', async () => {
    const { baseElement } = render(
      <Modal
        open
        title="Delete item"
        description="This action cannot be undone"
        onClose={() => undefined}
        primaryAction={{ label: 'Delete', onClick: () => undefined }}
      >
        <p>Modal body</p>
      </Modal>,
    );

    const results = await axe(baseElement);

    expect(results.violations).toHaveLength(0);
  });

  it('has no automatically detectable accessibility violations after tab navigation changes state', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', content: <div>Overview panel</div> },
          { id: 'usage', label: 'Usage', content: <div>Usage panel</div> },
        ]}
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'Usage' }));

    const results = await axe(container);

    expect(results.violations).toHaveLength(0);
  });
});
