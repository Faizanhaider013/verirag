import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CornerDownLeft,
  FileText,
  ArrowRight,
} from "lucide-react";
import { allNavItems } from "./navItems";
import { mockDocuments } from "@/data/mockDocuments";
import StatusBadge from "@/components/common/StatusBadge";
import { cn } from "@/utils/format";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Cmd {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Documents";
  run: () => void;
  status?: "verified" | "modified";
}

export default function CommandPalette({ open, onClose }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const commands = useMemo<Cmd[]>(() => {
    const nav: Cmd[] = allNavItems.map((i) => ({
      id: `nav-${i.to}`,
      label: i.label,
      hint: "Go to page",
      group: "Navigate",
      run: () => {
        navigate(i.to);
        onClose();
      },
    }));
    const docs: Cmd[] = mockDocuments.map((d) => ({
      id: `doc-${d.id}`,
      label: d.name,
      hint: `${d.id} · v${d.version}`,
      group: "Documents",
      status: d.status === "pending" ? undefined : d.status,
      run: () => {
        navigate(`/documents?doc=${d.id}`);
        onClose();
      },
    }));
    return [...nav, ...docs];
  }, [navigate, onClose]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(s) ||
        c.hint?.toLowerCase().includes(s),
    );
  }, [q, commands]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  const groups = ["Navigate", "Documents"] as const;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <div
        className="absolute inset-0 bg-graphite/25 backdrop-blur-[2px] animate-fade-in-fast"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-xl animate-scale-in overflow-hidden rounded-2xl border border-line bg-paper shadow-pop"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            filtered[active]?.run();
          } else if (e.key === "Escape") {
            onClose();
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4.5 w-4.5 text-muted" style={{ width: 18, height: 18 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages and documents…"
            className="w-full bg-transparent py-4 text-[15px] text-graphite outline-none placeholder:text-muted"
          />
          <kbd className="hidden rounded-md border border-line bg-ivory px-1.5 py-0.5 text-[11px] text-muted sm:block">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted">
              No results for “{q}”
            </p>
          )}
          {groups.map((g) => {
            const rows = filtered.filter((c) => c.group === g);
            if (rows.length === 0) return null;
            return (
              <div key={g} className="mb-1">
                <p className="overline px-3 py-1.5">{g}</p>
                {rows.map((c) => {
                  const idx = filtered.indexOf(c);
                  return (
                    <button
                      key={c.id}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => c.run()}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        idx === active ? "bg-ivory" : "hover:bg-ivory/70",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg",
                          c.group === "Documents"
                            ? "bg-indigo-50 text-indigo"
                            : "bg-ivory text-muted",
                        )}
                      >
                        {c.group === "Documents" ? (
                          <FileText className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-graphite">
                          {c.label}
                        </span>
                        {c.hint && (
                          <span className="block truncate text-xs text-muted">
                            {c.hint}
                          </span>
                        )}
                      </span>
                      {c.status && <StatusBadge status={c.status} size="sm" />}
                      {idx === active && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
