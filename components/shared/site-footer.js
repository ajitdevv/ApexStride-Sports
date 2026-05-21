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
    <footer className="mt-16 border-t border-white/75 bg-white/90 backdrop-blur-xl">
      <SectionShell className="py-10 sm:py-12">
        <div className="rounded-[1.8rem] border surface-card bg-linear-to-br from-white via-white to-[#eef5ff] p-5 card-shadow sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm sm:tracking-[0.26em]">{siteConfig.name}</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Premium sports commerce built for cleaner browsing and faster decisions.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/78">{siteConfig.description}</p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {supportHighlights.map((item) => (
                  <div key={item.title} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/84 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/78 sm:px-4 sm:py-2">
                    <item.icon className="h-3.5 w-3.5 text-primary" />
                    {item.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/70 bg-white/80 p-4 backdrop-blur-sm sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90 sm:text-xs sm:tracking-[0.24em]">Need a faster route?</p>
              <div className="mt-3 grid gap-2.5">
                <Link className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-background/84 px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary" href="/shop">
                  Browse active products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-background/84 px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary" href="/cart">
                  Review your cart
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a className="flex items-center justify-between rounded-[1rem] border border-border/70 bg-background/84 px-3.5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary" href={`mailto:${siteConfig.contactEmail}`}>
                  Contact support
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 border-t border-border/70 pt-6 md:grid-cols-[0.95fr_0.9fr_0.75fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground sm:tracking-[0.22em]">Explore</p>
              <div className="mt-3 grid gap-2.5">
                {mainNavigation.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground/78 transition hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground sm:tracking-[0.22em]">Storefront promise</p>
              <div className="mt-3 grid gap-2.5 text-sm leading-6 text-foreground/78">
                <p>Products are selected for training, recovery, and everyday performance support.</p>
                <p>Cart and checkout are structured to keep decisions clearer and totals easier to confirm.</p>
                <p>Premium presentation stays aligned across discovery, product detail, and purchase flow.</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground sm:tracking-[0.22em]">Connect</p>
              <div className="mt-3 grid gap-2.5 text-sm text-foreground/78">
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
