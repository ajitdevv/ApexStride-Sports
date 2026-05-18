import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/payments/razorpay";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request) {
  const supabaseAdmin = createSupabaseAdminClient();
  const signature = request.headers.get("x-razorpay-signature");
  const payload = await request.text();

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "Supabase service role credentials are not configured yet.",
      },
      { status: 503 }
    );
  }

  if (!signature) {
    return NextResponse.json(
      {
        error: "Missing Razorpay signature header.",
      },
      { status: 400 }
    );
  }

  const isValid = verifyRazorpayWebhookSignature(payload, signature);

  if (!isValid) {
    return NextResponse.json(
      {
        error: "Invalid Razorpay webhook signature.",
      },
      { status: 400 }
    );
  }

  const event = JSON.parse(payload);

  if (event.event === "payment.captured") {
    const payment = event.payload?.payment?.entity;
    const internalOrderId = payment?.notes?.orderId;

    if (internalOrderId) {
      await supabaseAdmin
        .from("orders")
        .update({
          status: "paid",
          payment_reference: payment.id,
          placed_at: new Date().toISOString(),
        })
        .eq("id", internalOrderId);
    }
  }

  return NextResponse.json({ received: true });
}
