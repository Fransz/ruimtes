import RoomCtx, { type IRoomCtx } from "../context/Room";
import { useContext } from "react";

function useRoomContext() {
  return useContext<IRoomCtx>(RoomCtx);
}

export default useRoomContext;
