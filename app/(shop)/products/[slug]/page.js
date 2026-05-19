import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/storefront/add-to-cart-button";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { formatPrice, getProductBySlug, getStorefrontSnapshot } from "@/lib/catalog";

const purchaseHighlights = [
  {
    title: "Active catalog",
    description: "This product is currently available in the live storefront assortment.",
    icon: Check,
  },
  {
    title: "Checkout confidence",
    description: "Pricing is validated again on the server before Razorpay checkout begins.",
    icon: ShieldCheck,
  },
  {
    title: "Fast continuation",
    description: "Add to cart now and move straight into a cleaner cart and checkout flow.",
    icon: Truck,
  },
];

function getProductSummary(product) {
  const points = [];

  if (product.brand?.name) {
    points.push(`${product.brand.name} finish`);
  }

  if (product.category?.name) {
    points.push(`${product.category.name} ready`);
  }

  if (product.featured) {
    points.push("Featured pick");
  }

  if (product.compareAtPrice) {
    points.push("Value pricing");
  }

  return points.length ? points.join(" • ") : "Built for everyday training, recovery, and performance routines.";
}

function getRelatedProducts(products, product) {
  return products
    .filter((item) => item.slug !== product.slug)
    .sort((left, right) => {
      const leftScore = Number(left.category?.slug === product.category?.slug) + Number(Boolean(left.featured));
      const rightScore = Number(right.category?.slug === product.category?.slug) + Number(Boolean(right.featured));
      return rightScore - leftScore;
    })
    .slice(0, 3);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const [product, storefront] = await Promise.all([getProductBySlug(slug), getStorefrontSnapshot()]);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(storefront.products, product);
  const productSummary = getProductSummary(product);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <section className="rounded-4xl border surface-card bg-white/95 p-6 card-shadow sm:p-8">
              <div className="grid-surface relative flex min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/75 bg-linear-to-br from-[#eef4ff] via-white to-[#dce8ff] p-6 sm:min-h-[38rem] sm:p-8">
                <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-white/75 blur-3xl" />
                <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/12 blur-3xl" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.category?.name ? <BadgePill>{product.category.name}</BadgePill> : null}
                    {product.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800">
                        <Sparkles className="h-3 w-3" />
                        Featured pick
                      </span>
                    ) : null}
                    {product.savingsPercentage > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
                        Save {product.savingsPercentage}%
                      </span>
                    ) : null}
                  </div>

                  <div className="max-w-lg rounded-[1.75rem] border border-white/75 bg-white/76 p-5 backdrop-blur-sm">
                    {product.brand?.name ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/90">{product.brand.name}</p>
                    ) : null}
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{product.name}</h2>
                    <p className="mt-4 text-sm leading-7 text-foreground/78">{productSummary}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <article className="rounded-[1.5rem] border border-border/70 bg-background/88 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/62">Brand</p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{product.brand?.name ?? "ApexStride"}</p>
                </article>
                <article className="rounded-[1.5rem] border border-border/70 bg-background/88 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/62">Category</p>
                  <p className="mt-3 text-lg font-semibold text-foreground">{product.category?.name ?? "Performance gear"}</p>
                </article>
                <article className="rounded-[1.5rem] border border-border/70 bg-background/88 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/62">Status</p>
                  <p className="mt-3 text-lg font-semibold text-foreground">In active catalog</p>
                </article>
              </div>
            </section>

            <section className="rounded-4xl border surface-card bg-white/95 p-6 card-shadow sm:p-8">
              <div className="flex flex-col gap-5 border-b border-border/70 pb-6">
                <div className="flex flex-wrap items-center gap-3">
                  {product.category?.name ? <BadgePill>{product.category.name}</BadgePill> : null}
                  {product.brand?.name ? <BadgePill className="border-border bg-background text-foreground">{product.brand.name}</BadgePill> : null}
                </div>
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{product.name}</h1>
                  <p className="mt-4 text-sm leading-8 text-foreground/78 sm:text-base">{product.description}</p>
                </div>
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-border/70 bg-linear-to-br from-white via-white to-[#f1f6ff] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/62">Current price</p>
                    <div className="mt-3 flex flex-wrap items-end gap-3">
                      <p className="text-4xl font-semibold tracking-tight text-foreground">{formatPrice(product.basePrice, product.currency)}</p>
                      {product.compareAtPrice ? (
                        <p className="pb-1 text-base text-foreground/62 line-through">{formatPrice(product.compareAtPrice, product.currency)}</p>
                      ) : null}
                    </div>
                  </div>
                  {product.savingsAmount > 0 ? (
                    <div className="rounded-[1.2rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">You save</p>
                      <p className="mt-1 text-lg font-semibold text-emerald-900">{formatPrice(product.savingsAmount, product.currency)}</p>
                    </div>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/78">
                  The amount shown here is the same subtotal basis used when checkout validates the product on the server.
                </p>
              </div>

              <div className="mt-6 grid gap-3">
                {purchaseHighlights.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-[1.4rem] border border-border/70 bg-background/88 p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/78">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] border border-border/70 bg-background/88 p-5">
                  <p className="text-sm font-semibold text-foreground">Product details</p>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                      <span className="text-foreground/78">Brand</span>
                      <span className="font-semibold text-foreground">{product.brand?.name ?? "Not assigned"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                      <span className="text-foreground/78">Category</span>
                      <span className="font-semibold text-foreground">{product.category?.name ?? "Not assigned"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                      <span className="text-foreground/78">Catalog state</span>
                      <span className="font-semibold text-foreground">Active</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-foreground/78">Product code</span>
                      <span className="font-semibold text-foreground">{product.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-border/70 bg-background/88 p-5">
                  <p className="text-sm font-semibold text-foreground">Why customers buy this</p>
                  <div className="mt-4 grid gap-3 text-sm leading-7 text-foreground/78">
                    <p>Clean product information makes it easier to compare, decide, and move into checkout with confidence.</p>
                    <p>{product.shortDescription || "Designed to support premium storefront presentation with clearer purchase context."}</p>
                    <p>{product.compareAtPrice ? `Current offer includes a visible markdown from ${formatPrice(product.compareAtPrice, product.currency)}.` : "Pricing is presented directly with no distracting filler or hidden purchase steps."}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AddToCartButton
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    basePrice: product.basePrice,
                    currency: product.currency,
                    categoryName: product.category?.name ?? "",
                    brandName: product.brand?.name ?? "",
                  }}
                />
                <Button href="/shop" variant="outline">
                  Back to shop
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>
          </div>
        </SectionShell>

        {relatedProducts.length ? (
          <SectionShell className="pb-14 sm:pb-18">
            <section className="rounded-4xl border surface-card bg-white/95 p-6 card-shadow sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">Keep shopping</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Related products customers can compare next</h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-foreground/78">Stay inside the same premium browse flow and move between similar products without dropping back into a weak placeholder page.</p>
              </div>
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCardPlaceholder key={relatedProduct.slug} product={relatedProduct} />
                ))}
              </div>
            </section>
          </SectionShell>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
