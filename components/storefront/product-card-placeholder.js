import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

export function ProductCardPlaceholder({ product }) {
  return (
    <article className="group rounded-[1.75rem] border border-white/70 bg-white/92 p-6 card-shadow transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {product.category?.name ?? "Product"}
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
      </div>
      <Link href={`/products/${product.slug}`}>
        <div className="mt-8 flex h-52 items-end rounded-[1.5rem] bg-linear-to-br from-[#e8eefc] via-white to-[#d7e6ff] p-5 text-primary grid-surface">
          <div>
            {product.brand?.name ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">{product.brand.name}</p>
            ) : null}
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{product.name}</h3>
          </div>
        </div>
      </Link>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">{product.shortDescription || product.description}</p>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-foreground">{formatPrice(product.basePrice, product.currency)}</p>
          {product.compareAtPrice ? (
            <p className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice, product.currency)}</p>
          ) : null}
        </div>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
          href={`/products/${product.slug}`}
        >
          View product
        </Link>
      </div>
    </article>
  );
}
