"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

function loadRazorpayCheckout() {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RazorpayCheckoutButton({ items = [], canCheckout = true }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleCheckout() {
     if (!canCheckout || !items.length) {
      setStatus({
        type: "error",
        message: "Add at least one product to your cart before starting checkout.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const hasCheckout = await loadRazorpayCheckout();

    if (!hasCheckout || !window.Razorpay) {
      setStatus({
        type: "error",
        message: "Unable to load Razorpay checkout right now.",
      });
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data) {
      setStatus({
        type: "error",
        message: data?.error || "Unable to start Razorpay checkout.",
      });
      setIsSubmitting(false);
      return;
    }

    const paymentObject = new window.Razorpay({
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: data.description,
      order_id: data.orderId,
      prefill: {
        email: data.customerEmail,
      },
      modal: {
        ondismiss() {
          window.location.assign("/checkout?status=cancelled");
        },
      },
      handler: async (paymentResponse) => {
        const verifyResponse = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...paymentResponse,
            internalOrderId: data.internalOrderId,
          }),
        });

        if (!verifyResponse.ok) {
          window.location.assign("/checkout?status=failed");
          return;
        }

        window.location.assign(`/checkout?status=success&order=${encodeURIComponent(data.orderNumber)}`);
      },
      theme: {
        color: "#1447e6",
      },
    });

    paymentObject.on("payment.failed", () => {
      window.location.assign("/checkout?status=failed");
    });

    paymentObject.open();
    setIsSubmitting(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <Button disabled={isSubmitting || !canCheckout || !items.length} onClick={handleCheckout} type="button">
        {isSubmitting ? "Opening Razorpay..." : "Pay with Razorpay"}
      </Button>
      {status.message ? (
        <div className="rounded-2xl border border-danger/20 bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </div>
      ) : null}
    </div>
  );
}
