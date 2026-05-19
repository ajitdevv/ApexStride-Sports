import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, actionLabel, actionHref, tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <div
      className={
        isDark
          ? "rounded-[2rem] border border-white/10 bg-white/6 p-8 text-center backdrop-blur-xl"
          : "rounded-[2rem] border border-dashed border-border bg-white/85 p-8 text-center card-shadow"
      }
    >
      <div
        className={
          isDark
            ? "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200"
            : "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary"
        }
      >
        <PackageSearch className="h-6 w-6" />
      </div>
      <h2 className={isDark ? "mt-5 text-2xl font-semibold tracking-tight text-white" : "mt-5 text-2xl font-semibold tracking-tight text-foreground"}>{title}</h2>
      <p className={isDark ? "mx-auto mt-3 max-w-xl text-sm leading-7 text-dark-muted" : "mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground"}>{description}</p>
      {actionLabel && actionHref ? (
        <Button className="mt-6" href={actionHref} variant={isDark ? "secondary" : "outline"}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
