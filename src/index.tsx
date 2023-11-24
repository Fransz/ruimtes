import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";

import App from "./components/App";
import { Provider as DateProvider } from "./context/Date";
import { Provider as RoomProvider } from "./context/Room";

import { Provider as StoreProvider } from "react-redux";
import { store } from "./store/store";

const root = createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    <DateProvider>
      <RoomProvider>
          <StoreProvider store={store}>
            <App />
          </StoreProvider>
      </RoomProvider>
    </DateProvider>
  </StrictMode>
);
