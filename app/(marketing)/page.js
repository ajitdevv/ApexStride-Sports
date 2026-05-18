import { ArrowRight, CheckCircle2, Shield, Truck } from "lucide-react";
import { HeroSection } from "@/components/storefront/hero-section";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { getStorefrontSnapshot } from "@/lib/catalog";

const trustSignals = [
  {
    icon: Shield,
    title: "Performance-ready quality",
    description: "Premium accessories selected to support durability, repeat use, and athlete confidence.",
  },
  {
    icon: Truck,
    title: "Built for fast decisions",
    description: "Clear product detail, simple navigation, and a cleaner shopping path for decisive buyers.",
  },
  {
    icon: CheckCircle2,
    title: "Supabase-backed foundation",
    description: "Storefront data, auth boundaries, and admin-ready structure already connect to the live backend layer.",
  },
];

export default async function MarketingHomePage() {
  const { categories, featuredProducts } = await getStorefrontSnapshot();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />

        <SectionShell className="py-8 sm:py-14">
          <div className="rounded-4xl border border-white/65 bg-linear-to-br from-white via-white to-[#edf4ff] p-8 card-shadow sm:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <BadgePill>Live catalog foundation</BadgePill>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  A premium sports storefront built for decisive product discovery.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  ApexStride Sports now uses its real catalog foundation to highlight active categories, featured products, and a stronger premium shopping direction.
                </p>
              </div>
              <Button href="/shop" variant="secondary">
                Shop all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {trustSignals.map((signal) => (
                <article key={signal.title} className="rounded-3xl border border-white/75 bg-background/85 p-6 shadow-[0_18px_35px_rgba(15,23,42,0.06)]">
                  <div className="inline-flex rounded-2xl bg-secondary p-3 text-primary">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{signal.description}</p>
                </article>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell className="py-8 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BadgePill>Featured categories</BadgePill>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Shop by training intent.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Start with the areas athletes care about most: recovery, hydration, and training support.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categories.length ? (
              categories.map((category) => (
                <article key={category.slug} className="rounded-[1.75rem] border border-white/70 bg-linear-to-br from-white via-white to-[#f4f8ff] p-6 card-shadow">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{category.name}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{category.description}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Explore elevated accessories built around the {category.name.toLowerCase()} journey.
                  </p>
                </article>
              ))
            ) : (
              <article className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/92 p-6 text-sm leading-7 text-muted-foreground md:col-span-3">
                No active categories are live yet. Add categories in Supabase to feature them on the homepage.
              </article>
            )}
          </div>
        </SectionShell>

        <SectionShell className="pb-16 pt-8 sm:pb-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BadgePill>Featured products</BadgePill>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Start with the products setting the tone.
              </h2>
            </div>
            <Button href="/shop" variant="outline">
              Explore the catalog
            </Button>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredProducts.length ? (
              featuredProducts.map((product) => <ProductCardPlaceholder key={product.slug} product={product} />)
            ) : (
              <article className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/92 p-6 text-sm leading-7 text-muted-foreground lg:col-span-3">
                No featured products are published yet. Mark products as featured in Supabase to highlight them here.
              </article>
            )}
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
