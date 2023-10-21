import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { type IRoom } from "../context/Room";
import { RootState } from "./store";

import dayjs, { type Dayjs } from "dayjs";
import axios from "axios";

enum EStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface IResv {
  startTime: Dayjs;
  endTime: Dayjs;
  activity: string;
  room: IRoom;
  id: number;
}

interface IResvsState {
  resvs: any[];
  status: EStatus;
  error: string | null;
}

const initialState: IResvsState = {
  resvs: [],
  status: EStatus.IDLE,
  error: null,
};

export const fetchResvs = createAsyncThunk("resvs/fetch", async () => {
  const { data: resvs } = await axios.get(
    "http://localhost:3001/resvs?_expand=room"
  );
  return resvs;
});

const resvsSlice = createSlice({
  name: "resvs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchResvs.pending, (state, _) => {
        state.status = EStatus.LOADING;
      })
      .addCase(fetchResvs.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        state.resvs = action.payload;
      })
      .addCase(fetchResvs.rejected, (state, _) => {
        state.status = EStatus.FAILED;
      });
  },
});

export const resvsReducer = resvsSlice.reducer;

/**
 * A selector for all reservations.
 * The selector selects all reservations as IResv;
 */
export const resvsSelector = createSelector(
  (state: RootState) => state.resvs.resvs,
  (rs) => {
    return rs.map((r): IResv => {
      const startTime = dayjs(
        `${r.date} ${r.timestart}`,
        "YYYY-MM-DD HH:mm"
      ).locale("nl");
      const endTime = dayjs(
        `${r.date} ${r.timeend}`,
        "YYYY-MM-DD HH:mm"
      ).locale("nl");
      return {
        id: r.id,
        activity: r.activity,
        room: r.room,
        startTime,
        endTime,
      };
    });
  }
);

export const resvsByDateSelector = createSelector(
  [resvsSelector, (_, day) => day],
  (resvs, day) => resvs.filter((r) => day.isSame(r.startTime, "day"))
);

export const statusSelector = (state: RootState) => state.resvs.status;
export { EStatus, type IResv, type IResvsState };
