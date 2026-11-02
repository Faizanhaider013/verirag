import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  Check,
  Loader2,
  Fingerprint,
  Blocks,
  Database,
  ShieldCheck,
  Info,
} from "lucide-react";
import Page from "@/components/common/Page";
import CopyButton from "@/components/common/CopyButton";
import { documentCategories } from "@/data/mockDocuments";
import { fakeHashFromName, fakeTxId } from "@/services/mockApi";
import { cn, formatKb } from "@/utils/format";

type StepState = "idle" | "active" | "done";

const steps = [
  { key: "upload", label: "Upload document", icon: UploadCloud },
  { key: "hash", label: "Generate SHA-256 fingerprint", icon: Fingerprint },
  { key: "register", label: "Register fingerprint on blockchain", icon: Blocks },
  { key: "index", label: "Index document into knowledge base", icon: Database },
];

interface Picked {
  name: string;
  sizeKb: number;
}

export default function Register() {
  const [file, setFile] = useState<Picked | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Policy");
  const [version, setVersion] = useState("1.0");
  const [approved, setApproved] = useState(false);
  const [states, setStates] = useState<StepState[]>(steps.map(() => "idle"));
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ hash: string; txId: string } | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  function pick(f: File | undefined) {
    if (!f) return;
    setFile({ name: f.name, sizeKb: Math.max(1, Math.round(f.size / 1024)) });
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
    setResult(null);
    setStates(steps.map(() => "idle"));
  }

  async function run() {
    if (!file || !approved || running) return;
    setRunning(true);
    setResult(null);
    const next: StepState[] = steps.map(() => "idle");
    for (let i = 0; i < steps.length; i++) {
      next[i] = "active";
      setStates([...next]);
      await new Promise((r) => setTimeout(r, 800)); // simulated latency
      next[i] = "done";
      setStates([...next]);
    }
    setResult({ hash: fakeHashFromName(file.name), txId: fakeTxId() });
    setRunning(false);
  }

  function reset() {
    setFile(null);
    setTitle("");
    setDescription("");
    setVersion("1.0");
    setApproved(false);
    setResult(null);
    setRunning(false);
    setStates(steps.map(() => "idle"));
  }

  const canRun = !!file && approved && !running;

  return (
    <Page>
      <header className="max-w-2xl">
        <p className="overline mb-3">Document Registration</p>
        <h1 className="font-display text-hero font-semibold tracking-tight text-graphite text-balance">
          Bring your knowledge into VeriRAG.
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted text-balance">
          Register approved documents and establish their cryptographic identity.
        </p>
      </header>

      <div className="mt-6 flex items-start gap-2 rounded-xl border border-indigo/15 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Prototype mode — the SHA-256 fingerprint and blockchain registration
          below are simulated on the client. No real transaction is sent.
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Form */}
        <div className="space-y-6 lg:col-span-3">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              pick(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
              dragOver
                ? "border-indigo bg-indigo-50"
                : "border-line bg-paper hover:border-[#d5d4cd] hover:bg-ivory/60",
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => pick(e.target.files?.[0])}
            />
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo">
              <UploadCloud className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-graphite">
                Drag &amp; drop a document
              </p>
              <p className="mt-0.5 text-xs text-muted">
                or click to browse · PDF, DOCX, TXT
              </p>
            </div>
          </div>

          {file && (
            <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-graphite">
                  {file.name}
                </p>
                <p className="text-xs text-muted">{formatKb(file.sizeKb)}</p>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setResult(null);
                  setStates(steps.map(() => "idle"));
                }}
                className="btn-ghost h-8 w-8 rounded-lg p-0"
                aria-label="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="surface space-y-4 p-5">
            <div>
              <label className="label">Document title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Data Retention Policy"
                className="input"
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Short description…"
                className="input resize-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input cursor-pointer"
                >
                  {documentCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Version</label>
                <input
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-ivory px-3.5 py-3">
              <input
                type="checkbox"
                checked={approved}
                onChange={(e) => setApproved(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-line accent-indigo"
              />
              <span className="text-sm text-muted">
                I confirm this document is{" "}
                <span className="font-medium text-graphite">
                  officially approved
                </span>{" "}
                and may be registered as an authoritative source.
              </span>
            </label>

            <div className="flex items-center justify-end gap-2">
              <button onClick={reset} disabled={running} className="btn-secondary">
                Reset
              </button>
              <button onClick={run} disabled={!canRun} className="btn-primary">
                {running ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Registering…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" /> Register document
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="surface sticky top-20 p-5">
            <p className="overline mb-4">Registration timeline</p>
            <ol className="space-y-1">
              {steps.map((step, i) => {
                const s = states[i];
                return (
                  <li key={step.key} className="flex items-start gap-3 py-2">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold transition-colors",
                        s === "done"
                          ? "border-emerald/30 bg-emerald-soft text-emerald"
                          : s === "active"
                            ? "border-indigo/30 bg-indigo-50 text-indigo"
                            : "border-line bg-ivory text-muted",
                      )}
                    >
                      {s === "done" ? (
                        <Check className="h-4 w-4" />
                      ) : s === "active" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="mono text-[11px] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p
                        className={cn(
                          "text-sm",
                          s === "idle"
                            ? "text-muted"
                            : "font-medium text-graphite",
                        )}
                      >
                        {step.label}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {result && (
              <div className="mt-5 space-y-3 rounded-xl border border-emerald/20 bg-emerald-soft p-4 animate-fade-in">
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald">
                  <Check className="h-4 w-4" /> Registered (simulated)
                </p>
                <div>
                  <p className="text-[11px] text-graphite/60">SHA-256</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <code className="mono break-all text-graphite">
                      {result.hash}
                    </code>
                    <CopyButton value={result.hash} />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-graphite/60">Transaction</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <code className="mono break-all text-graphite">
                      {result.txId}
                    </code>
                    <CopyButton value={result.txId} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
