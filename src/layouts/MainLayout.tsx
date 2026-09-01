import { useEffect } from "react";
import { Outlet, useLocation, useNavigationType } from "react-router";

import Header from "../components/Header/Header";

function MainLayout() {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, search, navigationType]);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
