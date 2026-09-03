import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";

import { useAppSelector } from "../../store/hooks";

import Container from "../Container/Container";

type MenuLink = {
  label: string;
  path: string;
};

type MenuAlign = "left" | "center" | "right";

type NavigationItem = {
  label: string;
  path: string;
  menuAlign?: MenuAlign;

  menu?: {
    types: MenuLink[];
    brands: MenuLink[];
  };
};

const navigation: NavigationItem[] = [
  {
    label: "Shop",
    path: "/shop",
  },

  {
    label: "Skincare",
    path: "/shop?category=skincare",
    menuAlign: "left",

    menu: {
      types: [
        {
          label: "Cleansers",
          path: "/shop?category=skincare&type=cleanser",
        },
        {
          label: "Toners",
          path: "/shop?category=skincare&type=toner",
        },
        {
          label: "Serums",
          path: "/shop?category=skincare&type=serum",
        },
        {
          label: "Moisturizers",
          path: "/shop?category=skincare&type=moisturizer",
        },
        {
          label: "SPF & Sunscreen",
          path: "/shop?category=skincare&type=sunscreen",
        },
      ],

      brands: [
        {
          label: "La Roche-Posay",
          path: "/shop?category=skincare&brand=la-roche-posay",
        },
        {
          label: "CeraVe",
          path: "/shop?category=skincare&brand=cerave",
        },
        {
          label: "Bioderma",
          path: "/shop?category=skincare&brand=bioderma",
        },
        {
          label: "Clinique",
          path: "/shop?category=skincare&brand=clinique",
        },
        {
          label: "Lancôme",
          path: "/shop?category=skincare&brand=lancome",
        },
      ],
    },
  },

  {
    label: "Makeup",
    path: "/shop?category=makeup",
    menuAlign: "center",

    menu: {
      types: [
        {
          label: "Foundation",
          path: "/shop?category=makeup&type=foundation",
        },
        {
          label: "Concealer",
          path: "/shop?category=makeup&type=concealer",
        },
        {
          label: "Blush",
          path: "/shop?category=makeup&type=blush",
        },
        {
          label: "Bronzer",
          path: "/shop?category=makeup&type=bronzer",
        },
        {
          label: "Highlighter",
          path: "/shop?category=makeup&type=highlighter",
        },
        {
          label: "Mascara",
          path: "/shop?category=makeup&type=mascara",
        },
        {
          label: "Eyeshadow",
          path: "/shop?category=makeup&type=eyeshadow",
        },
        {
          label: "Brows",
          path: "/shop?category=makeup&type=brow",
        },
        {
          label: "Lips",
          path: "/shop?category=makeup&type=lips",
        },
      ],

      brands: [
        {
          label: "Dior",
          path: "/shop?category=makeup&brand=dior",
        },
        {
          label: "Yves Saint Laurent",
          path: "/shop?category=makeup&brand=yves-saint-laurent",
        },
        {
          label: "Charlotte Tilbury",
          path: "/shop?category=makeup&brand=charlotte-tilbury",
        },
        {
          label: "Maybelline",
          path: "/shop?category=makeup&brand=maybelline",
        },
        {
          label: "NYX",
          path: "/shop?category=makeup&brand=nyx",
        },
      ],
    },
  },

  {
    label: "Perfume",
    path: "/shop?category=perfume",
    menuAlign: "center",

    menu: {
      types: [
        {
          label: "Eau de Parfum",
          path: "/shop?category=perfume&type=eau-de-parfum",
        },
        {
          label: "Eau de Toilette",
          path: "/shop?category=perfume&type=eau-de-toilette",
        },
        {
          label: "Body Mists",
          path: "/shop?category=perfume&type=body-mist",
        },
      ],

      brands: [
        {
          label: "Dior",
          path: "/shop?category=perfume&brand=dior",
        },
        {
          label: "Chanel",
          path: "/shop?category=perfume&brand=chanel",
        },
        {
          label: "Giorgio Armani",
          path: "/shop?category=perfume&brand=giorgio-armani",
        },
        {
          label: "Yves Saint Laurent",
          path: "/shop?category=perfume&brand=yves-saint-laurent",
        },
        {
          label: "Guerlain",
          path: "/shop?category=perfume&brand=guerlain",
        },
        {
          label: "Victoria's Secret",
          path: "/shop?category=perfume&brand=victorias-secret",
        },
        {
          label: "Tiziana Terenzi",
          path: "/shop?category=perfume&brand=tiziana-terenzi",
        },
      ],
    },
  },

  {
    label: "Hair Care",
    path: "/shop?category=hair-care",
    menuAlign: "right",

    menu: {
      types: [
        {
          label: "Shampoo",
          path: "/shop?category=hair-care&type=shampoo",
        },
        {
          label: "Conditioner",
          path: "/shop?category=hair-care&type=conditioner",
        },
        {
          label: "Hair Masks",
          path: "/shop?category=hair-care&type=mask",
        },
        {
          label: "Hair Oils & Serums",
          path: "/shop?category=hair-care&type=oil",
        },
        {
          label: "Leave-In Care",
          path: "/shop?category=hair-care&type=leave-in",
        },
        {
          label: "Styling",
          path: "/shop?category=hair-care&type=styling",
        },
      ],

      brands: [
        {
          label: "Kérastase",
          path: "/shop?category=hair-care&brand=kerastase",
        },
        {
          label: "Olaplex",
          path: "/shop?category=hair-care&brand=olaplex",
        },
        {
          label: "Pureology",
          path: "/shop?category=hair-care&brand=pureology",
        },
        {
          label: "Moroccanoil",
          path: "/shop?category=hair-care&brand=moroccanoil",
        },
      ],
    },
  },

  {
    label: "Body Care",
    path: "/shop?category=body-care",
    menuAlign: "right",

    menu: {
      types: [
        {
          label: "Body Wash",
          path: "/shop?category=body-care&type=body-wash",
        },
        {
          label: "Body Lotion",
          path: "/shop?category=body-care&type=body-lotion",
        },
        {
          label: "Body Cream",
          path: "/shop?category=body-care&type=body-cream",
        },
        {
          label: "Scrubs & Exfoliators",
          path: "/shop?category=body-care&type=scrub",
        },
        {
          label: "Hand Care",
          path: "/shop?category=body-care&type=hand-care",
        },
        {
          label: "Deodorant",
          path: "/shop?category=body-care&type=deodorant",
        },
      ],

      brands: [
        {
          label: "Sol de Janeiro",
          path: "/shop?category=body-care&brand=sol-de-janeiro",
        },
        {
          label: "L'Occitane",
          path: "/shop?category=body-care&brand=loccitane",
        },
        {
          label: "CeraVe",
          path: "/shop?category=body-care&brand=cerave",
        },
        {
          label: "Nécessaire",
          path: "/shop?category=body-care&brand=necessaire",
        },
      ],
    },
  },
];

