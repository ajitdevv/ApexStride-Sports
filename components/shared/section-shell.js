import { cn } from "@/lib/utils/cn";

export function SectionShell({ className, children }) {
  return (
    <section className={cn("mx-auto w-full max-w-[96rem] px-3 sm:px-4 lg:px-5 xl:px-6", className)}>
      {children}
    </section>
  );
}
