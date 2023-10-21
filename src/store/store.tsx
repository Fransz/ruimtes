import { configureStore } from "@reduxjs/toolkit";
import { dateReducer, currentDateSelector, setCurrentDate } from "./date";
import { resvsReducer } from "./resv";

const store = configureStore({
  reducer: {
    date: dateReducer,
    resvs: resvsReducer,
  },
});

export { store, setCurrentDate, currentDateSelector };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
