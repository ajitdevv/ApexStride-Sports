import { ArrowRight, Shield, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/storefront/hero-section";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { getStorefrontSnapshot } from "@/lib/catalog";

const shoppingBenefits = [
  {
    icon: Shield,
    title: "Premium quality",
    description: "Accessories selected for repeat performance, durability, and everyday training confidence.",
  },
  {
    icon: Truck,
    title: "Smooth buying flow",
    description: "Cleaner product discovery, direct cart access, and a faster path to checkout.",
  },
  {
    icon: ShoppingBag,
    title: "Active product catalog",
    description: "Shop active categories and featured products from the current storefront assortment.",
  },
];

export default async function MarketingHomePage() {
  const { categories, featuredProducts } = await getStorefrontSnapshot();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />

        <SectionShell className="py-6 sm:py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {shoppingBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[1.5rem] border surface-card bg-white/92 p-5 shadow-[0_18px_35px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <div className="inline-flex rounded-2xl bg-secondary p-3 text-primary">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h2>
                <p className="mt-2 text-sm leading-7 text-contrast-muted">{benefit.description}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell className="py-8 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BadgePill>Shop by category</BadgePill>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Start with the gear you need most.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-contrast-muted">
              Move straight into recovery, hydration, and training support with focused shopping paths built around real buying intent.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categories.length ? (
              categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="rounded-[1.75rem] border surface-card bg-linear-to-br from-white via-white to-[#f4f8ff] p-6 card-shadow transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.10)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{category.name}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                    {category.description || `${category.name} essentials`}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-contrast-muted">
                    Explore products selected for the {category.name.toLowerCase()} journey.
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                    Shop category
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              ))
            ) : (
              <article className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/94 p-6 text-sm leading-7 text-contrast-muted md:col-span-3">
                No active categories are available yet. Add categories in Supabase to feature them on the homepage.
              </article>
            )}
          </div>
        </SectionShell>

        <SectionShell className="pb-16 pt-6 sm:pb-20 sm:pt-8">
          <div className="rounded-4xl border surface-card bg-linear-to-br from-white via-white to-[#edf4ff] p-8 card-shadow sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgePill>Featured products</BadgePill>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Shop the products leading the storefront.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-contrast-muted sm:text-base">
                  Discover the products highlighted for athletes who want cleaner design, dependable utility, and faster decisions.
                </p>
              </div>
              <Button href="/shop" variant="secondary">
                Shop all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {featuredProducts.length ? (
                featuredProducts.map((product) => <ProductCardPlaceholder key={product.slug} product={product} />)
              ) : (
                <article className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/94 p-6 text-sm leading-7 text-contrast-muted lg:col-span-3">
                  No featured products are published yet. Mark products as featured in Supabase to highlight them here.
                </article>
              )}
            </div>
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
