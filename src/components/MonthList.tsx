import useResvContext, { type IResv } from "../hooks/use-resv-context";
import MonthListBar from "./MonthListBar";
import React, { useState } from "react";
import MonthListItem from "./MonthListItem";
import { Dayjs } from "dayjs";

interface IMonthList {
  day: Dayjs;
  room: string | undefined;
  closeHandler: () => void;
  filterHandler: (r: string | undefined) => void;
}

const MonthList = ({ day, room, closeHandler, filterHandler }: IMonthList) => {
  const [editIdx, setEditIdx] = useState<number | undefined>(undefined);
  const { resvs, deleteResv, updateResv } = useResvContext();

  const handleEdit = (i: number): void => {
    setEditIdx(i);
  };

  const handleSave = (i: number, resv: IResv): void => {
    if (i === editIdx) {
      setEditIdx(undefined);
      void updateResv(resv);
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
        rresv.date.isSame(day) && (room === undefined || rresv.room === room)
    )
    .map((rresv: IResv) => (
      <MonthListItem
        rresv={rresv}
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
