import { useContext } from "react";
import ResvCtx, { type IResvCtx } from "../context/Resv";

function useResvContext() {
  return useContext<IResvCtx>(ResvCtx);
}

export default useResvContext;
