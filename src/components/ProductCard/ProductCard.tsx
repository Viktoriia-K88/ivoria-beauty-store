import { Link } from "react-router";

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
  const hasDiscount =
    product.compareAtPrice !== null && product.compareAtPrice > product.price;

  const productPath =
    `/products/${product.id}` +
    `?category=${encodeURIComponent(product.catalogCategory || "all")}`;

  return (
    <Link className="group block" to={productPath} state={{ product }}>
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          className="h-full w-full object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.025] md:p-9 xl:p-10"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />

        {hasDiscount && (
          <span className="absolute left-3 top-3 bg-text-primary px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white">
            Sale
          </span>
        )}
      </div>

      <div className="pt-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-text-secondary">
          {product.brand}
        </p>

        <h3 className="line-clamp-2 min-h-10 text-[14px] leading-5">
          {product.title}
        </h3>

        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="text-[14px] font-medium">
            {formatPrice(product.price, product.currency)}
          </span>

          {hasDiscount && (
            <span className="text-[12px] text-text-secondary line-through">
              {formatPrice(product.compareAtPrice!, product.currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
