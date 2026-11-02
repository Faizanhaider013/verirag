import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  ExternalLink,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Citation } from "@/types";
import { mockDocuments } from "@/data/mockDocuments";
import CopyButton from "@/components/common/CopyButton";
import { cn, formatDateTime, shortHash } from "@/utils/format";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-graphite">
        {children}
      </span>
    </div>
  );
}

/** Document inspection content for a cited source. Reused in panel + drawer. */
export default function SourceInspector({
  citation,
  onClose,
}: {
  citation: Citation;
  onClose?: () => void;
}) {
  const doc = mockDocuments.find((d) => d.id === citation.documentId);
  const verified = citation.status === "verified";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo">
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="overline">Source inspector</p>
            <p className="truncate text-sm font-semibold text-graphite">
              {citation.documentName}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="btn-ghost h-8 w-8 rounded-lg p-0"
            aria-label="Close inspector"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {/* Verdict */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border px-4 py-3",
            verified
              ? "border-emerald/20 bg-emerald-soft"
              : "border-garnet/25 bg-garnet-soft",
          )}
        >
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              verified ? "bg-emerald text-white" : "bg-garnet text-white",
            )}
          >
            {verified ? (
              <ShieldCheck className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
            ) : (
              <ShieldAlert className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
            )}
          </span>
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                verified ? "text-emerald" : "text-garnet",
              )}
            >
              {verified ? "Integrity verified" : "Integrity check failed"}
            </p>
            <p className="text-xs text-graphite/70">
              {verified
                ? "Current hash matches the on-chain record."
                : "Current hash differs from the on-chain record."}
            </p>
          </div>
        </div>

        {/* Integrity visualization */}
        <div>
          <p className="overline mb-2">Integrity</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-muted">On-chain</span>
              <div className="h-1.5 flex-1 rounded-full bg-emerald/70" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-muted">Current</span>
              <div
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  verified ? "bg-emerald/70" : "bg-garnet/70",
                )}
              />
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-line bg-ivory p-3">
            <p className="mb-1 text-[11px] text-muted">SHA-256 fingerprint</p>
            <div className="flex items-center justify-between gap-2">
              <code className="mono break-all text-graphite">
                {citation.hash}
              </code>
              <CopyButton value={citation.hash} />
            </div>
          </div>
        </div>

        {/* Blockchain record */}
        <div>
          <p className="overline mb-1">Blockchain record (simulated)</p>
          <div className="divide-y divide-line rounded-xl border border-line bg-paper px-3">
            <Field label="Document ID">{citation.documentId}</Field>
            <Field label="Version">v{citation.version}</Field>
            {doc && (
              <>
                <Field label="Transaction">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="mono">{shortHash(doc.txId, 8, 6)}</span>
                    <CopyButton value={doc.txId} />
                  </span>
                </Field>
                <Field label="Block">#{doc.blockNumber.toLocaleString()}</Field>
                <Field label="Uploader">
                  <span className="mono">{shortHash(doc.uploaderWallet, 6, 4)}</span>
                </Field>
                <Field label="Registered">{formatDateTime(doc.uploadedAt)}</Field>
              </>
            )}
          </div>
        </div>

        {citation.excerpt && (
          <div>
            <p className="overline mb-1">Cited passage</p>
            <blockquote className="rounded-xl border-l-2 border-indigo bg-ivory px-3 py-2.5 text-sm italic text-graphite/80">
              “{citation.excerpt}”
            </blockquote>
          </div>
        )}
      </div>

      <div className="border-t border-line px-5 py-3">
        <Link
          to={`/documents?doc=${citation.documentId}`}
          className="btn-secondary w-full"
        >
          Open in Documents <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
