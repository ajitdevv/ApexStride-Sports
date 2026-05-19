"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { accountNavigation, mainNavigation } from "@/lib/config/navigation";
import { useOptionalCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ isAdmin, isAuthenticated, primaryCta }) {
  const [isOpen, setIsOpen] = useState(false);
  const { hydrated, itemCount } = useOptionalCart();

  const authItems = isAuthenticated
    ? [{ label: "Account", href: "/account" }, ...(isAdmin ? [{ label: "Admin Panel", href: "/admin" }] : [])]
    : accountNavigation.slice(1);

  const navItems = mainNavigation.filter((item) => item.href !== "/account");

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white/92 text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <div
        className={cn(
          "absolute inset-x-0 top-full mt-3 rounded-4xl border border-white/75 bg-white/98 p-4 shadow-[0_28px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl transition sm:p-5",
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-border/70 bg-background/88 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-white hover:text-primary"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="rounded-2xl border border-border/70 bg-background/88 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-white hover:text-primary"
              onClick={closeMenu}
            >
              Cart{hydrated && itemCount ? ` (${itemCount})` : ""}
            </Link>
            {authItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-border/70 bg-background/88 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-white hover:text-primary"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button href={primaryCta.href} onClick={closeMenu}>
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
