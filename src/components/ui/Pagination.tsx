import { Button } from './Button';
import { cx } from '../../lib/cx';

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Previous
      </Button>

      {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={cx(
            'h-9 w-9 rounded-[var(--radius-md)] border text-sm font-medium transition',
            pageNumber === page
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-muted)]',
          )}
        >
          {pageNumber}
        </button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
      >
        Next
      </Button>
    </div>
  );
}
