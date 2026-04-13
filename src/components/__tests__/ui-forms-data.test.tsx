import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../ui/Checkbox';
import { Input } from '../ui/Input';
import { Pagination } from '../ui/Pagination';
import { RadioGroup } from '../ui/RadioGroup';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { DataTable } from '../ui/Table';
import { Tabs } from '../ui/Tabs';
import { Textarea } from '../ui/Textarea';

describe('form and data display components', () => {
  it('handles checkbox states, description and disabled mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox
        label="Email alerts"
        description="Receive product updates"
        checked={false}
        onChange={onChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: /Email alerts/i });
    expect(screen.getByText('Receive product updates')).toBeInTheDocument();
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(
      <Checkbox
        label="SMS alerts"
        checked
        onChange={onChange}
        disabled
      />,
    );

    expect(screen.getByRole('checkbox', { name: /SMS alerts/i })).toBeDisabled();
    expect(screen.getByText('SMS alerts').closest('label')).toHaveClass('opacity-60');
  });

  it('renders input and textarea with forwarded refs', () => {
    const inputRef = createRef<HTMLInputElement>();
    const textareaRef = createRef<HTMLTextAreaElement>();

    render(
      <div>
        <Input ref={inputRef} placeholder="Search" className="input-class" />
        <Textarea ref={textareaRef} placeholder="Notes" className="textarea-class" />
      </div>,
    );

    expect(screen.getByPlaceholderText('Search')).toHaveClass('input-class');
    expect(screen.getByPlaceholderText('Notes')).toHaveClass('textarea-class');
    expect(inputRef.current).toBe(screen.getByPlaceholderText('Search'));
    expect(textareaRef.current).toBe(screen.getByPlaceholderText('Notes'));
  });

  it('supports pagination navigation including boundaries', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const { rerender } = render(
      <Pagination page={1} pageCount={3} onPageChange={onPageChange} />,
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '1' })).toHaveClass('bg-brand-600');

    await user.click(screen.getByRole('button', { name: '2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    rerender(<Pagination page={3} pageCount={3} onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('supports radio group selection states', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup
        name="plan"
        value="pro"
        onChange={onChange}
        options={[
          { label: 'Starter', description: 'Basic plan', value: 'starter' },
          { label: 'Pro', value: 'pro' },
        ]}
      />,
    );

    const pro = screen.getByRole('radio', { name: /Pro/ });
    const starter = screen.getByRole('radio', { name: /Starter/ });

    expect(pro).toBeChecked();
    expect(screen.getByText('Basic plan')).toBeInTheDocument();
    expect(screen.getByText('Pro').closest('label')).toHaveClass('border-brand-500');

    await user.click(starter);
    expect(onChange).toHaveBeenCalledWith('starter');
  });

  it('supports controlled and uncontrolled select usage', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const options = [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ];
    const { rerender } = render(
      <Select
        options={options}
        placeholder="Choose one"
        value=""
        onChange={onChange}
        className="select-class"
      />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('select-class');
    expect(screen.getByRole('option', { name: 'Choose one' })).toBeDisabled();

    await user.selectOptions(select, 'two');
    expect(onChange).toHaveBeenCalled();

    rerender(<Select options={options} defaultValue="one" aria-label="Plain select" />);
    expect(screen.getByRole('combobox', { name: 'Plain select' })).toHaveValue('one');

    rerender(<Select options={options} aria-label="Empty select" />);
    expect(screen.getByRole('combobox', { name: 'Empty select' })).toHaveValue('one');
  });

  it('toggles switch state and optional label', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={onCheckedChange} label="Dark mode" />,
    );

    const switchButton = screen.getByRole('switch', { name: 'Dark mode' });
    expect(switchButton).toHaveAttribute('aria-checked', 'false');
    await user.click(switchButton);
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    rerender(<Switch checked onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    expect(screen.queryByText('Dark mode')).not.toBeInTheDocument();
  });

  it('renders table columns and row alignment', () => {
    render(
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'count', label: 'Count', align: 'right' },
        ]}
        rows={[
          { name: 'Alpha', count: 10 },
          { name: 'Beta', count: 20 },
        ]}
      />,
    );

    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('text-left');
    expect(screen.getByRole('columnheader', { name: 'Count' })).toHaveClass('text-right');

    const rows = screen.getAllByRole('row');
    expect(within(rows[1]).getByText('Alpha')).toBeInTheDocument();
    expect(within(rows[2]).getByText('20')).toHaveClass('text-right');
  });

  it('renders tabs with explicit default and fallback first tab', async () => {
    const user = userEvent.setup();
    const tabs = [
      { id: 'overview', label: 'Overview', content: <div>Overview panel</div> },
      { id: 'usage', label: 'Usage', content: <div>Usage panel</div> },
    ];

    const { unmount } = render(<Tabs tabs={tabs} defaultTab="usage" />);
    expect(screen.getByText('Usage panel')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Overview' }));
    expect(screen.getByText('Overview panel')).toBeInTheDocument();

    unmount();
    render(<Tabs tabs={tabs} />);
    expect(screen.getByText('Overview panel')).toBeInTheDocument();
  });

  it('renders empty tabs when no items are supplied', () => {
    render(<Tabs tabs={[]} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
