import React, { useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

import Button from "../widgets/Button";
import { IRoom } from "../../context/Room";
import RoomDropDown from "../widgets/RoomDropDown";

import useRoomContext from "../../hooks/use-room-context";
import {
  IResv,
  TCreateData,
  createResv,
  selectResvs,
} from "../../store/resv";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import dayjs, { Dayjs } from "dayjs";
import useDateContext from "../../hooks/use-date-context";

interface IMonthListItemNew {
  handleReset: (i: number | undefined) => void;
}

const MonthListItemNew = ({ handleReset }: IMonthListItemNew) => {
  const { rooms } = useRoomContext();
  const { currentDay } = useDateContext();

  const [room, setRoom] = useState<IRoom>(rooms[0]);
  const [activity, setActivity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [createReqStatus, setCreateReqStatus] = useState("idle");
  const [createError, setCreateError] = useState("");

  const dispatch = useAppDispatch();
  const resvs = useAppSelector(selectResvs);

  const handleTimestart = (e: React.ChangeEvent) => {
    setStartTime((e.target as HTMLInputElement).value);
  };
  const handleTimeend = (e: React.ChangeEvent) => {
    setEndTime((e.target as HTMLInputElement).value);
  };
  const handleActivity = (e: React.ChangeEvent) => {
    setActivity((e.target as HTMLInputElement).value);
  };
  const handleRoom = (r: IRoom) => setRoom(r);

  const canCreate = (data: TCreateData): string => {
    const { room, activity, date, startTime, endTime } = data;
    const start: Dayjs = dayjs(
      `${date} ${startTime}`,
      "YYYY-MM-DD HH:mm"
    ).locale("nl");
    const end: Dayjs = dayjs(`${date} ${endTime}`, "YYYY-MM-DD HH:mm").locale(
      "nl"
    );

    if (![room, activity, date, startTime, endTime].every(Boolean)) {
      return "Missende data.";
    }
    if (end <= start) return "Eindtijd voor begintijd.";
    const overlap = resvs.some(
      (r: IResv) =>
        r.room.id === room.id &&
        r.startTime.isSame(start, "day") &&
        end > r.startTime &&
        start < r.endTime
    );
    if (overlap) return "Overlappende activiteiten";
    return "";
  };
  const handleItemSave = () => {
    const date = currentDay.format("YYYY-MM-DD");

    const data = { date, room, activity, startTime, endTime };
    const error = canCreate(data);

    if (!Boolean(error) && createReqStatus === "idle") {
      try {
        setCreateReqStatus("pending");
        dispatch(createResv(data));
        handleReset(undefined);
      } catch {
        setCreateError("Kan niet updaten: server error");
      } finally {
        setCreateReqStatus("idle");
      }
    } else if (Boolean(error)) {
      setCreateError(error);
    } else {
      setCreateError("busy");
    }
  };

  const handleItemReset = () => handleReset(undefined);

  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <RoomDropDown room={room} handleRoomChange={handleRoom} />
        </div>

        <div className='flex'>
          <Button onClick={handleItemSave} className='border-none text-green'>
            <RiCheckLine />
          </Button>
          <Button onClick={handleItemReset} className='border-none text-red'>
            <RiCloseLine />
          </Button>
        </div>
      </div>

      <input
        className='my-1 mr-auto bg-white text-black'
        onChange={handleActivity}
        value={activity}
      />

      <div className='flex justify-between'>
        <div>
          <span className='pr-2'>van:&nbsp;</span>
          <input
            className='my-1 bg-white text-black'
            onChange={handleTimestart}
            value={startTime}
            type='time'
          />
        </div>
        <div>
          <span className='pr-2'>tot:&nbsp;</span>
          <input
            className='my-1 bg-white text-black'
            onChange={handleTimeend}
            value={endTime}
            type='time'
          />
        </div>
      </div>
      <div className='text-red'>{createError}</div>
    </li>
  );
};

export default MonthListItemNew;
