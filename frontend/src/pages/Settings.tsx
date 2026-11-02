import { useState } from "react";
import { Check } from "lucide-react";
import Page from "@/components/common/Page";
import CopyButton from "@/components/common/CopyButton";
import { cn } from "@/utils/format";

type Theme = "light" | "warm" | "system";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-indigo" : "bg-[#d9d8d1]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-subtle transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function Row({
  title,
  children,
  desc,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-medium text-graphite">{title}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [theme, setTheme] = useState<Theme>("warm");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoVerify, setAutoVerify] = useState(true);
  const [compact, setCompact] = useState(false);

  const rpc = "http://127.0.0.1:8545";
  const contract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  return (
    <Page>
      <header className="max-w-2xl">
        <p className="overline mb-3">Preferences</p>
        <h1 className="font-display text-hero font-semibold tracking-tight text-graphite">
          Settings
        </h1>
        <p className="mt-2 text-[15px] text-muted">
          Interface preferences and prototype configuration. Authentication and
          live blockchain configuration are not implemented yet.
        </p>
      </header>

      <div className="mt-8 space-y-10">
        {/* Profile */}
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">
            Profile
          </h2>
          <div className="surface p-5">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo text-lg font-semibold text-white">
                FH
              </span>
              <div>
                <p className="text-sm font-medium text-graphite">
                  M. Faizan Haider
                </p>
                <p className="text-xs text-muted">Administrator</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Full name</label>
                <input className="input" defaultValue="M. Faizan Haider" />
              </div>
              <div>
                <label className="label">Role</label>
                <input className="input" defaultValue="Administrator" disabled />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  defaultValue="admin@verirag.local"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">
            Application preferences
          </h2>
          <div className="surface divide-y divide-line px-5">
            <Row
              title="Email alerts on modified sources"
              desc="Notify me when a verification fails."
            >
              <Toggle checked={emailAlerts} onChange={setEmailAlerts} />
            </Row>
            <Row
              title="Auto-verify cited sources"
              desc="Re-check fingerprints automatically on each answer."
            >
              <Toggle checked={autoVerify} onChange={setAutoVerify} />
            </Row>
            <Row
              title="Compact density"
              desc="Reduce spacing across lists and tables."
            >
              <Toggle checked={compact} onChange={setCompact} />
            </Row>
          </div>
        </section>

        {/* Theme */}
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">Theme</h2>
          <div className="grid grid-cols-3 gap-3 sm:max-w-md">
            {(
              [
                { key: "warm", label: "Ivory", swatch: "bg-ivory" },
                { key: "light", label: "Paper", swatch: "bg-white" },
                { key: "system", label: "System", swatch: "bg-gradient-to-r from-ivory to-graphite/80" },
              ] as { key: Theme; label: string; swatch: string }[]
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                className={cn(
                  "relative rounded-xl border p-3 text-left transition-colors",
                  theme === t.key
                    ? "border-indigo bg-indigo-50"
                    : "border-line bg-paper hover:border-[#dcdbd4]",
                )}
              >
                {theme === t.key && (
                  <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-indigo" />
                )}
                <div
                  className={cn(
                    "mb-2 h-10 w-full rounded-lg border border-line",
                    t.swatch,
                  )}
                />
                <span className="text-sm text-graphite">{t.label}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Ivory is tuned for this prototype. Other themes are placeholders.
          </p>
        </section>

        {/* Blockchain network */}
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-graphite">
            Blockchain network
          </h2>
          <div className="surface space-y-3 p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line bg-ivory px-3 py-2.5">
                <p className="text-[11px] text-muted">Network</p>
                <p className="text-sm font-medium text-graphite">
                  Hardhat (local)
                </p>
              </div>
              <div className="rounded-xl border border-line bg-ivory px-3 py-2.5">
                <p className="text-[11px] text-muted">Chain ID</p>
                <p className="mono text-sm text-graphite">31337</p>
              </div>
            </div>
            <div className="rounded-xl border border-line bg-ivory p-3">
              <p className="mb-1 text-[11px] text-muted">RPC URL</p>
              <div className="flex items-center justify-between gap-2">
                <code className="mono break-all text-graphite">{rpc}</code>
                <CopyButton value={rpc} />
              </div>
            </div>
            <div className="rounded-xl border border-line bg-ivory p-3">
              <p className="mb-1 text-[11px] text-muted">Contract address</p>
              <div className="flex items-center justify-between gap-2">
                <code className="mono break-all text-graphite">{contract}</code>
                <CopyButton value={contract} />
              </div>
            </div>
            <p className="text-xs text-muted">
              Placeholder values. No wallet is connected and no transactions are
              sent in this prototype.
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
}
