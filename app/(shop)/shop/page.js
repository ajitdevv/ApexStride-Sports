import Link from "next/link";
import { Search, X } from "lucide-react";
import { BadgePill } from "@/components/shared/badge-pill";
import { SectionShell } from "@/components/shared/section-shell";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { ProductCardPlaceholder } from "@/components/storefront/product-card-placeholder";
import { getCategoryHref, getStorefrontSnapshot } from "@/lib/catalog";

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

  return "No products are available right now. Please check back soon for new arrivals.";
}

function ShopSearchForm({ defaultQuery, activeCategory }) {
  return (
    <form action="/shop" className="mt-4 grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={defaultQuery}
            placeholder="Search by product name or details"
            className="h-10 w-full rounded-full border border-border bg-white pl-10 pr-3.5 text-xs text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-primary/40 sm:h-11 sm:text-sm"
          />
        </label>
        {activeCategory ? <input type="hidden" name="category" value={activeCategory.slug} /> : null}
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-[0_18px_35px_rgba(20,71,230,0.18)] transition hover:opacity-95 sm:h-11 sm:px-5 sm:text-sm"
        >
          Search
        </button>
      </div>
      {defaultQuery || activeCategory ? (
        <Link
          href="/shop"
          className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-white/94 px-3.5 text-xs font-semibold text-foreground shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition hover:border-primary/35 hover:text-primary sm:h-11 sm:px-4.5 sm:text-sm"
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
    <div className="mt-4 flex flex-wrap gap-2">
      <Link
        href={buildShopHref({ query: activeQuery })}
        className={
          activeCategorySlug
            ? "rounded-full border border-border bg-background/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/72 transition hover:border-primary/25 hover:text-primary sm:px-3.5 sm:py-1.5 sm:text-[11px]"
            : "rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)] sm:px-3.5 sm:py-1.5 sm:text-[11px]"
        }
      >
        All products
      </Link>
      {categories.map((category) => {
        const isActive = category.slug === activeCategorySlug;

        return (
          <Link
            key={category.slug}
            href={getCategoryHref(category.slug)}
            className={
              isActive
                ? "rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-[0_12px_24px_rgba(20,71,230,0.18)] sm:px-3.5 sm:py-1.5 sm:text-[11px]"
                : "rounded-full border border-border bg-background/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/78 transition hover:border-primary/25 hover:text-primary sm:px-3.5 sm:py-1.5 sm:text-[11px]"
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
        <SectionShell className="py-6 sm:py-8 lg:py-9">
          <div className="rounded-[1.7rem] border surface-card bg-white/94 p-4 card-shadow sm:p-5 lg:p-6">
            <BadgePill className="eyebrow-spacing">{query || activeCategory ? "Search the catalog" : "Live product catalog"}</BadgePill>
            <h1 className="section-title mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">Shop performance accessories</h1>
            <p className="mt-2.5 max-w-3xl text-xs leading-6 text-foreground/78 sm:text-sm sm:leading-6 lg:max-w-2xl">
              Search and browse the active storefront assortment across recovery, hydration, and training support from one linkable catalog view.
            </p>
            <ShopSearchForm defaultQuery={query} activeCategory={activeCategory} />
            {categories.length ? (
              <CategoryFilterLinks categories={categories} activeCategorySlug={activeCategory?.slug ?? ""} activeQuery={query} />
            ) : (
              <div className="mt-4 rounded-[1.25rem] border border-dashed border-border/80 bg-background/78 p-3.5 text-xs leading-6 text-foreground/78 sm:p-4 sm:text-sm">
                No categories are available right now. Please browse the full catalog below.
              </div>
            )}
            <div className="mt-4 flex flex-col gap-2 rounded-[1.2rem] border border-border/70 bg-background/82 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-3">
              <p className="text-xs font-medium text-foreground sm:text-sm">{resultsMessage}</p>
              {query || activeCategory ? (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/78 sm:text-[11px]">
                  <X className="h-3.5 w-3.5" />
                  Filters are active
                </div>
              ) : null}
            </div>
          </div>
          {products.length ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <ProductCardPlaceholder key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-[1.25rem] border border-dashed border-border/80 bg-white/92 p-4 text-xs leading-6 text-foreground/78 sm:p-6 sm:text-sm">
              {emptyMessage}
            </div>
          )}
        </SectionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
