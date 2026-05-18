import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/storefront/add-to-cart-button";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Button } from "@/components/ui/button";
import { formatPrice, getProductBySlug } from "@/lib/catalog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/92 p-8 card-shadow">
            <div className="grid-surface flex min-h-[28rem] items-end rounded-[1.75rem] bg-linear-to-br from-[#edf3ff] via-white to-[#dce8ff] p-6">
              <div>
                {product.brand?.name ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">{product.brand.name}</p>
                ) : null}
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{product.name}</h2>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/60 bg-white/92 p-8 card-shadow">
            {product.category?.name ? <BadgePill>{product.category.name}</BadgePill> : null}
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">{product.name}</h1>
            <p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">{product.description}</p>
            <div className="mt-8 flex items-end gap-4">
              <p className="text-3xl font-semibold text-foreground">{formatPrice(product.basePrice, product.currency)}</p>
              {product.compareAtPrice ? (
                <p className="pb-1 text-base text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </p>
              ) : null}
            </div>
            <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-border/70 bg-background/80 p-5 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Brand</span>
                <span>{product.brand?.name ?? "Not assigned"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Category</span>
                <span>{product.category?.name ?? "Not assigned"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Availability</span>
                <span>In active catalog</span>
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
              </Button>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Add this product to your cart, then review the exact total before starting Razorpay checkout.
            </p>
          </div>
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
