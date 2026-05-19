"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOptionalCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils/cn";

export function CartNavLink() {
  const pathname = usePathname();
  const { hydrated, itemCount } = useOptionalCart();
  const isActive = pathname.startsWith("/cart");

  return (
    <Link
      href="/cart"
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        isActive
          ? "bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)]"
          : "text-foreground/78 hover:bg-white/90 hover:text-foreground"
      )}
    >
      Cart{hydrated && itemCount ? ` (${itemCount})` : ""}
    </Link>
  );
}
