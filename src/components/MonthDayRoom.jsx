import classNames from "classnames";

const MonthDayRoom = ({ room, roomClickHandler }) => {
  const cls = classNames("w-4 h-4 mx-1 border rounded-full", {
    "border-red bg-red": room === "rode kamer",
    "border-green bg-green": room === "groene kamer",
    "border-purple bg-purple": room === "rose kamer",
    "border-yellow bg-yellow": room === "multiruimte",
    "border-blue bg-blue": room === "huiskamer",
    "border-aqua bg-aqua": room === "keuken",
  });
  return <div onClick={roomClickHandler} className={cls} />;
};

const RoomMarker = ({ room, roomClickHandler, ...rest }) => {
  const cls = classNames(rest.className, {
    "border-red bg-red": room === "rode kamer",
    "border-green bg-green": room === "groene kamer",
    "border-purple bg-purple": room === "rose kamer",
    "border-yellow bg-yellow": room === "multiruimte",
    "border-blue bg-blue": room === "huiskamer",
    "border-aqua bg-aqua": room === "keuken",
  });
  return <div onClick={roomClickHandler} className={cls} />;
};

export { RoomMarker };
export default MonthDayRoom;
