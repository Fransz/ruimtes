import RoomMarker from "./RoomMarker";
import useRresvContext from "../hooks/use-rresv-context";
import React from "react";

const dFormat = new Intl.DateTimeFormat("nl-NL", { weekday: "long" });

interface IMonthDay {
  day: Date;
  dayClickHandler: (d: Date) => void;
  roomClickHandler: (e: React.MouseEvent, d: Date, r: string) => void;
}

const MonthDay = ({ day, dayClickHandler, roomClickHandler }: IMonthDay) => {
  const { rresvs } = useRresvContext();
  const dayRresvs = rresvs.filter((r) => r.date.getTime() === day.getTime());

  const rooms = [
    "rode kamer",
    "groene kamer",
    "rose kamer",
    "multiruimte",
    "huiskamer",
    "keuken",
  ]
    .filter((r) => dayRresvs.some((rresv) => rresv.room === r))
    .map((r) => {
      return (
        <RoomMarker
          filterHandler={(e) => roomClickHandler(e, day, r)}
          key={r}
          room={r}
          className='mx-1 h-4 w-4 rounded-full border'
        />
      );
    });

  return (
    <div
      onClick={(_) => dayClickHandler(day)}
      className='flex h-[15vh] w-[14%] flex-col justify-between border border-blue'
    >
      <div className='flex items-baseline justify-between'>
        <div className='ml-3'>{dFormat.format(day)}</div>
        <div className='mr-3 text-[2rem]'>{day.getDate()}</div>
      </div>
      <div className='mb-4 flex min-h-[1rem] justify-start'>{rooms}</div>
    </div>
  );
};

const NoDay = () => {
  return <div className='w-[14%] border border-blue'>&nbsp;</div>;
};
export { NoDay };
export default MonthDay;
