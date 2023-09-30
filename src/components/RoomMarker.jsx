import classNames from "classnames";

const RoomMarker = ({ room, filterHandler, ...rest }) => {
  const cls = classNames(rest.className, {
    "border-red bg-red": room === "rode kamer",
    "border-green bg-green": room === "groene kamer",
    "border-purple bg-purple": room === "rose kamer",
    "border-yellow bg-yellow": room === "multiruimte",
    "border-blue bg-blue": room === "huiskamer",
    "border-aqua bg-aqua": room === "keuken",
  });
  return <div onClick={filterHandler} className={cls} />;
};

export default RoomMarker;
