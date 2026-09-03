import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

const STORAGE_KEY = "ivoria-store";

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function loadState(): RootState | undefined {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      return undefined;
    }

    return JSON.parse(savedState) as RootState;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart: state.cart,
        favorites: state.favorites,
      }),
    );
  } catch {
    // Ignore localStorage errors.
  }
});

export type AppDispatch = typeof store.dispatch;
