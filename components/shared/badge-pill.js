import { cn } from "@/lib/utils/cn";

export function BadgePill({ className, children }) {
  return (
    <span
      className={cn(
        "text-wrap-safe inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary sm:px-3 sm:text-xs sm:tracking-[0.22em]",
        className
      )}
    >
      {children}
    </span>
  );
}
