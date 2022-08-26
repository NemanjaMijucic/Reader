import React from "react";
import createRoot from "react-dom";
import App from "./App.js";
import "./index.css";
import { BookContextProvider } from "./store/book-context";
import { BrowserRouter } from "react-router-dom";

createRoot.render(
  <BookContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BookContextProvider>,
  document.getElementById("root")
);
