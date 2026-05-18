"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { accountNavigation, mainNavigation } from "@/lib/config/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function MobileNav({ isAuthenticated, primaryCta }) {
  const [isOpen, setIsOpen] = useState(false);
  const { hydrated, itemCount } = useCart();

  const authItems = isAuthenticated
    ? [{ label: "Account", href: "/account" }]
    : accountNavigation.slice(1);

  const navItems = mainNavigation.filter((item) => item.href !== "/account");

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="xl:hidden">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white/90 text-foreground shadow-sm transition hover:border-primary/30 hover:text-primary"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <div
        className={cn(
          "absolute inset-x-4 top-[5.5rem] rounded-[2rem] border border-white/70 bg-white/96 p-5 shadow-[0_28px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl transition",
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-transparent bg-background/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:text-primary"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="rounded-2xl border border-transparent bg-background/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:text-primary"
            onClick={closeMenu}
          >
            Cart{hydrated && itemCount ? ` (${itemCount})` : ""}
          </Link>
          {authItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-transparent bg-background/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:text-primary"
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
  );
}
