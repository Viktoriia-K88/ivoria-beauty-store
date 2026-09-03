import { Heart } from "lucide-react";
import { Link } from "react-router";

import Container from "../../components/Container/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import { clearFavorites } from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

function Favorites() {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites.items);

  const favoritesCount = favorites.length;

  function handleClearFavorites() {
    dispatch(clearFavorites());
  }

  if (favoritesCount === 0) {
    return (
      <main>
        <Container>
          <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-20 text-center min-[900px]:min-h-[calc(100vh-80px)]">
            <Heart
              className="mb-6 text-text-secondary"
              size={34}
              strokeWidth={1}
            />

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
              Favorites
            </p>

            <h1 className="font-display text-4xl font-medium md:text-5xl">
              Your favorites are empty
            </h1>

            <p className="mt-5 max-w-md text-[14px] leading-6 text-text-secondary">
              Save the products you love and find them here whenever you want to
              come back to them.
            </p>

            <Link
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-text-primary px-8 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80"
              to="/shop"
            >
              Explore products
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
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-border pb-6 md:mb-12">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                Saved for later
              </p>

              <h1 className="font-display text-4xl font-medium md:text-5xl">
                Favorites
              </h1>

              <p className="mt-3 text-[13px] text-text-secondary">
                {favoritesCount} {favoritesCount === 1 ? "product" : "products"}
              </p>
            </div>

            <button
              className="cursor-pointer text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary"
              type="button"
              onClick={handleClearFavorites}
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-14">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}

export default Favorites;
