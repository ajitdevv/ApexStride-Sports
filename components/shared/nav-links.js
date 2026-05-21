"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function NavLinks({ items, className, stacked = false, tone = "light" }) {
  const pathname = usePathname();

  return (
    <nav className={cn(stacked ? "flex flex-col gap-2" : "flex items-center gap-2", className)}>
      {items.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        const inactiveClasses =
          tone === "dark"
            ? "border border-white/10 text-slate-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
            : "border border-transparent bg-white/70 text-foreground/80 shadow-[0_10px_24px_rgba(15,23,42,0.04)] hover:-translate-y-0.5 hover:border-white/85 hover:bg-white hover:text-foreground hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]";

        const activeClasses =
          tone === "dark"
            ? "border border-sky-300/40 bg-linear-to-r from-sky-400 to-indigo-400 text-slate-950 shadow-[0_18px_35px_rgba(56,189,248,0.25)]"
            : "border border-primary/30 bg-primary text-primary-foreground shadow-[0_14px_28px_rgba(20,71,230,0.22)]";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition duration-200",
              isActive ? activeClasses : inactiveClasses
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
