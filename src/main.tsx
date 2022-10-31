import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/main.scss";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./reducer/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AppProvider>
);
