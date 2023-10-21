import { useContext } from "react";
import RoomCtx, { type IRoomCtx } from "../context/Room";

function useRoomContext() {
  return useContext<IRoomCtx>(RoomCtx);
}

export default useRoomContext;
