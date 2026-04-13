import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from '../ui/Accordion';
import { Alert } from '../ui/Alert';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { Button } from '../ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StatCard,
} from '../ui/Card';

describe('basic ui components', () => {
  it('opens the first accordion item by default and toggles items', async () => {
    const user = userEvent.setup();

    render(
      <Accordion
        items={[
          { id: 'one', title: 'First', content: <div>First content</div> },
          { id: 'two', title: 'Second', content: <div>Second content</div> },
        ]}
      />,
    );

    expect(screen.getByText('First content')).toBeInTheDocument();
    expect(screen.queryByText('Second content')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /First/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('region', { name: 'First' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /First/ }));
    expect(screen.queryByText('First content')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Second/ }));
    expect(screen.getByText('Second content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Second/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('renders an empty accordion without crashing', () => {
    render(<Accordion items={[]} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders alert with default and custom tones', () => {
    const { rerender } = render(
      <Alert title="Info" description="Helpful details" className="extra" />,
    );

    const alert = screen.getByText('Info').closest('div');
    expect(alert).toHaveClass('border-brand-200');
    expect(alert).toHaveClass('extra');
    expect(screen.getByText('Helpful details')).toBeInTheDocument();

    rerender(<Alert title="Error" description="Something failed" tone="danger" />);

    expect(screen.getByText('Error').closest('div')).toHaveClass('border-red-200');
  });

  it('renders avatar initials and image variants', () => {
    const { rerender } = render(<Avatar name="Jane Doe" size="sm" className="avatar" />);

    expect(screen.getByLabelText('Jane Doe')).toHaveTextContent('JD');
    expect(screen.getByLabelText('Jane Doe')).toHaveClass('h-9', 'avatar');

    rerender(<Avatar name="Jane Doe" src="/avatar.png" size="lg" />);

    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveAttribute(
      'src',
      '/avatar.png',
    );
    expect(screen.getByLabelText('Jane Doe')).toHaveClass('h-16');
  });

  it('renders badge variants and breadcrumb states', () => {
    const { rerender } = render(<Badge>Neutral</Badge>);
    expect(screen.getByText('Neutral')).toHaveClass('bg-slate-100');

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-emerald-100');

    rerender(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Library', href: '/library' },
          { label: 'Current' },
        ]}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute(
      'href',
      '/library',
    );
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');

    rerender(
      <Breadcrumbs
        items={[{ label: 'Parent without link' }, { label: 'Only item', href: '/only' }]}
      />,
    );
    expect(screen.getByText('Parent without link')).not.toHaveAttribute('href');
    expect(screen.getByText('Parent without link')).not.toHaveAttribute('aria-current');
    expect(screen.getByText('Only item')).not.toHaveAttribute('href');
  });

  it('renders button variants, icons, size and forwarded ref', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const onClick = vi.fn();

    const { rerender } = render(
      <Button
        ref={ref}
        variant="destructive"
        size="icon"
        leftIcon={<span>Left</span>}
        rightIcon={<span>Right</span>}
        onClick={onClick}
      >
        Delete
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('bg-red-600', 'h-11', 'w-11');
    expect(button).toContainElement(screen.getByText('Left'));
    expect(button).toContainElement(screen.getByText('Right'));
    expect(ref.current).toBe(button);

    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<Button>Plain button</Button>);
    expect(screen.getByRole('button', { name: 'Plain button' })).toHaveAttribute(
      'type',
      'button',
    );
    expect(screen.queryByText('Left')).not.toBeInTheDocument();
    expect(screen.queryByText('Right')).not.toBeInTheDocument();
  });

  it('renders card family components and stat card trend', () => {
    const { rerender } = render(
      <Card className="shell">
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Quarterly summary</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Revenue').tagName).toBe('H3');
    expect(screen.getByText('Quarterly summary')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
    expect(screen.getByText('Revenue').closest('.shell')).toBeInTheDocument();

    rerender(
      <>
        <StatCard
          label="Users"
          value="1,024"
          hint="Up this month"
          trend={<span>+8%</span>}
        />
        <StatCard label="Latency" value="82ms" hint="Stable" />
      </>,
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('+8%')).toBeInTheDocument();
    expect(screen.getByText('82ms')).toBeInTheDocument();
  });
});
