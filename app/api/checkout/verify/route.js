import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/payments/razorpay";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request) {
  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "Supabase service role credentials are not configured yet.",
      },
      { status: 503 }
    );
  }

  const body = await request.json();
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    internalOrderId,
  } = body;

  const isValid = verifyRazorpaySignature({
    orderId,
    paymentId,
    signature,
  });

  if (!isValid) {
    return NextResponse.json(
      {
        error: "Invalid Razorpay payment signature.",
      },
      { status: 400 }
    );
  }

  if (!internalOrderId) {
    return NextResponse.json(
      {
        error: "Missing internal order id.",
      },
      { status: 400 }
    );
  }

  await supabaseAdmin
    .from("orders")
    .update({
      status: "paid",
      payment_reference: paymentId,
      placed_at: new Date().toISOString(),
    })
    .eq("id", internalOrderId);

  return NextResponse.json({
    success: true,
  });
}
