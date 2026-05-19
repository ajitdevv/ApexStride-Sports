import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-black text-primary-foreground shadow-[0_16px_24px_rgba(20,71,230,0.24)]">
        AS
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
          ApexStride
        </span>
        <span className="text-sm text-foreground/72">Premium Sports</span>
      </span>
    </Link>
  );
}
