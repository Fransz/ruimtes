import React, { useState } from "react";

import MonthListBar from "./MonthListBar";
import MonthListItem from "./MonthListItem";
import { IRoom } from "../../context/Room";

import useDateContext from "../../hooks/use-date-context";
import type { IResv } from "../../store/resv";
import { deleteResv, selectResvsByDate } from "../../store/resv";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";

import MonthListItemNew from "./MonthListItemNew";
import MonthListItemEdit from "./MonthListItemEdit";

interface IMonthList {
  filterRooms: IRoom[];
  handleFilterList: (r: IRoom | undefined) => void;
  className?: string;
}

const MonthList = ({
  filterRooms,
  handleFilterList,
  className,
}: IMonthList) => {
  const [editIdx, setEditIdx] = useState<number | undefined>(undefined);
  const [newItem, setNewItem] = useState<boolean>(false);

  const { currentDay } = useDateContext();
  const dispatch = useAppDispatch();

  const resvs = useAppSelector((state) => selectResvsByDate(state, currentDay));

  const handleNewItem = (): void => setNewItem(true);
  const handleEditItem = (i: number): void => {
    setEditIdx(i);
  };

  const handleReset = (i: number | undefined): void => {
    if (i === editIdx) {
      setEditIdx(undefined);
    }
    setNewItem(false);
  };

  const handleDelete = (resv: IResv): void => {
    dispatch(deleteResv(resv.id));
  };

  let renderedItems: React.ReactElement[];
  if (newItem) {
    renderedItems = [
      <MonthListItemNew key='newitem' handleReset={handleReset} />,
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
