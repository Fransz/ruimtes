import useResvContext, { type IResv } from "../../hooks/use-resv-context";
import MonthListBar from "./MonthListBar";
import React, { useState } from "react";
import MonthListItem from "./MonthListItem";
import { Dayjs } from "dayjs";
import { IRoom } from "../../context/Room";
import { TActivity } from "../../context/Resv";
import { useStateSelector } from "../../hooks/use-store";
import { resvsByDateSelector } from "../../store/resv";

interface IMonthList {
  date: Dayjs;
  filterRooms: IRoom[];
  handleCloseList: () => void;
  handleFilterList: (r: IRoom | undefined) => void;
  className?: string;
}

const MonthList = ({
  date,
  filterRooms,
  handleCloseList,
  handleFilterList,
  className,
}: IMonthList) => {
  const [editIdx, setEditIdx] = useState<number | undefined>(undefined);
  const [newItem, setNewItem] = useState<boolean>(false);
  const { deleteResv, createResv, updateResv } = useResvContext();

  const resvs = useStateSelector(resvsByDateSelector(date));

  const handleNewItem = (): void => setNewItem(!newItem);
  const handleEditItem = (i: number): void => {
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
      void updateResv(id, date, room, activity, timestart, timeend);
    }
  };

  const handleCreate = (
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ): void => {
    setNewItem(!newItem);
    void createResv(date, room, activity, timestart, timeend);
  };

  const handleReset = (i: number): void => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
  };

  const handleDelete = (resv: IResv): void => {
    void deleteResv(resv);
  };

  let renderedItems: React.ReactElement[];
  if (newItem) {
    renderedItems = [
      <MonthListItem
        resv={undefined}
        key='newitem'
        handleEdit={handleEditItem}
        handleSave={handleSave}
        handleReset={handleReset}
        handleDelete={handleDelete}
        handleCreate={handleCreate}
        isEdit={false}
        isNew={true}
      />,
    ];
  } else {
    renderedItems = resvs
      .filter(
        (rresv: IResv) =>
          rresv.date.isSame(date, "day") &&
          (filterRooms.length === 0 ||
            filterRooms.some((r) => r.id === rresv.room.id))
      )
      .map((rresv: IResv) => (
        <MonthListItem
          resv={rresv}
          key={rresv.id}
          handleEdit={handleEditItem}
          handleSave={handleSave}
          handleReset={handleReset}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
          isEdit={editIdx === rresv.id}
          isNew={false}
        />
      ));
  }

  return (
    <div className={className}>
      <MonthListBar
        handleCloseList={handleCloseList}
        handleFilterList={handleFilterList}
        handleNewItem={handleNewItem}
        filterRooms={filterRooms}
        isNew={newItem}
      ></MonthListBar>
      <ul>{renderedItems}</ul>
    </div>
  );
};

export default MonthList;
