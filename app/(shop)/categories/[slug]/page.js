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
        <SectionShell className="py-7 sm:py-9 lg:py-10">
          <section
            className={`hero-glow relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-linear-to-br ${category.heroBackgroundClass} p-5 text-white surface-shadow sm:p-6 lg:p-7`}
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-white/12 via-transparent to-transparent" />
            <div className="relative grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <BadgePill className="border-white/10 bg-white/10 text-sky-100">{category.cardEyebrow}</BadgePill>
                <h1 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[2.4rem]">{category.heroTitle}</h1>
                <p className="mt-3 max-w-xl text-xs leading-6 text-white/90 sm:text-sm sm:leading-6">{category.heroDescription}</p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button href="/shop" className="bg-white/10 text-black hover:bg-white/20" variant="secondary">
                    Browse all products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={`rounded-[1.3rem] border border-white/12 bg-linear-to-br ${category.heroPanelBackgroundClass} p-4 backdrop-blur-sm`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/92 sm:text-[11px]">Category highlights</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {category.highlights.map((item) => (
                    <div key={item} className="rounded-[1rem] border border-white/10 bg-white/10 px-3 py-2.5">
                      <p className="text-xs font-semibold text-white sm:text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgePill>{category.name}</BadgePill>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">Products in this category</h2>
              </div>
              <p className="max-w-xl text-xs leading-6 text-foreground/78 sm:text-sm">
                Explore the products grouped under {category.name.toLowerCase()} before browsing the wider storefront below.
              </p>
            </div>
            {categoryProducts.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {categoryProducts.map((product) => (
                  <ProductCardPlaceholder key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[1.3rem] border border-dashed border-border/80 bg-white/92 p-5 text-xs leading-6 text-foreground/78 sm:text-sm">
                No products are available in this category right now.
              </div>
            )}
          </section>

          <section className="mt-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <BadgePill>All products</BadgePill>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">Keep browsing the full catalog</h2>
              </div>
              <Button href={getCategoryHref(category.slug)} variant="outline">
                Refresh this category
              </Button>
            </div>
            {allProducts.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {allProducts.map((product) => (
                  <ProductCardPlaceholder key={`${category.slug}-${product.slug}`} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[1.3rem] border border-dashed border-border/80 bg-white/92 p-5 text-xs leading-6 text-foreground/78 sm:text-sm">
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
