import { useContext } from "react";
import ResvContext, { type IResv, type IResvCtx } from "../context/resv";

function useResvContext() {
  return useContext<IResvCtx>(ResvContext);
}

export { type IResv };
export default useResvContext;
