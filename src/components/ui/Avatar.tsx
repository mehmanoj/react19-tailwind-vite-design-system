import { type HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-xl',
};

export function Avatar({
  className,
  name,
  src,
  size = 'md',
  ...props
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cx(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-100 font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-200',
        sizeClasses[size],
        className,
      )}
      aria-label={name}
      {...props}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
