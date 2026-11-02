import type { ReactNode } from "react";
import { cn } from "@/utils/format";

interface Props {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

/** Consistent page gutters and max-width for the editorial layout. */
export default function Page({ children, className, width = "default" }: Props) {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className={cn("mx-auto w-full animate-fade-in", widths[width], className)}>
        {children}
      </div>
    </div>
  );
}
