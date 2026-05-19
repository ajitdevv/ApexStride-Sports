import { BarChart3, LineChart } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = {
  title: "Admin Reports",
};

export default function AdminReportsPage() {
  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0b1629] to-[#08111f] p-7 surface-shadow sm:p-10">
        <BadgePill className="border-white/10 bg-white/10 text-sky-200">Reports</BadgePill>
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Reserve a stronger analytics workspace for sales and performance review.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              Reports now sit inside a page that visually matches the rest of the admin experience, making future revenue, catalog, and conversion insights easier to grow into.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Reports section</p>
                  <p className="mt-1 text-lg font-semibold text-white">Ready for deeper analytics.</p>
                </div>
              </div>
            </article>
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <LineChart className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Best use</p>
                  <p className="mt-1 text-lg font-semibold text-white">Sales, conversion, and catalog trends.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <EmptyState
        tone="dark"
        title="Reporting modules can land here on top of a cleaner admin foundation"
        description="Use this route for future sales trends, conversion views, and catalog performance reporting without dropping users into a visually mismatched placeholder page."
        actionLabel="Back to dashboard"
        actionHref="/admin"
      />
    </div>
  );
}
