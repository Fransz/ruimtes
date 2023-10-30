import React, { useState } from "react";

import MonthList from "./MonthList";
import MonthDay, { NoDay } from "./MonthDay";
import { IRoom } from "../../context/Room";

import useDateContext from "../../hooks/use-date-context";

import dayjs, { Dayjs } from "dayjs";

const Month = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const [filterRooms, setFilterRooms] = useState<IRoom[]>([]);

  const { currentDay, setCurrentDay } = useDateContext();

  const dayClickHandler = (d: Dayjs): void => {
    setShowList(true);
    setFilterRooms([]);
    setCurrentDay(d);
  };

  const roomClickHandler = (e: React.MouseEvent, d: Dayjs, r: IRoom): void => {
    e.stopPropagation();
    setShowList(true);
    setFilterRooms([r]);
    setCurrentDay(d);
  };

  const handleCloseList = (): void => setShowList(!showList);

  const handleFilterList = (room: IRoom | undefined): void => {
    if (room === undefined) {
      setFilterRooms([]);
    } else if (filterRooms.some((r) => r.id === room.id)) {
      setFilterRooms(filterRooms.filter((r) => r.id !== room.id));
    } else {
      setFilterRooms([...filterRooms, room]);
    }
  };

  const first: Dayjs = dayjs(currentDay).date(1);
  const last: Dayjs = dayjs(first).endOf("month");

  // Nr of befores; Days in week before first date.
  const bf: number = first.day() === 0 ? 6 : first.day() - 1;
  const befores: React.ReactElement[] = Array.from(new Array(bf), (_, i) => (
    <NoDay key={i} />
  ));

  // All days.
  let days: React.ReactElement[] = Array.from(new Array(last.date()), (_, i) =>
    dayjs(first).date(i + 1)
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
        {currentDay.format("MMMM YYYY")}
      </div>
      <div className='flex'>
        <div className='mb-auto flex w-[80%] flex-row flex-wrap'>
          {befores}
          {days}
        </div>
        {showList && (
          <MonthList
            key={currentDay.valueOf()}
            className='w-[20%]'
            filterRooms={filterRooms}
            handleClose={handleCloseList}
            handleFilterList={handleFilterList}
          />
        )}
      </div>
    </>
  );
};
export default Month;
