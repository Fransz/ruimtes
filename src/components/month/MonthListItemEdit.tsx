import React, { useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

import { IResv, TUpdateData } from "../../store/resv";
import { IRoom } from "../../context/Room";

import RoomDropDown from "../widgets/RoomDropDown";
import Button from "../widgets/Button";

interface IMonthListItemEdit {
  resv: IResv;
  handleSave: (data: TUpdateData) => void;
  handleReset: (i: number) => void;
}

const MonthListItemEdit = ({
  resv,
  handleSave,
  handleReset,
}: IMonthListItemEdit) => {
  const [room, setRoom] = useState(resv.room);
  const [activity, setActivity] = useState(resv.activity);
  const [startTime, setStartTime] = useState(resv.startTime.format("HH:mm"));
  const [endTime, setEndTime] = useState(resv.endTime.format("HH:mm"));

  const handleActivity = (e: React.ChangeEvent) =>
    setActivity((e.target as HTMLInputElement).value);
  const handleTimestart = (e: React.ChangeEvent) =>
    setStartTime((e.target as HTMLInputElement).value);
  const handleTimeend = (e: React.ChangeEvent) =>
    setEndTime((e.target as HTMLInputElement).value);
  const handleRoom = (r: IRoom) => setRoom(r);

  const handleItemSave = () =>
    handleSave({ id: resv.id, room, activity, startTime, endTime });

  const handleItemReset = () => handleReset(resv.id);

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
    </li>
  );
};

export default MonthListItemEdit;
