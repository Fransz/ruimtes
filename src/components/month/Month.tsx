import React from "react";
import { useCallback, useState } from "react";
import useDateContext from "../../hooks/use-date-context";

import { IRoom } from "../../store/room";
import MonthHeader from "./MonthHeader";
import MonthCalendar from "./MonthCalendar";
import { Dayjs } from "dayjs";
import MonthList from "./MonthList";

const Month = () => {
  const [filteredRooms, setFilteredRooms] = useState<IRoom[]>([]);
  const { currentDay, setCurrentDay } = useDateContext();

  const handleDayClick: (d: Dayjs) => void = useCallback(
    (d) => {
      setFilteredRooms([]);
      setCurrentDay(d);
    },
    [setCurrentDay, setFilteredRooms]
  );

  const handleRoomClick: (e: React.MouseEvent, d: Dayjs, r: IRoom) => void =
    useCallback(
      (e, d, r) => {
        e.stopPropagation();
        setFilteredRooms([r]);
        setCurrentDay(d);
      },
      [setCurrentDay, setFilteredRooms]
    );

  const handleClickFilter = (room: IRoom | undefined): void => {
    if (room === undefined) {
      setFilteredRooms([]);
    } else if (filteredRooms.some((r) => r.id === room.id)) {
      setFilteredRooms(filteredRooms.filter((r) => r.id !== room.id));
    } else {
      setFilteredRooms([...filteredRooms, room]);
    }
  };

  return (
    <>
      <MonthHeader
        month={currentDay.format("MMMM")}
        year={currentDay.format("YYYY")}
      />
      <div className='flex'>
        <MonthCalendar
          month={currentDay.month()}
          year={currentDay.year()}
          handleDayClick={handleDayClick}
          handleRoomClick={handleRoomClick}
        />
        <MonthList
          key={currentDay.valueOf()}
          filteredRooms={filteredRooms}
          handleClickFilter={handleClickFilter}
        />
      </div>
    </>
  );
};

export default Month;