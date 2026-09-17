import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import {
  Link,
  useNavigate,
  useNavigationType,
  useSearchParams,
} from "react-router";

import Container from "../../components/Container/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProductsPage } from "../../services/productsApi";
import type { Product } from "../../types/product";

const PRODUCTS_PER_PAGE = 8;

type Category = {
  label: string;
  value: string;
  path: string;
};

type ShopCatalogProps = {
  activeCategory: Category;
  initialSearch: string;
  activeType: string;
  activeBrand: string;
};

const categories: Category[] = [
  {
    label: "All",
    value: "all",
    path: "/shop",
  },
  {
    label: "Skincare",
    value: "skincare",
    path: "/shop?category=skincare",
  },
  {
    label: "Makeup",
    value: "makeup",
    path: "/shop?category=makeup",
  },
  {
    label: "Perfume",
    value: "perfume",
    path: "/shop?category=perfume",
  },
  {
    label: "Hair Care",
    value: "hair-care",
    path: "/shop?category=hair-care",
  },
  {
    label: "Body Care",
    value: "body-care",
    path: "/shop?category=body-care",
  },
];

const sortOptions = [
  {
    label: "Featured",
    value: "featured",
  },
  {
    label: "Price: low to high",
    value: "price-asc",
  },
  {
    label: "Price: high to low",
    value: "price-desc",
  },
  {
    label: "Name: A–Z",
    value: "name-asc",
  },
];

const filterLabels: Record<string, string> = {
  cleanser: "Cleansers",
  toner: "Toners",
  serum: "Serums",
  moisturizer: "Moisturizers",
  mask: "Masks",
  sunscreen: "SPF & Sunscreen",

  foundation: "Foundation",
  concealer: "Concealer",
  blush: "Blush",
  bronzer: "Bronzer",
  highlighter: "Highlighter",
  mascara: "Mascara",
  eyeshadow: "Eyeshadow",
  brow: "Brows",
  lips: "Lips",

  "eau-de-parfum": "Eau de Parfum",
  "eau-de-toilette": "Eau de Toilette",
  "body-mist": "Body Mists",

  shampoo: "Shampoo",
  conditioner: "Conditioner",
  oil: "Hair Oils & Serums",
  "leave-in": "Leave-In Care",
  styling: "Styling",

  "body-wash": "Body Wash",
  "body-lotion": "Body Lotion",
  "body-cream": "Body Cream",
  scrub: "Scrubs & Exfoliators",
  "hand-care": "Hand Care",
  deodorant: "Deodorant",

  "la-roche-posay": "La Roche-Posay",
  cerave: "CeraVe",
  bioderma: "Bioderma",
  clinique: "Clinique",
  lancome: "Lancôme",

  dior: "Dior",
  "yves-saint-laurent": "Yves Saint Laurent",
  "charlotte-tilbury": "Charlotte Tilbury",
  maybelline: "Maybelline",
  nyx: "NYX",

  chanel: "Chanel",
  "giorgio-armani": "Giorgio Armani",
  guerlain: "Guerlain",
  "victorias-secret": "Victoria's Secret",
  "tiziana-terenzi": "Tiziana Terenzi",

  kerastase: "Kérastase",
  olaplex: "Olaplex",
  pureology: "Pureology",
  moroccanoil: "Moroccanoil",

  "sol-de-janeiro": "Sol de Janeiro",
  loccitane: "L'Occitane",
  necessaire: "Nécessaire",
};

