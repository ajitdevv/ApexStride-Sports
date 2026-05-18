import { cn } from "@/lib/utils/cn";

export function BadgePill({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
