import Link from "next/link";
import { ArrowRight, Boxes, ClipboardList, LayoutDashboard, Sparkles, Users } from "lucide-react";
import { AdminOverviewChart } from "@/components/admin/overview-chart";
import { BadgePill } from "@/components/shared/badge-pill";
import { MetricCard } from "@/components/admin/metric-card";
import { getAdminCatalogSnapshot } from "@/lib/catalog";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin",
};

const quickActions = [
  {
    label: "Review orders",
    href: "/admin/orders",
    description: "Open the live order queue and update statuses without leaving the admin workspace.",
    icon: ClipboardList,
  },
  {
    label: "Open catalog",
    href: "/admin/catalog",
    description: "Inspect active products, categories, and featured inventory planning surfaces.",
    icon: Boxes,
  },
  {
    label: "View customers",
    href: "/admin/customers",
    description: "Prepare customer-facing account activity and future support workflows.",
    icon: Users,
  },
];

const storefrontLinks = [
  { label: "View homepage", href: "/" },
  { label: "Browse shop", href: "/shop" },
  { label: "Open account", href: "/account" },
  { label: "Open reports", href: "/admin/reports" },
];

async function getOrderSummary() {
  const supabaseAdmin = createSupabaseAdminClient();

  if (!supabaseAdmin) {
    return {
      totalOrders: 0,
      pendingOrders: 0,
      paidOrders: 0,
      fulfilledOrders: 0,
      recentOrders: [],
    };
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("id, order_number, status, total_amount, currency, created_at")
    .order("created_at", { ascending: false });

  const allOrders = orders ?? [];

  return {
    totalOrders: allOrders.length,
    pendingOrders: allOrders.filter((order) => order.status === "pending_payment").length,
    paidOrders: allOrders.filter((order) => order.status === "paid").length,
    fulfilledOrders: allOrders.filter((order) => order.status === "fulfilled").length,
    recentOrders: allOrders.slice(0, 5),
  };
}

export default async function AdminPage() {
  const [catalog, orderSummary] = await Promise.all([getAdminCatalogSnapshot(), getOrderSummary()]);

  const metrics = [
    {
      label: "All orders",
      value: `${orderSummary.totalOrders}`,
      detail: "Every checkout-created order is visible here for operational follow-up.",
    },
    {
      label: "Pending payment",
      value: `${orderSummary.pendingOrders}`,
      detail: "Orders still waiting on payment confirmation or manual review.",
    },
    {
      label: "Paid orders",
      value: `${orderSummary.paidOrders}`,
      detail: "Orders confirmed through the current Razorpay verification flow.",
    },
    {
      label: "Fulfilled orders",
      value: `${orderSummary.fulfilledOrders}`,
      detail: "Orders already marked complete from the admin side.",
    },
    {
      label: "Live categories",
      value: `${catalog.categoryCount}`,
      detail: "Active categories currently shaping the storefront browse experience.",
    },
    {
      label: "Visible products",
      value: `${catalog.productCount}`,
      detail: "Products currently available for customers to discover and buy.",
    },
  ];

  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="hero-glow relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0c1830] to-[#09111f] p-7 surface-shadow sm:p-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-sky-400/12 via-transparent to-transparent" />
        <div className="relative grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div>
            <BadgePill className="border-white/10 bg-white/10 text-sky-200">Admin dashboard</BadgePill>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A clearer control center for orders, catalog health, and next actions.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              Review live order activity, move between nested admin workspaces, and keep the storefront operation easier to scan from one premium dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/admin/orders"
                className="inline-flex h-12 items-center justify-center rounded-full bg-sky-400 px-6 text-sm font-semibold text-slate-950 shadow-[0_18px_35px_rgba(56,189,248,0.26)] transition hover:bg-sky-300"
              >
                Open orders workspace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/admin/catalog"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/14"
              >
                Browse catalog sections
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Operational focus</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-white">Orders first, expansion ready.</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The admin area now prioritizes real order handling while making room for catalog, customers, and reporting.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-white/10 bg-[#0d1b30] p-5 text-white card-shadow">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sky-200">
                  <LayoutDashboard className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Live readiness</p>
                  <p className="mt-1 text-sm font-semibold">Nested navigation is now available.</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Jump between admin sections from the left rail instead of relying on a flat placeholder dashboard.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Admin overview metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-4xl border border-white/12 bg-white/8 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Quick actions</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Move into the next workspace fast</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-dark-muted">
              Use the upgraded admin IA to move directly into the areas you need most.
            </p>
          </div>
          <div className="mt-6 grid gap-4">
            {quickActions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.6rem] border border-white/10 bg-[#0d1b30] p-5 transition hover:border-sky-300/25 hover:bg-[#11203a]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sky-200 transition group-hover:bg-sky-400/14">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-semibold text-white">{item.label}</p>
                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-sky-200" />
                    </div>
                    <p className="mt-2 text-sm leading-7 text-dark-muted">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-white/12 bg-white/8 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Recent orders</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Stay close to the live checkout queue</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              {orderSummary.recentOrders.length} visible
            </span>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            {orderSummary.recentOrders.length ? (
              orderSummary.recentOrders.map((order) => (
                <div key={order.id} className="rounded-[1.5rem] border border-white/10 bg-[#0d1b30] px-4 py-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-white">{order.order_number}</p>
                    <BadgePill className="border-white/10 bg-white/5 text-sky-200">{order.status}</BadgePill>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-dark-muted">
                    {order.currency} {Number(order.total_amount ?? 0)}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1b30] px-4 py-4 text-slate-300">No orders are available yet.</div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-4xl border border-white/12 bg-white/8 p-6 backdrop-blur-xl sm:p-8 xl:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Catalog snapshot</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Keep merchandising surfaces easy to scan</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-dark-muted">
            Track active categories and featured products while the catalog workspace expands into deeper product management.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[1.6rem] border border-white/10 bg-[#0d1b30] p-5">
            <p className="text-sm font-semibold text-white">Categories</p>
            <div className="mt-4 grid gap-3">
              {catalog.categories.length ? (
                catalog.categories.map((category) => (
                  <div key={category.slug} className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
                    <p className="font-medium text-white">{category.name}</p>
                    <p className="mt-1 text-sm leading-6 text-dark-muted">{category.description || "Category ready for storefront browsing."}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-7 text-dark-muted">No active categories are available yet.</p>
              )}
            </div>
          </article>
          <article className="rounded-[1.6rem] border border-white/10 bg-[#0d1b30] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">Featured products</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">
                {catalog.featuredCount}
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {catalog.featuredProducts.length ? (
                catalog.featuredProducts.map((product) => (
                  <div key={product.slug} className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3">
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="mt-1 text-sm leading-6 text-dark-muted">
                      {product.category?.name ?? "Uncategorized"} · {product.currency} {product.basePrice}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-7 text-dark-muted">No featured products are available yet.</p>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 rounded-4xl border border-white/12 bg-white/8 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Storefront shortcuts</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Check customer-facing surfaces without leaving admin</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-dark-muted">
            Jump back to the public storefront whenever you need to confirm the customer experience.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {storefrontLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.3rem] border border-white/10 bg-[#0d1b30] px-4 py-4 text-sm font-semibold text-white transition hover:border-sky-300/30 hover:text-sky-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-4xl border border-white/12 bg-white/8 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
              <ClipboardList className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Pending now</p>
              <p className="mt-1 text-2xl font-semibold text-white">{orderSummary.pendingOrders}</p>
            </div>
          </div>
        </article>
        <article className="rounded-4xl border border-white/12 bg-white/8 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
              <Boxes className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Catalog live</p>
              <p className="mt-1 text-2xl font-semibold text-white">{catalog.productCount}</p>
            </div>
          </div>
        </article>
        <article className="rounded-4xl border border-white/12 bg-white/8 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Featured active</p>
              <p className="mt-1 text-2xl font-semibold text-white">{catalog.featuredCount}</p>
            </div>
          </div>
        </article>
      </section>

      <AdminOverviewChart
        pendingOrders={orderSummary.pendingOrders}
        paidOrders={orderSummary.paidOrders}
        fulfilledOrders={orderSummary.fulfilledOrders}
        categoryCount={catalog.categoryCount}
        productCount={catalog.productCount}
      />
    </div>
  );
}
