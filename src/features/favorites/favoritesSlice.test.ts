import { describe, expect, it } from "vitest";

import type { Product } from "../../types/product";
import favoritesReducer, {
  clearFavorites,
  toggleFavorite,
} from "./favoritesSlice";

const product: Product = {
  id: "product-1",
  title: "Test Product",
  brand: "Test Brand",
  description: "Test description",
  image: "test-image.jpg",
  images: ["test-image.jpg"],
  price: 50,
  compareAtPrice: null,
  currency: "USD",
  availability: "In stock",
  category: "Skincare",
  gender: null,
  catalogCategory: "skincare",
  size: null,
  shade: null,
};

describe("favoritesSlice", () => {
  it("adds and removes a favorite product", () => {
    let state = favoritesReducer(undefined, toggleFavorite(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("product-1");

    state = favoritesReducer(state, toggleFavorite(product));

    expect(state.items).toHaveLength(0);
  });

  it("clears all favorite products", () => {
    let state = favoritesReducer(undefined, toggleFavorite(product));

    state = favoritesReducer(state, clearFavorites());

    expect(state.items).toHaveLength(0);
  });
});
