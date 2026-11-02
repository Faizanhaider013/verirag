import { NavLink } from "react-router-dom";
import {
  Settings,
  PanelLeftClose,
  PanelLeft,
  X,
  ChevronDown,
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { navGroups } from "./navItems";
import { cn } from "@/utils/format";

interface Props {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: Props) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-graphite/20 backdrop-blur-[2px] lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-ivory/95 backdrop-blur-xl transition-[transform,width] duration-200 lg:static lg:z-auto lg:translate-x-0",
          collapsed ? "lg:w-[76px]" : "lg:w-[256px]",
          "w-[256px] border-r border-line",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand */}
        <div
          className={cn(
            "flex h-16 items-center gap-2.5 px-4",
            collapsed && "lg:justify-center lg:px-0",
          )}
        >
          <Logo size={30} />
          {!collapsed && (
            <div className="min-w-0 leading-none">
              <p className="font-display text-[19px] font-semibold tracking-tight text-graphite">
                VeriRAG
              </p>
            </div>
          )}
          <button
            onClick={onCloseMobile}
            className="btn-ghost ml-auto h-8 w-8 rounded-lg p-0 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {navGroups.map((group) => (
            <div key={group.heading} className="mb-5">
              {!collapsed && (
                <p className="overline px-2.5 pb-1.5">{group.heading}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map(({ label, to, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={onCloseMobile}
                    title={collapsed ? label : undefined}
                    className={({ isActive }) =>
                      cn(
                        "nav-item",
                        isActive && "nav-item-active",
                        collapsed && "lg:justify-center lg:px-0",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0",
                            isActive ? "text-indigo" : "text-muted",
                          )}
                        />
                        {!collapsed && <span className="truncate">{label}</span>}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: settings + profile + collapse */}
        <div className="space-y-1 border-t border-line p-3">
          <NavLink
            to="/settings"
            onClick={onCloseMobile}
            title={collapsed ? "Settings" : undefined}
            className={({ isActive }) =>
              cn(
                "nav-item",
                isActive && "nav-item-active",
                collapsed && "lg:justify-center lg:px-0",
              )
            }
          >
            {({ isActive }) => (
              <>
                <Settings
                  className={cn(
                    "h-[18px] w-[18px] shrink-0",
                    isActive ? "text-indigo" : "text-muted",
                  )}
                />
                {!collapsed && <span>Settings</span>}
              </>
            )}
          </NavLink>

          <button
            className={cn(
              "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-black/[0.035]",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo text-[13px] font-semibold text-white">
              FH
            </span>
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-sm font-medium text-graphite">
                    M. Faizan Haider
                  </span>
                  <span className="block truncate text-xs text-muted">
                    Administrator
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 text-muted" />
              </>
            )}
          </button>

          <button
            onClick={onToggleCollapse}
            className="btn-ghost hidden w-full justify-center rounded-xl lg:flex"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
