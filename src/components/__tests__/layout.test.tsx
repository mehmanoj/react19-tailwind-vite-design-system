import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Section } from '../layout/Section';
import { SidebarNav } from '../layout/SidebarNav';
import { TopBar } from '../layout/TopBar';
import { ThemeProvider } from '../../contexts/ThemeContext';

describe('layout components', () => {
  it('renders Section with eyebrow and custom class name', () => {
    const { container } = render(
      <Section
        id="overview"
        eyebrow="Foundations"
        title="Overview"
        description="Section description"
        className="custom-section"
      >
        <div>Section content</div>
      </Section>,
    );

    expect(screen.getByText('Foundations')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByText('Section description')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
    expect(container.querySelector('#overview')).toHaveClass('custom-section');
  });

  it('renders Section without eyebrow', () => {
    render(
      <Section
        id="components"
        title="Components"
        description="Component section"
      >
        <div>Body</div>
      </Section>,
    );

    expect(screen.queryByText('Foundations')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Components' })).toBeInTheDocument();
  });

  it('renders SidebarNav links for each item', () => {
    render(
      <SidebarNav
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'components', label: 'Components' },
        ]}
      />,
    );

    expect(screen.getByText('Sections')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'href',
      '#overview',
    );
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute(
      'href',
      '#components',
    );
  });

  it('toggles theme and updates hash from TopBar', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TopBar />
      </ThemeProvider>,
    );

    const themeButton = screen.getByRole('button', { name: 'Enable dark mode' });
    await user.click(themeButton);

    expect(screen.getByRole('button', { name: 'Enable light mode' })).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');

    await user.click(screen.getByRole('button', { name: 'Start building' }));
    expect(window.location.hash).toBe('#overview');
  });
});
