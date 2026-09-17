import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
      }>,
    ) {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;

        return;
      }

      state.items.push({
        product,
        quantity,
      });
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload,
      );
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (cartItem) => cartItem.product.id === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (cartItem) => cartItem.product.id === action.payload,
      );

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;

        return;
      }

      state.items = state.items.filter(
        (cartItem) => cartItem.product.id !== action.payload,
      );
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
