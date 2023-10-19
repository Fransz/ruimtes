import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setCurrentDate: {
      reducer(state, action: PayloadAction<number>) {
        state.current = action.payload;
      },
      prepare(date: Dayjs) {
        return { type: "date/setCurrentDate", payload: date.valueOf()}
      }
    }
  },
  initialState,
});

const cdSelector = (state: RootState): number => state.date.current;

const currentDateSelector = createSelector(cdSelector, d => dayjs(d).locale('nl'))

export { type IDateState };
export const dateReducer = dateSlice.reducer;
export { currentDateSelector };
export const { setCurrentDate } = dateSlice.actions;
