import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Check,
  Command,
} from "lucide-react";
import { titleForPath } from "./navItems";

interface Props {
  onOpenMobile: () => void;
  onOpenCommand: () => void;
}

const workspaces = ["Acme Corp — Knowledge", "Legal & Compliance", "Clinical Ops"];

export default function Topbar({ onOpenMobile, onOpenCommand }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = titleForPath(pathname);
  const [wsOpen, setWsOpen] = useState(false);
  const [workspace, setWorkspace] = useState(workspaces[0]);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-ivory/80 px-4 backdrop-blur-xl lg:px-7">
      <button
        onClick={onOpenMobile}
        className="btn-ghost h-9 w-9 rounded-lg p-0 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Workspace selector */}
      <div className="relative hidden sm:block">
        <button
          onClick={() => setWsOpen((v) => !v)}
          onBlur={() => setTimeout(() => setWsOpen(false), 120)}
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-medium text-graphite transition-colors hover:bg-black/[0.04]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo text-[11px] font-semibold text-white">
            A
          </span>
          <span className="max-w-[180px] truncate">{workspace}</span>
          <ChevronDown className="h-4 w-4 text-muted" />
        </button>
        {wsOpen && (
          <div className="absolute left-0 top-full z-30 mt-1 w-64 animate-scale-in rounded-xl border border-line bg-paper p-1.5 shadow-pop">
            <p className="overline px-2.5 py-1.5">Workspaces</p>
            {workspaces.map((w) => (
              <button
                key={w}
                onMouseDown={() => {
                  setWorkspace(w);
                  setWsOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-graphite hover:bg-ivory"
              >
                {w}
                {w === workspace && <Check className="h-4 w-4 text-indigo" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="hidden items-center gap-2 text-sm text-muted md:flex">
        <span className="text-line">/</span>
        <span className="font-medium text-graphite">{title}</span>
      </div>

      {/* Command palette trigger */}
      <button
        onClick={onOpenCommand}
        className="group ml-auto flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 text-sm text-muted transition-colors hover:border-[#dcdbd4] hover:bg-ivory sm:min-w-[220px]"
      >
        <Search className="h-4 w-4" />
        <span className="hidden flex-1 text-left sm:block">Search…</span>
        <kbd className="hidden items-center gap-0.5 rounded-md border border-line bg-ivory px-1.5 py-0.5 text-[11px] text-muted sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      <button
        className="btn-ghost relative h-9 w-9 rounded-lg p-0"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-garnet" />
      </button>

      <button
        onClick={() => navigate("/settings")}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo text-[13px] font-semibold text-white"
        aria-label="Profile"
      >
        FH
      </button>
    </header>
  );
}
