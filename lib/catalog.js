import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeSearchValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeRelation(value) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

function normalizeProduct(product) {
  const category = normalizeRelation(product.categories);
  const brand = normalizeRelation(product.brands);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.short_description ?? "",
    description: product.description ?? product.short_description ?? "",
    basePrice: Number(product.base_price ?? 0),
    compareAtPrice: product.compare_at_price == null ? null : Number(product.compare_at_price),
    currency: product.currency ?? "INR",
    featured: Boolean(product.featured),
    category: category
      ? {
          name: category.name,
          slug: category.slug,
        }
      : null,
    brand: brand
      ? {
          name: brand.name,
          slug: brand.slug,
        }
      : null,
  };
}

function normalizeCategory(category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
  };
}

export function formatPrice(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function getStorefrontSnapshot(options = {}) {
  const client = await createSupabaseServerClient();

  if (!client) {
    return {
      categories: [],
      products: [],
      featuredProducts: [],
    };
  }

  const searchQuery = normalizeSearchValue(options.query);
  const categorySlug = normalizeSearchValue(options.category);

  const productsQuery = client
    .from("products")
    .select(
      "id, name, slug, short_description, description, base_price, compare_at_price, currency, featured, categories(name, slug), brands(name, slug)"
    )
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (searchQuery) {
    const escapedSearchQuery = searchQuery.replaceAll(",", "\\,");
    productsQuery.or(
      `name.ilike.%${escapedSearchQuery}%,short_description.ilike.%${escapedSearchQuery}%,description.ilike.%${escapedSearchQuery}%`
    );
  }

  const [{ data: productsData, error: productsError }, { data: categoriesData, error: categoriesError }] = await Promise.all([
    productsQuery,
    client
      .from("categories")
      .select("id, name, slug, description")
      .eq("status", "active")
      .order("sort_order", { ascending: true }),
  ]);

  if (productsError || categoriesError) {
    return {
      categories: [],
      products: [],
      featuredProducts: [],
    };
  }

  const categories = (categoriesData ?? []).map(normalizeCategory);
  const products = (productsData ?? [])
    .map(normalizeProduct)
    .filter((product) => (categorySlug ? product.category?.slug === categorySlug : true));

  return {
    categories,
    products,
    featuredProducts: products.filter((product) => product.featured),
  };
}

export async function getProductBySlug(slug) {
  const client = await createSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("products")
    .select(
      "id, name, slug, short_description, description, base_price, compare_at_price, currency, featured, categories(name, slug), brands(name, slug)"
    )
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeProduct(data);
}

export async function getAdminCatalogSnapshot() {
  const storefront = await getStorefrontSnapshot();

  return {
    categoryCount: storefront.categories.length,
    productCount: storefront.products.length,
    featuredCount: storefront.featuredProducts.length,
    categories: storefront.categories.slice(0, 4),
    featuredProducts: storefront.featuredProducts.slice(0, 4),
  };
}
