import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../ui/Modal';
import { ToastViewport, type ToastItem } from '../ui/Toast';
import { Tooltip } from '../ui/Tooltip';

describe('overlay components', () => {
  it('does not render modal when closed', () => {
    render(
      <Modal open={false} title="Hidden" onClose={vi.fn()}>
        <div>Body</div>
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal and handles cancel, primary action, escape, tab trapping and outside click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onPrimary = vi.fn();

    render(
      <div>
        <button type="button">Open modal</button>
        <Modal
          open
          title="Delete item"
          description="This action cannot be undone"
          onClose={onClose}
          primaryAction={{ label: 'Delete', onClick: onPrimary }}
        >
          <div>Modal body</div>
        </Modal>
      </div>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
    expect(dialog).toHaveAttribute(
      'aria-describedby',
      screen.getByText('This action cannot be undone').getAttribute('id'),
    );
    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onPrimary).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('renders modal without a description or primary action and restores body scroll on close', () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Modal open title="Simple modal" onClose={onClose}>
        <div>No description</div>
      </Modal>,
    );

    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();

    rerender(
      <Modal open={false} title="Closed" onClose={onClose}>
        <div>Closed</div>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('renders toast viewport in a portal and dismisses toasts', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const toasts: ToastItem[] = [
      {
        id: '1',
        title: 'Saved',
        description: 'Changes were saved',
        tone: 'success',
      },
      {
        id: '2',
        title: 'Heads up',
        description: 'Neutral tone',
      },
      {
        id: '3',
        title: 'Failed',
        description: 'Danger tone',
        tone: 'danger',
      },
    ];

    render(<ToastViewport toasts={toasts} onDismiss={onDismiss} />);

    const successToast =
      screen.getByText('Saved').parentElement?.parentElement?.parentElement;
    const neutralToast =
      screen.getByText('Neutral tone').parentElement?.parentElement?.parentElement;
    const dangerToast =
      screen.getByText('Failed').parentElement?.parentElement?.parentElement;

    expect(successToast).toHaveClass('border-emerald-300');
    expect(neutralToast).toHaveClass('border-slate-200');
    expect(dangerToast).toHaveClass('border-red-300');
    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: 'Dismiss' })[1]);
    expect(onDismiss).toHaveBeenCalledWith('2');
  });

  it('shows and hides tooltip on hover, focus and blur for both sides', () => {
    vi.useFakeTimers();

    const { rerender } = render(
      <Tooltip content="Tooltip content" side="bottom">
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Trigger' });
    const wrapper = trigger.closest('span');

    expect(wrapper).not.toBeNull();

    fireEvent.mouseEnter(wrapper!);
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip content');
    expect(screen.getByRole('tooltip')).toHaveClass('top-11');
    expect(trigger).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);

    fireEvent.mouseLeave(wrapper!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');

    rerender(
      <Tooltip content="Another tooltip">
        <button type="button">Focus trigger</button>
      </Tooltip>,
    );

    const focusTrigger = screen.getByRole('button', { name: 'Focus trigger' });
    const focusWrapper = focusTrigger.closest('span');

    expect(focusWrapper).not.toBeNull();

    fireEvent.focusIn(focusWrapper!);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByRole('tooltip')).toHaveClass('-top-11');

    fireEvent.blur(focusWrapper!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('keeps tooltip hidden when it is hidden before the delay elapses and clears timers on unmount', () => {
    vi.useFakeTimers();

    const { unmount } = render(
      <Tooltip content="Delayed tooltip">
        <button type="button">Quick trigger</button>
      </Tooltip>,
    );

    const quickTrigger = screen.getByRole('button', { name: 'Quick trigger' });
    const wrapper = quickTrigger.closest('span');

    expect(wrapper).not.toBeNull();

    fireEvent.mouseLeave(wrapper!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(wrapper!);
    fireEvent.mouseEnter(wrapper!);
    fireEvent.mouseLeave(wrapper!);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    unmount();
  });
});
