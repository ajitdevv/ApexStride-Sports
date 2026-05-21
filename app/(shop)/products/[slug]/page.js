import Image from "next/image";
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
  const disableOptimization = /^https?:\/\//i.test(product.primaryImage?.url ?? "");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-6 sm:py-8 lg:py-9">
          <div className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
            <section className="rounded-[1.7rem] border surface-card bg-white/95 p-3.5 card-shadow sm:p-5">
              <div className="grid-surface relative flex min-h-68 overflow-hidden rounded-[1.35rem] border border-white/75 bg-linear-to-br from-[#eef4ff] via-white to-[#dce8ff] p-3.5 sm:min-h-80 sm:p-4 lg:min-h-96">
                {product.primaryImage ? (
                  <>
                    <Image
                      alt={product.primaryImage.altText}
                      className="object-cover"
                      fill
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      src={product.primaryImage.url}
                      unoptimized={disableOptimization}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#081120]/72 via-[#081120]/26 to-white/20" />
                  </>
                ) : (
                  <>
                    <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-white/75 blur-3xl sm:right-6 sm:top-6 sm:h-28 sm:w-28" />
                    <div className="absolute -bottom-10 left-4 h-28 w-28 rounded-full bg-primary/12 blur-3xl sm:h-36 sm:w-36" />
                  </>
                )}
                <div className="relative flex h-full flex-col justify-between gap-4">
                  <div className="min-w-0-safe flex flex-wrap items-center gap-2">
                    {product.category?.name ? <BadgePill className={product.primaryImage ? "border-white/16 bg-white/12 text-white" : undefined}>{product.category.name}</BadgePill> : null}
                    {product.featured ? (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-3 sm:text-[11px] sm:tracking-[0.18em] ${product.primaryImage ? "border border-white/18 bg-white/12 text-white" : "border border-sky-200 bg-sky-50 text-sky-800"}`}>
                        <Sparkles className="h-3 w-3" />
                        Featured pick
                      </span>
                    ) : null}
                    {product.savingsPercentage > 0 ? (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-3 sm:text-[11px] sm:tracking-[0.18em] ${product.primaryImage ? "border border-emerald-200/35 bg-emerald-500/18 text-white" : "border border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
                        Save {product.savingsPercentage}%
                      </span>
                    ) : null}
                  </div>

                  <div className={`max-w-lg rounded-[1.2rem] p-3.5 backdrop-blur-sm sm:p-4 ${product.primaryImage ? "border border-white/18 bg-white/12" : "border border-white/75 bg-white/76"}`}>
                    {product.brand?.name ? (
                      <p className={`${product.primaryImage ? "text-white/90" : "text-primary/90"} text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]`}>{product.brand.name}</p>
                    ) : null}
                    <h2 className={`text-wrap-safe mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-[1.9rem] ${product.primaryImage ? "text-white" : "text-foreground"}`}>{product.name}</h2>
                    <p className={`mt-2 text-xs leading-6 sm:text-sm sm:leading-6 ${product.primaryImage ? "text-white/88" : "text-foreground/78"}`}>{productSummary}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                <article className="rounded-[1.05rem] border border-border/70 bg-background/88 p-3 sm:p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/62">Brand</p>
                  <p className="text-wrap-safe mt-2 text-base font-semibold text-foreground sm:mt-3 sm:text-lg">{product.brand?.name ?? "ApexStride"}</p>
                </article>
                <article className="rounded-[1.05rem] border border-border/70 bg-background/88 p-3 sm:p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/62">Category</p>
                  <p className="text-wrap-safe mt-2 text-base font-semibold text-foreground sm:mt-3 sm:text-lg">{product.category?.name ?? "Performance gear"}</p>
                </article>
                <article className="rounded-[1.05rem] border border-border/70 bg-background/88 p-3 sm:p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/62">Status</p>
                  <p className="mt-2 text-base font-semibold text-foreground sm:mt-3 sm:text-lg">In active catalog</p>
                </article>
              </div>
            </section>

            <section className="rounded-[1.7rem] border surface-card bg-white/95 p-3.5 card-shadow sm:p-5">
              <div className="flex flex-col gap-3 border-b border-border/70 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {product.category?.name ? <BadgePill>{product.category.name}</BadgePill> : null}
                  {product.brand?.name ? <BadgePill className="border-border bg-background text-foreground">{product.brand.name}</BadgePill> : null}
                </div>
                <div className="min-w-0-safe">
                  <h1 className="text-wrap-safe text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.25rem]">{product.name}</h1>
                  <p className="mt-2.5 text-xs leading-6 text-foreground/78 sm:text-sm sm:leading-6">{product.description}</p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.2rem] border border-border/70 bg-linear-to-br from-white via-white to-[#f1f6ff] p-3.5 sm:p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0-safe">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/62">Current price</p>
                    <div className="mt-2 flex flex-wrap items-end gap-2.5">
                      <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{formatPrice(product.basePrice, product.currency)}</p>
                      {product.compareAtPrice ? (
                        <p className="pb-1 text-sm text-foreground/62 line-through sm:text-base">{formatPrice(product.compareAtPrice, product.currency)}</p>
                      ) : null}
                    </div>
                  </div>
                  {product.savingsAmount > 0 ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-left sm:px-3.5 sm:py-2.5 sm:text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">You save</p>
                      <p className="mt-1 text-base font-semibold text-emerald-900 sm:text-lg">{formatPrice(product.savingsAmount, product.currency)}</p>
                    </div>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/78">
                  The amount shown here is the same subtotal basis used when checkout validates the product on the server.
                </p>
              </div>

              <div className="mt-4 grid gap-2">
                {purchaseHighlights.map((item) => (
                  <div key={item.title} className="flex gap-2.5 rounded-2xl border border-border/70 bg-background/88 p-3 sm:gap-3 sm:p-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary sm:h-10 sm:w-10">
                      <item.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                    </span>
                    <div className="min-w-0-safe">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/78">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-border/70 bg-background/88 p-3.5 sm:p-4">
                  <p className="text-xs font-semibold text-foreground sm:text-sm">Product details</p>
                  <div className="mt-2.5 grid gap-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                      <span className="text-foreground/78">Brand</span>
                      <span className="text-wrap-safe text-right font-semibold text-foreground">{product.brand?.name ?? "Not assigned"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                      <span className="text-foreground/78">Category</span>
                      <span className="text-wrap-safe text-right font-semibold text-foreground">{product.category?.name ?? "Not assigned"}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                      <span className="text-foreground/78">Catalog state</span>
                      <span className="font-semibold text-foreground">Active</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-foreground/78">Product code</span>
                      <span className="text-wrap-safe max-w-[14rem] text-right font-semibold text-foreground">{product.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-border/70 bg-background/88 p-3.5 sm:p-4">
                  <p className="text-xs font-semibold text-foreground sm:text-sm">Why customers buy this</p>
                  <div className="mt-2.5 grid gap-2 text-xs leading-6 text-foreground/78 sm:text-sm">
                    <p>Clean product information makes it easier to compare, decide, and move into checkout with confidence.</p>
                    <p>{product.shortDescription || "Designed to support premium storefront presentation with clearer purchase context."}</p>
                    <p>{product.compareAtPrice ? `Current offer includes a visible markdown from ${formatPrice(product.compareAtPrice, product.currency)}.` : "Pricing is presented directly with no distracting filler or hidden purchase steps."}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
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
          <SectionShell className="pb-8 sm:pb-10">
            <section className="rounded-[1.7rem] border surface-card bg-white/95 p-3.5 card-shadow sm:p-5">
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90 sm:text-[11px]">Keep shopping</p>
                  <h2 className="section-title mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl lg:text-[1.7rem]">Related products customers can compare next</h2>
                </div>
                <p className="max-w-xl text-xs leading-6 text-foreground/78 sm:text-sm">Stay inside the same premium browse flow and move between similar products without dropping back into a weak placeholder page.</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
