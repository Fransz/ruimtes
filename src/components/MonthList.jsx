import useRresvContext from "../hooks/use-rresv-context";
import MonthListBar from "./MonthListBar";
import MonthListItem from "./MonthListItem";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";

const MonthList = ({ day, room, closeHandler, filterHandler }) => {
  const [editIdx, setEditIdx] = useState(undefined);
  const { rresvs, deleteRresv, updateRresv } = useRresvContext();

  const handleEdit = (i) => {
    setEditIdx(i);
  };

  const handleSave = (i, activity) => {
    if (i === editIdx) {
      setEditIdx(undefined);
      updateRresv(activity);
    }
  };

  const handleReset = (i) => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
  };

  const handleDelete = (activity) => {
    deleteRresv(activity);
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
        handleEdit={(e) => handleEdit(rresv.id)}
        handleSave={(e, a) => handleSave(rresv.id, a)}
        handleReset={(e) => handleReset(rresv.id)}
        handleDelete={(e) => handleDelete(rresv)}
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
