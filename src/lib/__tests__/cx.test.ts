import { cx } from '../cx';

describe('cx', () => {
  it('joins only truthy class values', () => {
    expect(cx('one', false, null, undefined, 'two')).toBe('one two');
  });
});
