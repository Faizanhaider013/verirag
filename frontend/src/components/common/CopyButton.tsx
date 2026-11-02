import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/utils/format";

interface Props {
  value: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ value, label, className }: Props) {
  const { copy, copiedKey } = useCopyToClipboard();
  const copied = copiedKey === value;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        copy(value);
      }}
      title={copied ? "Copied" : "Copy"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs text-muted transition-colors hover:bg-black/[0.04] hover:text-graphite",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {label ? <span>{copied ? "Copied" : label}</span> : null}
    </button>
  );
}
