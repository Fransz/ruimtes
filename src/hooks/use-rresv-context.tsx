import { useContext } from "react";
import RresvContext, { type IRresv, type IRresvCtx } from "../context/rresv";

function useRresvContext() {
  return useContext<IRresvCtx>(RresvContext);
}

export { type IRresv };
export default useRresvContext;
