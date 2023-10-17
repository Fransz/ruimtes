import MonthDay, { NoDay } from "./MonthDay";
import React, { useState } from "react";
import MonthList from "./MonthList";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/nl";
import { IRoom } from "../context/Room";

interface IMonth {
  calendarDate: Dayjs;
  handleCalendarDateChange: (d: Date | null) => void;
}
const Month = ({ calendarDate, handleCalendarDateChange }: IMonth) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<Dayjs | undefined>(calendarDate);
  const [currentRoom, setCurrentRoom] = useState<IRoom | undefined>(undefined);

  const dayClickHandler = (d: Dayjs): void => {
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(undefined);
  };

  const roomClickHandler = (e: React.MouseEvent, d: Dayjs, r: IRoom): void => {
    e.stopPropagation();
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(r);
  };

  /**
   * Handler for closing the list.
   */
  const handleCloseList = (): void => {
    setShowList(!showList);
  };

  /**
   * Handler for filtering the list.
   */
  const handleFilterList = (r: IRoom | undefined): void => {
    setCurrentRoom(r);
  };

  const first: Dayjs = dayjs.utc(calendarDate).date(1);
  const last: Dayjs = dayjs.utc(first).endOf("month");

  // Nr of befores; Days in week before first date.
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
        {calendarDate.format("MMMM YYYY")}
      </div>
      <div className='flex'>
        <div className='mb-auto flex w-[80%] flex-row flex-wrap'>
          {befores}
          {days}
        </div>
        {showList && (
          <MonthList
            className='w-[20%]'
            room={currentRoom}
            date={currentDay ?? first}
            key={currentDay?.valueOf()}
            handleCloseList={handleCloseList}
            handleFilterList={handleFilterList}
            calendarDate={calendarDate}
            handleCalendarDateChange={handleCalendarDateChange}
          />
        )}
      </div>
    </>
  );
};
export default Month;
