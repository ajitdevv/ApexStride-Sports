import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

export function ProductCardPlaceholder({ product }) {
  const categoryName = product.category?.name ?? "Performance product";
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group overflow-hidden rounded-[1.9rem] border surface-card bg-white/95 p-4 card-shadow transition hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,23,42,0.12)] sm:p-5">
      <div className="rounded-[1.6rem] border border-white/80 bg-linear-to-br from-[#f7faff] via-white to-[#e1ebff] p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              {categoryName}
            </span>
            {product.compareAtPrice ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-800">
                <Sparkles className="h-3 w-3" />
                Featured value
              </span>
            ) : null}
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
        </div>

        <Link href={productHref} className="mt-4 block">
          <div className="grid-surface relative flex min-h-56 overflow-hidden rounded-[1.45rem] border border-white/70 bg-linear-to-br from-[#e8f0ff] via-white to-[#d4e5ff] p-5 sm:min-h-64">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/70 blur-3xl" />
            <div className="absolute -bottom-5 left-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                {product.brand?.name ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/90">{product.brand.name}</p>
                ) : null}
                <h3 className="mt-3 max-w-xs text-2xl font-semibold tracking-tight text-foreground sm:text-[1.9rem]">{product.name}</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/80 px-3 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
                <Check className="h-3.5 w-3.5 text-primary" />
                Active catalog
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="px-1 pb-1 pt-5">
        <p className="line-clamp-3 text-sm leading-7 text-foreground/78">{product.shortDescription || product.description}</p>
        <div className="mt-5 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/62">Current price</p>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <p className="text-2xl font-semibold tracking-tight text-foreground">{formatPrice(product.basePrice, product.currency)}</p>
              {product.compareAtPrice ? (
                <p className="pb-0.5 text-sm text-foreground/62 line-through">{formatPrice(product.compareAtPrice, product.currency)}</p>
              ) : null}
            </div>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_16px_32px_rgba(20,71,230,0.18)] transition hover:opacity-95"
            href={productHref}
          >
            View product
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
