"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils/cn";

export function CartNavLink() {
  const pathname = usePathname();
  const { hydrated, itemCount } = useCart();
  const isActive = pathname.startsWith("/cart");

  return (
    <Link
      href="/cart"
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition",
        isActive
          ? "bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)]"
          : "text-muted-foreground hover:bg-white hover:text-foreground"
      )}
    >
      Cart{hydrated && itemCount ? ` (${itemCount})` : ""}
    </Link>
  );
}
