import { FileText } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import type { VeriDocument } from "@/types";
import { formatDate } from "@/utils/format";

export default function DocumentCard({
  document,
  onOpen,
}: {
  document: VeriDocument;
  onOpen: (d: VeriDocument) => void;
}) {
  return (
    <button
      onClick={() => onOpen(document)}
      className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:border-[#dcdbd4] hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-9 items-center justify-center rounded-lg bg-ivory text-[10px] font-semibold text-muted group-hover:bg-indigo-50 group-hover:text-indigo">
          <FileText className="h-4 w-4" />
        </div>
        <StatusBadge status={document.status} size="sm" />
      </div>
      <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-graphite">
        {document.name}
      </p>
      <p className="mt-1 text-xs text-muted">{document.category}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
        <span>v{document.version}</span>
        <span>{formatDate(document.uploadedAt)}</span>
      </div>
    </button>
  );
}
