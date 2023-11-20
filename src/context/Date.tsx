import dayjs, { Dayjs } from "dayjs";
import React, { createContext, useState } from "react";

interface IDateCtx {
  currentDay: Dayjs;
  setCurrentDay: (d: Dayjs) => void;
}

const DateCtx = createContext<IDateCtx>({} as IDateCtx);

const Provider = ({ children }: { children: React.ReactElement }) => {
  const [currentDay, setCurrentDay] = useState<Dayjs>(dayjs());
  const ctx: IDateCtx = { currentDay, setCurrentDay };
  return <DateCtx.Provider value={ctx}>{children}</DateCtx.Provider>;
};

export { Provider, type IDateCtx };
export default DateCtx;
