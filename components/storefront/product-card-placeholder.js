import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

export function ProductCardPlaceholder({ product }) {
  return (
    <article className="group rounded-[1.75rem] border surface-card bg-white/94 p-6 card-shadow transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {product.category?.name ?? "Product"}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
      </div>
      <Link href={`/products/${product.slug}`}>
        <div className="mt-8 flex min-h-44 items-end rounded-3xl bg-linear-to-br from-[#e8eefc] via-white to-[#d7e6ff] p-5 text-primary grid-surface sm:min-h-52">
          <div>
            {product.brand?.name ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">{product.brand.name}</p>
            ) : null}
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{product.name}</h3>
          </div>
        </div>
      </Link>
      <p className="mt-6 text-sm leading-7 text-contrast-muted">{product.shortDescription || product.description}</p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-foreground">{formatPrice(product.basePrice, product.currency)}</p>
          {product.compareAtPrice ? (
            <p className="text-sm text-contrast-soft line-through">{formatPrice(product.compareAtPrice, product.currency)}</p>
          ) : null}
        </div>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white/88 px-5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-white hover:text-primary"
          href={`/products/${product.slug}`}
        >
          View product
        </Link>
      </div>
    </article>
  );
}
