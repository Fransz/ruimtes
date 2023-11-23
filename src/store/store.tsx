import { configureStore } from "@reduxjs/toolkit";
import { resvsReducer } from "./resv";

const store = configureStore({
  reducer: {
    resvs: resvsReducer,
  },
});

export { store };
export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
