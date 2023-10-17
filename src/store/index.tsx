import { configureStore } from "@reduxjs/toolkit";
import { dateReducer, setDate } from "./date";

const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});

export { store, setDate };
