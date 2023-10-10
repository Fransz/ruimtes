import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";

import App from "./components/App";
import { Provider } from "./context/resv";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
