import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/format";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  width?: "md" | "lg";
}

/** Right-side slide-over panel. */
export default function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "md",
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-graphite/25 backdrop-blur-[2px] animate-fade-in-fast"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full animate-slide-in-right flex-col border-l border-line bg-paper shadow-pop",
          width === "lg" ? "max-w-xl" : "max-w-md",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-[15px] font-semibold text-graphite">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-0.5 truncate text-sm text-muted">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn-ghost -mr-2 -mt-1 h-8 w-8 rounded-lg p-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </aside>
    </div>
  );
}
