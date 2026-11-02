import { cn } from "@/utils/format";

interface Props {
  size?: number;
  className?: string;
}

/**
 * VeriRAG mark — a document silhouette with a verification check,
 * drawn as inline SVG so it stays crisp and themeable.
 */
export default function Logo({ size = 28, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#5555A8" />
      <path
        d="M10 8.5h8l4.5 4.5v9A1.5 1.5 0 0 1 21 23.5H10A1.5 1.5 0 0 1 8.5 22V10A1.5 1.5 0 0 1 10 8.5Z"
        fill="#EAE8FA"
      />
      <path d="M18 8.5v4.5h4.5" stroke="#5555A8" strokeWidth="1.3" />
      <path
        d="M12.4 16.8l2.1 2.1 4-4.4"
        stroke="#5555A8"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
