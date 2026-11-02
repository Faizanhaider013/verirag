import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/format";

interface Props {
  page: number;
  pageCount: number;
  rangeStart: number;
  rangeEnd: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onPage: (p: number) => void;
}

export default function Pagination({
  page,
  pageCount,
  rangeStart,
  rangeEnd,
  total,
  onPrev,
  onNext,
  onPage,
}: Props) {
  if (total === 0) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-1 py-3 sm:flex-row">
      <p className="text-xs text-muted">
        Showing <span className="font-medium text-graphite">{rangeStart}</span>–
        <span className="font-medium text-graphite">{rangeEnd}</span> of{" "}
        <span className="font-medium text-graphite">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="btn-ghost h-8 w-8 rounded-lg p-0 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={cn(
              "h-8 min-w-8 rounded-lg px-2 text-sm transition-colors",
              p === page
                ? "bg-indigo text-white shadow-subtle"
                : "text-muted hover:bg-black/[0.04] hover:text-graphite",
            )}
          >
            {p}
          </button>
        ))}
        <button
          onClick={onNext}
          disabled={page === pageCount}
          className="btn-ghost h-8 w-8 rounded-lg p-0 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
