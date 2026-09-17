import { Heart } from "lucide-react";
import { Link } from "react-router";

import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((favorite) => favorite.id === product.id),
  );

  const hasDiscount =
    product.compareAtPrice !== null && product.compareAtPrice > product.price;

  const productPath =
    `/products/${product.id}` +
    `?category=${encodeURIComponent(product.catalogCategory || "all")}`;

  function handleFavoriteClick() {
    dispatch(toggleFavorite(product));
  }

  return (
    <article className="group">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Link
          className="block h-full w-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary"
          to={productPath}
          state={{ product }}
          aria-label={`View ${product.title}`}
        >
          <img
            className="h-full w-full object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:p-6 md:p-8 xl:p-10"
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-2 top-2 bg-text-primary px-2 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
            Sale
          </span>
        )}

        <button
          className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-background/90 text-text-primary transition-[transform,background-color] duration-300 hover:scale-105 hover:bg-background focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary sm:right-3 sm:top-3 sm:size-9"
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
            className="size-4 sm:size-[18px]"
            strokeWidth={1.2}
            fill={isFavorite ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="pt-3 sm:pt-4">
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary sm:mb-2 sm:text-[11px]">
          {product.brand}
        </p>

        <Link
          className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          to={productPath}
          state={{ product }}
        >
          <h3 className="line-clamp-2 min-h-10 text-[13px] leading-5 sm:text-[14px]">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-2.5 sm:gap-x-2.5">
          <span className="text-[13px] font-medium sm:text-[14px]">
            {formatPrice(product.price, product.currency)}
          </span>

          {hasDiscount && (
            <span className="text-[11px] text-text-secondary line-through sm:text-[12px]">
              {formatPrice(product.compareAtPrice!, product.currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
