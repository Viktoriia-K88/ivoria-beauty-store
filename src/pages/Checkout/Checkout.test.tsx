import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import cartReducer from "../../features/cart/cartSlice";
import type { Product } from "../../types/product";
import Checkout from "./Checkout";

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

function renderCheckout() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },

    preloadedState: {
      cart: {
        items: [
          {
            product,
            quantity: 1,
          },
        ],
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Checkout", () => {
  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();

    renderCheckout();

    await user.click(
      screen.getByRole("button", {
        name: "Place order",
      }),
    );

    expect(await screen.findByText("Email is required.")).toBeInTheDocument();

    expect(screen.getByText("First name is required.")).toBeInTheDocument();

    expect(screen.getByText("Last name is required.")).toBeInTheDocument();

    expect(screen.getByText("Enter your street address.")).toBeInTheDocument();

    expect(screen.getByText("City is required.")).toBeInTheDocument();

    expect(screen.getByText("Postal code is required.")).toBeInTheDocument();

    expect(screen.getByText("Country is required.")).toBeInTheDocument();

    expect(screen.getByText("Enter a valid phone number.")).toBeInTheDocument();
  });
});
