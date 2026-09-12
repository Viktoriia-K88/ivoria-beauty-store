import { normalizeText } from "./textUtils.js";

function getComparableProductTitle(product) {
  const normalizedBrand = normalizeText(product.brand);

  let normalizedTitle = normalizeText(product.title);

  if (normalizedBrand && normalizedTitle.startsWith(`${normalizedBrand} `)) {
    normalizedTitle = normalizedTitle.slice(normalizedBrand.length + 1);
  }

  if (product.catalogCategory === "perfume") {
    normalizedTitle = normalizedTitle
      .replace(/\bedp\b/g, "eau de parfum")
      .replace(/\bedt\b/g, "eau de toilette")
      .replace(/\bspray\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return normalizedTitle;
}

export function getProductKey(product) {
  const productTitle = getComparableProductTitle(product);

  const productSize = normalizeText(product.size || "");

  return [normalizeText(product.brand), productTitle, productSize].join(":");
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
