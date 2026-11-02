import { FileText, ShieldCheck, ShieldAlert, ChevronRight } from "lucide-react";
import type { Citation } from "@/types";
import { cn, shortHash } from "@/utils/format";

interface Props {
  citation: Citation;
  index: number;
  onInspect: (c: Citation) => void;
}

/**
 * A cited source with its OWN verification status. Verification is shown
 * per source, never once for the whole answer. Click to inspect.
 */
export default function SourceCard({ citation, index, onInspect }: Props) {
  const verified = citation.status === "verified";
  const modified = citation.status === "modified";

  return (
    <button
      onClick={() => onInspect(citation)}
      className={cn(
        "group flex w-full items-start gap-3 rounded-xl border bg-paper p-3 text-left transition-all duration-150 hover:shadow-card",
        modified
          ? "border-garnet/30 hover:border-garnet/50"
          : "border-line hover:border-[#dcdbd4]",
      )}
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ivory text-[11px] font-semibold text-muted">
        {index}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <FileText className="h-3.5 w-3.5 shrink-0 text-muted" />
          <span className="truncate text-sm font-medium text-graphite">
            {citation.documentName}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span>Version {citation.version}</span>
          <span className="mono">{shortHash(citation.hash, 8, 6)}</span>
        </div>
      </div>

      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium",
          verified ? "bg-emerald-soft text-emerald" : "bg-garnet-soft text-garnet",
        )}
      >
        {verified ? (
          <ShieldCheck className="h-3 w-3" />
        ) : (
          <ShieldAlert className="h-3 w-3" />
        )}
        {verified ? "Verified" : "Modified"}
      </span>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
