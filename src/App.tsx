import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home/Home";

const Account = lazy(() => import("./pages/Account/Account"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Product = lazy(() => import("./pages/Product/Product"));
const Register = lazy(() => import("./pages/Register/Register"));
const Shop = lazy(() => import("./pages/Shop/Shop"));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-[13px] text-text-secondary">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
