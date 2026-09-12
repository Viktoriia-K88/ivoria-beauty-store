import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { getFreshPicks } from "../../services/productsApi";
import type { Product } from "../../types/product";

import Container from "../Container/Container";
import ProductCard from "../ProductCard/ProductCard";

function JustInSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getFreshPicks(controller.signal);

        setProducts(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError("Unable to load products.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className="py-16 md:py-20 xl:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.18em] text-text-secondary">
              New to the edit
            </p>

            <h2 className="font-display text-[44px] leading-none font-medium md:text-[54px] xl:text-[60px]">
              Fresh discoveries
            </h2>
          </div>

          <Link
            className="group hidden items-center gap-2 border-b border-text-primary pb-1 text-[11px] font-medium uppercase tracking-[0.12em] sm:flex"
            to="/shop"
          >
            Explore all
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={16}
              strokeWidth={1.2}
            />
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5 xl:gap-x-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-square animate-pulse bg-sage" />

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
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-5 xl:gap-x-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link
          className="group mt-10 inline-flex items-center gap-2 border-b border-text-primary pb-1 text-[11px] font-medium uppercase tracking-[0.12em] sm:hidden"
          to="/shop"
        >
          Explore all
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

export default JustInSection;
