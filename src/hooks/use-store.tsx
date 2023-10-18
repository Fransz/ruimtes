import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, RuimteDispatch } from "../store/store";

export const useRuimteDispatch: () => RuimteDispatch = useDispatch;
export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
