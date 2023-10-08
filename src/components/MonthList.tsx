import useRresvContext, { type IRresv } from "../hooks/use-rresv-context";
import MonthListBar from "./MonthListBar";
import React, { useState } from "react";
import MonthListItem from "./MonthListItem";

interface IMonthList {
  day: Date;
  room: string | undefined;
  closeHandler: () => void;
  filterHandler: (r: string | undefined) => void;
}

const MonthList = ({ day, room, closeHandler, filterHandler }: IMonthList) => {
  const [editIdx, setEditIdx] = useState<number | undefined>(undefined);
  const { rresvs, deleteRresv, updateRresv } = useRresvContext();

  const handleEdit = (i: number) => {
    setEditIdx(i);
  };

  const handleSave = (i: number, resv: IRresv) => {
    if (i === editIdx) {
      setEditIdx(undefined);
      void updateRresv(resv);
    }
  };

  const handleReset = (i: number) => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
  };

  const handleDelete = (resv: IRresv) => {
    void deleteRresv(resv);
  };

  const renderedItems: React.ReactNode = rresvs
    .filter(
      (rresv: IRresv) =>
        rresv.date.getTime() === day.getTime() &&
        (room === undefined || rresv.room === room)
    )
    .map((rresv: IRresv) => (
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
      <h1 className='text-center text-xl'>{`Bezetting op ${day.toLocaleDateString()}`}</h1>
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
