import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ShoppingBag } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import Container from "../../components/Container/Container";
import { clearCart } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),

  firstName: z.string().min(2, "First name is required."),

  lastName: z.string().min(2, "Last name is required."),

  address: z.string().min(5, "Enter your street address."),

  city: z.string().min(2, "City is required."),

  postalCode: z.string().min(3, "Postal code is required."),

  country: z.string().min(1, "Country is required."),

  phone: z.string().min(7, "Enter a valid phone number."),

  shippingMethod: z.enum(["standard", "express"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const STANDARD_SHIPPING_PRICE = 0;
const EXPRESS_SHIPPING_PRICE = 12;

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

function Checkout() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const currency = cartItems[0]?.product.currency || "USD";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      shippingMethod: "standard",
    },
  });

  const shippingMethod = useWatch({
    control,
    name: "shippingMethod",
  });

  const shippingPrice =
    shippingMethod === "express"
      ? EXPRESS_SHIPPING_PRICE
      : STANDARD_SHIPPING_PRICE;

  const total = subtotal + shippingPrice;

  function onSubmit() {
    dispatch(clearCart());

    setIsOrderPlaced(true);
  }

  if (isOrderPlaced) {
    return (
      <main>
        <Container>
          <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-14 text-center sm:py-16 md:py-20 min-[900px]:min-h-[calc(100vh-80px)]">
            <div className="mb-6 flex size-13 items-center justify-center rounded-full border border-text-primary sm:mb-7 sm:size-14">
              <Check size={24} strokeWidth={1.2} />
            </div>

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
              Order confirmed
            </p>

            <h1 className="max-w-[660px] font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
              Thank you for your order
            </h1>

            <p className="mt-5 max-w-lg text-[13px] leading-6 text-text-secondary sm:text-[14px]">
              Your order has been received. This portfolio checkout simulates
              the complete purchase flow without processing a real payment.
            </p>

            <Link
              className="mt-7 inline-flex min-h-11 items-center justify-center bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 sm:mt-8 sm:min-h-12 sm:px-8 sm:text-[11px]"
              to="/shop"
            >
              Continue shopping
            </Link>
          </section>
        </Container>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main>
        <Container>
          <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-14 text-center sm:py-16 md:py-20 min-[900px]:min-h-[calc(100vh-80px)]">
            <ShoppingBag
              className="mb-5 text-text-secondary sm:mb-6"
              size={34}
              strokeWidth={1}
            />

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
              Checkout
            </p>

            <h1 className="font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
              Your bag is empty
            </h1>

            <p className="mt-5 max-w-md text-[13px] leading-6 text-text-secondary sm:text-[14px]">
              Add products to your bag before continuing to checkout.
            </p>

            <Link
              className="mt-7 inline-flex min-h-11 items-center justify-center bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 sm:mt-8 sm:min-h-12 sm:px-8 sm:text-[11px]"
              to="/shop"
            >
              Explore products
            </Link>
          </section>
        </Container>
      </main>
    );
  }

  const inputClassName =
    "h-11 w-full border border-border bg-background px-3 text-[13px] outline-none transition-colors placeholder:text-text-secondary/60 focus:border-text-primary sm:h-12 sm:px-4";

  const labelClassName =
    "mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary";

  const errorClassName = "mt-1.5 text-[11px] text-accent";

  return (
    <main>
      <Container>
        <section className="py-8 sm:py-10 md:py-14 xl:py-16">
          <Link
            className="mb-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary sm:mb-8"
            to="/cart"
          >
            <ChevronLeft size={15} strokeWidth={1.2} />
            Back to bag
          </Link>

          <div className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-7 md:mb-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
              Secure checkout
            </p>

            <h1 className="font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
              Checkout
            </h1>
          </div>

          <form
            className="grid gap-10 md:gap-12 min-[1100px]:grid-cols-[minmax(0,1fr)_360px] min-[1100px]:items-start min-[1100px]:gap-14 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-20"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="mx-auto w-full max-w-[760px] min-[1100px]:mx-0">
              <section>
                <div className="mb-5 sm:mb-6">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                    01
                  </p>

                  <h2 className="font-display text-[26px] font-medium sm:text-[28px]">
                    Contact
                  </h2>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="email">
                    Email address
                  </label>

                  <input
                    {...register("email")}
                    className={inputClassName}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />

                  {errors.email && (
                    <p className={errorClassName}>{errors.email.message}</p>
                  )}
                </div>
              </section>

              <div className="my-8 border-t border-border sm:my-10" />

              <section>
                <div className="mb-5 sm:mb-6">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                    02
                  </p>

                  <h2 className="font-display text-[26px] font-medium sm:text-[28px]">
                    Shipping address
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label className={labelClassName} htmlFor="firstName">
                      First name
                    </label>

                    <input
                      {...register("firstName")}
                      className={inputClassName}
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                    />

                    {errors.firstName && (
                      <p className={errorClassName}>
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClassName} htmlFor="lastName">
                      Last name
                    </label>

                    <input
                      {...register("lastName")}
                      className={inputClassName}
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                    />

                    {errors.lastName && (
                      <p className={errorClassName}>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClassName} htmlFor="address">
                      Address
                    </label>

                    <input
                      {...register("address")}
                      className={inputClassName}
                      id="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Street and house number"
                    />

                    {errors.address && (
                      <p className={errorClassName}>{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClassName} htmlFor="city">
                      City
                    </label>

                    <input
                      {...register("city")}
                      className={inputClassName}
                      id="city"
                      type="text"
                      autoComplete="address-level2"
                    />

                    {errors.city && (
                      <p className={errorClassName}>{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClassName} htmlFor="postalCode">
                      Postal code
                    </label>

                    <input
                      {...register("postalCode")}
                      className={inputClassName}
                      id="postalCode"
                      type="text"
                      autoComplete="postal-code"
                    />

                    {errors.postalCode && (
                      <p className={errorClassName}>
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={labelClassName} htmlFor="country">
                      Country
                    </label>

                    <select
                      {...register("country")}
                      className={`${inputClassName} cursor-pointer`}
                      id="country"
                      autoComplete="country-name"
                    >
                      <option value="">Select country</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="Poland">Poland</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                    </select>

                    {errors.country && (
                      <p className={errorClassName}>{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClassName} htmlFor="phone">
                      Phone
                    </label>

                    <input
                      {...register("phone")}
                      className={inputClassName}
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+380"
                    />

                    {errors.phone && (
                      <p className={errorClassName}>{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </section>

              <div className="my-8 border-t border-border sm:my-10" />

              <section>
                <div className="mb-5 sm:mb-6">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                    03
                  </p>

                  <h2 className="font-display text-[26px] font-medium sm:text-[28px]">
                    Delivery
                  </h2>
                </div>

                <div className="grid gap-3">
                  <label className="flex cursor-pointer items-center justify-between gap-4 border border-border p-4 transition-colors has-[:checked]:border-text-primary sm:gap-5 sm:p-5">
                    <span className="flex items-center gap-3 sm:gap-4">
                      <input
                        {...register("shippingMethod")}
                        className="size-4 shrink-0 accent-text-primary"
                        type="radio"
                        value="standard"
                      />

                      <span>
                        <span className="block text-[12px] font-medium sm:text-[13px]">
                          Standard delivery
                        </span>

                        <span className="mt-1 block text-[10px] text-text-secondary sm:text-[11px]">
                          3–5 business days
                        </span>
                      </span>
                    </span>

                    <span className="shrink-0 text-[11px] font-medium sm:text-[12px]">
                      Free
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between gap-4 border border-border p-4 transition-colors has-[:checked]:border-text-primary sm:gap-5 sm:p-5">
                    <span className="flex items-center gap-3 sm:gap-4">
                      <input
                        {...register("shippingMethod")}
                        className="size-4 shrink-0 accent-text-primary"
                        type="radio"
                        value="express"
                      />

                      <span>
                        <span className="block text-[12px] font-medium sm:text-[13px]">
                          Express delivery
                        </span>

                        <span className="mt-1 block text-[10px] text-text-secondary sm:text-[11px]">
                          1–2 business days
                        </span>
                      </span>
                    </span>

                    <span className="shrink-0 text-[11px] font-medium sm:text-[12px]">
                      {formatPrice(EXPRESS_SHIPPING_PRICE, currency)}
                    </span>
                  </label>
                </div>
              </section>
            </div>

            <aside className="mx-auto w-full max-w-[620px] border border-border bg-surface p-5 sm:p-6 md:p-8 min-[1100px]:sticky min-[1100px]:top-28 min-[1100px]:mx-0 min-[1100px]:max-w-none">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:mb-6">
                Order summary
              </p>

              <div className="max-h-[280px] space-y-4 overflow-y-auto pr-1 sm:space-y-5">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:gap-4"
                    key={product.id}
                  >
                    <div className="relative aspect-square bg-background">
                      <img
                        className="h-full w-full object-contain p-2"
                        src={product.image}
                        alt={product.title}
                      />

                      <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-text-primary text-[9px] font-medium text-white">
                        {quantity}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                        {product.brand}
                      </p>

                      <p className="line-clamp-2 text-[11px] leading-4 sm:text-[12px] sm:leading-5">
                        {product.title}
                      </p>
                    </div>

                    <span className="text-[11px] font-medium sm:text-[12px]">
                      {formatPrice(product.price * quantity, product.currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-border sm:my-6" />

              <div className="space-y-4 text-[12px]">
                <div className="flex items-center justify-between gap-5">
                  <span className="text-text-secondary">Subtotal</span>

                  <span>{formatPrice(subtotal, currency)}</span>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <span className="text-text-secondary">Shipping</span>

                  <span>
                    {shippingPrice === 0
                      ? "Free"
                      : formatPrice(shippingPrice, currency)}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-border sm:my-6" />

              <div className="flex items-center justify-between gap-5">
                <span className="font-display text-[21px] sm:text-[23px]">
                  Total
                </span>

                <span className="text-[15px] font-medium sm:text-[16px]">
                  {formatPrice(total, currency)}
                </span>
              </div>

              <button
                className="mx-auto mt-6 flex min-h-11 w-full cursor-pointer items-center justify-center bg-text-primary px-5 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 min-[480px]:max-w-[360px] sm:mt-7 sm:min-h-12 sm:px-6 sm:text-[11px] min-[1100px]:max-w-none"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place order"}
              </button>

              <p className="mt-4 text-center text-[10px] leading-4 text-text-secondary">
                This is a portfolio demo. No real payment will be processed.
              </p>
            </aside>
          </form>
        </section>
      </Container>
    </main>
  );
}

export default Checkout;
