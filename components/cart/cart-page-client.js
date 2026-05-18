"use client";

import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format-price";

export function CartPageClient() {
  const { hydrated, items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  if (!hydrated) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-4xl border border-white/60 bg-white/92 p-8 card-shadow sm:p-10">
          <BadgePill>Your cart</BadgePill>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Loading your cart</h1>
          <p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">We are restoring your current shopping session.</p>
        </div>
      </div>
    );
  }

  const currency = items[0]?.currency ?? "INR";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-4xl border border-white/60 bg-white/92 p-8 card-shadow sm:p-10">
        <BadgePill>Your cart</BadgePill>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Your selection space</h1>
        <p className="mt-4 text-sm leading-8 text-muted-foreground sm:text-base">
          Review your selected products, adjust quantities, and continue to checkout when you are ready.
        </p>
        {items.length ? (
          <div className="mt-8 grid gap-4">
            {items.map((item) => (
              <div key={item.slug} className="rounded-3xl border border-border/70 bg-background/80 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.categoryName || item.brandName || "Active catalog product"}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-foreground">{formatPrice(item.basePrice, item.currency)}</p>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="flex items-center gap-2">
                      <Button
                        aria-label={`Decrease quantity for ${item.name}`}
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        -
                      </Button>
                      <span className="min-w-8 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                      <Button
                        aria-label={`Increase quantity for ${item.name}`}
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{formatPrice(item.basePrice * item.quantity, item.currency)}</p>
                    <Button onClick={() => removeItem(item.slug)} size="sm" type="button" variant="ghost">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-dashed border-border/80 bg-background/70 p-5 text-sm leading-7 text-muted-foreground">
            Your cart is empty. Add products from the catalog to begin checkout.
          </div>
        )}
      </div>
      <div className="rounded-4xl border border-white/60 bg-white/92 p-8 card-shadow sm:p-10">
        <BadgePill>Checkout summary</BadgePill>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">Order overview</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Your checkout total updates instantly from the products currently stored in this browser session.
        </p>
        <div className="mt-8 grid gap-3 rounded-3xl border border-border/70 bg-background/80 p-5 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>Calculated later</span>
          </div>
          <div className="flex items-center justify-between font-semibold text-foreground">
            <span>Total</span>
            <span>{formatPrice(subtotal, currency)}</span>
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
      </div>
    </div>
  );
}
