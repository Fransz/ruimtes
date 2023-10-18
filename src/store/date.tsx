import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/nl";

interface IDateState {
  current: number;
}

const initialState: IDateState = {
  current: dayjs().valueOf(),
};

const dateSlice = createSlice({
  name: "date",
  reducers: {
    setCurrentDate(state, action: PayloadAction<Dayjs>) {
      state.current = action.payload.valueOf();
    },
  },
  initialState,
});

const currentDateSelector = (state: RootState): Dayjs =>
  dayjs(state.date.current).locale("nl");

export { type IDateState };
export const dateReducer = dateSlice.reducer;
export { currentDateSelector };
export const { setCurrentDate } = dateSlice.actions;
