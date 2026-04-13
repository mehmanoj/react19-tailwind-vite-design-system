import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useOnClickOutside } from '../useOnClickOutside';

function HookHarness({ enabled = true, onOutside }: { enabled?: boolean; onOutside: (event: MouseEvent | TouchEvent) => void }) {
  const ref = createRef<HTMLDivElement>();
  useOnClickOutside(ref, onOutside, enabled);

  return (
    <div>
      <div ref={ref}>Inside</div>
      <button type="button">Outside</button>
    </div>
  );
}


function NullRefHarness({ onOutside }: { onOutside: (event: MouseEvent | TouchEvent) => void }) {
  const ref = createRef<HTMLDivElement>();
  useOnClickOutside(ref, onOutside);

  return <button type="button">Outside only</button>;
}

describe('useOnClickOutside', () => {
  it('calls the handler for outside mouse and touch interactions only', () => {
    const onOutside = vi.fn();
    render(<HookHarness onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByText('Inside'));
    expect(onOutside).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(onOutside).toHaveBeenCalledTimes(1);

    fireEvent.touchStart(screen.getByRole('button', { name: 'Outside' }));
    expect(onOutside).toHaveBeenCalledTimes(2);
  });

  it('ignores events when the element ref is not attached', () => {
    const onOutside = vi.fn();
    render(<NullRefHarness onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside only' }));
    expect(onOutside).not.toHaveBeenCalled();
  });

  it('does not attach listeners when disabled', () => {
    const onOutside = vi.fn();
    render(<HookHarness enabled={false} onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    fireEvent.touchStart(screen.getByRole('button', { name: 'Outside' }));
    expect(onOutside).not.toHaveBeenCalled();
  });
});
