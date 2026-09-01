import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";

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

function ShopCatalog({
  activeCategory,
  initialSearch,
  activeType,
  activeBrand,
}: ShopCatalogProps) {
  const navigate = useNavigate();

  const sortRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>([]);

  const [total, setTotal] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState(initialSearch);

  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  const [sort, setSort] = useState("featured");

  const [isSortOpen, setIsSortOpen] = useState(false);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const canLoadMore = products.length < total;

  const activeFilterCount = Number(minPrice !== "") + Number(maxPrice !== "");

  const activeSort =
    sortOptions.find((option) => option.value === sort) || sortOptions[0];

  const catalogFilter = activeBrand || activeType;

  const catalogFilterLabel = filterLabels[catalogFilter] || catalogFilter;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
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

        const data = await getProductsPage(
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

        setProducts(data.products);

        setTotal(data.total);
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
    if (!isSortOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSortOpen]);

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
    } catch {
      setError("Unable to load more products.");
    } finally {
      setIsLoadingMore(false);
    }
  }

  function handleSortChange(value: string) {
    setSort(value);
    setIsSortOpen(false);
  }

  function clearSearch() {
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
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <section className="pt-10 pb-14 md:pt-12 md:pb-16 xl:pt-14 xl:pb-20">
      <Container>
        <div className="border-b border-border pb-10 md:pb-12">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            Shop
          </p>

          <h1 className="font-display text-[52px] leading-none font-medium md:text-[64px] xl:text-[72px]">
            {activeCategory.label === "All"
              ? "All beauty"
              : activeCategory.label}
          </h1>

          <p className="mt-5 max-w-[560px] text-[14px] leading-6 text-text-secondary md:text-[15px]">
            Discover a curated selection of beauty essentials across skincare,
            makeup, fragrance, hair and body care.
          </p>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto border-b border-border py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8 min-[900px]:hidden">
          {categories.map((category) => {
            const isActive = activeCategory.value === category.value;

            return (
              <Link
                className={`relative shrink-0 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60 ${
                  isActive
                    ? "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-text-primary"
                    : ""
                }`}
                key={category.value}
                to={category.path}
              >
                {category.label}
              </Link>
            );
          })}
        </div>

        <div className="border-b border-border py-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[450px]">
              <Search
                className="absolute left-0 top-1/2 -translate-y-1/2"
                size={18}
                strokeWidth={1.2}
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
                  <X size={16} strokeWidth={1.2} />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-6 lg:justify-end">
              <button
                className="flex cursor-pointer items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
                type="button"
                aria-expanded={isFiltersOpen}
                onClick={() => setIsFiltersOpen((current) => !current)}
              >
                <SlidersHorizontal size={16} strokeWidth={1.2} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-text-primary text-[9px] text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="relative" ref={sortRef}>
                <button
                  className="flex cursor-pointer items-center gap-2 py-2 text-[11px] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-60"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                  onClick={() => setIsSortOpen((current) => !current)}
                >
                  <span>{activeSort.label}</span>

                  <ChevronDown
                    className={`shrink-0 transition-transform duration-200 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                    size={14}
                    strokeWidth={1.2}
                  />
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+6px)] z-30 w-[220px] origin-top-right border border-border bg-background p-1.5 shadow-[0_12px_30px_rgba(31,30,28,0.08)] transition-[opacity,transform] duration-200 ${
                    isSortOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                  role="listbox"
                  aria-label="Sort products"
                >
                  {sortOptions.map((option) => {
                    const isActive = sort === option.value;

                    return (
                      <button
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.08em] transition-colors hover:bg-sage"
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                      >
                        <span>{option.label}</span>

                        {isActive && (
                          <Check
                            className="shrink-0"
                            size={14}
                            strokeWidth={1.3}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {isFiltersOpen && (
            <div className="mt-6 flex flex-col gap-5 border-t border-border pt-5 sm:flex-row sm:items-end">
              <label className="flex flex-col gap-2" htmlFor="min-price">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Min price
                </span>

                <input
                  id="min-price"
                  name="minPrice"
                  className="w-full border border-border bg-transparent px-3 py-2.5 text-[13px] outline-none transition-colors focus:border-text-primary sm:w-[150px]"
                  type="number"
                  min="0"
                  placeholder="$0"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                />
              </label>

              <label className="flex flex-col gap-2" htmlFor="max-price">
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                  Max price
                </span>

                <input
                  id="max-price"
                  name="maxPrice"
                  className="w-full border border-border bg-transparent px-3 py-2.5 text-[13px] outline-none transition-colors focus:border-text-primary sm:w-[150px]"
                  type="number"
                  min="0"
                  placeholder="$300"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
              </label>

              {activeFilterCount > 0 && (
                <button
                  className="cursor-pointer pb-2.5 text-left text-[10px] font-medium uppercase tracking-[0.12em] underline underline-offset-4 transition-opacity hover:opacity-60"
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex min-h-14 flex-wrap items-center gap-3">
          {!isLoading && (
            <p className="text-[12px] text-text-secondary">
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

              <X size={12} strokeWidth={1.2} />
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div key={index}>
                <div className="aspect-square animate-pulse bg-sage" />

                <div className="mt-4 h-3 w-1/3 animate-pulse bg-border" />

                <div className="mt-3 h-4 w-4/5 animate-pulse bg-border" />

                <div className="mt-3 h-4 w-1/4 animate-pulse bg-border" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[14px] text-text-secondary">{error}</p>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="font-display text-[36px]">No products found</h2>

            <p className="mt-3 text-[14px] text-text-secondary">
              Try another category or filter.
            </p>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-14 flex justify-center md:mt-16">
                <button
                  className="min-w-[170px] cursor-pointer border border-text-primary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:bg-text-primary hover:text-white disabled:cursor-default disabled:opacity-50"
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
          <p className="mt-8 text-center text-[13px] text-text-secondary">
            {error}
          </p>
        )}
      </Container>
    </section>
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
