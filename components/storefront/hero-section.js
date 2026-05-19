import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
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
    <SectionShell className="grid gap-6 py-10 sm:gap-8 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
      <div className="hero-glow relative overflow-hidden rounded-4xl border surface-card bg-linear-to-br from-white via-white to-[#edf3ff] p-7 backdrop-blur-xl surface-shadow sm:p-10 lg:p-12">
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#dfe9ff]/70 via-transparent to-transparent" />
        <div className="relative">
          <BadgePill>{siteConfig.hero.eyebrow}</BadgePill>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {siteConfig.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/78 sm:text-lg">
            {siteConfig.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={siteConfig.hero.primaryCta.href} size="lg">
              {siteConfig.hero.primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href={siteConfig.hero.secondaryCta.href} size="lg" variant="outline">
              {siteConfig.hero.secondaryCta.label}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {heroBenefits.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/90 px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:gap-5">
        <article className="rounded-[1.75rem] border border-white/12 bg-[#0f172a] p-6 text-white card-shadow sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/88">Featured store benefits</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Designed for faster product decisions.</h2>
          <p className="mt-3 text-sm leading-7 text-white/90">
            Shop premium accessories with clearer product focus, stronger category organization, and a smoother path from browsing to checkout.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-white/88">
            {siteConfig.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/12 bg-white/10 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/90">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{metric.value}</p>
                <p className="mt-2 leading-6 text-white/88">{metric.detail}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[1.75rem] border surface-card bg-white/94 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Shopping support</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Build your routine faster.</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/78">
            Start with recovery, hydration, or training support and move straight into products that match your next session.
          </p>
          <Button className="mt-6" href="/shop" variant="secondary">
            Browse all categories
          </Button>
        </article>
      </div>
    </SectionShell>
  );
}
