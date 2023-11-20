import { useContext } from "react";
import DateCtx, { IDateCtx } from "../context/Date";

function useDateContext() {
  return useContext<IDateCtx>(DateCtx);
}

export default useDateContext;
