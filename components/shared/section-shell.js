import { cn } from "@/lib/utils/cn";

export function SectionShell({ className, children }) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </section>
  );
}
