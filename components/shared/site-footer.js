import Link from "next/link";
import { mainNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { SectionShell } from "@/components/shared/section-shell";

const quickLinks = [
  "Premium sports accessories",
  "Training support essentials",
  "Recovery-ready equipment",
  "Athlete-focused shopping",
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/75 bg-white/88 backdrop-blur-xl">
      <SectionShell className="grid gap-10 py-12 md:grid-cols-[1.1fr_0.8fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">{siteConfig.name}</p>
          <p className="max-w-xl text-sm leading-7 text-contrast-muted">{siteConfig.description}</p>
          <p className="text-xs uppercase tracking-[0.22em] text-contrast-soft">Premium sports commerce for training, recovery, and everyday performance.</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Explore</p>
          <div className="mt-4 grid gap-3">
            {mainNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-contrast-muted transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-foreground">Why ApexStride</p>
          <div className="mt-4 grid gap-3">
            {quickLinks.map((item) => (
              <p key={item} className="text-sm text-contrast-muted">
                {item}
              </p>
            ))}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-sm font-medium text-contrast-muted transition hover:text-foreground">
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}
