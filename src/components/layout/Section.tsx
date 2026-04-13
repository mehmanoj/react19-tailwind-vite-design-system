import { type ReactNode } from 'react';
import { cx } from '../../lib/cx';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cx('scroll-mt-24', className)}>
      <div className="mb-6">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-[var(--text-muted)]">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
