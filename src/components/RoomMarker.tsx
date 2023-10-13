import classNames from "classnames";
import React from "react";

export interface IRoomMarker {
  room: string;
  filterHandler: (e: React.MouseEvent<HTMLElement>) => void;
  [propName: string]: unknown;
}

const RoomMarker = ({ room, filterHandler, ...rest }: IRoomMarker) => {
  const cls = classNames((rest as { className: string }).className, {
    "border-brred bg-brred": room === "rode kamer",
    "border-brgreen bg-brgreen": room === "groene kamer",
    "border-brpurple bg-brpurple": room === "rose kamer",
    "border-bryellow bg-bryellow": room === "multiruimte",
    "border-brblue bg-brblue": room === "huiskamer",
    "border-braqua bg-braqua": room === "keuken",
    "border-white bg-red": room === "dimmed rode kamer",
    "border-white bg-green": room === "dimmed groene kamer",
    "border-white bg-purple": room === "dimmed rose kamer",
    "border-white bg-yellow": room === "dimmed multiruimte",
    "border-white bg-blue": room === "dimmed huiskamer",
    "border-white bg-aqua": room === "dimmed keuken",
  });
  return <div onClick={filterHandler} className={cls} />;
};

export default RoomMarker;