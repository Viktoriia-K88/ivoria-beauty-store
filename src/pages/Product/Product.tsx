import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { Link, useLocation, useParams, useSearchParams } from "react-router";

import Container from "../../components/Container/Container";
import { addToCart } from "../../features/cart/cartSlice";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { getProductById } from "../../services/productsApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Product } from "../../types/product";

type ProductLocationState = {
  product?: Product;
};

const categoryLabels: Record<string, string> = {
  skincare: "Skincare",
  makeup: "Makeup",
  perfume: "Perfume",
  "hair-care": "Hair Care",
  "body-care": "Body Care",
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

function getAvailabilityLabel(availability: string | null) {
  if (!availability) {
    return null;
  }

  const normalizedAvailability = availability.toLowerCase().replace(/\s+/g, "");

  if (normalizedAvailability.includes("instock")) {
    return "In stock";
  }

  if (normalizedAvailability.includes("outofstock")) {
    return "Out of stock";
  }

  return availability;
}

function ProductDetails({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const galleryImages = [...new Set([product.image, ...product.images])].filter(
    Boolean,
  );

  const hasMultipleImages = galleryImages.length > 1;

  const [activeImage, setActiveImage] = useState(
    galleryImages[0] || product.image,
  );

  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((favorite) => favorite.id === product.id),
  );

  const cartQuantity = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0,
  );

  const hasDiscount =
    product.compareAtPrice !== null && product.compareAtPrice > product.price;

  const availability = getAvailabilityLabel(product.availability);

  const isOutOfStock = availability === "Out of stock";

  const category =
    product.catalogCategory && product.catalogCategory !== "all"
      ? product.catalogCategory
      : null;

  const categoryLabel = category ? categoryLabels[category] : null;

  const categoryPath = category ? `/shop?category=${category}` : "/shop";

  const hasProductMetadata = Boolean(product.size || product.shade);

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  function handleAddToCart() {
    if (isOutOfStock) {
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity,
      }),
    );

    setQuantity(1);
  }

  function handleFavoriteClick() {
    dispatch(toggleFavorite(product));
  }

  return (
    <>
      <nav
        className="mb-6 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-text-secondary sm:mb-8 sm:gap-2 sm:text-[11px] md:mb-10"
        aria-label="Breadcrumb"
      >
        <Link
          className="transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          to="/shop"
        >
          Shop
        </Link>

        {categoryLabel && (
          <>
            <ChevronRight size={12} strokeWidth={1.2} aria-hidden="true" />

            <Link
              className="transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
              to={categoryPath}
            >
              {categoryLabel}
            </Link>
          </>
        )}

        <ChevronRight size={12} strokeWidth={1.2} aria-hidden="true" />

        <span
          className="max-w-[150px] truncate text-text-primary sm:max-w-[260px]"
          aria-current="page"
        >
          {product.title}
        </span>
      </nav>

      <div className="grid gap-8 md:gap-10 min-[1200px]:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] min-[1200px]:gap-14 xl:gap-20">
        <div
          className={`mx-auto w-full max-w-[760px] min-[1200px]:mx-0 min-[1200px]:max-w-none ${
            hasMultipleImages
              ? "grid gap-3 sm:gap-4 md:grid-cols-[80px_minmax(0,1fr)] xl:grid-cols-[96px_minmax(0,1fr)]"
              : "grid"
          }`}
        >
          {hasMultipleImages && (
            <div className="order-2 flex gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3 md:order-1 md:flex-col md:overflow-visible">
              {galleryImages.slice(0, 6).map((image, index) => {
                const isActive = image === activeImage;

                return (
                  <button
                    className={`aspect-square w-[64px] shrink-0 cursor-pointer overflow-hidden bg-surface transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary sm:w-[72px] md:w-full ${
                      isActive
                        ? "border border-text-primary"
                        : "border border-transparent hover:border-border"
                    }`}
                    type="button"
                    key={image}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveImage(image)}
                  >
                    <img
                      className="h-full w-full object-contain p-2"
                      src={image}
                      alt=""
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div
            className={`relative aspect-square overflow-hidden bg-surface ${
              hasMultipleImages ? "order-1 md:order-2" : ""
            }`}
          >
            <img
              className="h-full w-full object-contain p-6 sm:p-10 md:p-12 min-[1200px]:p-14 xl:p-16"
              src={activeImage}
              alt={product.title}
            />

            {hasDiscount && (
              <span className="absolute left-3 top-3 bg-text-primary px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-white sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
                Sale
              </span>
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[680px] min-[1200px]:mx-0 min-[1200px]:max-w-none min-[1200px]:pt-4 xl:pt-8">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:mb-4 sm:text-[11px]">
            {product.brand}
          </p>

          <h1 className="max-w-[560px] font-display text-[34px] leading-[0.98] font-medium tracking-[-0.02em] sm:text-[40px] md:text-[46px] min-[1200px]:text-[42px] xl:text-[52px]">
            {product.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
            <span className="text-[16px] font-medium sm:text-[18px]">
              {formatPrice(product.price, product.currency)}
            </span>

            {hasDiscount && (
              <span className="text-[13px] text-text-secondary line-through sm:text-[14px]">
                {formatPrice(product.compareAtPrice!, product.currency)}
              </span>
            )}
          </div>

          {availability && (
            <div className="mt-4 flex items-center gap-2 text-[11px] text-text-secondary sm:mt-5 sm:text-[12px]">
              <span
                className={`size-1.5 rounded-full ${
                  availability === "In stock"
                    ? "bg-text-primary"
                    : "bg-text-secondary"
                }`}
                aria-hidden="true"
              />

              {availability}
            </div>
          )}

          {hasProductMetadata && (
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 sm:mt-7 sm:gap-x-12 sm:gap-y-5">
              {product.size && (
                <div>
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
                    Size
                  </p>

                  <p className="text-[13px]">{product.size}</p>
                </div>
              )}

              {product.shade && (
                <div>
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
                    Shade
                  </p>

                  <p className="text-[13px]">{product.shade}</p>
                </div>
              )}
            </div>
          )}

          <div className="my-6 border-t border-border sm:my-8" />

          {product.description ? (
            <div>
              <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
                Product details
              </h2>

              <p className="max-w-[560px] text-[13px] leading-6 text-text-primary/75 sm:text-[14px] sm:leading-7">
                {product.description}
              </p>
            </div>
          ) : (
            <p className="text-[13px] leading-6 text-text-secondary sm:text-[14px] sm:leading-7">
              Additional product information will be available soon.
            </p>
          )}

          <div className="my-6 border-t border-border sm:my-8" />

          <div className="grid grid-cols-2 gap-5 text-[10px] sm:gap-6 sm:text-[11px]">
            <div>
              <p className="mb-1.5 uppercase tracking-[0.12em] text-text-secondary">
                Brand
              </p>

              <p>{product.brand}</p>
            </div>

            {categoryLabel && (
              <div>
                <p className="mb-1.5 uppercase tracking-[0.12em] text-text-secondary">
                  Category
                </p>

                <p>{categoryLabel}</p>
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-border pt-6 sm:mt-10 sm:pt-8">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
              Quantity
            </p>

            <div className="grid grid-cols-[1fr_auto] gap-3 min-[480px]:grid-cols-[auto_minmax(220px,320px)_auto] min-[480px]:justify-start min-[1200px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1200px]:justify-stretch">
              <div className="col-start-1 row-start-1 flex h-12 w-fit shrink-0 items-center border border-border bg-background">
                <button
                  className="flex h-full w-10 cursor-pointer items-center justify-center transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-25 sm:w-11"
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity === 1 || isOutOfStock}
                  onClick={decreaseQuantity}
                >
                  <Minus size={15} strokeWidth={1.2} aria-hidden="true" />
                </button>

                <span
                  className="flex w-8 items-center justify-center text-[13px]"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  className="flex h-full w-10 cursor-pointer items-center justify-center transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-25 sm:w-11"
                  type="button"
                  aria-label="Increase quantity"
                  disabled={isOutOfStock}
                  onClick={increaseQuantity}
                >
                  <Plus size={15} strokeWidth={1.2} aria-hidden="true" />
                </button>
              </div>

              <button
                className="col-span-2 row-start-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 bg-text-primary px-5 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:cursor-not-allowed disabled:opacity-40 min-[480px]:col-span-1 min-[480px]:col-start-2 min-[480px]:row-start-1 sm:text-[11px]"
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={17} strokeWidth={1.15} aria-hidden="true" />

                {isOutOfStock ? "Out of stock" : "Add to bag"}
              </button>

              <button
                className="col-start-2 row-start-1 flex size-12 shrink-0 cursor-pointer items-center justify-center border border-border text-text-primary transition-colors hover:border-text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary min-[480px]:col-start-3"
                type="button"
                aria-label={
                  isFavorite
                    ? `Remove ${product.title} from favorites`
                    : `Add ${product.title} to favorites`
                }
                aria-pressed={isFavorite}
                onClick={handleFavoriteClick}
              >
                <Heart
                  size={19}
                  strokeWidth={1.15}
                  fill={isFavorite ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>
            </div>

            {cartQuantity > 0 && (
              <p
                className="mt-3 text-[11px] text-text-secondary"
                aria-live="polite"
              >
                {cartQuantity} {cartQuantity === 1 ? "item" : "items"} in your
                bag
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ProductPage() {
  const { productId } = useParams();

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const locationState = location.state as ProductLocationState | null;

  const stateProduct = locationState?.product;

  const initialProduct: Product | null =
    stateProduct && stateProduct.id === productId ? stateProduct : null;

  const category =
    searchParams.get("category") || initialProduct?.catalogCategory || "all";

  const [product, setProduct] = useState<Product | null>(initialProduct);

  const [isLoading, setIsLoading] = useState(!initialProduct);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId || initialProduct) {
      return;
    }

    const currentProductId = productId;

    const controller = new AbortController();

    async function loadProduct() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProductById(
          currentProductId,
          category,
          controller.signal,
        );

        setProduct(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error && error.message === "Product not found"
            ? "Product not found."
            : "Unable to load this product.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      controller.abort();
    };
  }, [productId, category, initialProduct]);

  return (
    <main className="py-6 sm:py-8 md:py-10 xl:py-12">
      <Container>
        {isLoading && (
          <>
            <p className="sr-only" role="status">
              Loading product...
            </p>

            <div aria-hidden="true">
              <div className="mb-8 h-3 w-[180px] animate-pulse bg-border sm:mb-10 sm:w-[260px]" />

              <div className="grid gap-8 md:gap-10 min-[1200px]:grid-cols-[1.25fr_0.75fr] min-[1200px]:gap-14 xl:gap-20">
                <div className="mx-auto aspect-square w-full max-w-[760px] animate-pulse bg-sage min-[1200px]:mx-0 min-[1200px]:max-w-none" />

                <div className="mx-auto w-full max-w-[680px] pt-2 sm:pt-4 min-[1200px]:mx-0 min-[1200px]:max-w-none">
                  <div className="h-3 w-24 animate-pulse bg-border" />

                  <div className="mt-5 h-10 w-4/5 animate-pulse bg-border sm:mt-6 sm:h-12" />

                  <div className="mt-3 h-10 w-3/5 animate-pulse bg-border sm:h-12" />

                  <div className="mt-6 h-5 w-24 animate-pulse bg-border sm:mt-8" />

                  <div className="mt-8 h-px bg-border sm:mt-10" />

                  <div className="mt-6 h-4 w-full animate-pulse bg-border sm:mt-8" />

                  <div className="mt-3 h-4 w-5/6 animate-pulse bg-border" />

                  <div className="mt-3 h-4 w-2/3 animate-pulse bg-border" />
                </div>
              </div>
            </div>
          </>
        )}

        {!isLoading && product && (
          <ProductDetails key={product.id} product={product} />
        )}

        {!isLoading && !product && error && (
          <div
            className="flex min-h-[360px] flex-col items-center justify-center py-12 text-center sm:min-h-[420px] md:min-h-[480px]"
            role="alert"
          >
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
              Product
            </p>

            <h1 className="font-display text-[34px] leading-none font-medium sm:text-[40px] md:text-[44px]">
              {error}
            </h1>

            <Link
              className="mt-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary sm:mt-8 sm:text-[11px]"
              to="/shop"
            >
              <ArrowLeft size={16} strokeWidth={1.2} aria-hidden="true" />
              Back to shop
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}

export default ProductPage;
