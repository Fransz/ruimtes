import MonthDay, { NoDay } from "./MonthDay";
import React, { FC, useState } from "react";
import MonthList from "./MonthList";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/nl";

interface IMonth {
  displayDate: Dayjs;
}
const Month = ({ displayDate }: IMonth) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<Dayjs | undefined>(undefined);
  const [currentRoom, setCurrentRoom] = useState<string | undefined>(undefined);

  const dayClickHandler = (d: Dayjs): void => {
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(undefined);
  };

  const roomClickHandler = (e: React.MouseEvent, d: Dayjs, r: string): void => {
    e.stopPropagation();
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(r);
  };

  /**
   * Handler for closing the list.
   */
  const closeHandler = (): void => {
    setShowList(!showList);
  };

  /**
   * Handler for filtering the list.
   */
  const filterHandler = (r: string | undefined): void => {
    setCurrentRoom(r);
  };

  const first: Dayjs = dayjs.utc(displayDate).date(1);
  const last: Dayjs = dayjs.utc(first).endOf("month");

  // Nr of befores; Days in week before first day.
  const bf: number = first.day() === 0 ? 6 : first.day() - 1;
  const befores: React.ReactElement[] = Array.from(new Array(bf), (_, i) => (
    <NoDay key={i} />
  ));

  // All days.
  let days: React.ReactElement[] = Array.from(new Array(last.date()), (_, i) =>
    dayjs
      .utc(first)
      .locale("nl")
      .date(i + 1)
  ).map((d, i) => (
    <MonthDay
      key={i}
      day={d}
      roomClickHandler={roomClickHandler}
      dayClickHandler={dayClickHandler}
    />
  ));

  return (
    <>
      <div className='py-6 text-center text-6xl'>
        {displayDate.format("MMMM YYYY")}
      </div>
      <div className='flex'>
        <div className='mb-auto flex w-[80%] flex-row flex-wrap'>
          {befores}
          {days}
        </div>
        {showList && (
          <MonthList
            room={currentRoom}
            day={currentDay ?? first}
            key={currentDay?.valueOf()}
            closeHandler={closeHandler}
            filterHandler={filterHandler}
          />
        )}
      </div>
    </>
  );
};
export default Month;
