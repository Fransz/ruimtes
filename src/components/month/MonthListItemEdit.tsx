import React, { useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

import { IResv, TUpdateData, selectResvs, updateResv } from "../../store/resv";
import { IRoom } from "../../store/room";

import RoomDropDown from "../widgets/RoomDropDown";
import Button from "../widgets/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/use-store";
import dayjs, { Dayjs } from "dayjs";

interface IMonthListItemEdit {
  resv: IResv;
  handleReset: (i: number) => void;
}

const MonthListItemEdit = ({ resv, handleReset }: IMonthListItemEdit) => {
  const [room, setRoom] = useState(resv.room);
  const [activity, setActivity] = useState(resv.activity);
  const [startTime, setStartTime] = useState(resv.startTime.format("HH:mm"));
  const [endTime, setEndTime] = useState(resv.endTime.format("HH:mm"));
  const [updateReqStatus, setUpdateReqStatus] = useState("idle");
  const [updateError, setUpdateError] = useState("");

  const dispatch = useAppDispatch();
  const resvs = useAppSelector(selectResvs);

  const handleActivity = (e: React.ChangeEvent) => {
    setActivity((e.target as HTMLInputElement).value);
    setUpdateError("");
  };
  const handleTimestart = (e: React.ChangeEvent) => {
    setStartTime((e.target as HTMLInputElement).value);
    setUpdateError("");
  };
  const handleTimeend = (e: React.ChangeEvent) => {
    setEndTime((e.target as HTMLInputElement).value);
    setUpdateError("");
  };
  const handleRoom = (r: IRoom) => {
    setRoom(r);
    setUpdateError("");
  };

  const canUpdate = (data: TUpdateData): string => {
    const { id, room, activity, date, startTime, endTime } = data;
    const start: Dayjs = dayjs(
      `${date} ${startTime}`,
      "YYYY-MM-DD HH:mm"
    ).locale("nl");
    const end: Dayjs = dayjs(`${date} ${endTime}`, "YYYY-MM-DD HH:mm").locale(
      "nl"
    );

    if (![id, room, activity, date, startTime, endTime].every(Boolean)) {
      return "Missende data.";
    }
    if (end <= start) return "Eindtijd voor begintijd.";
    const overlap = resvs.some(
      (r: IResv) =>
        r.id !== id &&
        r.room.id === room.id &&
        r.startTime.isSame(start, "day") &&
        end > r.startTime &&
        start < r.endTime
    );
    if (overlap) return "Overlappende activiteiten";
    return "";
  };

  const handleItemSave = () => {
    const date = resv.startTime.format("YYYY-MM-DD");

    const data = { id: resv.id, date, room, activity, startTime, endTime };
    const error = canUpdate(data);

    if (!Boolean(error) && updateReqStatus === "idle") {
      try {
        setUpdateReqStatus("pending");
        dispatch(updateResv(data));
        handleReset(resv.id);
      } catch {
        setUpdateError("Kan niet updaten: server error");
      } finally {
        setUpdateReqStatus("idle");
      }
    } else if (Boolean(error)) {
      setUpdateError(error);
    } else {
      setUpdateError("busy");
    }
  };

  const handleItemReset = () => handleReset(resv.id);

  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <RoomDropDown selectedRoom={room} handleRoomChange={handleRoom} />
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

      <div className='text-red'>{updateError}</div>
    </li>
  );
};

export default MonthListItemEdit;
