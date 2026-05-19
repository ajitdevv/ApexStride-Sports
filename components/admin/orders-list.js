import { formatPrice } from "@/lib/format-price";
import { OrderStatusForm } from "@/components/admin/order-status-form";

function formatTimestamp(value) {
  if (!value) {
    return "Not placed yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCustomer(order) {
  return order.profiles?.full_name || (order.profile_id ? "Signed-in customer" : "Guest checkout");
}

export function OrdersList({ orders }) {
  if (!orders.length) {
    return (
      <section className="rounded-4xl border border-white/12 bg-white/8 p-6 text-sm leading-7 text-dark-muted backdrop-blur-xl sm:p-8">
        No orders are available yet. Completed checkout attempts will appear here for admin review.
      </section>
    );
  }

  return (
    <section className="grid gap-4 xl:gap-5">
      {orders.map((order) => (
        <article key={order.id} className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="grid gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{order.order_number}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{formatCustomer(order)}</h2>
              </div>
              <div className="grid gap-3 text-sm leading-7 text-slate-300 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Status</span>
                  <p className="mt-2 font-semibold text-white">{order.status}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Total</span>
                  <p className="mt-2 font-semibold text-white">{formatPrice(Number(order.total_amount ?? 0), order.currency ?? "INR")}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Placed</span>
                  <p className="mt-2 font-semibold text-white">{formatTimestamp(order.placed_at ?? order.created_at)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Provider</span>
                  <p className="mt-2 font-semibold text-white">{order.payment_provider || "Not set"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Reference</span>
                  <p className="mt-2 font-semibold text-white">{order.payment_reference || "Pending"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Checkout type</span>
                  <p className="mt-2 font-semibold text-white">{order.profile_id ? "Authenticated" : "Guest"}</p>
                </div>
              </div>
            </div>
            <OrderStatusForm orderId={order.id} currentStatus={order.status} />
          </div>
          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#0d1b30] p-5">
            <p className="text-sm font-semibold text-white">Order items</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {order.order_items?.length ? (
                order.order_items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium text-white">{item.product_name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{item.variant_title || "Catalog item"}</p>
                    </div>
                    <div className="text-sm leading-6 sm:text-right">
                      <p>Qty: {item.quantity}</p>
                      <p>{formatPrice(Number(item.line_total ?? 0), order.currency ?? "INR")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No line items are attached to this order yet.</p>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
