import RoomMarker from "../widgets/RoomMarker";
import useResvContext from "../../hooks/use-resv-context";
import React from "react";
import { Dayjs } from "dayjs";
import useRoomContext from "../../hooks/use-room-context";
import { IRoom } from "../../context/Room";

interface IMonthDay {
  day: Dayjs;
  dayClickHandler: (d: Dayjs) => void;
  roomClickHandler: (e: React.MouseEvent, d: Dayjs, r: IRoom) => void;
}

const MonthDay = ({ day, dayClickHandler, roomClickHandler }: IMonthDay) => {
  const { resvs } = useResvContext();
  const { rooms } = useRoomContext();
  const dayResvs = resvs.filter((r) => r.date.isSame(day, "day"));

  const renderedRooms = rooms
    .filter((r) => dayResvs.some((rresv) => rresv.room.id === r.id))
    .map((r) => {
      return (
        <RoomMarker
          filterHandler={(e) => roomClickHandler(e, day, r)}
          key={r.id}
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
        <div className='ml-3'>{day.format("dddd")}</div>
        <div className='mr-3 text-[2rem]'>{day.date()}</div>
      </div>
      <div className='mb-4 flex min-h-[1rem] justify-start'>
        {renderedRooms}
      </div>
    </div>
  );
};

const NoDay = () => {
  return <div className='w-[14%] border border-blue'>&nbsp;</div>;
};
export { NoDay };
export default MonthDay;
