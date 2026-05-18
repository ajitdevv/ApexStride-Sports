import { ArrowRight, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/section-shell";
import { StatCard } from "@/components/shared/stat-card";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Reliable premium essentials",
    description: "Curated sports accessories designed for training consistency, recovery quality, and polished everyday use.",
  },
  {
    icon: Trophy,
    title: "Built for performance routines",
    description: "Every category is positioned around athlete workflows, from pre-session prep to post-session recovery.",
  },
  {
    icon: Sparkles,
    title: "Clean digital shopping experience",
    description: "A stronger storefront foundation with clearer product storytelling, faster browsing, and a premium brand feel.",
  },
];

export function HeroSection() {
  return (
    <SectionShell className="grid gap-6 py-10 sm:gap-8 sm:py-14 lg:grid-cols-[1.12fr_0.88fr] lg:py-20">
      <div className="hero-glow relative overflow-hidden rounded-[2rem] border border-white/70 bg-linear-to-br from-white via-white to-[#edf3ff] p-7 backdrop-blur-xl surface-shadow sm:p-10 lg:p-12">
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#dfe9ff]/70 via-transparent to-transparent" />
        <div className="relative">
          <BadgePill>{siteConfig.hero.eyebrow}</BadgePill>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {siteConfig.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
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
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/80 bg-background/78 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
                <div className="inline-flex rounded-2xl bg-secondary p-3 text-primary shadow-sm">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:gap-5">
        {siteConfig.metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
        <article className="rounded-[1.75rem] border border-white/70 bg-[#0f172a] p-6 text-white card-shadow">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Premium promise</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">A sharper storefront for serious buyers.</h2>
          <p className="mt-3 text-sm leading-7 text-white/72">
            Better product focus, cleaner spacing, and stronger visual hierarchy help ApexStride feel closer to a polished premium commerce brand.
          </p>
        </article>
      </div>
    </SectionShell>
  );
}
