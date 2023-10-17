import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/nl";

dayjs.extend(utc);

const dateSlice = createSlice({
  name: "date",
  reducers: {
    setDate(state, action) {
      return action.payload;
    },
  },
  initialState: dayjs().utc().locale("n"),
});

export const dateReducer = dateSlice.reducer;
export const { setDate } = dateSlice.actions;
