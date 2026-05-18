import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, actionLabel, actionHref }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-border bg-white/85 p-8 text-center card-shadow">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
        <PackageSearch className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
      {actionLabel && actionHref ? (
        <Button className="mt-6" href={actionHref} variant="outline">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
