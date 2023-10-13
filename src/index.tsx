import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./index.css";

import App from "./components/App";
import { Provider as ResvProvider } from "./context/Resv";
import { Provider as RoomProvider } from "./context/Room";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <StrictMode>
    <RoomProvider>
      <ResvProvider>
        <App />
      </ResvProvider>
    </RoomProvider>
  </StrictMode>
);
