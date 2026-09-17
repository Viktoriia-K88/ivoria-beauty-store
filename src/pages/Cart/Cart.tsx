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
          <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-14 text-center sm:py-16 md:py-20 min-[900px]:min-h-[calc(100vh-80px)]">
            <ShoppingBag
              className="mb-5 text-text-secondary sm:mb-6"
              size={34}
              strokeWidth={1}
              aria-hidden="true"
            />

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
              Shopping bag
            </p>

            <h1 className="max-w-[620px] font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
              Your bag is empty
            </h1>

            <p className="mt-5 max-w-md text-[13px] leading-6 text-text-secondary sm:text-[14px]">
              Discover our curated beauty collection and add your favorite
              products to your bag.
            </p>

            <Link
              className="mt-7 inline-flex min-h-11 items-center justify-center bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary sm:mt-8 sm:min-h-12 sm:px-8 sm:text-[11px]"
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
        <section className="py-10 sm:py-12 md:py-16 xl:py-20">
          <div className="mb-8 flex flex-col items-start gap-5 border-b border-border pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:mb-12">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
                Your selection
              </p>

              <h1 className="font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
                Shopping bag
              </h1>

              <p
                className="mt-3 text-[12px] text-text-secondary sm:text-[13px]"
                aria-live="polite"
              >
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </p>
            </div>

            <button
              className="cursor-pointer text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary"
              type="button"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
          </div>

          <div className="grid gap-10 md:gap-12 min-[1100px]:grid-cols-[minmax(0,1fr)_340px] min-[1100px]:items-start min-[1100px]:gap-14 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-20">
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
                    className="grid grid-cols-[90px_minmax(0,1fr)] gap-4 border-b border-border py-5 first:pt-0 min-[420px]:grid-cols-[110px_minmax(0,1fr)] min-[420px]:gap-5 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6 sm:py-6 md:grid-cols-[150px_minmax(0,1fr)] md:gap-7"
                    key={product.id}
                  >
                    <Link
                      className="aspect-square overflow-hidden bg-surface focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                      to={productPath}
                      state={{ product }}
                      aria-label={`View ${product.title}`}
                    >
                      <img
                        className="h-full w-full object-contain p-3 sm:p-4 md:p-5"
                        src={product.image}
                        alt={product.title}
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="min-w-0">
                          <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-text-secondary sm:mb-2 sm:text-[10px]">
                            {product.brand}
                          </p>

                          <Link
                            className="transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                            to={productPath}
                            state={{ product }}
                          >
                            <h2 className="font-display text-[17px] leading-5 min-[420px]:text-[18px] sm:text-[20px] sm:leading-6 md:text-[23px] md:leading-7">
                              {product.title}
                            </h2>
                          </Link>
                        </div>

                        <button
                          className="flex shrink-0 cursor-pointer items-center justify-center text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary"
                          type="button"
                          aria-label={`Remove ${product.title} from cart`}
                          onClick={() => dispatch(removeFromCart(product.id))}
                        >
                          <Trash2
                            className="size-[17px] sm:size-5"
                            strokeWidth={1.1}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      <p className="mt-2 text-[12px] text-text-secondary sm:mt-3 sm:text-[13px]">
                        {formatPrice(product.price, product.currency)}
                      </p>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4 sm:gap-4 sm:pt-5">
                        <div className="flex h-9 items-center border border-border sm:h-10">
                          <button
                            className="flex h-full w-8 cursor-pointer items-center justify-center transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary sm:w-9"
                            type="button"
                            aria-label={`Decrease quantity of ${product.title}`}
                            onClick={() =>
                              dispatch(decreaseQuantity(product.id))
                            }
                          >
                            <Minus
                              size={13}
                              strokeWidth={1.2}
                              aria-hidden="true"
                            />
                          </button>

                          <span
                            className="flex w-7 items-center justify-center text-[11px] sm:w-8 sm:text-[12px]"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>

                          <button
                            className="flex h-full w-8 cursor-pointer items-center justify-center transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary sm:w-9"
                            type="button"
                            aria-label={`Increase quantity of ${product.title}`}
                            onClick={() =>
                              dispatch(increaseQuantity(product.id))
                            }
                          >
                            <Plus
                              size={13}
                              strokeWidth={1.2}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <p className="text-[13px] font-medium sm:text-[14px]">
                          {formatPrice(itemTotal, product.currency)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="mx-auto w-full max-w-[620px] border border-border bg-surface p-5 sm:p-6 md:p-8 min-[1100px]:sticky min-[1100px]:top-28 min-[1100px]:mx-0 min-[1100px]:max-w-none">
              <h2 className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:mb-6">
                Order summary
              </h2>

              <div className="flex items-center justify-between gap-5 border-b border-border pb-5 text-[13px]">
                <span>Subtotal</span>

                <span className="font-medium">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 border-b border-border py-5 text-[11px] text-text-secondary sm:text-[12px]">
                <span>Shipping</span>

                <span className="text-right">Calculated at checkout</span>
              </div>

              <div className="flex items-center justify-between gap-5 pt-5">
                <span className="font-display text-[20px] sm:text-[22px]">
                  Total
                </span>

                <span className="text-[15px] font-medium sm:text-[16px]">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              <p className="mt-2 text-right text-[10px] leading-4 text-text-secondary">
                Shipping and taxes are calculated at checkout.
              </p>

              <Link
                className="mx-auto mt-6 flex min-h-11 w-full items-center justify-center bg-text-primary px-5 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary min-[480px]:max-w-[360px] sm:mt-7 sm:min-h-12 sm:px-6 sm:text-[11px] min-[1100px]:max-w-none"
                to="/checkout"
              >
                Proceed to checkout
              </Link>

              <Link
                className="mt-4 flex w-full items-center justify-center text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary"
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
