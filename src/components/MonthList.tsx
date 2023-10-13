import useResvContext, { type IResv } from "../hooks/use-resv-context";
import MonthListBar from "./MonthListBar";
import React, { useState } from "react";
import MonthListItem from "./MonthListItem";
import { Dayjs } from "dayjs";
import { IRoom } from "../context/Room";
import { TActivity } from "../context/Resv";

interface IMonthList {
  day: Dayjs;
  room: IRoom | undefined;
  closeHandler: () => void;
  filterHandler: (r: IRoom | undefined) => void;
}

const MonthList = ({ day, room, closeHandler, filterHandler }: IMonthList) => {
  const [editIdx, setEditIdx] = useState<number | undefined>(undefined);
  const { resvs, deleteResv, updateResv } = useResvContext();

  const handleEdit = (i: number): void => {
    setEditIdx(i);
  };

  const handleSave = (
    id: number,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ): void => {
    if (id === editIdx) {
      setEditIdx(undefined);
      void updateResv(id, room, activity, timestart, timeend);
    }
  };

  const handleReset = (i: number): void => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
  };

  const handleDelete = (resv: IResv): void => {
    void deleteResv(resv);
  };

  const renderedItems: React.ReactElement[] = resvs
    .filter(
      (rresv: IResv) =>
        rresv.date.isSame(day) &&
        (room === undefined || rresv.room.id === room.id)
    )
    .map((rresv: IResv) => (
      <MonthListItem
        resv={rresv}
        key={rresv.id}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleReset={handleReset}
        handleDelete={handleDelete}
        isEdit={editIdx === rresv.id}
      />
    ));

  return (
    <div>
      <h1 className='text-center text-xl'>
        {`Bezetting op ${day.format("DD MMMM YYYY")}`}
      </h1>
      <MonthListBar
        closeHandler={closeHandler}
        filterHandler={filterHandler}
        curFilter={room}
      />
      <ul>{renderedItems}</ul>
    </div>
  );
};

export default MonthList;
