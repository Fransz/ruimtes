import React, { memo } from "react";

import MonthDay, { NoDay } from "./MonthDay";
import { IRoom } from "../../context/Room";

import dayjs, { Dayjs } from "dayjs";

type TMonth = {
  month: number;
  year: number;
  handleDayClick: (d: Dayjs) => void;
  handleRoomClick: (e: React.MouseEvent, d: Dayjs, r: IRoom) => void;
};

const Month = ({ month, year, handleDayClick, handleRoomClick }: TMonth) => {
  const first: Dayjs = dayjs(new Date(year, month, 1));
  const last: Dayjs = dayjs(first).endOf("month");

  const bf: number = first.day() === 0 ? 6 : first.day() - 1;
  const befores: React.ReactElement[] = Array.from(new Array(bf), (_, i) => (
    <NoDay key={i} />
  ));

  let days: React.ReactElement[] = Array.from(new Array(last.date()), (_, i) =>
    dayjs(first).date(i + 1).valueOf()
  ).map((d) => (
    <MonthDay
      key={d}
      day={d}
      handleRoomClick={handleRoomClick}
      handleDayClick={handleDayClick}
    />
  ));

  return (
    <>
      <div className='mb-auto flex w-[80%] flex-row flex-wrap'>
        {befores}
        {days}
      </div>
    </>
  );
};
export default Month;