const menuPositionClasses = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0",
};

function Header() {
  const navigate = useNavigate();

  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length,
  );

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function openSearch() {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }

  function closeSearch() {
    setIsSearchOpen(false);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(query)}`);

    setIsSearchOpen(false);
    setSearchQuery("");
  }

  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isSearchOpen;

    if (!isOverlayOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, [isSearchOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <Container>
          <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center min-[900px]:flex min-[900px]:h-20 min-[900px]:justify-between min-[900px]:gap-6">
            <button
              className="flex cursor-pointer justify-self-start transition-opacity hover:opacity-60 min-[900px]:hidden"
              type="button"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={22} strokeWidth={1.15} />
            </button>

            <Link
              className="font-display text-[28px] font-medium tracking-[0.08em] min-[900px]:text-[29px] 2xl:text-3xl"
              to="/"
            >
              IVORIA
            </Link>

            <nav
              className="hidden min-[900px]:block"
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-4 xl:gap-5 2xl:gap-7">
                {navigation.map((item) => {
                  const align = item.menuAlign || "center";

                  return (
                    <li className="group relative" key={item.label}>
                      <NavLink
                        className="relative whitespace-nowrap text-[11px] font-normal uppercase tracking-[0.08em] after:absolute after:-bottom-1.5 after:left-0 after:h-[0.5px] after:w-0 after:bg-text-primary after:transition-[width] after:duration-300 hover:after:w-full focus-visible:after:w-full xl:text-[12px] xl:tracking-[0.1em] 2xl:text-[13px] 2xl:tracking-[0.12em]"
                        to={item.path}
                      >
                        {item.label}
                      </NavLink>

                      {item.menu && (
                        <div
                          className={`invisible absolute top-full z-50 w-[540px] pt-6 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100 ${
                            menuPositionClasses[align]
                          }`}
                        >
                          <div className="border border-border bg-background shadow-[0_16px_40px_rgba(31,30,28,0.06)]">
                            <div className="grid grid-cols-[1.35fr_1fr] gap-8 p-6">
                              <div>
                                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                                  Shop by type
                                </p>

                                <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
                                  {item.menu.types.map((link) => (
                                    <li key={link.label}>
                                      <Link
                                        className="text-[13px] leading-5 transition-opacity hover:opacity-55"
                                        to={link.path}
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                                  Featured brands
                                </p>

                                <ul className="flex flex-col gap-3">
                                  {item.menu.brands.map((link) => (
                                    <li key={link.label}>
                                      <Link
                                        className="text-[13px] leading-5 transition-opacity hover:opacity-55"
                                        to={link.path}
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <Link
                              className="group/link flex items-center justify-between border-t border-border px-6 py-4 text-[10px] font-medium uppercase tracking-[0.14em]"
                              to={item.path}
                            >
                              <span>Shop all {item.label}</span>

                              <ArrowRight
                                className="transition-transform duration-300 group-hover/link:translate-x-1"
                                size={16}
                                strokeWidth={1.2}
                              />
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-self-end gap-3 xl:gap-4 2xl:gap-6">
              <button
                className="hidden cursor-pointer transition-opacity hover:opacity-60 min-[900px]:flex"
                type="button"
                aria-label="Search"
                aria-expanded={isSearchOpen}
                onClick={openSearch}
              >
                <Search
                  className="size-5 xl:size-[22px] 2xl:size-[25px]"
                  strokeWidth={1.15}
                />
              </button>

              <Link
                className="hidden transition-opacity hover:opacity-60 min-[900px]:flex"
                to="/account"
                aria-label="Account"
              >
                <UserRound
                  className="size-5 xl:size-[22px] 2xl:size-[25px]"
                  strokeWidth={1.15}
                />
              </Link>

              <Link
                className="relative hidden transition-opacity hover:opacity-60 min-[900px]:flex"
                to="/favorites"
                aria-label={`Favorites (${favoritesCount})`}
              >
                <Heart
                  className="size-5 xl:size-[22px] 2xl:size-[25px]"
                  strokeWidth={1.15}
                />

                {favoritesCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex min-w-4 items-center justify-center rounded-full bg-text-primary px-1 text-[9px] font-medium leading-4 text-white">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              <Link
                className="relative flex transition-opacity hover:opacity-60"
                to="/cart"
                aria-label={`Cart (${cartCount})`}
              >
                <ShoppingBag
                  className="size-[22px] min-[900px]:size-5 xl:size-[22px] 2xl:size-[25px]"
                  strokeWidth={1.15}
                />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex min-w-4 items-center justify-center rounded-full bg-text-primary px-1 text-[9px] font-medium leading-4 text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <div
        className={`fixed inset-x-0 bottom-0 top-[136px] z-30 bg-black/10 transition-opacity min-[900px]:top-[148px] ${
          isSearchOpen
            ? "pointer-events-auto opacity-100 duration-300"
            : "pointer-events-none opacity-0 duration-200"
        }`}
        onClick={closeSearch}
        inert={!isSearchOpen}
      />

      <div
        className={`fixed inset-x-0 top-[72px] z-50 border-b border-border bg-background transition-[opacity,transform] duration-250 min-[900px]:top-20 ${
          isSearchOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center gap-8 min-[900px]:h-[68px]">
            <form
              className="flex flex-1 items-center gap-3 border-b border-text-primary py-2"
              onSubmit={handleSearchSubmit}
            >
              <Search className="shrink-0" size={18} strokeWidth={1.15} />

              <input
                ref={searchInputRef}
                id="header-search"
                name="search"
                className="w-full bg-transparent font-display text-[18px] outline-none placeholder:text-text-secondary/60 md:text-[20px]"
                type="text"
                inputMode="search"
                value={searchQuery}
                placeholder="Search products or brands"
                aria-label="Search products and brands"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </form>

            <button
              className="flex shrink-0 cursor-pointer transition-opacity hover:opacity-60"
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
            >
              <X size={19} strokeWidth={1.15} />
            </button>
          </div>
        </Container>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/20 transition-opacity min-[900px]:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100 duration-[400ms]"
            : "pointer-events-none opacity-0 duration-[250ms]"
        }`}
        onClick={closeMenu}
        inert={!isMenuOpen}
      >
        <div
          className={`h-full w-[85%] bg-background transition-transform min-[480px]:w-1/2 min-[640px]:w-1/3 ${
            isMenuOpen
              ? "translate-x-0 duration-[400ms] ease-out"
              : "-translate-x-full duration-[250ms] ease-in"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
            <Link
              className="font-display text-[27px] font-medium tracking-[0.08em]"
              to="/"
              onClick={closeMenu}
            >
              IVORIA
            </Link>

            <button
              className="cursor-pointer transition-opacity hover:opacity-60"
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X size={22} strokeWidth={1.15} />
            </button>
          </div>

          <div className="px-5">
            <nav className="pt-5" aria-label="Mobile navigation">
              <ul className="flex flex-col">
                {navigation.map((item) => (
                  <li className="border-b border-border" key={item.label}>
                    <NavLink
                      className="block py-3.5 text-[14px] font-normal uppercase tracking-[0.1em] transition-opacity hover:opacity-60"
                      to={item.path}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col gap-4">
              <button
                className="flex cursor-pointer items-center gap-3 text-[12px] uppercase tracking-[0.08em] transition-opacity hover:opacity-60"
                type="button"
                onClick={openSearch}
              >
                <Search size={18} strokeWidth={1.15} />
                Search
              </button>

              <Link
                className="flex items-center gap-3 text-[12px] uppercase tracking-[0.08em] transition-opacity hover:opacity-60"
                to="/account"
                onClick={closeMenu}
              >
                <UserRound size={18} strokeWidth={1.15} />
                Account
              </Link>

              <Link
                className="flex items-center justify-between text-[12px] uppercase tracking-[0.08em] transition-opacity hover:opacity-60"
                to="/favorites"
                onClick={closeMenu}
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} strokeWidth={1.15} />
                  Favorites
                </span>

                {favoritesCount > 0 && (
                  <span className="flex min-w-5 items-center justify-center rounded-full bg-text-primary px-1.5 text-[9px] font-medium leading-5 text-white">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
