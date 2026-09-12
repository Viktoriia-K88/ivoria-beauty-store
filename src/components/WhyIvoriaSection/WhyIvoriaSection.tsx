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
    <section className="bg-[#f3ebe2] py-20 md:py-24 xl:py-28">
      <Container>
        <div className="mb-14 md:mb-16">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            Why IVORIA
          </p>

          <h2 className="max-w-[700px] font-display text-[44px] leading-none font-medium md:text-[56px] xl:text-[64px]">
            Designed around the way you shop beauty
          </h2>
        </div>

        <div className="grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <article
              className="border-b border-border py-7 md:px-6 md:first:pl-0 lg:border-b-0 lg:border-r lg:py-8 lg:last:border-r-0 lg:last:pr-0"
              key={benefit.number}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-[30px] leading-none text-text-secondary">
                  {benefit.number}
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-secondary">
                  {benefit.label}
                </span>
              </div>

              <h3 className="max-w-[260px] text-[17px] leading-6 font-medium md:text-[18px]">
                {benefit.title}
              </h3>

              <p className="mt-4 max-w-[280px] text-[14px] leading-6 text-text-secondary">
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
