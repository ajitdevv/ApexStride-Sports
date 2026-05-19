import { getSessionSnapshot } from "@/lib/supabase/auth";
import { accountNavigation, mainNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/section-shell";
import { CartNavLink } from "@/components/shared/cart-nav-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { MobileNav } from "@/components/shared/mobile-nav";
import { NavLinks } from "@/components/shared/nav-links";

export async function SiteHeader() {
  const session = await getSessionSnapshot();
  const isAuthenticated = Boolean(session.user);
  const authItems = isAuthenticated ? [{ label: "Account", href: "/account" }] : accountNavigation.slice(1);

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-background/88 backdrop-blur-xl">
      <SectionShell className="relative flex min-h-20 items-center justify-between gap-4 py-3">
        <LogoMark />
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-3">
          <NavLinks items={mainNavigation.filter((item) => item.href !== "/cart")} />
          <CartNavLink />
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <NavLinks items={authItems} />
          {session.isAdmin ? <Button href="/admin" variant="outline">Admin Panel</Button> : null}
          <Button href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}</Button>
        </div>
        <MobileNav isAdmin={session.isAdmin} isAuthenticated={isAuthenticated} primaryCta={siteConfig.hero.primaryCta} />
      </SectionShell>
    </header>
  );
}
