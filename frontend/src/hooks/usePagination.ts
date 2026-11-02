import { useMemo, useState } from "react";

/** Simple client-side pagination over an array. */
export function usePagination<T>(items: T[], pageSize = 8) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pageCount);

  const pageItems = useMemo(() => {
    const start = (current - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, current, pageSize]);

  return {
    page: current,
    pageCount,
    pageItems,
    total: items.length,
    setPage,
    next: () => setPage((p) => Math.min(p + 1, pageCount)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
    rangeStart: items.length === 0 ? 0 : (current - 1) * pageSize + 1,
    rangeEnd: Math.min(current * pageSize, items.length),
  };
}
