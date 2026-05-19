import Link from "next/link";
import { Search, X } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { getStorefrontSnapshot } from "@/lib/catalog";

function getSingleSearchParam(value) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return "";
}

function buildShopHref({ query = "", category = "" } = {}) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (category) {
    params.set("category", category);
  }

  const search = params.toString();

  return search ? `/shop?${search}` : "/shop";
}

function getResultsMessage({ query, categoryName, productCount }) {
  if (query && categoryName) {
    return `${productCount} product${productCount === 1 ? "" : "s"} matched “${query}” in ${categoryName}.`;
  }

  if (query) {
    return `${productCount} product${productCount === 1 ? "" : "s"} matched “${query}”.`;
  }

  if (categoryName) {
    return `${productCount} product${productCount === 1 ? "" : "s"} available in ${categoryName}.`;
  }

  return `${productCount} active product${productCount === 1 ? "" : "s"} available right now.`;
}

function getEmptyMessage({ query, categoryName }) {
  if (query && categoryName) {
    return `No products matched “${query}” in ${categoryName}. Try a broader term or clear the category filter.`;
  }

  if (query) {
    return `No products matched “${query}”. Try a different keyword or browse all products.`;
  }

  if (categoryName) {
    return `No active products are available in ${categoryName} yet. Try another category or browse the full catalog.`;
  }

  return "No active products are available yet. Add products in Supabase to publish the storefront catalog.";
}

function ShopSearchForm({ defaultQuery, activeCategory }) {
  return (
    <form action="/shop" className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={defaultQuery}
            placeholder="Search by product name or details"
            className="h-12 w-full rounded-full border border-border bg-white pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/40"
          />
        </label>
        {activeCategory ? <input type="hidden" name="category" value={activeCategory.slug} /> : null}
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_18px_35px_rgba(20,71,230,0.18)] transition hover:opacity-95"
        >
          Search catalog
        </button>
      </div>
      {defaultQuery || activeCategory ? (
        <Link
          href="/shop"
          className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-white/94 px-5 text-sm font-semibold text-foreground shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition hover:border-primary/35 hover:text-primary"
        >
          Clear filters
        </Link>
      ) : null}
    </form>
  );
}

function CategoryFilterLinks({ categories, activeCategorySlug, activeQuery }) {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={buildShopHref({ query: activeQuery })}
        className={
          activeCategorySlug
            ? "rounded-full border border-border bg-background/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-contrast-muted transition hover:border-primary/25 hover:text-primary"
            : "rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)]"
        }
      >
        All products
      </Link>
      {categories.map((category) => {
        const isActive = category.slug === activeCategorySlug;

        return (
          <Link
            key={category.slug}
            href={buildShopHref({ query: activeQuery, category: category.slug })}
            className={
              isActive
                ? "rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)]"
                : "rounded-full border border-border bg-background/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-contrast-muted transition hover:border-primary/25 hover:text-primary"
            }
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}

export const metadata = {
  title: "Shop",
};

export default async function ShopPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = getSingleSearchParam(resolvedSearchParams?.q).trim();
  const category = getSingleSearchParam(resolvedSearchParams?.category).trim();
  const { products, categories } = await getStorefrontSnapshot({ query, category });
  const activeCategory = categories.find((item) => item.slug === category) ?? null;
  const resultsMessage = getResultsMessage({
    query,
    categoryName: activeCategory?.name ?? "",
    productCount: products.length,
  });
  const emptyMessage = getEmptyMessage({
    query,
    categoryName: activeCategory?.name ?? "",
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <SectionShell className="py-12 sm:py-16">
          <div className="rounded-4xl border surface-card bg-white/94 p-8 card-shadow sm:p-10">
            <BadgePill>{query || activeCategory ? "Search the catalog" : "Live product catalog"}</BadgePill>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">Shop performance accessories</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-contrast-muted sm:text-base">
              Search and browse the active storefront assortment across recovery, hydration, and training support from one linkable catalog view.
            </p>
            <ShopSearchForm defaultQuery={query} activeCategory={activeCategory} />
            {categories.length ? (
              <CategoryFilterLinks categories={categories} activeCategorySlug={activeCategory?.slug ?? ""} activeQuery={query} />
            ) : (
              <div className="mt-8 rounded-3xl border border-dashed border-border/80 bg-background/78 p-5 text-sm leading-7 text-contrast-muted">
                No active categories are available yet. Add categories in Supabase to organize the storefront.
              </div>
            )}
            <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-border/70 bg-background/82 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-foreground">{resultsMessage}</p>
              {query || activeCategory ? (
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-contrast-muted">
                  <X className="h-3.5 w-3.5" />
                  Filters are active
                </div>
              ) : null}
            </div>
          </div>
          {products.length ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCardPlaceholder key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[1.75rem] border border-dashed border-border/80 bg-white/92 p-8 text-sm leading-7 text-contrast-muted">
              {emptyMessage}
            </div>
          )}
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
