import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { type IRoom } from "../context/Room";
import { RootState } from "./store";

import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";

dayjs.extend(customParseFormat);

enum EStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

interface IResv {
  activity: string;
  endTime: Dayjs;
  id: number;
  room: IRoom;
  startTime: Dayjs;
}
interface IResvWrite {
  activity: string;
  date: string;
  endTime: string;
  id: number;
  roomId: number;
  startTime: string;
}
interface IResvRead extends IResvWrite {
  room: IRoom;
}
type TUpdateData = Omit<IResvWrite, "date" | "roomId"> & { room: IRoom };

interface IResvsState {
  resvs: IResvRead[];
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

export const updateResv = createAsyncThunk<
  IResvRead,
  TUpdateData,
  { state: RootState }
>("resvs/update", (data, { getState }) => {
  const old = getState().resvs.resvs.find((r) => r.id === data.id);

  const { id, room, activity, startTime, endTime } = data;
  const nw = { ...old, roomId: room.id, activity, startTime, endTime };

  return axios
    .put(`http://localhost:3001/resvs/${id}`, nw)
    .then(({ data: stored }) => {
      return { ...stored, room };
    });
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

        const id = action.payload.id;
        const resvs = state.resvs.filter((r) => r.id !== id);
        state.resvs = [...resvs, action.payload];
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
        `${r.date} ${r.startTime}`,
        "YYYY-MM-DD HH:mm"
      ).locale("nl");
      const endTime = dayjs(
        `${r.date} ${r.endTime}`,
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
export {
  EStatus,
  type IResv,
  type IResvsState,
  type IResvWrite,
  type TUpdateData,
};
