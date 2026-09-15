import { useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

function MainLayout() {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const elementId = hash.slice(1);

      requestAnimationFrame(() => {
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      return;
    }

    if (navigationType === "POP") {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, search, hash, navigationType]);

  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}

export default MainLayout;
