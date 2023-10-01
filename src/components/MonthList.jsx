import useRresvContext from "../hooks/use-rresv-context";
import MonthListBar from "./MonthListBar";
import MonthListItem from "./MonthListItem";
import { useEffect, useState } from "react";

const MonthList = ({ day, room, closeHandler, filterHandler }) => {
  const [editIdx, setEditIdx] = useState(undefined);
  const { rresvs } = useRresvContext();

  const handleEdit = (i) => {
    setEditIdx(i);
  };

  const handleSave = (i) => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
  };

  const handleReset = (i) => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
  };

  const handleDelete = (i) => {
    console.log(`Delete; ${i}`);
  };

  const renderedItems = rresvs
    .filter(
      (rresv) =>
        rresv.date.getTime() === day.getTime() &&
        (room === undefined || rresv.room === room)
    )
    .map((rresv, i) => (
      <MonthListItem
        rresv={rresv}
        key={rresv.id}
        handleEdit={(e) => handleEdit(i)}
        handleSave={(e) => handleSave(rresv.id)}
        handleReset={(e) => handleReset(i)}
        handleDelete={(e) => handleDelete(rresv.id)}
        isEdit={editIdx === i}
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
