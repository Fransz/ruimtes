import React from "react";
import { useCallback, useState } from "react";
import useDateContext from "../../hooks/use-date-context";

import { IRoom } from "../../context/Room";
import MonthHeader from "./MonthHeader";
import Month from "./Month";
import { Dayjs } from "dayjs";

const MonthWrapper = () => {
  const [filterRooms, setFilterRooms] = useState<IRoom[]>([]);
  const { currentDay, setCurrentDay } = useDateContext();

  const handleDayClick: (d: Dayjs) => void = useCallback((d) => {
    setFilterRooms([]);
    setCurrentDay(d);
  }, [setCurrentDay, setFilterRooms]);

  const handleRoomClick: (e: React.MouseEvent, d: Dayjs, r: IRoom) => void =
    useCallback((e, d, r) => {
      e.stopPropagation();
      setFilterRooms([r]);
      setCurrentDay(d);
    }, [setCurrentDay]);

  const handleFilterList = (room: IRoom | undefined): void => {
    if (room === undefined) {
      setFilterRooms([]);
    } else if (filterRooms.some((r) => r.id === room.id)) {
      setFilterRooms(filterRooms.filter((r) => r.id !== room.id));
    } else {
      setFilterRooms([...filterRooms, room]);
    }
  };

  return (
    <>
      <MonthHeader
        month={currentDay.format("MMMM")}
        year={currentDay.format("YYYY")}
      />
      <div className='flex'>
        <Month
          month={currentDay.month()}
          year={currentDay.year()}
          handleDayClick={handleDayClick}
          handleRoomClick={handleRoomClick}
        />
      </div>
    </>
  );
};

export default MonthWrapper;
