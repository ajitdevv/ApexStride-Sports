"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function NavLinks({ items, className, stacked = false }) {
  const pathname = usePathname();

  return (
    <nav className={cn(stacked ? "flex flex-col gap-2" : "flex items-center gap-2", className)}>
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              isActive
                ? "bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)]"
                : "text-muted-foreground hover:bg-white hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
