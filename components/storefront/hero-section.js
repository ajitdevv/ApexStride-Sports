import { LayoutGrid, ShieldCheck, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/section-shell";

const heroBenefits = [
  {
    icon: ShieldCheck,
    label: "Premium quality",
  },
  {
    icon: Truck,
    label: "Fast checkout flow",
  },
  {
    icon: Sparkles,
    label: "Cleaner product discovery",
  },
];

export function HeroSection() {
  return (
    <SectionShell className="grid gap-3 py-5 sm:gap-4 sm:py-7 lg:grid-cols-[1.04fr_0.96fr] lg:py-9">
      <div className="hero-glow relative overflow-hidden rounded-[1.7rem] border surface-card bg-linear-to-br from-white via-white to-[#edf3ff] p-4 backdrop-blur-xl surface-shadow sm:p-5 lg:p-6">
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#dfe9ff]/70 via-transparent to-transparent sm:h-40" />
        <div className="relative">
          <BadgePill className="eyebrow-spacing">{siteConfig.hero.eyebrow}</BadgePill>
          <h1 className="hero-title mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-3xl lg:text-[2.5rem]">
            {siteConfig.hero.title}
          </h1>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-foreground/78 sm:text-sm sm:leading-6 lg:max-w-2xl">
            {siteConfig.hero.description}
          </p>
          <div className="mobile-stack-gap mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button href={siteConfig.hero.primaryCta.href} size="lg">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {siteConfig.hero.primaryCta.label}
            </Button>
            <Button href={siteConfig.hero.secondaryCta.href} size="lg" variant="outline">
              <LayoutGrid className="mr-2 h-4 w-4" />
              {siteConfig.hero.secondaryCta.label}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {heroBenefits.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/85 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-sm sm:px-3 sm:py-1.5 sm:text-xs"
              >
                <item.icon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:gap-3.5">
        <article className="rounded-[1.3rem] border border-white/12 bg-[#0f172a] p-4 text-white card-shadow sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/88 sm:text-xs sm:tracking-[0.24em]">Featured store benefits</p>
          <h2 className="mt-2.5 text-lg font-semibold tracking-tight sm:text-xl">Designed for faster product decisions.</h2>
          <p className="mt-2 text-xs leading-6 text-white/90 sm:text-sm">
            Shop premium accessories with clearer product focus, stronger category organization, and a smoother path from browsing to checkout.
          </p>
          <div className="mt-4 grid gap-2 text-xs text-white/88 sm:text-sm">
            {siteConfig.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/12 bg-white/10 px-3 py-2.5 sm:px-3.5 sm:py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xs sm:tracking-[0.22em]">{metric.label}</p>
                <p className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">{metric.value}</p>
                <p className="mt-1.5 leading-6 text-white/88">{metric.detail}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[1.3rem] border surface-card bg-white/94 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.22em]">Shopping support</p>
          <h2 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">Build your routine faster.</h2>
          <p className="mt-2 text-xs leading-6 text-foreground/78 sm:text-sm">
            Start with recovery, hydration, or training support and move straight into products that match your next session.
          </p>
        </article>
      </div>
    </SectionShell>
  );
}
