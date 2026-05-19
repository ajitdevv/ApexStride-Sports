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

function getStatusTone(status) {
  if (status === "fulfilled") {
    return "border-emerald-200/30 bg-emerald-400/10 text-emerald-100";
  }

  if (status === "paid") {
    return "border-sky-200/30 bg-sky-400/10 text-sky-100";
  }

  if (status === "pending_payment") {
    return "border-amber-200/30 bg-amber-400/10 text-amber-100";
  }

  return "border-white/10 bg-white/5 text-white";
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
        <article key={order.id} className="rounded-4xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">{order.order_number}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{formatCustomer(order)}</h2>
                  <p className="mt-2 text-sm leading-7 text-dark-muted">
                    {order.profile_id ? "Authenticated checkout" : "Guest checkout"} · {order.payment_provider || "Payment provider pending"}
                  </p>
                </div>
                <div className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${getStatusTone(order.status)}`}>
                  {order.status}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.3rem] border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Total</span>
                  <p className="mt-2 text-base font-semibold text-white">{formatPrice(Number(order.total_amount ?? 0), order.currency ?? "INR")}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Placed</span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">{formatTimestamp(order.placed_at ?? order.created_at)}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Reference</span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">{order.payment_reference || "Pending"}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-[#0d1b30] px-4 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Customer type</span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-white">{order.profile_id ? "Authenticated" : "Guest"}</p>
                </div>
              </div>
            </div>

            <div className="xl:w-[15.5rem] xl:shrink-0">
              <OrderStatusForm orderId={order.id} currentStatus={order.status} />
            </div>
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-[#0d1b30] p-5">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Order items</p>
                <p className="mt-1 text-sm leading-6 text-dark-muted">A focused view of every line attached to this order.</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {order.order_items?.length ?? 0} line item{order.order_items?.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              {order.order_items?.length ? (
                order.order_items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-3 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-white">{item.product_name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">{item.variant_title || "Catalog item"}</p>
                    </div>
                    <div className="grid gap-1 text-sm sm:text-right">
                      <p>Qty: {item.quantity}</p>
                      <p className="font-semibold text-white">{formatPrice(Number(item.line_total ?? 0), order.currency ?? "INR")}</p>
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
