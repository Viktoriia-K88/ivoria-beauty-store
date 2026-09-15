import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router";

import Container from "../Container/Container";

function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubscribe(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    event.currentTarget.reset();
    setIsSubscribed(true);
  }

  return (
    <footer className="border-t border-border bg-[#decbbc]">
      <Container>
        <div className="grid gap-8 py-5 md:grid-cols-[minmax(0,1fr)_390px] md:items-start md:gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div>
            <Link
              className="font-display text-[30px] font-medium tracking-[0.08em]"
              to="/"
            >
              IVORIA
            </Link>

            <p className="mt-3 max-w-[380px] text-[12px] leading-5 text-text-secondary sm:text-[13px] sm:leading-6">
              A considered edit of beauty, fragrance and everyday essentials.
            </p>

            <div className="mt-6 grid gap-8 min-[560px]:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                  Customer care
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.14em] text-text-secondary">
                      Email
                    </p>

                    <a
                      className="text-[13px] transition-opacity hover:opacity-55 sm:text-[14px]"
                      href="mailto:hello@ivoria.com"
                    >
                      hello@ivoria.com
                    </a>
                  </div>

                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.14em] text-text-secondary">
                      Phone
                    </p>

                    <a
                      className="text-[13px] transition-opacity hover:opacity-55 sm:text-[14px]"
                      href="tel:+380670000000"
                    >
                      +380 67 000 00 00
                    </a>
                  </div>

                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.14em] text-text-secondary">
                      Hours
                    </p>

                    <p className="text-[13px] sm:text-[14px]">
                      Mon–Fri, 09:00–18:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <div>
                  <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                    Discover
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] sm:text-[14px]">
                    <Link
                      className="transition-opacity hover:opacity-55"
                      to="/#about"
                    >
                      About us
                    </Link>

                    <Link
                      className="transition-opacity hover:opacity-55"
                      to="/#faq"
                    >
                      FAQ
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                    Follow us
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] sm:text-[14px]">
                    <span>Instagram</span>
                    <span>TikTok</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[420px] md:justify-self-end">
            <div className="border border-text-primary/10 bg-[#f1ece8] p-5">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                Stay in the know
              </p>

              <h2 className="max-w-[320px] font-display text-[18px] leading-[1.2] font-medium sm:text-[20px]">
                Subscribe for new arrivals and curated updates.
              </h2>

              {isSubscribed ? (
                <div
                  className="mt-4 border-t border-border pt-4"
                  aria-live="polite"
                >
                  <p className="text-[13px] font-medium">You're on the list.</p>

                  <p className="mt-1 text-[12px] text-text-secondary">
                    Thank you for subscribing.
                  </p>
                </div>
              ) : (
                <form className="mt-4 flex w-full" onSubmit={handleSubscribe}>
                  <input
                    className="h-11 min-w-0 flex-1 border border-border bg-[#faf4f0] px-3 text-[12px] outline-none transition-colors placeholder:text-text-secondary/60 focus:border-text-primary"
                    type="email"
                    placeholder="Your email address"
                    aria-label="Email address"
                    required
                  />

                  <button
                    className="h-11 shrink-0 cursor-pointer bg-text-primary px-4 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 sm:px-5 sm:text-[10px]"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-text-primary/10 py-2.5 text-[9px] uppercase tracking-[0.1em] text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
          <p>© 2026 IVORIA</p>

          <p>Portfolio project</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
