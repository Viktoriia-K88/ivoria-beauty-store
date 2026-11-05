import { type SyntheticEvent, useEffect, useRef, useState } from "react";
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

import { useAuth } from "../../context/useAuth";
import { useAppSelector } from "../../store/hooks";

import Container from "../Container/Container";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type MenuLink = {
  label: string;
  path: string;
};

type NavigationItem = {
  label: string;
  path: string;

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
      ],
    },
  },

  {
    label: "Hair Care",
    path: "/shop?category=hair-care",

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

function Header() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length,
  );

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState<string | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const accountPath = user ? "/account" : "/login";
  const accountLabel = user ? "Account" : "Sign in";

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function openSearch() {
    setIsDesktopMenuOpen(null);
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }

  function closeSearch() {
    setIsSearchOpen(false);
  }

  function handleSearchSubmit(event: SyntheticEvent<HTMLFormElement>) {
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
    if (!isSearchOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeSearch();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const closeMenuOnDesktop = () => {
      if (mediaQuery.matches) setIsMenuOpen(false);
    };

    mediaQuery.addEventListener("change", closeMenuOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

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

            <div className="hidden min-[900px]:block">
              <NavigationMenu
                aria-label="Main navigation"
                className="max-w-none"
                align="center"
                value={isDesktopMenuOpen}
                onValueChange={(value) =>
                  setIsDesktopMenuOpen(value == null ? null : String(value))
                }
                delay={75}
                closeDelay={120}
              >
                <NavigationMenuList className="gap-4 xl:gap-5 2xl:gap-7">
                  {navigation.map((item) => (
                    <NavigationMenuItem
                      key={item.label}
                      value={item.label}
                      className="relative"
                    >
                      {item.menu ? (
                        <>
                          <NavigationMenuTrigger className="relative h-auto w-auto cursor-pointer rounded-none bg-transparent p-0 text-[11px] font-normal uppercase tracking-[0.08em] text-text-primary shadow-none outline-none after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-text-primary after:transition-[width] after:duration-300 hover:bg-transparent hover:after:w-full focus:bg-transparent focus-visible:after:w-full focus-visible:ring-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary data-open:bg-transparent data-popup-open:bg-transparent data-open:after:w-full xl:text-[12px] xl:tracking-[0.1em] 2xl:text-[13px] 2xl:tracking-[0.12em]">
                            {item.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="!h-auto !w-[540px] !p-0">
                            <div className="grid grid-cols-[1.35fr_1fr] gap-8 p-6">
                              <div>
                                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                                  Shop by type
                                </p>
                                <ul className="grid grid-cols-2 gap-x-5 gap-y-3">
                                  {item.menu.types.map((link) => (
                                    <li key={link.label}>
                                      <NavigationMenuLink
                                        render={<Link to={link.path} />}
                                        closeOnClick
                                        onClick={() =>
                                          setIsDesktopMenuOpen(null)
                                        }
                                        className="block rounded-none p-0 text-[13px] font-normal leading-5 text-text-primary transition-opacity hover:bg-transparent hover:opacity-55 focus:bg-transparent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                                      >
                                        {link.label}
                                      </NavigationMenuLink>
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
                                      <NavigationMenuLink
                                        render={<Link to={link.path} />}
                                        closeOnClick
                                        onClick={() =>
                                          setIsDesktopMenuOpen(null)
                                        }
                                        className="block rounded-none p-0 text-[13px] font-normal leading-5 text-text-primary transition-opacity hover:bg-transparent hover:opacity-55 focus:bg-transparent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
                                      >
                                        {link.label}
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <NavigationMenuLink
                              render={<Link to={item.path} />}
                              closeOnClick
                              onClick={() => setIsDesktopMenuOpen(null)}
                              className="group/link flex items-center justify-between rounded-none border-t border-border px-6 py-4 text-[10px] font-medium uppercase tracking-[0.14em] text-text-primary hover:bg-transparent focus:bg-transparent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-text-primary"
                            >
                              <span>Shop all {item.label}</span>
                              <ArrowRight
                                className="transition-transform duration-300 group-hover/link:translate-x-1"
                                size={16}
                                strokeWidth={1.2}
                                aria-hidden="true"
                              />
                            </NavigationMenuLink>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavLink
                          className="relative whitespace-nowrap text-[11px] font-normal uppercase tracking-[0.08em] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-text-primary after:transition-[width] after:duration-300 hover:after:w-full focus-visible:after:w-full focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-text-primary xl:text-[12px] xl:tracking-[0.1em] 2xl:text-[13px] 2xl:tracking-[0.12em]"
                          to={item.path}
                          onMouseEnter={() => setIsDesktopMenuOpen(null)}
                          onClick={() => setIsDesktopMenuOpen(null)}
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center justify-self-end gap-3 xl:gap-4 2xl:gap-6">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      className="hidden cursor-pointer transition-opacity hover:opacity-60 min-[900px]:flex"
                      type="button"
                      aria-label="Search"
                      aria-expanded={isSearchOpen}
                      aria-controls="header-search-panel"
                      onClick={openSearch}
                    >
                      <Search
                        className="size-5 xl:size-[22px] 2xl:size-[25px]"
                        strokeWidth={1.15}
                      />
                    </button>
                  }
                />
                <TooltipContent side="bottom">Search</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      className="hidden transition-opacity hover:opacity-60 min-[900px]:flex"
                      to={accountPath}
                      aria-label={accountLabel}
                    >
                      <UserRound
                        className="size-5 xl:size-[22px] 2xl:size-[25px]"
                        strokeWidth={1.15}
                      />
                    </Link>
                  }
                />
                <TooltipContent side="bottom">{accountLabel}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
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
                  }
                />
                <TooltipContent side="bottom">Favorites</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  render={
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
                  }
                />
                <TooltipContent side="bottom">Shopping bag</TooltipContent>
              </Tooltip>
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
        id="header-search-panel"
        className={`fixed inset-x-0 top-[72px] z-50 border-b border-border bg-background transition-[opacity,transform] duration-250 min-[900px]:top-20 ${
          isSearchOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        inert={!isSearchOpen}
      >
        <Container>
          <div className="flex h-16 items-center gap-8 min-[900px]:h-[68px]">
            <form
              className="flex flex-1 items-center border-b border-text-primary py-2"
              onSubmit={handleSearchSubmit}
            >
              <InputGroup className="h-11 rounded-none border-0 bg-transparent shadow-none has-[[data-slot=input-group-control]:focus-visible]:border-0 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                <InputGroupAddon className="pl-0">
                  <Search size={18} strokeWidth={1.15} aria-hidden="true" />
                </InputGroupAddon>

                <InputGroupInput
                  ref={searchInputRef}
                  id="header-search"
                  name="search"
                  className="h-full min-w-0 bg-transparent px-2 font-display text-[18px] placeholder:text-text-secondary/60 focus-visible:outline-none md:text-[20px]"
                  type="text"
                  inputMode="search"
                  value={searchQuery}
                  placeholder="Search products or brands"
                  aria-label="Search products and brands"
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </InputGroup>
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

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-full max-w-none gap-0 border-r-0 bg-background p-0 sm:max-w-none min-[360px]:w-[85%] min-[480px]:w-[60%] min-[700px]:w-[45%] min-[900px]:hidden"
        >
          <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
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

          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8">
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
                aria-controls="header-search-panel"
                onClick={openSearch}
              >
                <Search size={18} strokeWidth={1.15} />
                Search
              </button>

              <Link
                className="flex items-center gap-3 text-[12px] uppercase tracking-[0.08em] transition-opacity hover:opacity-60"
                to={accountPath}
                onClick={closeMenu}
              >
                <UserRound size={18} strokeWidth={1.15} />
                {accountLabel}
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
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Header;
