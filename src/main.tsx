import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";

import App from "./App";
import { TooltipProvider } from "./components/ui/tooltip";
import AuthProvider from "./context/AuthProvider";
import { store } from "./store/store";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider delay={300}>
            <App />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
