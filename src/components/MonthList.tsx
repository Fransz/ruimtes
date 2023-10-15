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
  const [newItem, setNewItem] = useState<boolean>(false);
  const { resvs, deleteResv, updateResv } = useResvContext();

  const handleNew = (): void => setNewItem(!newItem);
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

  let renderedItems: React.ReactElement[] = [];
  if (newItem) {
    renderedItems = [
      <MonthListItem
        resv={undefined}
        key='newitem'
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleReset={handleReset}
        handleDelete={handleDelete}
        isEdit={false}
        isNew={true}
      />,
    ];
  } else {
    renderedItems = resvs
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
          isNew={false}
        />
      ));
  }

  return (
    <div>
      <MonthListBar
        closeHandler={closeHandler}
        isNew={newItem}
        newHandler={handleNew}
        filterHandler={filterHandler}
        curFilter={room}
      >
        <h1 className='text-center text-xl'>
          <div>{`${day.format("DD MMMM YYYY")}`}</div>
          <div>{`${room?.name ?? "alle ruimtes"}`}</div>
        </h1>
      </MonthListBar>
      <ul>{renderedItems}</ul>
    </div>
  );
};

export default MonthList;
