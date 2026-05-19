import { Users } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = {
  title: "Admin Customers",
};

export default function AdminCustomersPage() {
  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0b1629] to-[#08111f] p-7 surface-shadow sm:p-10">
        <BadgePill className="border-white/10 bg-white/10 text-sky-200">Customers</BadgePill>
        <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Create a clearer customer service workspace next.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              This nested route is now live so future customer account, support, and segmentation tools have a dedicated home in the admin IA.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-sm text-slate-300 backdrop-blur-sm xl:max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Customer section</p>
                <p className="mt-1 text-lg font-semibold text-white">Nested and ready for expansion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmptyState
        title="Customer tools are prepared for the next phase"
        description="The premium nested admin navigation now includes a real customer route, so service history, segments, and account operations can be added here without reworking the shell again."
        actionLabel="Open orders workspace"
        actionHref="/admin/orders"
      />
    </div>
  );
}
