import { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import Page from "@/components/common/Page";
import Modal from "@/components/common/Modal";
import CopyButton from "@/components/common/CopyButton";
import EmptyState from "@/components/common/EmptyState";
import { mockVerifications } from "@/data/mockVerifications";
import type { VerificationRecord } from "@/types";
import { cn, formatDateTime, shortHash, timeAgo } from "@/utils/format";

type Filter = "all" | "verified" | "modified";

function diff(expected: string, actual: string) {
  const len = Math.max(expected.length, actual.length);
  const out: { c: string; d: boolean }[] = [];
  for (let i = 0; i < len; i++) {
    const a = actual[i] ?? "";
    out.push({ c: a, d: a !== (expected[i] ?? "") });
  }
  return out;
}

export default function Verification() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<VerificationRecord | null>(null);

  const passed = mockVerifications.filter((v) => v.result === "verified").length;
  const failed = mockVerifications.length - passed;
  const rate = Math.round((passed / mockVerifications.length) * 100);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockVerifications.filter((v) => {
      const mq =
        !q ||
        v.documentName.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        v.documentId.toLowerCase().includes(q);
      const mf = filter === "all" || v.result === filter;
      return mq && mf;
    });
  }, [query, filter]);

  const stats = [
    { label: "Total checks", value: mockVerifications.length, tone: "" },
    { label: "Verified", value: passed, tone: "text-emerald" },
    { label: "Modified", value: failed, tone: "text-garnet" },
    { label: "Pass rate", value: `${rate}%`, tone: "" },
  ];

  return (
    <Page width="wide">
      <header className="max-w-2xl">
        <p className="overline mb-3">Verification Center</p>
        <h1 className="font-display text-hero font-semibold tracking-tight text-graphite text-balance">
          Trust, backed by evidence.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted text-balance">
          Every integrity check compares a document's current fingerprint against
          its immutable on-chain record.
        </p>
      </header>

      {/* Compact stats */}
      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[13px] text-muted">{s.label}</p>
            <p
              className={cn(
                "mt-1.5 font-display text-[32px] font-semibold tracking-tight text-graphite",
                s.tone,
              )}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by document or verification ID…"
            className="input pl-10"
          />
        </div>
        <div className="flex items-center rounded-xl border border-line bg-paper p-0.5">
          {(["all", "verified", "modified"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                filter === f
                  ? "bg-ivory text-graphite"
                  : "text-muted hover:text-graphite",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="mt-6 surface overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="No verification records"
            description="Try another search or filter."
          />
        ) : (
          <div className="divide-y divide-line">
            {filtered.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-ivory/70"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    v.result === "verified"
                      ? "bg-emerald-soft text-emerald"
                      : "bg-garnet-soft text-garnet",
                  )}
                >
                  {v.result === "verified" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0 flex-[2]">
                  <p className="truncate text-sm font-medium text-graphite">
                    {v.documentName}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {v.id} · v{v.version} · {timeAgo(v.verifiedAt)}
                  </p>
                </div>
                <div className="hidden min-w-0 flex-1 items-center gap-2 lg:flex">
                  <span className="mono text-xs text-muted">
                    {shortHash(v.expectedHash, 6, 4)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted" />
                  <span
                    className={cn(
                      "mono text-xs",
                      v.result === "modified" ? "text-garnet" : "text-muted",
                    )}
                  >
                    {shortHash(v.actualHash, 6, 4)}
                  </span>
                </div>
                <span
                  className={cn(
                    "chip shrink-0",
                    v.result === "verified"
                      ? "bg-emerald-soft text-emerald"
                      : "bg-garnet-soft text-garnet",
                  )}
                >
                  {v.result === "verified" ? "Verified" : "Modified"}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Comparison modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        size="lg"
        title="Hash comparison"
        subtitle={selected ? `${selected.id} · ${selected.documentName}` : undefined}
      >
        {selected && (
          <div className="space-y-5">
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3.5",
                selected.result === "verified"
                  ? "border-emerald/20 bg-emerald-soft"
                  : "border-garnet/25 bg-garnet-soft",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  selected.result === "verified"
                    ? "bg-emerald text-white"
                    : "bg-garnet text-white",
                )}
              >
                {selected.result === "verified" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    selected.result === "verified"
                      ? "text-emerald"
                      : "text-garnet",
                  )}
                >
                  {selected.result === "verified"
                    ? "Hashes match — integrity verified"
                    : "Hashes differ — document modified"}
                </p>
                <p className="text-xs text-graphite/70">
                  Verified {formatDateTime(selected.verifiedAt)}
                </p>
              </div>
            </div>

            <div>
              <p className="overline mb-2">Expected · on-chain</p>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-ivory p-3">
                <code className="mono break-all text-graphite">
                  {selected.expectedHash}
                </code>
                <CopyButton value={selected.expectedHash} />
              </div>
            </div>

            <div>
              <p className="overline mb-2">Actual · recomputed now</p>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-ivory p-3">
                <code className="mono break-all">
                  {diff(selected.expectedHash, selected.actualHash).map((x, i) => (
                    <span
                      key={i}
                      className={
                        x.d
                          ? "rounded-sm bg-garnet/20 font-semibold text-garnet"
                          : "text-graphite"
                      }
                    >
                      {x.c}
                    </span>
                  ))}
                </code>
                <CopyButton value={selected.actualHash} />
              </div>
              {selected.result === "modified" && (
                <p className="mt-2 text-xs text-muted">
                  Highlighted characters show where the recomputed hash diverges.
                  Even a single-character difference means the content changed.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Page>
  );
}
