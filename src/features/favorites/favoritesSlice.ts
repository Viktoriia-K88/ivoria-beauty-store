import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../types/product";

type FavoritesState = {
  items: Product[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    addFavorite(state, action: PayloadAction<Product>) {
      const exists = state.items.some(
        (product) => product.id === action.payload.id,
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (product) => product.id !== action.payload,
      );
    },

    toggleFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const index = state.items.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        state.items.splice(index, 1);

        return;
      }

      state.items.push(product);
    },

    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
