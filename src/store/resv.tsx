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

const rootCreateAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
}>();

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
type TUpdateData = Omit<IResvWrite, "roomId"> & { room: IRoom };
type TCreateData = Omit<IResvWrite, "id" | "roomId"> & { room: IRoom };

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

export const fetchResvs = rootCreateAsyncThunk<IResvRead[], void>(
  "resvs/fetch",
  async () => {
    const { data: resvs } = await axios.get(
      "http://localhost:3001/resvs?_expand=room"
    );
    return resvs;
  }
);

export const updateResv = rootCreateAsyncThunk<IResvRead, TUpdateData>(
  "resvs/update",
  (data) => {
    const { id, room, activity, date, startTime, endTime } = data;
    const resv = { id, activity, date, startTime, endTime, roomId: room.id };

    return axios
      .put(`http://localhost:3001/resvs/${id}`, resv)
      .then(({ data: stored }) => {
        return { ...stored, room };
      });
  }
);

export const createResv = createAsyncThunk<
  IResvRead,
  TCreateData,
  { state: RootState; a: number }
>("resvs/create", (data) => {
  const { room, date, activity, startTime, endTime } = data;
  const resv = { date, activity, startTime, endTime, roomId: room.id };

  return axios
    .post(`http://localhost:3001/resvs/`, resv)
    .then(({ data: stored }) => {
      return { ...stored, room };
    });
});

export const deleteResv = rootCreateAsyncThunk<number, number>(
  "resvs/delete",
  (id) => {
    return axios.delete(`http://localhost:3001/resvs/${id}`).then(() => {
      return id;
    });
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
        state.resvs = [...state.resvs, action.payload];
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
        const id = action.payload;
        state.resvs = state.resvs.filter((resv) => resv.id !== id);
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
  type TCreateData,
};
