import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import heroImage from "../../assets/images/hero/hero-beauty.webp";
import Container from "../Container/Container";

function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const progress = Math.min(window.scrollY / 420, 1);

      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-[620px] overflow-hidden md:min-h-[680px] xl:min-h-[720px]">
      <img
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={heroImage}
        alt="Beauty model for IVORIA"
      />

      <Container>
        <div className="relative z-10 flex min-h-[620px] items-center md:min-h-[680px] xl:min-h-[720px]">
          <div
            className="ml-4 max-w-[660px] transition-[opacity,transform] duration-100 ease-linear sm:ml-8 lg:ml-12 xl:ml-14"
            style={{
              opacity: 1 - scrollProgress,
              transform: `translateY(${scrollProgress * 80}px)`,
            }}
          >
            <p className="mb-5 animate-[hero-fade-up_700ms_ease-out_both] text-[14px] font-medium uppercase tracking-[0.22em] text-text-primary/70">
              Curated for you
            </p>

            <h1 className="font-display animate-[hero-fade-up_800ms_100ms_ease-out_both] text-[60px] leading-[0.9] font-medium tracking-[-0.025em] sm:text-[72px] md:text-[82px] xl:text-[98px] 2xl:text-[118px]">
              Beauty, made intentional
            </h1>

            <p className="mt-7 max-w-[500px] animate-[hero-fade-up_800ms_200ms_ease-out_both] text-[15px] leading-7 text-text-primary/75 md:text-[16px]">
              A considered selection of skincare, makeup, fragrance, hair and
              body essentials for your everyday ritual
            </p>

            <Link
              className="group mt-9 inline-flex animate-[hero-fade-up_800ms_300ms_ease-out_both] items-center gap-3 border-b border-text-primary pb-1 text-[12px] font-medium uppercase tracking-[0.14em]"
              to="/shop"
            >
              Explore the collection
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={20}
                strokeWidth={1.2}
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
