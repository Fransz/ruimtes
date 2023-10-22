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
interface IResvStored {
  activity: string;
  date: string;
  timestart: string;
  timeend: string;
  roomId: number;
  id: number;
}
interface IResvFetched extends IResvStored {
  room: IRoom;
}

interface IResvsState {
  resvs: IResvFetched[];
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

interface IUpdateData {
  id: number;
  room: IRoom;
  activity: string;
  timestart: string;
  timeend: string;
}
export const updateResv = createAsyncThunk<
  IResvFetched[],
  IUpdateData,
  { state: RootState }
>("resvs/update", async (data, { getState }) => {
  const { id, room, activity, timestart, timeend } = data;
  const resvs = getState().resvs.resvs.filter((r) => r.id !== id);
  const old = getState().resvs.resvs.find((r) => r.id === id);
  const nw = { ...old, roomId: room.id, activity, timestart, timeend };

  const { data: stored } = await axios.put(
    `http://localhost:3001/resvs/${id}`,
    nw
  );
  return [...resvs, { ...stored, room }] as IResvFetched[];
});

export const createResv = createAsyncThunk(
  "resvs/create",
  (data: { r: IRoom; a: string; s: string; e: string }) => {
    console.log("slice create resv");
  }
);

export const deleteResv = createAsyncThunk(
  "resvs/delete",
  (id: number): void => {
    console.log("slice delete resv");
  }
);

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
        state.error = "Network error.";
      })

      .addCase(updateResv.pending, (state, _) => {
        state.status = EStatus.LOADING;
      })
      .addCase(updateResv.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        state.resvs = action.payload;
      })
      .addCase(updateResv.rejected, (state, _) => {
        state.status = EStatus.FAILED;
        state.error = "Network error.";
      })

      .addCase(createResv.pending, (state, _) => {
        state.status = EStatus.LOADING;
      })
      .addCase(createResv.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        // Update resvs
      })
      .addCase(createResv.rejected, (state, _) => {
        state.status = EStatus.FAILED;
        state.error = "Network error.";
      })

      .addCase(deleteResv.pending, (state, _) => {
        state.status = EStatus.LOADING;
      })
      .addCase(deleteResv.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        // Update resvs
      })
      .addCase(deleteResv.rejected, (state, _) => {
        state.status = EStatus.FAILED;
        state.error = "Network error.";
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
