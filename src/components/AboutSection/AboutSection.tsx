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
    <section className="bg-[#f7f5f1] py-20 md:py-24 xl:py-28">
      <Container>
        <div className="mx-auto max-w-[820px] text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-text-secondary">
            About IVORIA
          </p>

          <h2 className="font-display text-[48px] leading-[0.95] font-medium md:text-[62px] xl:text-[72px]">
            Beauty, made simple
          </h2>

          <div className="mx-auto mt-7 max-w-[680px] space-y-4 text-[15px] leading-7 text-text-secondary md:text-[16px]">
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

        <div className="mt-16 border-t border-text-primary/15 pt-12 md:mt-20 md:pt-14">
          <div className="mb-10 md:mb-12">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary">
              Good to know
            </p>

            <h3 className="font-display text-[38px] leading-none font-medium md:text-[46px]">
              Questions, answered
            </h3>
          </div>

          <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {questions.map((item, index) => {
              const isOpen = openItems.includes(index);
              const answerId = `about-answer-${index}`;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div
                  className="bg-surface px-5 py-5 md:px-6 md:py-6"
                  key={item.question}
                >
                  <button
                    className="w-full cursor-pointer text-left"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(index)}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-[0.12em] text-text-secondary">
                        {number}
                      </span>

                      {isOpen ? (
                        <Minus size={17} strokeWidth={1.2} />
                      ) : (
                        <Plus size={17} strokeWidth={1.2} />
                      )}
                    </div>

                    <h4 className="max-w-[300px] text-[17px] leading-6 font-medium md:text-[18px]">
                      {item.question}
                    </h4>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    id={answerId}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-[14px] leading-6 text-text-secondary">
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
