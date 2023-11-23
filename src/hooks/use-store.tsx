import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { TRootState, TRootDispatch } from "../store/store";

export const useAppDispatch: () => TRootDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
