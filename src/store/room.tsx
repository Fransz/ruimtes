import {
  EntitySelectors,
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { TRootState } from "./store";
import { EStatus } from "./resv";

interface IRoom {
  id: number;
  name: string;
}

type TRoomsState = EntityState<IRoom> & {
  status: EStatus;
  error: string | null;
};

const roomsAdapter = createEntityAdapter<IRoom>({
  sortComparer: (r, s) => s.id - r.id,
});

const initialState: TRoomsState = roomsAdapter.getInitialState({
  status: EStatus.IDLE,
  error: null,
});

export const fetchRooms = createAsyncThunk<IRoom[], void>("rooms/fetch", () =>
  axios.get("http://localhost:3001/rooms").then(({ data: rooms }) => {
    return rooms;
  })
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.pending, (state, _) => {
        state.status = EStatus.LOADING;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = EStatus.SUCCEEDED;
        roomsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchRooms.rejected, (state, _) => {
        state.status = EStatus.FAILED;
        state.error = "Network error.";
      });
  },
});

export const roomsReducer = roomsSlice.reducer;

export const {
  selectAll: selectAllRooms,
  selectIds: selectAllRoomIds,
  selectById: selectRoomById,
}: EntitySelectors<IRoom, TRootState> = roomsAdapter.getSelectors<TRootState>(
  (state: TRootState) => state.rooms
);

export { type IRoom };
