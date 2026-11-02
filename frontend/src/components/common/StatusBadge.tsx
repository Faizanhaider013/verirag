import { ShieldCheck, ShieldAlert, Clock } from "lucide-react";
import type { VerificationStatus } from "@/types";
import { cn } from "@/utils/format";

interface Props {
  status: VerificationStatus;
  size?: "sm" | "md";
  variant?: "soft" | "dot";
}

const config: Record<
  VerificationStatus,
  { label: string; soft: string; Icon: typeof ShieldCheck; dot: string }
> = {
  verified: {
    label: "Verified",
    soft: "bg-emerald-soft text-emerald",
    dot: "bg-emerald",
    Icon: ShieldCheck,
  },
  modified: {
    label: "Modified",
    soft: "bg-garnet-soft text-garnet",
    dot: "bg-garnet",
    Icon: ShieldAlert,
  },
  pending: {
    label: "Pending",
    soft: "bg-ivory text-muted",
    dot: "bg-muted",
    Icon: Clock,
  },
};

export default function StatusBadge({
  status,
  size = "md",
  variant = "soft",
}: Props) {
  const c = config[status];

  if (variant === "dot") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-graphite">
        <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
        {c.label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "chip",
        c.soft,
        size === "sm" && "px-2 py-0.5 text-[11px]",
      )}
    >
      <c.Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {c.label}
    </span>
  );
}
