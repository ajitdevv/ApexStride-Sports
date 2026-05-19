"use client";

import { useEffect } from "react";
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
  },
  cancelled: {
    badge: "Checkout cancelled",
    title: "You closed checkout before completing payment",
    description: "Your order was not marked as paid. Review the cart summary below and try Razorpay again whenever you are ready.",
  },
  failed: {
    badge: "Payment failed",
    title: "We could not verify the payment",
    description: "The payment did not complete successfully, or the verification step failed before we could confirm your order.",
  },
  idle: {
    badge: "Razorpay checkout",
    title: "Complete your order with Razorpay",
    description: "Review your current cart and pay for the exact products selected in this browser session.",
  },
};

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
      <div className="rounded-4xl border surface-card bg-white/94 p-8 card-shadow sm:p-10">
        <BadgePill>{content.badge}</BadgePill>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">{content.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-contrast-muted sm:text-base">{content.description}</p>
        {orderNumber ? (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            Order reference: <span className="font-semibold text-emerald-900">{orderNumber}</span>
          </div>
        ) : null}
        <div className="mt-8 grid gap-4 rounded-3xl border border-border/70 bg-background/88 p-5 text-sm text-contrast-muted sm:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground">Cart items</p>
            <p className="mt-2 leading-7">{hydrated ? itemCount : 0} item(s) are ready for checkout in this session.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Pricing source</p>
            <p className="mt-2 leading-7">Checkout totals are validated again against live Supabase product pricing on the server.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Retry behavior</p>
            <p className="mt-2 leading-7">Failed or cancelled payments keep the cart intact so the order can be retried.</p>
          </div>
        </div>
      </div>
      <div className="rounded-4xl border surface-card bg-white/94 p-8 card-shadow sm:p-10">
        <BadgePill>Order summary</BadgePill>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">Current cart</h2>
        <p className="mt-4 text-sm leading-7 text-contrast-muted">
          Razorpay will open for the exact subtotal shown below after the server validates your cart items.
        </p>
        {hydrated && items.length ? (
          <div className="mt-8 grid gap-3 rounded-3xl border border-border/70 bg-background/88 p-5 text-sm text-contrast-muted">
            {items.map((item) => (
              <div key={item.slug} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-foreground">{formatPrice(item.basePrice * item.quantity, item.currency)}</span>
              </div>
            ))}
            <div className="mt-2 flex flex-col gap-1 border-t border-border/70 pt-3 font-semibold text-foreground sm:flex-row sm:items-center sm:justify-between">
              <span>Total</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-border/80 bg-background/78 p-5 text-sm leading-7 text-contrast-muted">
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
      </div>
    </div>
  );
}
