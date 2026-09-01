import type { Product } from "../types/product";

export type ProductsPage = {
  products: Product[];
  total: number;
  page: number;
  hasMore: boolean;
};

export type ProductsParams = {
  category?: string;
  type?: string;
  brand?: string;
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
};

type FeaturedProductsResponse = {
  products: Product[];
};

type ProductResponse = {
  product: Product;
};

const API_URL = "http://localhost:3001";

export async function getProductsPage(
  params: ProductsParams = {},
  signal?: AbortSignal,
): Promise<ProductsPage> {
  const searchParams = new URLSearchParams({
    category: params.category || "all",

    page: String(params.page || 1),

    limit: String(params.limit || 8),

    sort: params.sort || "featured",
  });

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.brand) {
    searchParams.set("brand", params.brand);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.minPrice !== null && params.minPrice !== undefined) {
    searchParams.set("minPrice", String(params.minPrice));
  }

  if (params.maxPrice !== null && params.maxPrice !== undefined) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }

  const response = await fetch(
    `${API_URL}/api/products?${searchParams.toString()}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(
  productId: string,
  category = "all",
  signal?: AbortSignal,
): Promise<Product> {
  const searchParams = new URLSearchParams({
    category,
  });

  const response = await fetch(
    `${API_URL}/api/products/${encodeURIComponent(
      productId,
    )}?${searchParams.toString()}`,
    {
      signal,
    },
  );

  if (response.status === 404) {
    throw new Error("Product not found");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: ProductResponse = await response.json();

  return data.product;
}

export async function getFeaturedProducts(
  signal?: AbortSignal,
): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/featured-products`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }

  const data: FeaturedProductsResponse = await response.json();

  return data.products;
}
