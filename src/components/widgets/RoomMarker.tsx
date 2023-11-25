import classNames from "classnames";
import React from "react";
import { IRoom } from "../../store/room";

export interface IRoomMarker {
  room: IRoom;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  [propName: string]: unknown;
}

const RoomMarker = ({
  room,
  handleClick: filterHandler,
  ...rest
}: IRoomMarker) => {
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
