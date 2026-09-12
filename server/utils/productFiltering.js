import {
  excludedProductIds,
  excludedProductWords,
  maleProductWords,
  nonBeautyWords,
  typeExcludedProductWords,
} from "../config/catalogRules.js";

import {
  containsAny,
  containsAnyWholePhrase,
  normalizeText,
} from "./textUtils.js";

function isValidProduct(product) {
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

function isExcludedProduct(product) {
  return excludedProductIds.includes(String(product.id));
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
  const productText = typeConfig.matchInTitleOnly
    ? product.title
    : `${product.title} ${product.category}`;

  if (!containsAny(productText, typeConfig.keywords)) {
    return false;
  }

  if (
    typeConfig.excludeKeywords &&
    containsAnyWholePhrase(product.title, typeConfig.excludeKeywords)
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

  if (isExcludedProduct(product)) {
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

  if (
    config.excludeKeywords &&
    containsAnyWholePhrase(product.title, config.excludeKeywords)
  ) {
    return false;
  }

  if (containsAny(product.title, excludedProductWords)) {
    return false;
  }

  return isRelevantToCategory(product, config);
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
