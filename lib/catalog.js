import { getCategoryVisualMetadata } from "@/lib/config/category-visuals";
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

function slugifyCategory(value) {
  return normalizeSearchValue(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeProductCategory(product) {
  const categoryName = normalizeSearchValue(product.category);

  if (!categoryName) {
    return null;
  }

  return {
    name: categoryName,
    slug: slugifyCategory(categoryName),
  };
}

function resolveProductImageUrl(storagePath, client) {
  if (/^https?:\/\//i.test(storagePath)) {
    return storagePath;
  }

  const { data } = client.storage.from("product-media").getPublicUrl(storagePath);
  return data?.publicUrl ?? null;
}

function normalizeProductImages(product, client) {
  const imageRows = Array.isArray(product.product_images) ? product.product_images : [];

  const images = imageRows
    .map((image) => {
      const storagePath = normalizeSearchValue(image.storage_path);

      if (!storagePath) {
        return null;
      }

      const imageUrl = resolveProductImageUrl(storagePath, client);

      if (!imageUrl) {
        return null;
      }

      return {
        url: imageUrl,
        altText: normalizeSearchValue(image.alt_text) || product.name,
        storagePath,
        sortOrder: Number(image.sort_order ?? 0),
        isPrimary: Boolean(image.is_primary),
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (left.isPrimary !== right.isPrimary) {
        return Number(right.isPrimary) - Number(left.isPrimary);
      }

      return left.sortOrder - right.sortOrder;
    });

  return {
    images,
    primaryImage: images[0] ?? null,
  };
}

function normalizeProduct(product, client) {
  const category = normalizeProductCategory(product);
  const brand = normalizeRelation(product.brands);
  const basePrice = Number(product.base_price ?? 0);
  const compareAtPrice = product.compare_at_price == null ? null : Number(product.compare_at_price);
  const savingsAmount = compareAtPrice && compareAtPrice > basePrice ? compareAtPrice - basePrice : 0;
  const { images, primaryImage } = normalizeProductImages(product, client);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.short_description ?? "",
    description: product.description ?? product.short_description ?? "",
    basePrice,
    compareAtPrice,
    currency: product.currency ?? "INR",
    featured: Boolean(product.featured),
    seoTitle: product.seo_title ?? "",
    seoDescription: product.seo_description ?? "",
    savingsAmount,
    savingsPercentage: savingsAmount > 0 ? Math.round((savingsAmount / compareAtPrice) * 100) : 0,
    images,
    primaryImage,
    category,
    brand: brand
      ? {
          name: brand.name,
          slug: brand.slug,
        }
      : null,
  };
}

function buildCategoriesFromProducts(products) {
  const categoryMap = new Map();

  for (const product of products) {
    if (!product.category?.name || !product.category?.slug) {
      continue;
    }

    if (!categoryMap.has(product.category.slug)) {
      const visualMetadata = getCategoryVisualMetadata(product.category.slug, product.category.name);

      categoryMap.set(product.category.slug, {
        id: product.category.slug,
        name: product.category.name,
        slug: product.category.slug,
        description: visualMetadata.description,
        ...visualMetadata,
      });
    }
  }

  return Array.from(categoryMap.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function getCategoryBySlug(categories, slug) {
  return categories.find((category) => category.slug === slug) ?? null;
}

function buildCategoryPageSnapshot(products, categories, slug) {
  const category = getCategoryBySlug(categories, slug);

  if (!category) {
    return {
      category: null,
      categoryProducts: [],
      allProducts: products,
    };
  }

  return {
    category,
    categoryProducts: products.filter((product) => product.category?.slug === slug),
    allProducts: products,
  };
}

export function formatPrice(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCategoryHref(slug) {
  return `/categories/${slug}`;
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
    .select("id, name, slug, short_description, description, base_price, compare_at_price, currency, featured, category, seo_title, seo_description, brands(name, slug), product_images(storage_path, alt_text, sort_order, is_primary)")
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (searchQuery) {
    const escapedSearchQuery = searchQuery.replaceAll(",", "\\,");
    productsQuery.or(
      `name.ilike.%${escapedSearchQuery}%,short_description.ilike.%${escapedSearchQuery}%,description.ilike.%${escapedSearchQuery}%`
    );
  }

  const { data: productsData, error: productsError } = await productsQuery;

  if (productsError) {
    return {
      categories: [],
      products: [],
      featuredProducts: [],
    };
  }

  const allProducts = (productsData ?? []).map((product) => normalizeProduct(product, client));
  const categories = buildCategoriesFromProducts(allProducts);
  const products = allProducts.filter((product) => (categorySlug ? product.category?.slug === categorySlug : true));

  return {
    categories,
    products,
    featuredProducts: products.filter((product) => product.featured),
  };
}

export async function getCategorySummaries() {
  const storefront = await getStorefrontSnapshot();
  return storefront.categories;
}

export async function getCategorySummaryBySlug(slug) {
  const categories = await getCategorySummaries();
  return getCategoryBySlug(categories, slug);
}

export async function getCategoryPageSnapshot(slug) {
  const storefront = await getStorefrontSnapshot();
  return buildCategoryPageSnapshot(storefront.products, storefront.categories, slug);
}

export async function getProductBySlug(slug) {
  const client = await createSupabaseServerClient();

  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from("products")
    .select("id, name, slug, short_description, description, base_price, compare_at_price, currency, featured, category, seo_title, seo_description, brands(name, slug), product_images(storage_path, alt_text, sort_order, is_primary)")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeProduct(data, client);
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
