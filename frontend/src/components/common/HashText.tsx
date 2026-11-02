import { shortHash } from "@/utils/format";
import CopyButton from "./CopyButton";

interface Props {
  value: string;
  full?: boolean;
  copy?: boolean;
  lead?: number;
  tail?: number;
}

export default function HashText({
  value,
  full = false,
  copy = true,
  lead = 10,
  tail = 8,
}: Props) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="mono text-muted" title={value}>
        {full ? value : shortHash(value, lead, tail)}
      </span>
      {copy && <CopyButton value={value} />}
    </span>
  );
}
