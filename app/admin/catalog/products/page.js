import { Package2, Sparkles } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { EmptyState } from "@/components/shared/empty-state";
import { getAdminCatalogSnapshot } from "@/lib/catalog";

export const metadata = {
  title: "Admin Products",
};

export default async function AdminProductsPage() {
  const catalog = await getAdminCatalogSnapshot();

  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0b1629] to-[#08111f] p-7 surface-shadow sm:p-10">
        <BadgePill className="border-white/10 bg-white/10 text-sky-200">Products</BadgePill>
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Keep visible products easier to review before deeper CRUD lands.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              This workspace now feels like a real product operations entry point, even before full editing and merchandising controls are added.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <Package2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Visible products</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{catalog.productCount}</p>
                </div>
              </div>
            </article>
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Featured now</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{catalog.featuredCount}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <EmptyState
        tone="dark"
        title="Product editing can expand from this stronger workspace"
        description="The products route now matches the rest of the admin shell more cleanly, while full product creation, editing, and merchandising controls can be added here without reworking navigation again."
        actionLabel="Back to catalog"
        actionHref="/admin/catalog"
      />
    </div>
  );
}
