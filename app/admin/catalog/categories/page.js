import { Tags } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { getAdminCatalogSnapshot } from "@/lib/catalog";

export const metadata = {
  title: "Admin Categories",
};

export default async function AdminCategoriesPage() {
  const catalog = await getAdminCatalogSnapshot();

  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0b1629] to-[#08111f] p-7 surface-shadow sm:p-10">
        <BadgePill className="border-white/10 bg-white/10 text-sky-200">Categories</BadgePill>
        <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Review active storefront categories at a glance.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              This route gives the nested admin navigation a real category workspace today, even before deeper editing tools are introduced.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-sm text-slate-300 backdrop-blur-sm xl:max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                <Tags className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">Live categories</p>
                <p className="mt-1 text-lg font-semibold text-white">{catalog.categoryCount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {catalog.categories.length ? (
          catalog.categories.map((category) => (
            <article key={category.slug} className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">/{category.slug}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{category.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{category.description || "Category ready for storefront browsing."}</p>
            </article>
          ))
        ) : (
          <article className="rounded-4xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-300 backdrop-blur-xl">
            No active categories are available yet.
          </article>
        )}
      </section>
    </div>
  );
}
