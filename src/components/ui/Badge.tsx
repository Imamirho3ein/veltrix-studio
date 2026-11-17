import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-[0.72rem] font-medium text-fog-300 backdrop-blur-md",
        className,
      )}
    >
      {dot ? (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent-400" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
