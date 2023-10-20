import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, RootDispatch } from "../store/store";

export const useRootDispatch: () => RootDispatch = useDispatch;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
