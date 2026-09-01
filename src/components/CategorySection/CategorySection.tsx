import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import bodyCareImage from "../../assets/images/categories/body-care.jpg";
import hairCareImage from "../../assets/images/categories/hair-care.jpg";
import makeupImage from "../../assets/images/categories/makeup.jpg";
import perfumeImage from "../../assets/images/categories/perfume.jpg";
import skincareImage from "../../assets/images/categories/skincare.jpg";

import Container from "../Container/Container";

const categories = [
  {
    name: "Skincare",
    image: skincareImage,
    imagePosition: "object-[center_35%]",
    path: "/shop?category=skincare",
  },
  {
    name: "Makeup",
    image: makeupImage,
    imagePosition: "object-center",
    path: "/shop?category=makeup",
  },
  {
    name: "Perfume",
    image: perfumeImage,
    imagePosition: "object-center",
    path: "/shop?category=perfume",
  },
  {
    name: "Hair Care",
    image: hairCareImage,
    imagePosition: "object-center",
    path: "/shop?category=hair-care",
  },
  {
    name: "Body Care",
    image: bodyCareImage,
    imagePosition: "object-center",
    path: "/shop?category=body-care",
  },
];

function CategorySection() {
  const categoriesRef = useRef<HTMLDivElement>(null);

  function scrollCategories(direction: "left" | "right") {
    const container = categoriesRef.current;

    if (!container) {
      return;
    }

    const firstCard = container.firstElementChild as HTMLElement | null;

    if (!firstCard) {
      return;
    }

    const gap = 16;
    const scrollAmount = firstCard.offsetWidth + gap;

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-16 md:py-20 xl:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.18em] text-text-secondary">
              Explore
            </p>

            <h2 className="font-display text-[44px] leading-none font-medium md:text-[54px] xl:text-[60px]">
              Shop by category
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3 xl:hidden">
            <button
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-surface"
              type="button"
              aria-label="Previous categories"
              onClick={() => scrollCategories("left")}
            >
              <ArrowLeft size={19} strokeWidth={1.2} />
            </button>

            <button
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-surface"
              type="button"
              aria-label="Next categories"
              onClick={() => scrollCategories("right")}
            >
              <ArrowRight size={19} strokeWidth={1.2} />
            </button>
          </div>
        </div>

        <div
          ref={categoriesRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 xl:grid xl:grid-cols-5 xl:overflow-visible"
        >
          {categories.map((category) => (
            <Link
              className="group min-w-[78%] snap-start sm:min-w-[46%] md:min-w-[32%] xl:min-w-0"
              key={category.name}
              to={category.path}
            >
              <div className="aspect-[4/5] overflow-hidden bg-sage">
                <img
                  className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${category.imagePosition}`}
                  src={category.image}
                  alt={category.name}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <h3 className="text-[13px] font-normal uppercase tracking-[0.12em]">
                  {category.name}
                </h3>

                <ArrowRight
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                  strokeWidth={1.2}
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategorySection;
