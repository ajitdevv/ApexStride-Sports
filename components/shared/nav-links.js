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
            ? "text-slate-200 hover:bg-white/10 hover:text-white"
            : "text-muted-foreground hover:bg-white/90 hover:text-foreground";

        const activeClasses =
          tone === "dark"
            ? "bg-linear-to-r from-sky-400 to-indigo-400 text-slate-950 shadow-[0_18px_35px_rgba(56,189,248,0.25)]"
            : "bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)]";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
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
