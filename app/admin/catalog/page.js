import Link from "next/link";
import { ArrowRight, FolderKanban, Package2, Sparkles, Tags } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { getAdminCatalogSnapshot } from "@/lib/catalog";

export const metadata = {
  title: "Admin Catalog",
};

const links = [
  {
    label: "Products",
    href: "/admin/catalog/products",
    description: "Review visible products and prepare the next product management phase.",
    icon: Package2,
  },
  {
    label: "Categories",
    href: "/admin/catalog/categories",
    description: "Inspect active categories shaping the storefront browse experience.",
    icon: Tags,
  },
];

export default async function AdminCatalogPage() {
  const catalog = await getAdminCatalogSnapshot();

  return (
    <div className="grid gap-6 xl:gap-8">
      <section className="hero-glow relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#0f1e37] via-[#0b1629] to-[#08111f] p-7 surface-shadow sm:p-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-sky-400/12 via-transparent to-transparent" />
        <div className="relative grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div>
            <BadgePill className="border-white/10 bg-white/10 text-sky-200">Catalog workspace</BadgePill>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Keep products and categories easier to review from one premium surface.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              This catalog section gives you a cleaner launch point for product and category management while deeper CRUD workflows are prepared.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                  <FolderKanban className="h-5 w-5" />
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">Live categories</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{catalog.categoryCount}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="group rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-sky-300/25 hover:bg-white/8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1b30] text-sky-200">
                <item.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-white">{item.label}</p>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-sky-200" />
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
