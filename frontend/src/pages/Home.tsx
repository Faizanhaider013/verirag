import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowUpRight,
  Sparkles,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Blocks,
  Clock,
  CheckCircle2,
  XCircle,
  CornerDownLeft,
} from "lucide-react";
import Page from "@/components/common/Page";
import StatusBadge from "@/components/common/StatusBadge";
import { dashboardStats } from "@/data/mockStats";
import { mockDocuments } from "@/data/mockDocuments";
import { mockVerifications } from "@/data/mockVerifications";
import { formatDate, timeAgo, cn } from "@/utils/format";

const prompts = [
  "Summarize our latest approved policy.",
  "What documents have been modified?",
  "Explain our data retention requirements.",
  "Find documents related to compliance.",
];

const metrics = [
  {
    label: "Documents indexed",
    value: dashboardStats.totalDocuments,
    icon: FileText,
    to: "/documents",
  },
  {
    label: "Verified sources",
    value: dashboardStats.verifiedDocuments,
    icon: ShieldCheck,
    accent: "text-emerald",
    to: "/verification",
  },
  {
    label: "Modified sources",
    value: dashboardStats.modifiedDocuments,
    icon: ShieldAlert,
    accent: "text-garnet",
    to: "/verification",
  },
  {
    label: "Blockchain registrations",
    value: dashboardStats.blockchainTransactions,
    icon: Blocks,
    to: "/blockchain",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const recentDocs = mockDocuments.slice(0, 5);
  const recentVerifs = mockVerifications.slice(0, 5);
  const health = Math.round(
    (dashboardStats.verifiedDocuments / dashboardStats.totalDocuments) * 100,
  );

  function ask(text: string) {
    const query = text.trim();
    if (!query) return;
    navigate(`/ask?q=${encodeURIComponent(query)}`);
  }

  return (
    <Page width="wide">
      {/* Hero */}
      <header className="max-w-2xl">
        <p className="overline mb-3">Knowledge Workspace</p>
        <h1 className="font-display text-display font-semibold tracking-tight text-graphite text-balance">
          Your knowledge, verified.
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted text-balance">
          Explore your documents, ask questions and trust every source behind
          every answer.
        </p>
      </header>

      {/* Ask box */}
      <div className="mt-8 max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(q);
          }}
          className="group rounded-2xl border border-line bg-paper p-2 shadow-card transition-shadow focus-within:shadow-lift"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ask anything about your knowledge base…"
              className="flex-1 bg-transparent px-1 py-2 text-[15px] text-graphite outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="btn-primary h-10 px-4"
              disabled={!q.trim()}
            >
              Ask
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => ask(p)}
              className="rounded-full border border-line bg-paper px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-[#dcdbd4] hover:text-graphite"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 lg:grid-cols-4">
        {metrics.map((m) => (
          <Link key={m.label} to={m.to} className="group block">
            <div className="flex items-center gap-2 text-muted">
              <m.icon className={cn("h-4 w-4", m.accent)} />
              <span className="text-[13px]">{m.label}</span>
            </div>
            <p className="mt-1.5 font-display text-[32px] font-semibold tracking-tight text-graphite">
              {m.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Two-column composition */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Recently accessed */}
        <section className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-graphite">
              Recently accessed
            </h2>
            <Link
              to="/documents"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-indigo hover:text-indigo-600"
            >
              All documents <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="surface divide-y divide-line overflow-hidden">
            {recentDocs.map((doc) => (
              <Link
                key={doc.id}
                to={`/documents?doc=${doc.id}`}
                className="flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-ivory/70"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ivory text-[10px] font-semibold text-muted">
                  {doc.type}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-graphite">
                    {doc.name}
                  </p>
                  <p className="truncate text-xs text-muted">
                    v{doc.version} · {formatDate(doc.uploadedAt)}
                  </p>
                </div>
                <StatusBadge status={doc.status} size="sm" />
              </Link>
            ))}
          </div>
        </section>

        {/* Recent verification activity + health */}
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-graphite">
              Verification activity
            </h2>
            <Link
              to="/verification"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-indigo hover:text-indigo-600"
            >
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Health indicator */}
          <div className="surface mb-4 p-4">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-muted">Knowledge base health</p>
              <span className="text-[13px] font-semibold text-emerald">
                {health}% verified
              </span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ivory">
              <div
                className="h-full rounded-full bg-emerald transition-all"
                style={{ width: `${health}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              {dashboardStats.modifiedDocuments} source
              {dashboardStats.modifiedDocuments === 1 ? "" : "s"} need review.
            </p>
          </div>

          <div className="surface divide-y divide-line overflow-hidden">
            {recentVerifs.map((v) => (
              <div key={v.id} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    v.result === "verified"
                      ? "bg-emerald-soft text-emerald"
                      : "bg-garnet-soft text-garnet",
                  )}
                >
                  {v.result === "verified" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-graphite">
                    {v.documentName}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Clock className="h-3 w-3" />
                    {timeAgo(v.verifiedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
