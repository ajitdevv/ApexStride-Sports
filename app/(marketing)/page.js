import { ArrowRight, Shield, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/storefront/hero-section";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import { getCategoryHref, getStorefrontSnapshot } from "@/lib/catalog";

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

        <SectionShell className="py-4 sm:py-7">
          <div className="grid gap-3 md:grid-cols-3">
            {shoppingBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[1.2rem] border surface-card bg-white/92 p-4 shadow-[0_18px_35px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <div className="inline-flex rounded-[1rem] bg-secondary p-2.5 text-primary">
                  <benefit.icon className="h-4 w-4" />
                </div>
                <h2 className="mt-3 text-base font-semibold text-foreground">{benefit.title}</h2>
                <p className="mt-1.5 text-xs leading-6 text-foreground/78 sm:text-sm">{benefit.description}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell className="py-6 sm:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BadgePill>Shop by category</BadgePill>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
                Start with the gear you need most.
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-6 text-foreground/78 sm:text-sm">
              Move straight into recovery, hydration, and training support with focused shopping paths built around real buying intent.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {categories.length ? (
              categories.map((category) => (
                <Link
                  key={category.slug}
                  href={getCategoryHref(category.slug)}
                  className={`group relative overflow-hidden rounded-[1.35rem] border surface-card bg-linear-to-br ${category.cardBackgroundClass} p-4 card-shadow transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.10)]`}
                >
                  <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-white/55 via-transparent to-transparent" />
                  <div className="absolute -right-8 top-8 h-28 w-28 rounded-full bg-white/45 blur-2xl transition group-hover:scale-110" />
                  <div className="absolute -left-6 bottom-4 h-24 w-24 rounded-full bg-white/35 blur-2xl transition group-hover:scale-110" />
                  <div className="relative flex min-h-[14rem] flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90 sm:text-[11px]">{category.cardEyebrow}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{category.name}</h3>
                      <p className="mt-2.5 max-w-xs text-xs leading-6 text-foreground/78 sm:text-sm">{category.description || `${category.name} essentials`}</p>
                    </div>
                    <div>
                      <div className="grid gap-2 sm:grid-cols-3 md:grid-cols-1">
                        {category.highlights.map((item) => (
                          <div key={item} className="rounded-[1rem] border border-white/70 bg-white/72 px-3 py-2.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm sm:text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex items-center text-xs font-semibold text-primary sm:text-sm">
                        Shop category
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <article className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/94 p-6 text-sm leading-7 text-foreground/78 md:col-span-3">
                Categories will appear here as they become available.
              </article>
            )}
          </div>
        </SectionShell>

        <SectionShell className="pb-12 pt-4 sm:pb-16 sm:pt-6">
          <div className="rounded-[1.8rem] border surface-card bg-linear-to-br from-white via-white to-[#edf4ff] p-5 card-shadow sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgePill>Featured products</BadgePill>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
                  Shop the products leading the storefront.
                </h2>
                <p className="mt-2.5 max-w-2xl text-xs leading-6 text-foreground/78 sm:text-sm">
                  Discover the products highlighted for athletes who want cleaner design, dependable utility, and faster decisions.
                </p>
              </div>
              <Button href="/shop" variant="secondary">
                Shop all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {featuredProducts.length ? (
                featuredProducts.map((product) => <ProductCardPlaceholder key={product.slug} product={product} />)
              ) : (
                <article className="rounded-[1.75rem] border border-dashed border-border/80 bg-white/94 p-6 text-sm leading-7 text-foreground/78 lg:col-span-3">
                  Featured products will appear here as they become available.
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
