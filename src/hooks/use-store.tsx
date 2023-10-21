import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, RootDispatch } from "../store/store";

export const useAppDispatch: () => RootDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
