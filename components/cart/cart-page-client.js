"use client";

import { Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format-price";

const summaryHighlights = [
  "Live cart totals",
  "Faster checkout review",
  "Server-validated payment flow",
];

export function CartPageClient() {
  const { hydrated, items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-4xl border surface-card bg-white/95 p-8 card-shadow sm:p-10">
          <BadgePill>Your cart</BadgePill>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Loading your shopping bag</h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-foreground/78 sm:text-base">We are restoring the products saved in this browser session.</p>
        </div>
      </div>
    );
  }

  const currency = items[0]?.currency ?? "INR";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <section className="rounded-4xl border surface-card bg-white/95 p-8 card-shadow sm:p-10">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <BadgePill>Your cart</BadgePill>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Your shopping bag, refined for checkout</h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-foreground/78 sm:text-base">
              Review selected products, adjust quantities, and keep only the items you want before moving into payment.
            </p>
          </div>
          <div className="grid gap-2 sm:max-w-xs">
            {summaryHighlights.map((item) => (
              <div key={item} className="rounded-full border border-border/70 bg-background/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/78">
                {item}
              </div>
            ))}
          </div>
        </div>

        {items.length ? (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <article key={item.slug} className="rounded-[1.8rem] border border-border/70 bg-linear-to-br from-white via-white to-[#f4f8ff] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className="grid-surface flex h-24 w-24 shrink-0 items-end rounded-[1.4rem] border border-white/75 bg-linear-to-br from-[#e8efff] via-white to-[#dbe8ff] p-3">
                      <div>
                        {item.brandName ? (
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90">{item.brandName}</p>
                        ) : null}
                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-foreground">{item.name}</p>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-foreground">{item.name}</p>
                        <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {item.categoryName || "Catalog item"}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-foreground/78">
                        {item.brandName ? `${item.brandName} · ` : ""}Ready to move into the secure ApexStride checkout flow.
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/62">Unit price</p>
                          <p className="mt-1 font-semibold text-foreground">{formatPrice(item.basePrice, item.currency)}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/62">Line total</p>
                          <p className="mt-1 font-semibold text-foreground">{formatPrice(item.basePrice * item.quantity, item.currency)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white px-2 py-2 shadow-sm">
                      <button
                        aria-label={`Decrease quantity for ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground transition hover:border-primary/30 hover:text-primary"
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        type="button"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-10 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                      <button
                        aria-label={`Increase quantity for ${item.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background text-foreground transition hover:border-primary/30 hover:text-primary"
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        type="button"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-foreground/78 transition hover:text-danger"
                      onClick={() => removeItem(item.slug)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove item
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.9rem] border border-dashed border-border/80 bg-background/78 p-6 text-sm leading-7 text-foreground/78">
            Your cart is empty. Add products from the catalog to build your next order.
          </div>
        )}
      </section>

      <aside className="rounded-4xl border surface-card bg-white/95 p-8 card-shadow sm:p-10">
        <BadgePill>Checkout summary</BadgePill>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">A cleaner final review</h2>
        <p className="mt-4 text-sm leading-7 text-foreground/78">
          Cart totals update instantly here, then the server validates product pricing again when checkout begins.
        </p>

        <div className="mt-8 rounded-[1.75rem] border border-border/70 bg-background/88 p-5">
          <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3 text-sm">
            <span className="text-foreground/78">Items</span>
            <span className="font-semibold text-foreground">{itemCount}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 border-b border-border/70 pb-3 text-sm">
            <span className="text-foreground/78">Subtotal</span>
            <span className="font-semibold text-foreground">{formatPrice(subtotal, currency)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 border-b border-border/70 pb-3 text-sm">
            <span className="text-foreground/78">Shipping</span>
            <span className="font-semibold text-foreground">Calculated later</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/62">Estimated total</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{formatPrice(subtotal, currency)}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              Ready for review
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-[1.6rem] border border-border/70 bg-linear-to-br from-white to-[#f4f8ff] p-5 text-sm text-foreground/78">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="leading-7">A more focused summary helps you spot quantity or pricing changes before paying.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-secondary text-primary">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <p className="leading-7">Checkout opens only after your current session cart is confirmed and ready.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button href="/checkout" disabled={!items.length}>
            Proceed to checkout
          </Button>
          <Button href="/shop" variant="outline">
            Continue shopping
          </Button>
        </div>
      </aside>
    </div>
  );
}
