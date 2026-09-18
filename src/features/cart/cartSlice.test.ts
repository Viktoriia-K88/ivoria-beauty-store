import { describe, expect, it } from "vitest";

import type { Product } from "../../types/product";
import cartReducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./cartSlice";

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

describe("cartSlice", () => {
  it("adds a product to the cart", () => {
    const state = cartReducer(
      undefined,
      addToCart({
        product,
      }),
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe("product-1");
    expect(state.items[0].quantity).toBe(1);
  });

  it("increases and decreases product quantity", () => {
    let state = cartReducer(
      undefined,
      addToCart({
        product,
        quantity: 2,
      }),
    );

    state = cartReducer(state, increaseQuantity(product.id));

    expect(state.items[0].quantity).toBe(3);

    state = cartReducer(state, decreaseQuantity(product.id));

    expect(state.items[0].quantity).toBe(2);
  });

  it("removes a product from the cart", () => {
    let state = cartReducer(
      undefined,
      addToCart({
        product,
      }),
    );

    state = cartReducer(state, removeFromCart(product.id));

    expect(state.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    let state = cartReducer(
      undefined,
      addToCart({
        product,
      }),
    );

    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
  });
});
