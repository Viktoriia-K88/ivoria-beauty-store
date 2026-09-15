import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import Container from "../Container/Container";

const questions = [
  {
    question: "What is IVORIA?",
    answer:
      "IVORIA is a considered multi-brand beauty store bringing together skincare, makeup, fragrance, hair care and body care in one curated edit.",
  },
  {
    question: "How is the edit selected?",
    answer:
      "The collection combines established beauty houses with trusted everyday brands, with a focus on products that feel relevant, refined and easy to discover.",
  },
  {
    question: "How can I find the right products?",
    answer:
      "Explore by category, product type or brand, use search and price filters, or browse curated selections across the store.",
  },
  {
    question: "Can I save products for later?",
    answer:
      "Yes. Add products to your favorites from product cards or product pages and return to them whenever you want.",
  },
  {
    question: "How does the shopping bag work?",
    answer:
      "Choose a product, adjust the quantity and add it to your bag. Your shopping bag is saved between visits on the same device.",
  },
  {
    question: "What happens at checkout?",
    answer:
      "At checkout you can review your order, enter delivery details and choose a shipping option before placing the order.",
  },
];

function AboutSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  function toggleItem(index: number) {
    setOpenItems((currentItems) =>
      currentItems.includes(index)
        ? currentItems.filter((item) => item !== index)
        : [...currentItems, index],
    );
  }

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#f7f5f1] py-14 sm:py-16 md:py-20 xl:py-28"
    >
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-text-secondary sm:text-[13px] md:mb-4">
            About IVORIA
          </p>

          <h2 className="font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[64px]">
            Beauty, made simple
          </h2>

          <div className="mx-auto mt-6 max-w-[680px] space-y-4 text-[14px] leading-6 text-text-secondary md:mt-7 md:text-[15px] md:leading-7">
            <p>
              IVORIA is a multi-brand destination for skincare, makeup,
              fragrance, hair care and body care, bringing established beauty
              houses and trusted everyday brands together in one considered
              collection.
            </p>

            <p>
              Designed to make beauty easier to explore, IVORIA helps you
              discover products by category, type and brand, save the ones you
              love and build a routine that feels entirely your own.
            </p>
          </div>
        </div>

        <div
          id="faq"
          className="mt-12 scroll-mt-24 border-t border-text-primary/15 pt-10 sm:mt-14 md:mt-16 md:pt-12 xl:mt-20 xl:pt-14"
        >
          <div className="mb-8 md:mb-10 xl:mb-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
              Good to know
            </p>

            <h3 className="font-display text-[32px] leading-none font-medium sm:text-[36px] md:text-[42px] xl:text-[46px]">
              Questions, answered
            </h3>
          </div>

          <div className="grid items-start gap-3 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:gap-4">
            {questions.map((item, index) => {
              const isOpen = openItems.includes(index);
              const answerId = `about-answer-${index}`;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div className="bg-surface" key={item.question}>
                  <button
                    className="flex min-h-[72px] w-full cursor-pointer items-center gap-3 px-4 py-3 text-left sm:min-h-[76px] sm:px-5"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="w-5 shrink-0 text-[9px] font-medium tracking-[0.12em] text-text-secondary">
                      {number}
                    </span>

                    <h4 className="flex-1 text-[15px] leading-5 font-medium md:text-[16px]">
                      {item.question}
                    </h4>

                    {isOpen ? (
                      <Minus className="shrink-0" size={16} strokeWidth={1.2} />
                    ) : (
                      <Plus className="shrink-0" size={16} strokeWidth={1.2} />
                    )}
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    id={answerId}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-text-primary/10 px-4 py-4 text-[13px] leading-5 text-text-secondary sm:px-5 sm:text-[14px] sm:leading-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
