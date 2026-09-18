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
    <section className="relative min-h-[560px] overflow-hidden sm:min-h-[620px] md:min-h-[680px] xl:min-h-[720px]">
      <img
        className="absolute inset-0 h-full w-full object-cover object-[57%_center] min-[520px]:object-[54%_center] sm:object-[55%_center] md:object-center"
        src={heroImage}
        alt="Beauty model for IVORIA"
      />

      <Container>
        <div className="relative z-10 flex min-h-[560px] items-center sm:min-h-[620px] md:min-h-[680px] xl:min-h-[720px]">
          <div
            className="max-w-[155px] transition-[opacity,transform] duration-100 ease-linear min-[360px]:ml-2 min-[360px]:max-w-[175px] min-[520px]:ml-4 min-[520px]:max-w-[215px] sm:ml-8 sm:max-w-[380px] md:max-w-[460px] lg:ml-12 lg:max-w-[500px] xl:ml-14 xl:max-w-[660px]"
            style={{
              opacity: 1 - scrollProgress,
              transform: `translateY(${scrollProgress * 80}px)`,
            }}
          >
            <p className="mb-4 animate-[hero-fade-up_700ms_ease-out_both] text-[9px] font-medium uppercase tracking-[0.16em] text-text-primary/70 min-[360px]:text-[10px] min-[520px]:text-[11px] min-[520px]:tracking-[0.18em] sm:mb-5 sm:text-[14px] sm:tracking-[0.22em]">
              Curated for you
            </p>

            <h1 className="animate-[hero-fade-up_800ms_100ms_ease-out_both] font-display text-[34px] leading-[0.92] font-medium tracking-[-0.025em] min-[360px]:text-[38px] min-[520px]:text-[42px] sm:text-[60px] md:text-[68px] lg:text-[74px] xl:text-[98px] 2xl:text-[118px]">
              Your world of beauty
            </h1>

            <p className="mt-5 max-w-[150px] animate-[hero-fade-up_800ms_200ms_ease-out_both] text-[10px] leading-4 text-text-primary/75 min-[360px]:max-w-[170px] min-[360px]:text-[11px] min-[360px]:leading-5 min-[520px]:max-w-[200px] min-[520px]:text-[12px] sm:mt-6 sm:max-w-[360px] sm:text-[14px] sm:leading-6 md:mt-7 md:max-w-[420px] md:text-[15px] md:leading-7 xl:max-w-[500px] xl:text-[16px]">
              A considered selection of skincare, makeup, fragrance, hair and
              body essentials for your everyday ritual
            </p>

            <Link
              className="group mt-7 inline-flex animate-[hero-fade-up_800ms_300ms_ease-out_both] items-center gap-3 border-b border-text-primary pb-1 text-[9px] font-medium uppercase tracking-[0.12em] min-[360px]:text-[10px] min-[520px]:text-[11px] sm:mt-8 sm:text-[12px] sm:tracking-[0.14em] md:mt-9"
              to="/shop"
            >
              Explore the collection
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={18}
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
