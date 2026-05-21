import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

export function ProductCardPlaceholder({ product }) {
  const categoryName = product.category?.name ?? "Performance product";
  const productHref = `/products/${product.slug}`;
  const disableOptimization = /^https?:\/\//i.test(product.primaryImage?.url ?? "");

  return (
    <article className="group overflow-hidden rounded-[1.35rem] border surface-card bg-white/95 p-2.5 card-shadow transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.1)] sm:p-3">
      <div className="rounded-[1.1rem] border border-white/80 bg-linear-to-br from-[#f7faff] via-white to-[#e1ebff] p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0-safe flex flex-wrap items-center gap-1.5">
            <span className="text-wrap-safe rounded-full bg-secondary px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[10px]">
              {categoryName}
            </span>
            {product.compareAtPrice ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-800 sm:text-[10px] sm:tracking-[0.16em]">
                <Sparkles className="h-2.5 w-2.5" />
                Value
              </span>
            ) : null}
          </div>
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-primary" />
        </div>

        <Link href={productHref} className="mt-2.5 block">
          <div className="grid-surface relative flex min-h-36 overflow-hidden rounded-[1rem] border border-white/70 bg-linear-to-br from-[#e8f0ff] via-white to-[#d4e5ff] p-3 sm:min-h-40 lg:min-h-44">
            {product.primaryImage ? (
              <>
                <Image
                  alt={product.primaryImage.altText}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={product.primaryImage.url}
                  unoptimized={disableOptimization}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#081120]/58 via-[#081120]/14 to-white/18" />
              </>
            ) : (
              <>
                <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-white/70 blur-3xl sm:h-20 sm:w-20" />
                <div className="absolute -bottom-4 left-0 h-20 w-20 rounded-full bg-primary/10 blur-3xl sm:h-24 sm:w-24" />
              </>
            )}
            <div className="relative flex h-full flex-col justify-between gap-2">
              <div className="min-w-0-safe">
                {product.brand?.name ? (
                  <p className={`${product.primaryImage ? "text-white/90" : "text-primary/90"} text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]`}>{product.brand.name}</p>
                ) : null}
                <h3 className={`mt-1.5 line-clamp-2 text-wrap-safe max-w-sm text-base font-semibold tracking-tight sm:text-lg ${product.primaryImage ? "text-white" : "text-foreground"}`}>{product.name}</h3>
              </div>
              <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium shadow-sm backdrop-blur-sm ${product.primaryImage ? "border border-white/20 bg-white/14 text-white" : "border border-white/75 bg-white/80 text-foreground"}`}>
                <Check className={`h-3 w-3 ${product.primaryImage ? "text-white" : "text-primary"}`} />
                Active
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="px-0.5 pb-0.5 pt-3">
        <p className="line-clamp-2 text-xs leading-5 text-foreground/76 sm:text-[13px]">{product.shortDescription || product.description}</p>
        <div className="mt-3 flex flex-col gap-2.5 border-t border-border/70 pt-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/62">Price</p>
            <div className="mt-1 flex flex-wrap items-end gap-2">
              <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{formatPrice(product.basePrice, product.currency)}</p>
              {product.compareAtPrice ? (
                <p className="pb-0.5 text-xs text-foreground/62 line-through sm:text-[13px]">{formatPrice(product.compareAtPrice, product.currency)}</p>
              ) : null}
            </div>
          </div>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-[0_14px_28px_rgba(20,71,230,0.16)] transition hover:opacity-95 sm:px-4"
            href={productHref}
          >
            View
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
