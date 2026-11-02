import { FileText, Calendar, User2, Hash, Blocks } from "lucide-react";
import Drawer from "@/components/common/Drawer";
import StatusBadge from "@/components/common/StatusBadge";
import CopyButton from "@/components/common/CopyButton";
import type { VeriDocument } from "@/types";
import { formatDateTime, formatKb, shortHash } from "@/utils/format";

function Meta({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof FileText;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
      <div className="flex-1">
        <p className="text-xs text-muted">{label}</p>
        <div className="text-sm font-medium text-graphite">{children}</div>
      </div>
    </div>
  );
}

export default function DocumentInspector({
  document,
  onClose,
}: {
  document: VeriDocument | null;
  onClose: () => void;
}) {
  return (
    <Drawer
      open={!!document}
      onClose={onClose}
      width="lg"
      title={document?.name}
      subtitle={document ? `${document.id} · ${document.category}` : undefined}
    >
      {document && (
        <div className="space-y-7">
          {/* Preview header */}
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-ivory p-4">
            <div className="flex h-14 w-12 items-center justify-center rounded-lg bg-indigo text-[11px] font-semibold text-white shadow-subtle">
              {document.type}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-graphite">
                {document.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {formatKb(document.sizeKb)} · v{document.version}
              </p>
            </div>
            <StatusBadge status={document.status} />
          </div>

          <p className="text-sm leading-relaxed text-muted">
            {document.description}
          </p>

          {/* SHA-256 */}
          <section>
            <p className="overline mb-2">SHA-256 fingerprint</p>
            <div className="rounded-xl border border-line bg-ivory p-3">
              <div className="flex items-center justify-between gap-2">
                <code className="mono break-all text-graphite">
                  {document.hash}
                </code>
                <CopyButton value={document.hash} />
              </div>
            </div>
          </section>

          {/* Metadata */}
          <section className="divide-y divide-line rounded-xl border border-line px-4">
            <Meta icon={Hash} label="Document ID">
              {document.id}
            </Meta>
            <Meta icon={User2} label="Uploaded by">
              {document.uploadedBy}
              <span className="ml-2 mono text-muted">
                {shortHash(document.uploaderWallet, 6, 4)}
              </span>
            </Meta>
            <Meta icon={Calendar} label="Registration timestamp">
              {formatDateTime(document.uploadedAt)}
            </Meta>
            <Meta icon={Blocks} label="Blockchain registration (simulated)">
              <span className="inline-flex items-center gap-2">
                <span className="mono">{shortHash(document.txId, 8, 6)}</span>
                <CopyButton value={document.txId} />
              </span>
              <span className="ml-1 text-xs text-muted">
                block #{document.blockNumber.toLocaleString()}
              </span>
            </Meta>
          </section>

          {/* Version history */}
          <section>
            <p className="overline mb-3">Version history</p>
            <ol className="relative space-y-5 border-l border-line pl-5">
              {[...document.versionHistory].reverse().map((v, i) => (
                <li key={v.version} className="relative">
                  <span
                    className={`absolute -left-[23px] top-1 h-2.5 w-2.5 rounded-full border-2 border-paper ${
                      i === 0 ? "bg-indigo" : "bg-[#d5d4cd]"
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-graphite">
                      Version {v.version}
                    </p>
                    <span className="text-xs text-muted">
                      {formatDateTime(v.uploadedAt)}
                    </span>
                  </div>
                  {v.note && <p className="text-xs text-muted">{v.note}</p>}
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="mono text-muted">
                      {shortHash(v.hash, 10, 6)}
                    </span>
                    <CopyButton value={v.hash} />
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}
    </Drawer>
  );
}
