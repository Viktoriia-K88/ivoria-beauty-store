import Container from "../Container/Container";

const benefits = [
  {
    number: "01",
    label: "Curated selection",
    title: "Beauty worth discovering",
    description:
      "A considered mix of established beauty houses and trusted everyday brands.",
  },
  {
    number: "02",
    label: "Easy to explore",
    title: "Find what fits your routine",
    description:
      "Browse by category, product type or brand and narrow the collection with useful filters.",
  },
  {
    number: "03",
    label: "Save your favorites",
    title: "Keep the products you love",
    description:
      "Save your beauty finds and return to them whenever you are ready.",
  },
  {
    number: "04",
    label: "Simple shopping",
    title: "From discovery to checkout",
    description:
      "Build your bag, adjust quantities and move through checkout with ease.",
  },
];

function WhyIvoriaSection() {
  return (
    <section className="bg-[#f3ebe2] py-12 sm:py-14 md:py-20 xl:py-28">
      <Container>
        <div className="mb-8 sm:mb-10 md:mb-14 xl:mb-16">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-text-secondary sm:text-[13px] md:mb-4">
            Why IVORIA
          </p>

          <h2 className="max-w-[700px] font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[64px]">
            Designed around the way you shop beauty
          </h2>
        </div>

        <div className="grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              className="border-b border-border py-5 sm:py-6 md:px-6 md:py-7 md:first:pl-0 lg:border-b-0 lg:border-r lg:py-8 lg:last:border-r-0 lg:last:pr-0"
              key={benefit.number}
            >
              <div className="mb-6 flex items-center justify-between sm:mb-7 md:mb-9 lg:mb-10">
                <span className="font-display text-[27px] leading-none text-text-secondary sm:text-[28px] lg:text-[30px]">
                  {benefit.number}
                </span>

                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-secondary sm:text-[10px]">
                  {benefit.label}
                </span>
              </div>

              <h3 className="max-w-[260px] text-[16px] leading-6 font-medium sm:text-[17px] md:text-[18px]">
                {benefit.title}
              </h3>

              <p className="mt-2 max-w-[280px] text-[13px] leading-5 text-text-secondary sm:mt-3 sm:leading-6 md:text-[14px]">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyIvoriaSection;
