import { configureStore } from "@reduxjs/toolkit";
import { dateReducer, currentDateSelector, setCurrentDate } from "./date";

const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});

export { store, setCurrentDate, currentDateSelector };
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
