import { act, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastContext';

function ToastConsumer() {
  const { showToast } = useToast();

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Saved',
            description: 'Default toast',
          })
        }
      >
        Show default toast
      </button>
      <button
        type="button"
        onClick={() =>
          showToast({
            title: 'Custom',
            description: 'Custom toast',
            tone: 'danger',
            duration: 1000,
          })
        }
      >
        Show custom toast
      </button>
    </div>
  );
}

describe('ToastContext', () => {
  it('shows default and custom toasts and dismisses them manually and automatically', () => {
    vi.useFakeTimers();

    render(
      <ToastProvider>
        <ToastConsumer />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Show default toast' }));
    expect(screen.getByText('Saved')).toBeInTheDocument();
    const defaultToast = screen.getByText('Default toast').parentElement?.parentElement?.parentElement;
    expect(defaultToast).toHaveClass('border-slate-200');

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Show custom toast' }));
    expect(screen.getByText('Custom')).toBeInTheDocument();
    const customToast = screen.getByText('Custom toast').parentElement?.parentElement?.parentElement;
    expect(customToast).toHaveClass('border-red-300');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Custom')).not.toBeInTheDocument();
  });

  it('throws when useToast is used outside the provider', () => {
    const BrokenConsumer = () => {
      useToast();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow(
      'useToast must be used inside ToastProvider',
    );
  });
});
