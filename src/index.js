import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";

import App from "./components/App";

const root = createRoot(document.querySelector("#root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
