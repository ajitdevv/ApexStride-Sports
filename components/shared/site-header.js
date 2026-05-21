import Link from "next/link";
import { User } from "lucide-react";
import { getSessionSnapshot } from "@/lib/supabase/auth";
import { mainNavigation } from "@/lib/config/navigation";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/section-shell";
import { CartNavLink } from "@/components/shared/cart-nav-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { MobileNav } from "@/components/shared/mobile-nav";
import { NavLinks } from "@/components/shared/nav-links";

export async function SiteHeader() {
  const session = await getSessionSnapshot();
  const isAuthenticated = Boolean(session.user);
  const accountHref = isAuthenticated ? "/account" : "/login";
  const accountLabel = isAuthenticated ? "Account" : "Login";

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-background/88 backdrop-blur-xl">
      <SectionShell className="relative flex min-h-16 items-center justify-between gap-3 py-2.5 sm:min-h-[4.5rem] sm:gap-4 sm:py-3">
        <LogoMark />
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:px-5">
          <NavLinks items={mainNavigation.filter((item) => !["/cart", "/account"].includes(item.href))} />
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <CartNavLink />
          <Link
            aria-label={accountLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/96 text-foreground shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            href={accountHref}
          >
            <User className="h-4.5 w-4.5" />
          </Link>
          {session.isAdmin ? <Button href="/admin" variant="outline">Admin Panel</Button> : null}
        </div>
        <MobileNav isAdmin={session.isAdmin} isAuthenticated={isAuthenticated} />
      </SectionShell>
    </header>
  );
}
