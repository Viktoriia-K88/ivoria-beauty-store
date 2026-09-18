import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import favoritesReducer from "../../features/favorites/favoritesSlice";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

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

function renderProductCard() {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    </Provider>,
  );
}

describe("ProductCard", () => {
  it("renders product information", () => {
    renderProductCard();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Brand")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  it("adds product to favorites", async () => {
    const user = userEvent.setup();

    renderProductCard();

    const favoriteButton = screen.getByRole("button", {
      name: "Add Test Product to favorites",
    });

    expect(favoriteButton).toHaveAttribute("aria-pressed", "false");

    await user.click(favoriteButton);

    expect(
      screen.getByRole("button", {
        name: "Remove Test Product from favorites",
      }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
