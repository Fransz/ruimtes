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

interface IResvDb {
  date: string;
  timestart: string;
  timeend: string;
  activity: string;
  room: IRoom;
  id: number;
}

interface IResv {
  date: Dayjs;
  timestart: string;
  timeend: string;
  activity: string;
  room: IRoom;
  id: number;
}

interface IResvsState {
  resvs: IResvDb[];
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

export const resvsSelector = createSelector(
  (state: RootState) => state.resvs.resvs,
  (rs) => {
    return rs.map((r): IResv => {
      const date = dayjs(r.date, "YYYY-MM-DD").locale("nl");
      return { ...r, date };
    });
  }
);

export const resvsByDateSelector = (d: Dayjs) =>
  createSelector([resvsSelector], (resvs) =>
    resvs.filter((r) => r.date.isSame(d, "day"))
  );

export { EStatus, type IResv, type IResvsState };
