import { configureStore } from "@reduxjs/toolkit";
import { resvsReducer } from "./resv";

const store = configureStore({
  reducer: {
    resvs: resvsReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
