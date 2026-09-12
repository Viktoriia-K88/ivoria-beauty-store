import { normalizeText } from "./textUtils.js";

export function parsePositiveInteger(value, fallback) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export function parsePrice(value) {
  if (value === undefined) {
    return null;
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

export function filterProducts(products, search, minPrice, maxPrice) {
  const normalizedSearch = normalizeText(search);

  return products.filter((product) => {
    const searchableText = normalizeText(
      `${product.brand} ${product.title} ${product.category} ${product.description}`,
    );

    const matchesSearch =
      !normalizedSearch || searchableText.includes(normalizedSearch);

    const matchesMin = minPrice === null || product.price >= minPrice;

    const matchesMax = maxPrice === null || product.price <= maxPrice;

    return matchesSearch && matchesMin && matchesMax;
  });
}

export function sortProducts(products, sort) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}
