import { useMemo, useState } from "react";
import {
  Search,
  Blocks,
  FilePlus2,
  GitBranch,
  Boxes,
  ChevronRight,
} from "lucide-react";
import Page from "@/components/common/Page";
import Modal from "@/components/common/Modal";
import CopyButton from "@/components/common/CopyButton";
import EmptyState from "@/components/common/EmptyState";
import { mockTransactions } from "@/data/mockTransactions";
import { mockDocuments } from "@/data/mockDocuments";
import type { BlockchainTransaction } from "@/types";
import { cn, formatDateTime, shortHash, timeAgo } from "@/utils/format";

export default function Blockchain() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<BlockchainTransaction | null>(null);

  const sorted = useMemo(
    () =>
      [...mockTransactions].sort(
        (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp),
      ),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (t) =>
        t.txId.toLowerCase().includes(q) ||
        t.documentName.toLowerCase().includes(q) ||
        t.documentId.toLowerCase().includes(q) ||
        t.wallet.toLowerCase().includes(q),
    );
  }, [query, sorted]);

  const latestBlock = Math.max(...mockTransactions.map((t) => t.blockNumber));
  const stats = [
    { label: "Registered documents", value: mockDocuments.length, icon: Boxes },
    { label: "Latest block", value: `#${latestBlock.toLocaleString()}`, icon: Blocks },
    { label: "Total transactions", value: mockTransactions.length, icon: GitBranch },
  ];

  return (
    <Page width="wide">
      <header className="max-w-2xl">
        <p className="overline mb-3">Blockchain Activity</p>
        <h1 className="font-display text-hero font-semibold tracking-tight text-graphite text-balance">
          An open record of every change.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted text-balance">
          A lightweight view of document registrations and version updates on the
          local chain. Synthetic prototype data.
        </p>
      </header>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="surface flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[13px] text-muted">{s.label}</p>
              <p className="font-display text-2xl font-semibold tracking-tight text-graphite">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mt-8">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by transaction hash, document or wallet…"
          className="input pl-10"
        />
      </div>

      {/* Timeline */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="surface">
            <EmptyState
              icon={Blocks}
              title="No transactions found"
              description="Try a different search term."
            />
          </div>
        ) : (
          <ol className="relative ml-2 border-l border-line">
            {filtered.map((tx) => (
              <li key={tx.txId} className="relative mb-2 pl-8">
                <span
                  className={cn(
                    "absolute -left-[9px] top-4 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-ivory",
                    tx.action === "Registered"
                      ? "bg-indigo text-white"
                      : "bg-lavender text-indigo",
                  )}
                >
                  {tx.action === "Registered" ? (
                    <FilePlus2 className="h-2.5 w-2.5" />
                  ) : (
                    <GitBranch className="h-2.5 w-2.5" />
                  )}
                </span>
                <button
                  onClick={() => setSelected(tx)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-left transition-all hover:border-[#dcdbd4] hover:shadow-card"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-graphite">
                        {tx.action === "Registered"
                          ? "Document registered"
                          : "New version registered"}
                      </span>
                      {tx.status !== "confirmed" && (
                        <span
                          className={cn(
                            "chip",
                            tx.status === "pending"
                              ? "bg-ivory text-muted"
                              : "bg-garnet-soft text-garnet",
                          )}
                        >
                          {tx.status}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted">
                      {tx.documentName} · {tx.documentId}
                    </p>
                  </div>
                  <div className="hidden items-center gap-4 sm:flex">
                    <span className="mono text-xs text-muted">
                      {shortHash(tx.txId, 8, 6)}
                    </span>
                    <span className="text-xs text-muted">
                      {timeAgo(tx.timestamp)}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Details modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        size="lg"
        title="Transaction"
        subtitle={selected?.documentName}
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Action" value={selected.action} />
              <Field label="Status" value={selected.status} className="capitalize" />
              <Field label="Block" value={`#${selected.blockNumber.toLocaleString()}`} />
              <Field label="Document ID" value={selected.documentId} />
              <Field label="Timestamp" value={formatDateTime(selected.timestamp)} />
              <Field
                label="Gas used"
                value={selected.gasUsed ? selected.gasUsed.toLocaleString() : "—"}
              />
            </div>
            {[
              { label: "Transaction hash", value: selected.txId },
              { label: "Document SHA-256", value: selected.hash },
              { label: "Wallet address", value: selected.wallet },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-line bg-ivory p-3"
              >
                <p className="mb-1 text-[11px] text-muted">{row.label}</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="mono break-all text-graphite">{row.value}</code>
                  <CopyButton value={row.value} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </Page>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-paper px-3 py-2.5">
      <p className="text-[11px] text-muted">{label}</p>
      <p className={cn("mt-0.5 text-sm font-medium text-graphite", className)}>
        {value}
      </p>
    </div>
  );
}
