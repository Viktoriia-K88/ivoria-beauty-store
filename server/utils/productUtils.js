import {
  excludedProductWords,
  maleProductWords,
  nonBeautyWords,
  typeExcludedProductWords,
} from "../config/catalogConfig.js";

export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[®™©]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function containsAny(value, words) {
  const normalizedValue = normalizeText(value);

  return words.some((word) => normalizedValue.includes(normalizeText(word)));
}

export function containsAnyWholePhrase(value, phrases) {
  const normalizedValue = ` ${normalizeText(value)} `;

  return phrases.some((phrase) => {
    const normalizedPhrase = normalizeText(phrase);

    return normalizedValue.includes(` ${normalizedPhrase} `);
  });
}

function getImageUrl(image) {
  return image?.cleaned_url || image?.url || null;
}

function getPreferredImage(images = []) {
  return (
    images.find((image) => image.is_main_image && getImageUrl(image)) ||
    images.find(
      (image) => image.shot_type === "packaging" && getImageUrl(image),
    ) ||
    images.find((image) => image.shot_type === "hero" && getImageUrl(image)) ||
    images.find((image) => getImageUrl(image)) ||
    null
  );
}

function formatSizeValue(value, unit) {
  const numericValue = Number(String(value).replace(",", "."));

  if (Number.isNaN(numericValue)) {
    return null;
  }

  const normalizedUnit = unit
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();

  return `${numericValue} ${normalizedUnit}`;
}

export function extractProductSize(value) {
  const text = String(value ?? "");

  const patterns = [
    /\b(\d+(?:[.,]\d+)?)\s*(ml)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(g)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(kg)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(fl\.?\s*oz)\b/i,
    /\b(\d+(?:[.,]\d+)?)\s*(oz)\b/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match) {
      return formatSizeValue(match[1], match[2]);
    }
  }

  return null;
}

