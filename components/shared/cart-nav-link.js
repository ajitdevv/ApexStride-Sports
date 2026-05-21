"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useOptionalCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils/cn";

export function CartNavLink() {
  const pathname = usePathname();
  const { hydrated, itemCount } = useOptionalCart();
  const isActive = pathname.startsWith("/cart");

  return (
    <Link
      aria-label={hydrated && itemCount ? `Cart with ${itemCount} items` : "Cart"}
      href="/cart"
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/85 bg-white/96 text-foreground shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary",
        isActive ? "border-primary/30 bg-primary text-primary-foreground shadow-[0_16px_32px_rgba(20,71,230,0.22)] hover:text-primary-foreground" : ""
      )}
    >
      <ShoppingCart className="h-4.5 w-4.5" />
      {hydrated && itemCount ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}
