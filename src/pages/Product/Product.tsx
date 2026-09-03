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
      <div className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-text-secondary md:mb-10">
        <Link className="transition-opacity hover:opacity-60" to="/shop">
          Shop
        </Link>

        {categoryLabel && (
          <>
            <ChevronRight size={12} strokeWidth={1.2} />

            <Link
              className="transition-opacity hover:opacity-60"
              to={categoryPath}
            >
              {categoryLabel}
            </Link>
          </>
        )}

        <ChevronRight size={12} strokeWidth={1.2} />

        <span className="max-w-[260px] truncate text-text-primary">
          {product.title}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:gap-14 xl:gap-20">
        <div
          className={
            hasMultipleImages
              ? "grid gap-4 md:grid-cols-[80px_minmax(0,1fr)] xl:grid-cols-[96px_minmax(0,1fr)]"
              : "grid"
          }
        >
          {hasMultipleImages && (
            <div className="order-2 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:order-1 md:flex-col md:overflow-visible">
              {galleryImages.slice(0, 6).map((image) => {
                const isActive = image === activeImage;

                return (
                  <button
                    className={`aspect-square w-[72px] shrink-0 cursor-pointer overflow-hidden bg-surface transition-colors md:w-full ${
                      isActive
                        ? "border border-text-primary"
                        : "border border-transparent hover:border-border"
                    }`}
                    type="button"
                    key={image}
                    aria-label="View product image"
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
              className="h-full w-full object-contain p-8 sm:p-12 lg:p-14 xl:p-16"
              src={activeImage}
              alt={product.title}
            />

            {hasDiscount && (
              <span className="absolute left-4 top-4 bg-text-primary px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-white">
                Sale
              </span>
            )}
          </div>
        </div>

        <div className="lg:pt-4 xl:pt-8">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
            {product.brand}
          </p>

          <h1 className="max-w-[560px] font-display text-[42px] leading-[0.98] font-medium tracking-[-0.02em] sm:text-[48px] xl:text-[54px]">
            {product.title}
          </h1>

          <div className="mt-7 flex items-center gap-3">
            <span className="text-[18px] font-medium">
              {formatPrice(product.price, product.currency)}
            </span>

            {hasDiscount && (
              <span className="text-[14px] text-text-secondary line-through">
                {formatPrice(product.compareAtPrice!, product.currency)}
              </span>
            )}
          </div>

          {availability && (
            <div className="mt-5 flex items-center gap-2 text-[12px] text-text-secondary">
              <span
                className={`size-1.5 rounded-full ${
                  availability === "In stock"
                    ? "bg-text-primary"
                    : "bg-text-secondary"
                }`}
              />

              {availability}
            </div>
          )}

          {hasProductMetadata && (
            <div className="mt-7 flex flex-wrap gap-x-12 gap-y-5">
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

          <div className="my-8 border-t border-border" />

          {product.description ? (
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
                Product details
              </p>

              <p className="max-w-[560px] text-[14px] leading-7 text-text-primary/75">
                {product.description}
              </p>
            </div>
          ) : (
            <p className="text-[14px] leading-7 text-text-secondary">
              Additional product information will be available soon.
            </p>
          )}

          <div className="my-8 border-t border-border" />

          <div className="grid grid-cols-2 gap-6 text-[11px]">
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

          <div className="mt-10 border-t border-border pt-8">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
              Quantity
            </p>

            <div className="flex gap-3">
              <div className="flex h-12 shrink-0 items-center border border-border bg-background">
                <button
                  className="flex h-full w-11 cursor-pointer items-center justify-center transition-opacity hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-25"
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity === 1 || isOutOfStock}
                  onClick={decreaseQuantity}
                >
                  <Minus size={15} strokeWidth={1.2} />
                </button>

                <span
                  className="flex w-8 items-center justify-center text-[13px]"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  className="flex h-full w-11 cursor-pointer items-center justify-center transition-opacity hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-25"
                  type="button"
                  aria-label="Increase quantity"
                  disabled={isOutOfStock}
                  onClick={increaseQuantity}
                >
                  <Plus size={15} strokeWidth={1.2} />
                </button>
              </div>

              <button
                className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2.5 bg-text-primary px-5 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={17} strokeWidth={1.15} />

                {isOutOfStock ? "Out of stock" : "Add to bag"}
              </button>

              <button
                className="flex size-12 shrink-0 cursor-pointer items-center justify-center border border-border text-text-primary transition-colors hover:border-text-primary"
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
    <section className="py-8 md:py-10 xl:py-12">
      <Container>
        {isLoading && (
          <>
            <div className="mb-10 h-3 w-[260px] animate-pulse bg-border" />

            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 xl:gap-20">
              <div className="aspect-square animate-pulse bg-sage" />

              <div className="pt-4">
                <div className="h-3 w-24 animate-pulse bg-border" />

                <div className="mt-6 h-12 w-4/5 animate-pulse bg-border" />

                <div className="mt-3 h-12 w-3/5 animate-pulse bg-border" />

                <div className="mt-8 h-5 w-24 animate-pulse bg-border" />

                <div className="mt-10 h-px bg-border" />

                <div className="mt-8 h-4 w-full animate-pulse bg-border" />

                <div className="mt-3 h-4 w-5/6 animate-pulse bg-border" />

                <div className="mt-3 h-4 w-2/3 animate-pulse bg-border" />
              </div>
            </div>
          </>
        )}

        {!isLoading && product && (
          <ProductDetails key={product.id} product={product} />
        )}

        {!isLoading && !product && error && (
          <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
              Product
            </p>

            <h1 className="font-display text-[44px] font-medium">{error}</h1>

            <Link
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
              to="/shop"
            >
              <ArrowLeft size={16} strokeWidth={1.2} />
              Back to shop
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default ProductPage;