function cleanShadeValue(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

export function extractProductShade(value) {
  const text = String(value ?? "");

  const quotedAfterShade = text.match(
    /\bshade\s*(?:is|:|-)?\s*["'“”]([^"'“”]{1,40})["'“”]/i,
  );

  if (quotedAfterShade) {
    return cleanShadeValue(quotedAfterShade[1]);
  }

  const quotedBeforeShade = text.match(
    /["'“”]([^"'“”]{1,40})["'“”]\s+shade\b/i,
  );

  if (quotedBeforeShade) {
    return cleanShadeValue(quotedBeforeShade[1]);
  }

  const shadeCode = text.match(
    /\b([0-9]+[a-z0-9-]{0,5}|[a-z]+[0-9][a-z0-9-]{0,5})\s+shade\b/i,
  );

  if (shadeCode) {
    return cleanShadeValue(shadeCode[1]);
  }

  const labelledShade = text.match(
    /\bshade\s*[:|-]\s*([a-z0-9][a-z0-9-]*(?:\s+[a-z0-9][a-z0-9-]*){0,2})\b/i,
  );

  if (labelledShade) {
    return cleanShadeValue(labelledShade[1]);
  }

  return null;
}

export function enrichProductMetadata(product) {
  const productText = `${product.title || ""} ${product.description || ""}`;

  return {
    ...product,

    size: product.size || extractProductSize(productText),

    shade: product.shade || extractProductShade(productText),
  };
}

export function normalizeProduct(product, catalogCategory) {
  const images = [
    ...new Set(product.images?.map(getImageUrl).filter(Boolean) || []),
  ];

  const preferredImage = getPreferredImage(product.images);

  const offer =
    product.offers?.find((item) => item.price?.price != null) ||
    product.offers?.[0];

  const normalizedProduct = {
    id: product.id,

    title: product.title || "",

    brand: product.brands?.[0]?.name || "Unknown brand",

    description: product.description || "",

    image: getImageUrl(preferredImage),

    images,

    price: offer?.price?.price ?? null,

    compareAtPrice: offer?.price?.compare_at_price ?? null,

    currency: offer?.price?.currency || "USD",

    availability: offer?.availability || null,

    category: product.category?.title || null,

    gender: product.gender || null,

    catalogCategory,
  };

  return enrichProductMetadata(normalizedProduct);
}

export function isValidProduct(product) {
  return Boolean(
    product.id &&
    product.title &&
    product.brand &&
    product.image &&
    typeof product.price === "number" &&
    product.price > 0,
  );
}

export function isAllowedBrand(product, allowedBrands) {
  const productBrand = normalizeText(product.brand);

  return allowedBrands.some((brand) => {
    const allowedBrand = normalizeText(brand);

    return (
      productBrand === allowedBrand ||
      productBrand.startsWith(`${allowedBrand} `) ||
      allowedBrand.startsWith(`${productBrand} `)
    );
  });
}

export function matchesBrand(product, aliases) {
  const productBrand = normalizeText(product.brand);

  return aliases.some((alias) => {
    const expectedBrand = normalizeText(alias);

    return (
      productBrand === expectedBrand ||
      productBrand.startsWith(`${expectedBrand} `) ||
      expectedBrand.startsWith(`${productBrand} `)
    );
  });
}

function isMaleOnlyProduct(product) {
  if (normalizeText(product.gender) === "male") {
    return true;
  }

  return containsAny(`${product.brand} ${product.title}`, maleProductWords);
}

function isBeautyProduct(product) {
  const productText = `${product.title} ${product.description} ${product.category}`;

  return !containsAny(productText, nonBeautyWords);
}

function isRelevantToCategory(product, config) {
  const productText = `${product.title} ${product.description} ${product.category}`;

  return containsAny(productText, config.keywords);
}

export function matchesProductType(product, typeConfig) {
  const productText = `${product.title} ${product.category}`;

  if (!containsAny(productText, typeConfig.keywords)) {
    return false;
  }

  if (
    typeConfig.excludeKeywords &&
    containsAny(product.title, typeConfig.excludeKeywords)
  ) {
    return false;
  }

  if (containsAnyWholePhrase(product.title, typeExcludedProductWords)) {
    return false;
  }

  return true;
}

export function isSuitableProduct(product, config) {
  if (!isValidProduct(product)) {
    return false;
  }

  if (!isAllowedBrand(product, config.allowedBrands)) {
    return false;
  }

  if (isMaleOnlyProduct(product)) {
    return false;
  }

  if (!isBeautyProduct(product)) {
    return false;
  }

  if (containsAny(product.title, excludedProductWords)) {
    return false;
  }

  return isRelevantToCategory(product, config);
}

export function getProductKey(product) {
  return `${normalizeText(product.brand)}:${normalizeText(product.title)}`;
}

function chooseBetterProduct(currentProduct, newProduct) {
  if (newProduct.price < currentProduct.price) {
    return newProduct;
  }

  if (
    newProduct.price === currentProduct.price &&
    newProduct.images.length > currentProduct.images.length
  ) {
    return newProduct;
  }

  return currentProduct;
}

export function getUniqueProducts(products) {
  const productsByKey = new Map();

  for (const product of products) {
    const key = getProductKey(product);

    const existingProduct = productsByKey.get(key);

    if (!existingProduct) {
      productsByKey.set(key, product);

      continue;
    }

    productsByKey.set(key, chooseBetterProduct(existingProduct, product));
  }

  return [...productsByKey.values()];
}

export function interleaveProducts(productLists) {
  const products = [];

  const longestListLength = Math.max(
    ...productLists.map((list) => list.length),
    0,
  );

  for (let index = 0; index < longestListLength; index += 1) {
    for (const list of productLists) {
      if (list[index]) {
        products.push(list[index]);
      }
    }
  }

  return getUniqueProducts(products);
}

export function isBrand(product, brand) {
  const productBrand = normalizeText(product.brand);

  const expectedBrand = normalizeText(brand);

  return (
    productBrand === expectedBrand ||
    productBrand.startsWith(`${expectedBrand} `) ||
    expectedBrand.startsWith(`${productBrand} `)
  );
}

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
