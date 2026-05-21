import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, actionLabel, actionHref, tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <div
      className={
        isDark
          ? "rounded-[1.6rem] border border-white/10 bg-white/6 p-5 text-center backdrop-blur-xl sm:p-6"
          : "rounded-[1.6rem] border border-dashed border-border bg-white/85 p-5 text-center card-shadow sm:p-6"
      }
    >
      <div
        className={
          isDark
            ? "mx-auto flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/10 bg-[#0d1b30] text-sky-200 sm:h-14 sm:w-14 sm:rounded-2xl"
            : "mx-auto flex h-12 w-12 items-center justify-center rounded-[1rem] bg-secondary text-primary sm:h-14 sm:w-14 sm:rounded-2xl"
        }
      >
        <PackageSearch className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h2 className={isDark ? "mt-4 text-xl font-semibold tracking-tight text-white sm:mt-5 sm:text-2xl" : "mt-4 text-xl font-semibold tracking-tight text-foreground sm:mt-5 sm:text-2xl"}>{title}</h2>
      <p className={isDark ? "mx-auto mt-2.5 max-w-xl text-sm leading-6 text-dark-muted" : "mx-auto mt-2.5 max-w-xl text-sm leading-6 text-muted-foreground"}>{description}</p>
      {actionLabel && actionHref ? (
        <Button className="mt-5" href={actionHref} variant={isDark ? "secondary" : "outline"}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
