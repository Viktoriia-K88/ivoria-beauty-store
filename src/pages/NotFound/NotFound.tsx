import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import Container from "../../components/Container/Container";

function NotFound() {
  return (
    <main>
      <Container>
        <section className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-14 text-center sm:py-16 md:py-20 min-[900px]:min-h-[calc(100vh-80px)]">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-text-secondary sm:text-[12px]">
            Error 404
          </p>

          <h1 className="max-w-[620px] font-display text-[36px] leading-[0.95] font-medium sm:text-[40px] md:text-[50px] lg:text-[56px] xl:text-[60px]">
            Page not found
          </h1>

          <p className="mt-5 max-w-md text-[13px] leading-6 text-text-secondary sm:text-[14px]">
            The page you are looking for may have been moved or no longer
            exists.
          </p>

          <Link
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 bg-text-primary px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80 sm:mt-8 sm:min-h-12 sm:px-8 sm:text-[11px]"
            to="/"
          >
            <ArrowLeft size={16} strokeWidth={1.2} />
            Back to home
          </Link>
        </section>
      </Container>
    </main>
  );
}

export default NotFound;
