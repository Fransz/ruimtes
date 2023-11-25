import { configureStore } from "@reduxjs/toolkit";
import { resvsReducer } from "./resv";
import { roomsReducer } from "./room";
import { type IResvRead, EStatus } from "./resv";
import { type IRoom } from "./room";

const store = configureStore({
  reducer: {
    resvs: resvsReducer,
    rooms: roomsReducer
  },
});

export { store };
export type TRootState = ReturnType<typeof store.getState>;
export type TRootDispatch = typeof store.dispatch;
