import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { Button } from "@/components/ui/button";
import { getCategoryHref, getCategoryPageSnapshot } from "@/lib/catalog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const snapshot = await getCategoryPageSnapshot(slug);

  if (!snapshot.category) {
    return {
      title: "Category not found",
    };
  }

  return {
    title: snapshot.category.name,
    description: snapshot.category.heroDescription,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const snapshot = await getCategoryPageSnapshot(slug);

  if (!snapshot.category) {
    notFound();
  }

  const { category, categoryProducts, allProducts } = snapshot;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <section
            className={`hero-glow relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br ${category.heroBackgroundClass} p-8 text-white surface-shadow sm:p-10 lg:p-12`}
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/12 via-transparent to-transparent" />
            <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <BadgePill className="border-white/10 bg-white/10 text-sky-100">{category.cardEyebrow}</BadgePill>
                <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{category.heroTitle}</h1>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-white/90 sm:text-base">{category.heroDescription}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href="/shop" className="bg-white/10 text-black hover:bg-white/20" variant="secondary">
                    Browse all products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={`rounded-[1.75rem] border border-white/12 bg-linear-to-br ${category.heroPanelBackgroundClass} p-5 backdrop-blur-sm`}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/92">Category highlights</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {category.highlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
                      <p className="text-sm font-semibold text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgePill>{category.name}</BadgePill>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Products in this category</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-foreground/78">
                Explore the products grouped under {category.name.toLowerCase()} before browsing the wider storefront below.
              </p>
            </div>
            {categoryProducts.length ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <ProductCardPlaceholder key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-border/80 bg-white/92 p-8 text-sm leading-7 text-foreground/78">
                No products are available in this category right now.
              </div>
            )}
          </section>

          <section className="mt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgePill>All products</BadgePill>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Keep browsing the full catalog</h2>
              </div>
              <Button href={getCategoryHref(category.slug)} variant="outline">
                Refresh this category
              </Button>
            </div>
            {allProducts.length ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {allProducts.map((product) => (
                  <ProductCardPlaceholder key={`${category.slug}-${product.slug}`} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[1.75rem] border border-dashed border-border/80 bg-white/92 p-8 text-sm leading-7 text-foreground/78">
                No products are available right now. Please check back soon for new arrivals.
              </div>
            )}
          </section>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
