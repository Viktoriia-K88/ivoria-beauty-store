import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isChannel3FetchEnabled } from "./channel3Service.js";

import {
  enrichProductMetadata,
  getUniqueProducts,
} from "../utils/productUtils.js";

const CACHE_TTL = 24 * 60 * 60 * 1000;

const currentFilePath = fileURLToPath(import.meta.url);

const currentDirectory = path.dirname(currentFilePath);

const CACHE_DIRECTORY = path.resolve(currentDirectory, "../cache");

const CACHE_FILE = path.join(CACHE_DIRECTORY, "catalog-cache.json");

const catalogCache = new Map();

const catalogPromises = new Map();

let cacheWritePromise = Promise.resolve();

export async function loadPersistentCache() {
  try {
    const fileContent = await fs.readFile(CACHE_FILE, "utf8");

    if (!fileContent.trim()) {
      console.log("Persistent catalog cache is empty");

      return;
    }

    const savedCache = JSON.parse(fileContent);

    const now = Date.now();

    for (const [key, value] of Object.entries(savedCache)) {
      if (
        !value ||
        !Array.isArray(value.products) ||
        typeof value.timestamp !== "number"
      ) {
        continue;
      }

      const isExpired = now - value.timestamp >= CACHE_TTL;

      if (isExpired && isChannel3FetchEnabled()) {
        continue;
      }

      const products = value.products.map((product) =>
        enrichProductMetadata(product),
      );

      catalogCache.set(key, {
        ...value,
        products,
      });
    }

    console.log(`Loaded ${catalogCache.size} cached catalogs`);
  } catch (error) {
    if (error?.code === "ENOENT") {
      console.log("No persistent catalog cache found");

      return;
    }

    console.error("Failed to load catalog cache:", error);
  }
}

function savePersistentCache() {
  cacheWritePromise = cacheWritePromise
    .then(async () => {
      await fs.mkdir(CACHE_DIRECTORY, {
        recursive: true,
      });

      const serializedCache = Object.fromEntries(catalogCache.entries());

      await fs.writeFile(
        CACHE_FILE,
        JSON.stringify(serializedCache, null, 2),
        "utf8",
      );
    })
    .catch((error) => {
      console.error("Failed to save catalog cache:", error);
    });

  return cacheWritePromise;
}

export async function getCachedCatalog(cacheKey, builder) {
  const cached = catalogCache.get(cacheKey);

  if (cached) {
    const isFresh = Date.now() - cached.timestamp < CACHE_TTL;

    if (isFresh || !isChannel3FetchEnabled()) {
      return cached.products;
    }
  }

  if (catalogPromises.has(cacheKey)) {
    return catalogPromises.get(cacheKey);
  }

  const promise = builder();

  catalogPromises.set(cacheKey, promise);

  try {
    const products = await promise;

    if (isChannel3FetchEnabled() || products.length > 0) {
      catalogCache.set(cacheKey, {
        products,
        timestamp: Date.now(),
      });

      await savePersistentCache();
    }

    return products;
  } finally {
    catalogPromises.delete(cacheKey);
  }
}

export function mergeIntoCategoryCache(category, products) {
  if (products.length === 0) {
    return;
  }

  const cacheKey = `category:${category}`;

  const cached = catalogCache.get(cacheKey);

  if (!cached) {
    return;
  }

  const mergedProducts = getUniqueProducts([...cached.products, ...products]);

  const currentProductsJson = JSON.stringify(cached.products);

  const mergedProductsJson = JSON.stringify(mergedProducts);

  if (currentProductsJson === mergedProductsJson) {
    return;
  }

  cached.products = mergedProducts;

  catalogCache.delete("all-products");

  void savePersistentCache();
}

export function findProductInCache(productId) {
  for (const cached of catalogCache.values()) {
    const product = cached.products.find((item) => item.id === productId);

    if (product) {
      return product;
    }
  }

  return null;
}
