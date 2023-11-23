import RoomMarker from "../widgets/RoomMarker";
import React, { memo } from "react";
import dayjs, { Dayjs } from "dayjs";
import useRoomContext from "../../hooks/use-room-context";
import { IRoom } from "../../context/Room";
import { useAppSelector } from "../../hooks/use-store";
import { IResv, selectResvsByDate } from "../../store/resv";

interface IMonthDay {
  day: number;
  handleDayClick: (d: Dayjs) => void;
  handleRoomClick: (e: React.MouseEvent, d: Dayjs, r: IRoom) => void;
}

const MonthDay = memo(({ day, handleDayClick, handleRoomClick }: IMonthDay) => {
  const { rooms } = useRoomContext();
  const dayResvs = useAppSelector((state) => selectResvsByDate(state, day));

  const monthDay = dayjs(day)

  const renderedRooms = rooms
    .filter((r) => dayResvs.some((resv: IResv) => resv.room.id === r.id))
    .map((r) => {
      return (
        <RoomMarker
          filterHandler={(e) => handleRoomClick(e, monthDay, r)}
          key={r.id}
          room={r}
          className='mx-1 h-4 w-4 rounded-full border'
        />
      );
    });

  return (
    <div
      onClick={(_) => handleDayClick(monthDay)}
      className='flex h-[15vh] w-[14%] flex-col justify-between border border-blue'
    >
      <div className='flex items-baseline justify-between'>
        <div className='ml-3'>{monthDay.format("dddd")}</div>
        <div className='mr-3 text-[2rem]'>{monthDay.date()}</div>
      </div>
      <div className='mb-4 flex min-h-[1rem] justify-start'>
        {renderedRooms}
      </div>
    </div>
  );
});

const NoDay = () => {
  return <div className='w-[14%] border border-blue'>&nbsp;</div>;
};
export { NoDay };
export default MonthDay;
