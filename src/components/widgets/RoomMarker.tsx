import classNames from "classnames";
import React from "react";
import { IRoom } from "../../context/Room";

export interface IRoomMarker {
  room: IRoom;
  filterHandler: (e: React.MouseEvent<HTMLElement>) => void;
  [propName: string]: unknown;
}

const RoomMarker = ({ room, filterHandler, ...rest }: IRoomMarker) => {
  const cls = classNames((rest as { className: string }).className, {
    "border-brred bg-brred": room.name === "rode kamer",
    "border-brgreen bg-brgreen": room.name === "groene kamer",
    "border-brpurple bg-brpurple": room.name === "rose kamer",
    "border-bryellow bg-bryellow": room.name === "multiruimte",
    "border-brblue bg-brblue": room.name === "huiskamer",
    "border-braqua bg-braqua": room.name === "keuken",
  });
  return <div onClick={filterHandler} className={cls} />;
};

export default RoomMarker;