function buildShopPath(
  category: string,
  {
    search = "",
    type = "",
    brand = "",
  }: {
    search?: string;
    type?: string;
    brand?: string;
  } = {},
) {
  const params = new URLSearchParams();

  if (category !== "all") {
    params.set("category", category);
  }

  if (type) {
    params.set("type", type);
  }

  if (brand) {
    params.set("brand", brand);
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();

  return query ? `/shop?${query}` : "/shop";
}

function getCurrentPageFromUrl() {
  const params = new URLSearchParams(window.location.search);

  const page = Number(params.get("page") || "1");

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function replacePageInUrl(page: number) {
  const url = new URL(window.location.href);

  if (page <= 1) {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", String(page));
  }

  const query = url.searchParams.toString();

  const nextUrl = `${url.pathname}${query ? `?${query}` : ""}${url.hash}`;

  window.history.replaceState(window.history.state, "", nextUrl);
}

function getStoredScrollPosition(key: string) {
  try {
    const value = sessionStorage.getItem(key);

    if (value === null) {
      return null;
    }

    const position = Number(value);

    return Number.isFinite(position) ? position : null;
  } catch {
    return null;
  }
}

function saveScrollPosition(key: string, position: number) {
  try {
    sessionStorage.setItem(key, String(position));
  } catch {
    // Ignore storage errors.
  }
}

function ShopCatalog({
  activeCategory,
  initialSearch,
  activeType,
  activeBrand,
}: ShopCatalogProps) {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const scrollStorageKey = `ivoria-shop-scroll:${activeCategory.value}:${initialSearch}:${activeType}:${activeBrand}`;

  const [initialSavedScrollPosition] = useState<number | null>(() =>
    navigationType === "POP" ? getStoredScrollPosition(scrollStorageKey) : null,
  );

  const savedScrollPositionRef = useRef<number | null>(
    initialSavedScrollPosition,
  );

  const shouldRestoreScrollRef = useRef(initialSavedScrollPosition !== null);

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  const [sort, setSort] = useState("featured");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const canLoadMore = products.length < total;

  const activeFilterCount = Number(minPrice !== "") + Number(maxPrice !== "");

  const catalogFilter = activeBrand || activeType;

  const catalogFilterLabel = filterLabels[catalogFilter] || catalogFilter;

  useEffect(() => {
    function handleScroll() {
      if (shouldRestoreScrollRef.current) {
        return;
      }

      saveScrollPosition(scrollStorageKey, window.scrollY);
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollStorageKey]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextSearch = search.trim();

      setDebouncedSearch((currentSearch) => {
        if (currentSearch !== nextSearch) {
          replacePageInUrl(1);
        }

        return nextSearch;
      });
    }, 400);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError("");
        setProducts([]);
        setTotal(0);
        setCurrentPage(1);

        const requestedPage = getCurrentPageFromUrl();

        const firstPageData = await getProductsPage(
          {
            category: activeCategory.value,
            type: activeType,
            brand: activeBrand,
            page: 1,
            limit: PRODUCTS_PER_PAGE,
            search: debouncedSearch,
            sort,
            minPrice: minPrice === "" ? null : Number(minPrice),
            maxPrice: maxPrice === "" ? null : Number(maxPrice),
          },
          controller.signal,
        );

        const loadedProducts = [...firstPageData.products];

        let loadedPage = 1;

        const maxPage = Math.max(
          1,
          Math.ceil(firstPageData.total / PRODUCTS_PER_PAGE),
        );

        const targetPage = Math.min(requestedPage, maxPage);

        for (let page = 2; page <= targetPage; page += 1) {
          const pageData = await getProductsPage(
            {
              category: activeCategory.value,
              type: activeType,
              brand: activeBrand,
              page,
              limit: PRODUCTS_PER_PAGE,
              search: debouncedSearch,
              sort,
              minPrice: minPrice === "" ? null : Number(minPrice),
              maxPrice: maxPrice === "" ? null : Number(maxPrice),
            },
            controller.signal,
          );

          if (pageData.products.length === 0) {
            break;
          }

          loadedProducts.push(...pageData.products);
          loadedPage = page;
        }

        setProducts(loadedProducts);
        setTotal(firstPageData.total);
        setCurrentPage(loadedPage);

        if (requestedPage !== loadedPage) {
          replacePageInUrl(loadedPage);
        }
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
  }, [
    activeCategory.value,
    activeType,
    activeBrand,
    debouncedSearch,
    sort,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    if (
      isLoading ||
      !shouldRestoreScrollRef.current ||
      savedScrollPositionRef.current === null
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: savedScrollPositionRef.current ?? 0,
        left: 0,
        behavior: "auto",
      });

      shouldRestoreScrollRef.current = false;

      saveScrollPosition(scrollStorageKey, savedScrollPositionRef.current ?? 0);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isLoading, products.length, scrollStorageKey]);

  async function handleLoadMore() {
    if (!canLoadMore || isLoadingMore) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError("");

      const nextPage = currentPage + 1;

      const data = await getProductsPage({
        category: activeCategory.value,
        type: activeType,
        brand: activeBrand,
        page: nextPage,
        limit: PRODUCTS_PER_PAGE,
        search: debouncedSearch,
        sort,
        minPrice: minPrice === "" ? null : Number(minPrice),
        maxPrice: maxPrice === "" ? null : Number(maxPrice),
      });

      setProducts((currentProducts) => [...currentProducts, ...data.products]);

      setCurrentPage(nextPage);
      setTotal(data.total);

      replacePageInUrl(nextPage);
    } catch {
      setError("Unable to load more products.");
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handleSortChange(value: string) {
    if (value !== sort) {
      replacePageInUrl(1);
    }

    setSort(value);
  }

  function handleMinPriceChange(value: string) {
    replacePageInUrl(1);
    setMinPrice(value);
  }

  function handleMaxPriceChange(value: string) {
    replacePageInUrl(1);
    setMaxPrice(value);
  }

  function clearSearch() {
    replacePageInUrl(1);

    setSearch("");
    setDebouncedSearch("");

    if (initialSearch) {
      navigate(
        buildShopPath(activeCategory.value, {
          type: activeType,
          brand: activeBrand,
        }),
        {
          replace: true,
        },
      );
    }
  }

  function clearCatalogFilter() {
    navigate(
      buildShopPath(activeCategory.value, {
        search: search.trim(),
      }),
    );
  }

  function clearFilters() {
    replacePageInUrl(1);

    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <main className="pt-8 pb-14 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 xl:pt-20 xl:pb-24">
      <Container>
        <div className="border-b border-border pb-8 sm:pb-10 md:pb-12">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px] sm:tracking-[0.18em]">
            Shop
          </p>

          <h1 className="font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
            {activeCategory.label === "All"
              ? "All beauty"
              : activeCategory.label}
          </h1>

          <p className="mt-4 max-w-[560px] text-[13px] leading-6 text-text-secondary sm:mt-5 sm:text-[14px] md:text-[15px]">
            Discover a curated selection of beauty essentials across skincare,
            makeup, fragrance, hair and body care.
          </p>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto border-b border-border py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:py-5 md:gap-8 min-[900px]:hidden">
          {categories.map((category) => {
            const isActive = activeCategory.value === category.value;

            return (
              <Link
                className={`relative shrink-0 pb-1 text-[10px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60 sm:text-[11px] ${
                  isActive
                    ? "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-text-primary"
                    : ""
                }`}
                key={category.value}
                to={category.path}
                aria-current={isActive ? "page" : undefined}
              >
                {category.label}
              </Link>
            );
          })}
        </div>

        <div className="border-b border-border py-4 sm:py-5">
          <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[450px]">
              <Search
                className="absolute left-0 top-1/2 -translate-y-1/2"
                size={18}
                strokeWidth={1.2}
                aria-hidden="true"
              />

              <input
                id="shop-search"
                name="search"
                className="w-full border-b border-transparent bg-transparent py-2 pl-7 pr-8 text-[13px] outline-none transition-colors duration-200 placeholder:text-text-secondary focus:border-text-primary"
                type="text"
                inputMode="search"
                value={search}
                placeholder="Search products or brands"
                aria-label="Search products or brands"
                onChange={(event) => setSearch(event.target.value)}
              />

              {search && (
                <button
                  className="absolute right-0 top-1/2 flex -translate-y-1/2 cursor-pointer transition-opacity hover:opacity-60"
                  type="button"
                  aria-label="Clear search"
                  onClick={clearSearch}
                >
                  <X size={16} strokeWidth={1.2} aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 sm:gap-6 lg:justify-end">
              <button
                className="flex shrink-0 cursor-pointer items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60 sm:text-[11px]"
                type="button"
                aria-expanded={isFiltersOpen}
                aria-controls="shop-price-filters"
                onClick={() => setIsFiltersOpen((current) => !current)}
              >
                <SlidersHorizontal
                  size={16}
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-text-primary text-[9px] text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <label className="sr-only" htmlFor="shop-sort">
                  Sort products
                </label>

                <select
                  id="shop-sort"
                  className="cursor-pointer appearance-none bg-transparent py-2 pr-6 text-[10px] font-medium uppercase tracking-[0.1em] outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-text-primary sm:text-[11px]"
                  value={sort}
                  onChange={(event) => handleSortChange(event.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                  size={14}
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {isFiltersOpen && (
            <div
              id="shop-price-filters"
              className="mt-5 flex flex-col gap-4 border-t border-border pt-5 min-[420px]:flex-row min-[420px]:items-end min-[420px]:gap-5 sm:mt-6"
            >
              <label className="flex flex-col gap-2" htmlFor="min-price">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Min price
                </span>

                <input
                  id="min-price"
                  name="minPrice"
                  className="w-full border border-border bg-transparent px-3 py-2.5 text-[13px] outline-none transition-colors focus:border-text-primary min-[420px]:w-[150px]"
                  type="number"
                  min="0"
                  placeholder="$0"
                  value={minPrice}
                  onChange={(event) => handleMinPriceChange(event.target.value)}
                />
              </label>

              <label className="flex flex-col gap-2" htmlFor="max-price">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Max price
                </span>

                <input
                  id="max-price"
                  name="maxPrice"
                  className="w-full border border-border bg-transparent px-3 py-2.5 text-[13px] outline-none transition-colors focus:border-text-primary min-[420px]:w-[150px]"
                  type="number"
                  min="0"
                  placeholder="$300"
                  value={maxPrice}
                  onChange={(event) => handleMaxPriceChange(event.target.value)}
                />
              </label>

              {activeFilterCount > 0 && (
                <button
                  className="cursor-pointer text-left text-[10px] font-medium uppercase tracking-[0.12em] underline underline-offset-4 transition-opacity hover:opacity-60 min-[420px]:pb-2.5"
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex min-h-12 flex-wrap items-center gap-3 sm:min-h-14">
          {!isLoading && (
            <p
              className="text-[11px] text-text-secondary sm:text-[12px]"
              aria-live="polite"
            >
              Showing {products.length} of {total} products
            </p>
          )}

          {!isLoading && catalogFilter && (
            <button
              className="flex cursor-pointer items-center gap-1.5 border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] transition-colors hover:border-text-primary"
              type="button"
              onClick={clearCatalogFilter}
            >
              {catalogFilterLabel}

              <X size={12} strokeWidth={1.2} aria-hidden="true" />
            </button>
          )}
        </div>

        {isLoading && (
          <>
            <p className="sr-only" role="status">
              Loading products...
            </p>

            <div
              className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-12"
              aria-hidden="true"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square animate-pulse bg-sage" />

                  <div className="mt-3 h-3 w-1/3 animate-pulse bg-border sm:mt-4" />

                  <div className="mt-3 h-4 w-4/5 animate-pulse bg-border" />

                  <div className="mt-3 h-4 w-1/4 animate-pulse bg-border" />
                </div>
              ))}
            </div>
          </>
        )}

        {!isLoading && error && products.length === 0 && (
          <div className="py-16 text-center md:py-20" role="alert">
            <p className="text-[13px] text-text-secondary sm:text-[14px]">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="py-16 text-center md:py-20">
            <h2 className="font-display text-[32px] leading-none font-medium sm:text-[36px] md:text-[42px]">
              No products found
            </h2>

            <p className="mt-3 text-[13px] text-text-secondary sm:text-[14px]">
              Try another category or filter.
            </p>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-10 flex justify-center sm:mt-12 md:mt-14 xl:mt-16">
                <button
                  className="min-w-[160px] cursor-pointer border border-text-primary px-6 py-3 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-text-primary hover:text-white disabled:cursor-default disabled:opacity-50 sm:min-w-[170px] sm:px-7 sm:py-3.5 sm:text-[11px]"
                  type="button"
                  disabled={isLoadingMore}
                  onClick={handleLoadMore}
                >
                  {isLoadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}

        {!isLoading && error && products.length > 0 && (
          <p
            className="mt-8 text-center text-[13px] text-text-secondary"
            role="alert"
          >
            {error}
          </p>
        )}
      </Container>
    </main>
  );
}

function Shop() {
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "all";

  const initialSearch = searchParams.get("search") || "";

  const activeType = searchParams.get("type") || "";

  const activeBrand = searchParams.get("brand") || "";

  const activeCategory =
    categories.find((category) => category.value === categoryParam) ||
    categories[0];

  return (
    <ShopCatalog
      key={`${activeCategory.value}:${initialSearch}:${activeType}:${activeBrand}`}
      activeCategory={activeCategory}
      initialSearch={initialSearch}
      activeType={activeType}
      activeBrand={activeBrand}
    />
  );
}

export default Shop;
