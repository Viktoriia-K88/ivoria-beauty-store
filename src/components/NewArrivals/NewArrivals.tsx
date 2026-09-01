import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { getFeaturedProducts } from "../../services/productsApi";
import type { Product } from "../../types/product";

import Container from "../Container/Container";
import ProductCard from "../ProductCard/ProductCard";

function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getFeaturedProducts();

        setProducts(data);
      } catch {
        setError("Unable to load products.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="pb-20 md:pb-24 xl:pb-28">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.18em] text-text-secondary">
              Curated
            </p>

            <h2 className="font-display text-[44px] leading-none font-medium md:text-[54px] xl:text-[60px]">
              The beauty edit
            </h2>
          </div>

          <Link
            className="group hidden items-center gap-2 border-b border-text-primary pb-1 text-[11px] font-medium uppercase tracking-[0.12em] sm:flex"
            to="/shop"
          >
            View all
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={16}
              strokeWidth={1.2}
            />
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[4/5] animate-pulse bg-sage" />

                <div className="mt-4 h-3 w-1/3 animate-pulse bg-border" />

                <div className="mt-3 h-4 w-4/5 animate-pulse bg-border" />

                <div className="mt-3 h-4 w-1/4 animate-pulse bg-border" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <p className="text-[14px] text-text-secondary">{error}</p>
        )}

        {!isLoading && !error && products.length === 0 && (
          <p className="text-[14px] text-text-secondary">
            No products available.
          </p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link
          className="group mt-10 inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[11px] font-medium uppercase tracking-[0.12em] sm:hidden"
          to="/shop"
        >
          View all
          <ArrowRight
            className="transition-transform duration-300 group-hover:translate-x-1"
            size={16}
            strokeWidth={1.2}
          />
        </Link>
      </Container>
    </section>
  );
}

export default NewArrivals;
