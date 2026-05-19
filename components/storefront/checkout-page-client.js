"use client";

import { useEffect } from "react";
import { AlertTriangle, BadgeCheck, CreditCard, ShieldCheck, ShoppingBag } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { Button } from "@/components/ui/button";
import { RazorpayCheckoutButton } from "@/components/storefront/razorpay-checkout-button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format-price";

const statusContent = {
  success: {
    badge: "Payment received",
    title: "Your payment was completed successfully",
    description: "Your ApexStride order has been recorded and the payment status was confirmed with Razorpay.",
    tone: "success",
  },
  cancelled: {
    badge: "Checkout cancelled",
    title: "You closed checkout before completing payment",
    description: "Your order was not marked as paid. Review the cart summary below and try Razorpay again whenever you are ready.",
    tone: "warning",
  },
  failed: {
    badge: "Payment failed",
    title: "We could not verify the payment",
    description: "The payment did not complete successfully, or the verification step failed before we could confirm your order.",
    tone: "danger",
  },
  idle: {
    badge: "Razorpay checkout",
    title: "Complete your order with Razorpay",
    description: "Review your cart, confirm the current total, and move into a cleaner server-validated payment flow.",
    tone: "default",
  },
};

const checkoutHighlights = [
  {
    title: "Server validation",
    description: "Cart totals are checked again against live product pricing before payment begins.",
    icon: ShieldCheck,
  },
  {
    title: "Retry-friendly flow",
    description: "Cancelled or failed payments keep the cart intact so checkout can start again quickly.",
    icon: CreditCard,
  },
  {
    title: "Focused final review",
    description: "The summary on this page reflects the exact products in your current browser session.",
    icon: ShoppingBag,
  },
];

function getStatusPanelClass(tone) {
  if (tone === "success") {
    return "border-emerald-200 bg-emerald-50 text-emerald-900";
  }

  if (tone === "warning") {
    return "border-amber-200 bg-amber-50 text-amber-900";
  }

  if (tone === "danger") {
    return "border-rose-200 bg-rose-50 text-rose-900";
  }

  return "border-border/70 bg-background/88 text-foreground";
}

export function CheckoutPageClient({ currentStatus, orderNumber }) {
  const { hydrated, items, itemCount, subtotal, clearCart } = useCart();

  useEffect(() => {
    if (currentStatus === "success") {
      clearCart();
    }
  }, [clearCart, currentStatus]);

  const content = statusContent[currentStatus] ?? statusContent.idle;
  const currency = items[0]?.currency ?? "INR";
  const canCheckout = hydrated && items.length > 0 && currentStatus !== "success";

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-4xl border surface-card bg-white/95 p-8 card-shadow sm:p-10">
        <BadgePill>{content.badge}</BadgePill>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-foreground/78 sm:text-base">{content.description}</p>

        <div className={`mt-6 rounded-[1.6rem] border p-4 text-sm ${getStatusPanelClass(content.tone)}`}>
          {orderNumber ? (
            <p>
              Order reference: <span className="font-semibold">{orderNumber}</span>
            </p>
          ) : currentStatus === "idle" ? (
            <p>Review your current cart below and continue only when the order looks correct.</p>
          ) : currentStatus === "cancelled" ? (
            <p>You can return to the cart or retry checkout from the same saved session.</p>
          ) : currentStatus === "failed" ? (
            <p>Review the current order summary and retry if you still want to complete payment.</p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-3">
          {checkoutHighlights.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-[1.5rem] border border-border/70 bg-background/88 p-4">
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
      </section>

      <aside className="rounded-4xl border surface-card bg-white/95 p-8 card-shadow sm:p-10">
        <BadgePill>Order summary</BadgePill>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">Final cart review</h2>
        <p className="mt-4 text-sm leading-7 text-foreground/78">
          Razorpay opens for the exact subtotal shown here after the server confirms the active products in your cart.
        </p>

        {hydrated && items.length ? (
          <div className="mt-8 rounded-[1.8rem] border border-border/70 bg-linear-to-br from-white via-white to-[#f3f8ff] p-5">
            <div className="grid gap-3 text-sm text-foreground/78">
              {items.map((item) => (
                <div key={item.slug} className="flex items-start justify-between gap-4 rounded-[1.35rem] border border-border/70 bg-background/84 px-4 py-3">
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-foreground/62">
                      {item.quantity} × {formatPrice(item.basePrice, item.currency)}
                    </p>
                  </div>
                  <span className="font-semibold text-foreground">{formatPrice(item.basePrice * item.quantity, item.currency)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border/70 pt-4">
              <div className="flex items-center justify-between gap-4 text-sm text-foreground/78">
                <span>Cart items</span>
                <span className="font-semibold text-foreground">{itemCount}</span>
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/62">Total due now</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{formatPrice(subtotal, currency)}</p>
                </div>
                {currentStatus === "success" ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Paid
                  </span>
                ) : currentStatus === "failed" ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-800">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Retry available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Secure review
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-[1.8rem] border border-dashed border-border/80 bg-background/78 p-5 text-sm leading-7 text-foreground/78">
            {hydrated ? "Your cart is empty. Add products before starting checkout." : "We are restoring your cart before checkout."}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <RazorpayCheckoutButton canCheckout={canCheckout} items={items} />
          <Button href="/cart" variant="outline">
            Back to cart
          </Button>
          <Button href="/shop" variant="ghost">
            Continue shopping
          </Button>
        </div>
      </aside>
    </div>
  );
}
