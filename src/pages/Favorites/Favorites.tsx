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
          <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-14 text-center sm:py-16 md:py-20 min-[900px]:min-h-[calc(100vh-80px)]">
            <Heart
              className="mb-5 text-text-secondary sm:mb-6"
              size={32}
              strokeWidth={1}
              aria-hidden="true"
            />

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
              Favorites
            </p>

            <h1 className="max-w-[620px] font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
              Your favorites are empty
            </h1>

            <p className="mt-5 max-w-md text-[13px] leading-6 text-text-secondary sm:text-[14px]">
              Save the products you love and find them here whenever you want to
              come back to them.
            </p>

            <Link
              className="mt-7 inline-flex min-h-11 items-center justify-center bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary sm:mt-8 sm:min-h-12 sm:px-8 sm:text-[11px]"
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
        <section className="py-10 sm:py-12 md:py-16 xl:py-20">
          <div className="mb-8 flex flex-col items-start gap-5 border-b border-border pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:mb-12">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
                Saved for later
              </p>

              <h1 className="font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
                Favorites
              </h1>

              <p className="mt-3 text-[12px] text-text-secondary sm:text-[13px]">
                {favoritesCount} {favoritesCount === 1 ? "product" : "products"}
              </p>
            </div>

            <button
              className="cursor-pointer text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary"
              type="button"
              onClick={handleClearFavorites}
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
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
