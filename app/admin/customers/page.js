import { MessageSquareMore, Users } from "lucide-react";
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
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Prepare customer support and account operations from a clearer workspace.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              This route is no longer just a bright placeholder inside the admin shell. It now feels like the proper home for future customer history, service notes, and account operations.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Customer route</p>
                  <p className="mt-1 text-lg font-semibold text-white">Nested and operationally ready.</p>
                </div>
              </div>
            </article>
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <MessageSquareMore className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Next use</p>
                  <p className="mt-1 text-lg font-semibold text-white">Service history and account help.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <EmptyState
        tone="dark"
        title="Customer tools can expand here without redesigning the admin shell"
        description="Use this workspace for future service history, segments, and account operations while keeping the current admin experience visually consistent and easier to trust."
        actionLabel="Open orders workspace"
        actionHref="/admin/orders"
      />
    </div>
  );
}
