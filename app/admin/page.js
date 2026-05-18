import { AdminOverviewChart } from "@/components/admin/overview-chart";
import { MetricCard } from "@/components/admin/metric-card";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { NavLinks } from "@/components/shared/nav-links";
import { LogoMark } from "@/components/shared/logo-mark";
import { adminNavigation } from "@/lib/config/navigation";
import { getAdminCatalogSnapshot } from "@/lib/catalog";
import { requireAdminAccess } from "@/lib/supabase/auth";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const access = await requireAdminAccess();
  const catalog = await getAdminCatalogSnapshot();

  const metrics = [
    {
      label: "Live categories",
      value: `${catalog.categoryCount}`,
      detail: "Pulled from the active Supabase category foundation.",
    },
    {
      label: "Visible products",
      value: `${catalog.productCount}`,
      detail: "The storefront product layer is now being used to shape a more realistic customer journey.",
    },
    {
      label: "Featured products",
      value: `${catalog.featuredCount}`,
      detail: "Highlighted items anchor the premium merchandising direction for the first real website pass.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <SectionShell className="py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <LogoMark className="[&_span:last-child>span:first-child]:text-sky-200 [&_span:last-child>span:last-child]:text-slate-300" />
            <p className="mt-6 text-sm leading-7 text-slate-300">
              The admin surface reflects the storefront direction, active catalog counts, and the current customer-platform state.
            </p>
            <div className="mt-6">
              <NavLinks items={adminNavigation} stacked className="gap-3" />
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-[#0d1b30] p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Access state</p>
              <p className="mt-2 leading-7">{access.message}</p>
            </div>
          </aside>
          <main className="grid gap-6">
            <div className="rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] to-[#091423] p-8 surface-shadow">
              <BadgePill className="border-white/10 bg-white/10 text-sky-200">Operations overview</BadgePill>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white">Admin control center</h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                Track the storefront foundation, monitor the current catalog shape, and prepare for deeper inventory, order, and reporting workflows in the next phase.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
            <AdminOverviewChart />
          </main>
        </div>
      </SectionShell>
    </div>
  );
}
