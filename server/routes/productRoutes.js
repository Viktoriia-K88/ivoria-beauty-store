import express from "express";

import { categoryConfigs } from "../config/catalogConfig.js";

import {
  getFeaturedProducts,
  getProductById,
  getRequestCatalog,
} from "../services/catalogService.js";

import {
  filterProducts,
  parsePositiveInteger,
  parsePrice,
  sortProducts,
} from "../utils/productUtils.js";

const router = express.Router();

router.get(
  "/products/:productId",

  async (req, res) => {
    try {
      const category = String(req.query.category || "all");

      const product = await getProductById(req.params.productId, category);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        product,
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);

      res.status(500).json({
        message: "Failed to fetch product",
      });
    }
  },
);

router.get(
  "/products",

  async (req, res) => {
    try {
      const requestedCategory = String(req.query.category || "all");

      const category =
        requestedCategory === "all" || categoryConfigs[requestedCategory]
          ? requestedCategory
          : "all";

      const search = String(req.query.search || "");

      const type = String(req.query.type || "");

      const brand = String(req.query.brand || "");

      const sort = String(req.query.sort || "featured");

      const minPrice = parsePrice(req.query.minPrice);

      const maxPrice = parsePrice(req.query.maxPrice);

      const page = parsePositiveInteger(req.query.page, 1);

      const limit = Math.min(parsePositiveInteger(req.query.limit, 8), 24);

      const catalog = await getRequestCatalog(category, type, brand);

      const filtered = filterProducts(catalog, search, minPrice, maxPrice);

      const sorted = sortProducts(filtered, sort);

      const start = (page - 1) * limit;

      const end = start + limit;

      res.json({
        products: sorted.slice(start, end),

        total: sorted.length,

        page,

        hasMore: end < sorted.length,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);

      res.status(500).json({
        message: "Failed to fetch products",
      });
    }
  },
);

router.get(
  "/featured-products",

  async (req, res) => {
    try {
      const products = await getFeaturedProducts();

      res.json({
        products,
      });
    } catch (error) {
      console.error("Failed to fetch featured products:", error);

      res.status(500).json({
        message: "Failed to fetch featured products",
      });
    }
  },
);

export default router;
