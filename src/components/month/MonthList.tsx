import React, { useState } from "react";

import MonthListBar from "./MonthListBar";
import MonthListItem from "./MonthListItem";
import { IRoom } from "../../context/Room";
import { TActivity } from "../../context/Resv";

import useDateContext from "../../hooks/use-date-context";
import useResvContext from "../../hooks/use-resv-context";
import type { IResv } from "../../store/resv";
import { useAppSelector } from "../../hooks/use-store";

import { resvsByDateSelector } from "../../store/resv";
import MonthListItemNew from "./MonthListItemNew";
import MonthListItemEdit from "./MonthListItemEdit";

interface IMonthList {
  filterRooms: IRoom[];
  handleCloseList: () => void;
  handleFilterList: (r: IRoom | undefined) => void;
  className?: string;
}

const MonthList = ({
  filterRooms,
  handleCloseList,
  handleFilterList,
  className,
}: IMonthList) => {
  // Are we editting, creating a new item?
  const [editIdx, setEditIdx] = useState<number | undefined>(undefined);
  const [newItem, setNewItem] = useState<boolean>(false);

  // Our current day.
  const { currentDay } = useDateContext();
  const { deleteResv, createResv, updateResv } = useResvContext();

  const resvs = useAppSelector((state) =>
    resvsByDateSelector(state, currentDay)
  );

  const handleNewItem = (): void => setNewItem(true);
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
      void updateResv(id, currentDay, room, activity, timestart, timeend);
    }
  };

  const handleCreate = (
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ): void => {
    setNewItem(false);
    void createResv(currentDay, room, activity, timestart, timeend);
  };

  const handleReset = (i: number | undefined): void => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
    setNewItem(false);
  };

  const handleDelete = (resv: IResv): void => {
    // void deleteResv(resv);
  };

  let renderedItems: React.ReactElement[];
  if (newItem) {
    renderedItems = [
      <MonthListItemNew
        key='newitem'
        handleReset={handleReset}
        handleCreate={handleCreate}
      />,
    ];
  } else {
    renderedItems = resvs
      .filter(
        (resv: IResv) =>
          filterRooms.length === 0 ||
          filterRooms.some((r) => r.id === resv.room.id)
      )
      .map((resv: IResv) => {
        if (editIdx === resv.id)
          return (
            <MonthListItemEdit
              resv={resv}
              key={resv.id}
              handleSave={handleSave}
              handleReset={handleReset}
            />
          );
        else
          return (
            <MonthListItem
              resv={resv}
              key={resv.id}
              handleEdit={handleEditItem}
              handleDelete={handleDelete}
            />
          );
      });
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
