import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function getStorefrontSnapshot() {
  const client = await createSupabaseServerClient();

  if (!client) {
    return {
      categories: [],
      products: [],
      featuredProducts: [],
    };
  }

  const [{ data: productsData, error: productsError }, { data: categoriesData, error: categoriesError }] = await Promise.all([
    client
      .from("products")
      .select(
        "id, name, slug, short_description, description, base_price, compare_at_price, currency, featured, categories(name, slug), brands(name, slug)"
      )
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false }),
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

  const products = (productsData ?? []).map(normalizeProduct);
  const categories = (categoriesData ?? []).map(normalizeCategory);

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
  };
}
