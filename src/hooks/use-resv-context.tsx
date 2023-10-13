import { useContext } from "react";
import ResvCtx, { type IResv, type IResvCtx } from "../context/Resv";

function useResvContext() {
  return useContext<IResvCtx>(ResvCtx);
}

export { type IResv };
export default useResvContext;
