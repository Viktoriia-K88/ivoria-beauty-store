import {
  categoryConfigs,
  categoryNames,
  featuredBrands,
} from "../config/catalogConfig.js";

import { fetchChannel3Products } from "./channel3Service.js";

import {
  findProductInCache,
  getCachedCatalog,
  mergeIntoCategoryCache,
} from "./cacheService.js";

import {
  getProductKey,
  getUniqueProducts,
  interleaveProducts,
  isBrand,
  isSuitableProduct,
  matchesBrand,
  matchesProductType,
  normalizeProduct,
} from "../utils/productUtils.js";

const MIN_FILTER_RESULTS = 4;

async function buildCategoryCatalog(category) {
  const config = categoryConfigs[category];

  if (!config) {
    return [];
  }

  const productLists = await Promise.all(
    config.baseQueries.map(async (query) => {
      const rawProducts = await fetchChannel3Products(query);

      return rawProducts
        .map((product) => normalizeProduct(product, category))
        .filter((product) => isSuitableProduct(product, config));
    }),
  );

  return interleaveProducts(productLists);
}

export function getCategoryCatalog(category) {
  return getCachedCatalog(`category:${category}`, () =>
    buildCategoryCatalog(category),
  );
}

export async function getTypeCatalog(category, type) {
  const config = categoryConfigs[category];

  const typeConfig = config?.types?.[type];

  if (!config || !typeConfig) {
    return getCategoryCatalog(category);
  }

  const baseProducts = await getCategoryCatalog(category);

  const localProducts = baseProducts.filter((product) =>
    matchesProductType(product, typeConfig),
  );

  if (localProducts.length >= MIN_FILTER_RESULTS) {
    return localProducts;
  }

  const targetedProducts = await getCachedCatalog(
    `type:${category}:${type}`,

    async () => {
      const rawProducts = await fetchChannel3Products(typeConfig.query);

      return rawProducts
        .map((product) => normalizeProduct(product, category))
        .filter((product) => isSuitableProduct(product, config))
        .filter((product) => matchesProductType(product, typeConfig));
    },
  );

  const combinedProducts = getUniqueProducts([
    ...localProducts,
    ...targetedProducts,
  ]);

  mergeIntoCategoryCache(category, targetedProducts);

  return combinedProducts;
}

export async function getBrandCatalog(category, brand) {
  const config = categoryConfigs[category];

  const brandConfig = config?.brands?.[brand];

  if (!config || !brandConfig) {
    return getCategoryCatalog(category);
  }

  const baseProducts = await getCategoryCatalog(category);

  const localProducts = baseProducts.filter((product) =>
    matchesBrand(product, brandConfig.aliases),
  );

  if (localProducts.length >= MIN_FILTER_RESULTS) {
    return localProducts;
  }

  const targetedProducts = await getCachedCatalog(
    `brand:${category}:${brand}`,

    async () => {
      const rawProducts = await fetchChannel3Products(
        `${brandConfig.query} ${config.searchTerm}`,
      );

      return rawProducts
        .map((product) => normalizeProduct(product, category))
        .filter((product) => isSuitableProduct(product, config))
        .filter((product) => matchesBrand(product, brandConfig.aliases));
    },
  );

  const combinedProducts = getUniqueProducts([
    ...localProducts,
    ...targetedProducts,
  ]);

  mergeIntoCategoryCache(category, targetedProducts);

  return combinedProducts;
}

export async function getRequestCatalog(category, type, brand) {
  if (category === "all") {
    return getAllProducts();
  }

  if (brand) {
    const brandProducts = await getBrandCatalog(category, brand);

    if (!type) {
      return brandProducts;
    }

    const typeConfig = categoryConfigs[category]?.types?.[type];

    if (!typeConfig) {
      return brandProducts;
    }

    return brandProducts.filter((product) =>
      matchesProductType(product, typeConfig),
    );
  }

  if (type) {
    return getTypeCatalog(category, type);
  }

  return getCategoryCatalog(category);
}

async function buildAllProducts() {
  const categoryCatalogs = await Promise.all(
    categoryNames.map((category) => getCategoryCatalog(category)),
  );

  return interleaveProducts(categoryCatalogs);
}

export function getAllProducts() {
  return getCachedCatalog("all-products", buildAllProducts);
}

export async function getFeaturedProducts() {
  const allProducts = await getAllProducts();

  const featured = [];

  const usedProducts = new Set();

  for (const brand of featuredBrands) {
    const product = allProducts.find((item) => {
      const key = getProductKey(item);

      return !usedProducts.has(key) && isBrand(item, brand);
    });

    if (!product) {
      continue;
    }

    featured.push(product);

    usedProducts.add(getProductKey(product));

    if (featured.length === 8) {
      return featured;
    }
  }

  for (const product of allProducts) {
    const key = getProductKey(product);

    if (usedProducts.has(key)) {
      continue;
    }

    featured.push(product);

    usedProducts.add(key);

    if (featured.length === 8) {
      break;
    }
  }

  return featured;
}

export async function getProductById(productId, category) {
  const cachedProduct = findProductInCache(productId);

  if (cachedProduct) {
    return cachedProduct;
  }

  if (category && category !== "all" && categoryConfigs[category]) {
    const products = await getCategoryCatalog(category);

    return products.find((product) => product.id === productId) || null;
  }

  const products = await getAllProducts();

  return products.find((product) => product.id === productId) || null;
}
