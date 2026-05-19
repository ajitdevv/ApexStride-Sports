import { ClipboardList } from "lucide-react";
import { OrdersList } from "@/components/admin/orders-list";
import { BadgePill } from "@/components/shared/badge-pill";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Orders",
};

async function getOrders() {
  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    return [];
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select(
      `
        id,
        profile_id,
        order_number,
        status,
        currency,
        total_amount,
        payment_provider,
        payment_reference,
        created_at,
        placed_at,
        profiles(full_name),
        order_items(id, product_name, variant_title, quantity, line_total)
      `
    )
    .order("created_at", { ascending: false });

  return orders ?? [];
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="hero-glow relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0b1629] to-[#08111f] p-7 surface-shadow sm:p-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-sky-400/12 via-transparent to-transparent" />
        <div className="relative grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div>
            <BadgePill className="border-white/10 bg-white/10 text-sky-200">Orders workspace</BadgePill>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Review incoming orders and update status from one easier workspace.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-dark-muted sm:text-base">
              This view shows real checkout-created orders, their line items, and the current payment or fulfillment state in a cleaner operational layout.
            </p>
          </div>
          <article className="rounded-[1.75rem] border border-white/12 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                <ClipboardList className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Orders first</p>
                <p className="mt-1 text-base font-semibold text-white">Live status management stays front and center.</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-dark-muted">
              Keep the payment lifecycle authoritative while allowing admin-only operational updates from the same interface.
            </p>
          </article>
        </div>
      </section>

      <OrdersList orders={orders} />
    </div>
  );
}
