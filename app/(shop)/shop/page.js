import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { getStorefrontSnapshot } from "@/lib/catalog";

export const metadata = {
  title: "Shop",
};

export default async function ShopPage() {
  const { products, categories } = await getStorefrontSnapshot();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <div className="rounded-4xl border border-white/65 bg-white/90 p-8 card-shadow sm:p-10">
            <BadgePill>Live product catalog</BadgePill>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Shop performance accessories</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base">
              Browse the active storefront assortment across recovery, hydration, and training support with a stronger premium presentation.
            </p>
            {categories.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <span
                    key={category.slug}
                    className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[1.5rem] border border-dashed border-border/80 bg-background/70 p-5 text-sm leading-7 text-muted-foreground">
                No active categories are available yet. Add categories in Supabase to organize the storefront.
              </div>
            )}
          </div>
          {products.length ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCardPlaceholder key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-border/80 bg-white/80 p-8 text-sm leading-7 text-muted-foreground">
              No active products are available yet. Add products in Supabase to publish the storefront catalog.
            </div>
          )}
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
