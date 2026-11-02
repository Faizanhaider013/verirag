import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  LayoutGrid,
  Rows3,
  Plus,
  FileSearch,
  Eye,
} from "lucide-react";
import Page from "@/components/common/Page";
import StatusBadge from "@/components/common/StatusBadge";
import CopyButton from "@/components/common/CopyButton";
import Pagination from "@/components/common/Pagination";
import EmptyState from "@/components/common/EmptyState";
import DocumentCard from "@/components/documents/DocumentCard";
import DocumentInspector from "@/components/documents/DocumentInspector";
import { mockDocuments, documentCategories } from "@/data/mockDocuments";
import type { VeriDocument, VerificationStatus } from "@/types";
import { usePagination } from "@/hooks/usePagination";
import { cn, formatDate, shortHash } from "@/utils/format";

type View = "grid" | "list";
type StatusFilter = "all" | VerificationStatus;

export default function Documents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<VeriDocument | null>(null);

  // Open a document from ?doc= (deep links from Home / Ask AI / command palette).
  useEffect(() => {
    const id = searchParams.get("doc");
    if (id) {
      const doc = mockDocuments.find((d) => d.id === id);
      if (doc) setSelected(doc);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockDocuments.filter((d) => {
      const mq =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.uploadedBy.toLowerCase().includes(q);
      const mc = category === "all" || d.category === category;
      const ms = status === "all" || d.status === status;
      return mq && mc && ms;
    });
  }, [query, category, status]);

  const pager = usePagination(filtered, view === "grid" ? 9 : 8);

  function closeInspector() {
    setSelected(null);
    if (searchParams.get("doc")) {
      searchParams.delete("doc");
      setSearchParams(searchParams, { replace: true });
    }
  }

  return (
    <Page width="wide">
      {/* Editorial header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="overline mb-2">Knowledge Library</p>
          <h1 className="font-display text-hero font-semibold tracking-tight text-graphite">
            Documents
          </h1>
          <p className="mt-2 max-w-lg text-[15px] text-muted">
            {mockDocuments.length} approved documents, each with a cryptographic
            identity you can verify.
          </p>
        </div>
        <Link to="/register" className="btn-primary">
          <Plus className="h-4 w-4" /> Register document
        </Link>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              pager.setPage(1);
            }}
            placeholder="Search documents…"
            className="input pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              pager.setPage(1);
            }}
            className="input w-auto cursor-pointer py-2"
          >
            <option value="all">All categories</option>
            {documentCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as StatusFilter);
              pager.setPage(1);
            }}
            className="input w-auto cursor-pointer py-2"
          >
            <option value="all">All statuses</option>
            <option value="verified">Verified</option>
            <option value="modified">Modified</option>
          </select>
          <div className="flex items-center rounded-xl border border-line bg-paper p-0.5">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                view === "grid"
                  ? "bg-ivory text-graphite"
                  : "text-muted hover:text-graphite",
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                view === "list"
                  ? "bg-ivory text-graphite"
                  : "text-muted hover:text-graphite",
              )}
              aria-label="List view"
            >
              <Rows3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="surface">
            <EmptyState
              icon={FileSearch}
              title="No documents found"
              description="Try a different search term or clear the filters."
            />
          </div>
        ) : view === "grid" ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pager.pageItems.map((doc) => (
                <DocumentCard key={doc.id} document={doc} onOpen={setSelected} />
              ))}
            </div>
            <div className="mt-4">
              <Pagination {...pager} onPrev={pager.prev} onNext={pager.next} onPage={pager.setPage} />
            </div>
          </>
        ) : (
          <div className="surface overflow-hidden">
            <div className="divide-y divide-line">
              {pager.pageItems.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelected(doc)}
                  className="flex cursor-pointer items-center gap-4 px-4 py-3.5 transition-colors hover:bg-ivory/70"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ivory text-[10px] font-semibold text-muted">
                    {doc.type}
                  </span>
                  <div className="min-w-0 flex-[2]">
                    <p className="truncate text-sm font-medium text-graphite">
                      {doc.name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {doc.category} · {doc.id}
                    </p>
                  </div>
                  <span className="hidden flex-1 text-sm text-muted md:block">
                    v{doc.version}
                  </span>
                  <span className="hidden flex-1 text-sm text-muted lg:block">
                    {formatDate(doc.uploadedAt)}
                  </span>
                  <span
                    className="hidden flex-1 items-center gap-1.5 md:flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="mono text-xs text-muted">
                      {shortHash(doc.hash, 6, 4)}
                    </span>
                    <CopyButton value={doc.hash} />
                  </span>
                  <StatusBadge status={doc.status} size="sm" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(doc);
                    }}
                    className="btn-ghost h-8 w-8 rounded-lg p-0"
                    aria-label="Inspect"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-line px-2">
              <Pagination {...pager} onPrev={pager.prev} onNext={pager.next} onPage={pager.setPage} />
            </div>
          </div>
        )}
      </div>

      <DocumentInspector document={selected} onClose={closeInspector} />
    </Page>
  );
}
