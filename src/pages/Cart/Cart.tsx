import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router";

import Container from "../../components/Container/Container";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

function Cart() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const currency = cartItems[0]?.product.currency || "USD";

  if (cartItems.length === 0) {
    return (
      <main>
        <Container>
          <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-20 text-center min-[900px]:min-h-[calc(100vh-80px)]">
            <ShoppingBag
              className="mb-6 text-text-secondary"
              size={36}
              strokeWidth={1}
            />

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
              Shopping bag
            </p>

            <h1 className="font-display text-4xl font-medium md:text-5xl">
              Your bag is empty
            </h1>

            <p className="mt-5 max-w-md text-[14px] leading-6 text-text-secondary">
              Discover our curated beauty collection and add your favorite
              products to your bag.
            </p>

            <Link
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-text-primary px-8 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80"
              to="/shop"
            >
              Continue shopping
            </Link>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <section className="py-12 md:py-16 xl:py-20">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                Your selection
              </p>

              <h1 className="font-display text-4xl font-medium md:text-5xl">
                Shopping bag
              </h1>

              <p className="mt-3 text-[13px] text-text-secondary">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </p>
            </div>

            <button
              className="cursor-pointer text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary"
              type="button"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-20">
            <div>
              {cartItems.map(({ product, quantity }) => {
                const productPath =
                  `/products/${product.id}` +
                  `?category=${encodeURIComponent(
                    product.catalogCategory || "all",
                  )}`;

                const itemTotal = product.price * quantity;

                return (
                  <article
                    className="grid grid-cols-[110px_minmax(0,1fr)] gap-5 border-b border-border py-6 first:pt-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7"
                    key={product.id}
                  >
                    <Link
                      className="aspect-square overflow-hidden bg-surface"
                      to={productPath}
                      state={{ product }}
                      aria-label={`View ${product.title}`}
                    >
                      <img
                        className="h-full w-full object-contain p-4 sm:p-5"
                        src={product.image}
                        alt={product.title}
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-text-secondary">
                            {product.brand}
                          </p>

                          <Link
                            className="transition-opacity hover:opacity-60"
                            to={productPath}
                            state={{ product }}
                          >
                            <h2 className="font-display text-[20px] leading-6 sm:text-[23px] sm:leading-7">
                              {product.title}
                            </h2>
                          </Link>
                        </div>

                        <button
                          className="flex shrink-0 cursor-pointer items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                          type="button"
                          aria-label={`Remove ${product.title} from cart`}
                          onClick={() => dispatch(removeFromCart(product.id))}
                        >
                          <Trash2 size={20} strokeWidth={1.1} />
                        </button>
                      </div>

                      <p className="mt-3 text-[13px] text-text-secondary">
                        {formatPrice(product.price, product.currency)}
                      </p>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                        <div className="flex h-10 items-center border border-border">
                          <button
                            className="flex h-full w-9 cursor-pointer items-center justify-center transition-opacity hover:opacity-50"
                            type="button"
                            aria-label={`Decrease quantity of ${product.title}`}
                            onClick={() =>
                              dispatch(decreaseQuantity(product.id))
                            }
                          >
                            <Minus size={13} strokeWidth={1.2} />
                          </button>

                          <span
                            className="flex w-8 items-center justify-center text-[12px]"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>

                          <button
                            className="flex h-full w-9 cursor-pointer items-center justify-center transition-opacity hover:opacity-50"
                            type="button"
                            aria-label={`Increase quantity of ${product.title}`}
                            onClick={() =>
                              dispatch(increaseQuantity(product.id))
                            }
                          >
                            <Plus size={13} strokeWidth={1.2} />
                          </button>
                        </div>

                        <p className="text-[14px] font-medium">
                          {formatPrice(itemTotal, product.currency)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="border border-border bg-surface p-6 md:p-8 lg:sticky lg:top-28">
              <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                Order summary
              </p>

              <div className="flex items-center justify-between gap-5 border-b border-border pb-5 text-[13px]">
                <span>Subtotal</span>

                <span className="font-medium">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 border-b border-border py-5 text-[12px] text-text-secondary">
                <span>Shipping</span>

                <span>Calculated at checkout</span>
              </div>

              <div className="flex items-center justify-between gap-5 pt-5">
                <span className="font-display text-[22px]">Total</span>

                <span className="text-[16px] font-medium">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              <p className="mt-2 text-right text-[10px] leading-4 text-text-secondary">
                Shipping and taxes are calculated at checkout.
              </p>

              <Link
                className="mt-7 flex min-h-12 w-full items-center justify-center bg-text-primary px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80"
                to="/checkout"
              >
                Proceed to checkout
              </Link>

              <Link
                className="mt-4 flex w-full items-center justify-center text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary"
                to="/shop"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Cart;
