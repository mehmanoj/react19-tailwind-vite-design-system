type Column<T> = {
  key: keyof T;
  label: string;
  align?: 'left' | 'right';
};

type DataTableProps<T extends Record<string, string | number>> = {
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends Record<string, string | number>>({
  columns,
  rows,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--border)]">
          <thead className="bg-[var(--surface-muted)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-3 text-sm font-semibold text-[var(--text-muted)] ${
                    column.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-[var(--surface-muted)]/60">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-4 py-3 text-sm text-[var(--text)] ${
                      column.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
