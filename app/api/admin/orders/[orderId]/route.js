import { NextResponse } from "next/server";
import { getSessionSnapshot } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

const allowedStatuses = new Set(["pending_payment", "paid", "fulfilled", "cancelled", "refunded"]);

export async function PATCH(request, { params }) {
  const session = await getSessionSnapshot();
  const supabaseAdmin = createSupabaseAdminClient();
  const { orderId } = await params;

  if (!session.isAdmin) {
    return NextResponse.json(
      {
        error: "Admin access is required.",
      },
      { status: 403 }
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "Supabase service role credentials are not configured yet.",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const status = typeof body?.status === "string" ? body.status : "";

  if (!allowedStatuses.has(status)) {
    return NextResponse.json(
      {
        error: "Unsupported order status.",
      },
      { status: 400 }
    );
  }

  const updatePayload = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === "paid") {
    updatePayload.placed_at = new Date().toISOString();
  }

  const { error } = await supabaseAdmin.from("orders").update(updatePayload).eq("id", orderId);

  if (error) {
    return NextResponse.json(
      {
        error: "Unable to update the order status.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
