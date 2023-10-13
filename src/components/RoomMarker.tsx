import classNames from "classnames";
import React from "react";
import { IRoom } from "../context/Room";

export interface IRoomMarker {
  room: IRoom;
  filterHandler: (e: React.MouseEvent<HTMLElement>) => void;
  dimmed?: boolean;
  [propName: string]: unknown;
}

const RoomMarker = ({
  room,
  filterHandler,
  dimmed = true,
  ...rest
}: IRoomMarker) => {
  const cls = classNames((rest as { className: string }).className, {
    "border-brred bg-brred": room.name === "rode kamer" && !dimmed,
    "border-brgreen bg-brgreen": room.name === "groene kamer" && !dimmed,
    "border-brpurple bg-brpurple": room.name === "rose kamer" && !dimmed,
    "border-bryellow bg-bryellow": room.name === "multiruimte" && !dimmed,
    "border-brblue bg-brblue": room.name === "huiskamer" && !dimmed,
    "border-braqua bg-braqua": room.name === "keuken" && !dimmed,

    "border-white bg-red": room.name === "rode kamer" && dimmed,
    "border-white bg-green": room.name === "groene kamer" && dimmed,
    "border-white bg-purple": room.name === "rose kamer" && dimmed,
    "border-white bg-yellow": room.name === "multiruimte" && dimmed,
    "border-white bg-blue": room.name === "huiskamer" && dimmed,
    "border-white bg-aqua": room.name === "keuken" && dimmed,
  });
  return <div onClick={filterHandler} className={cls} />;
};

export default RoomMarker;
