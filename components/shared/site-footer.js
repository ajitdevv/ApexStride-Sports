import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { mainNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { SectionShell } from "@/components/shared/section-shell";

const supportHighlights = [
  {
    title: "Curated performance gear",
    icon: Sparkles,
  },
  {
    title: "Cleaner checkout flow",
    icon: ShieldCheck,
  },
  {
    title: "Training-day convenience",
    icon: Truck,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/75 bg-white/90 backdrop-blur-xl">
      <SectionShell className="py-12 sm:py-14">
        <div className="rounded-[2rem] border surface-card bg-linear-to-br from-white via-white to-[#eef5ff] p-8 card-shadow sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">{siteConfig.name}</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Premium sports commerce built for cleaner browsing and faster decisions.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-foreground/78 sm:text-base">{siteConfig.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {supportHighlights.map((item) => (
                  <div key={item.title} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/78">
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                    {item.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border/70 bg-white/80 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/90">Need a faster route?</p>
              <div className="mt-4 grid gap-3">
                <Link className="flex items-center justify-between rounded-[1.2rem] border border-border/70 bg-background/84 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary" href="/shop">
                  Browse active products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link className="flex items-center justify-between rounded-[1.2rem] border border-border/70 bg-background/84 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary" href="/cart">
                  Review your cart
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a className="flex items-center justify-between rounded-[1.2rem] border border-border/70 bg-background/84 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary" href={`mailto:${siteConfig.contactEmail}`}>
                  Contact support
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 border-t border-border/70 pt-8 md:grid-cols-[0.95fr_0.9fr_0.75fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Explore</p>
              <div className="mt-4 grid gap-3">
                {mainNavigation.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground/78 transition hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Storefront promise</p>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-foreground/78">
                <p>Products are selected for training, recovery, and everyday performance support.</p>
                <p>Cart and checkout are structured to keep decisions clearer and totals easier to confirm.</p>
                <p>Premium presentation stays aligned across discovery, product detail, and purchase flow.</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Connect</p>
              <div className="mt-4 grid gap-3 text-sm text-foreground/78">
                <a href={`mailto:${siteConfig.contactEmail}`} className="font-medium transition hover:text-foreground">
                  {siteConfig.contactEmail}
                </a>
                <p>Built for athletes who want dependable utility with a more premium shopping journey.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}
