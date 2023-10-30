import React, { useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

import Button from "../widgets/Button";
import { IRoom } from "../../context/Room";
import RoomDropDown from "../widgets/RoomDropDown";

import useRoomContext from "../../hooks/use-room-context";
import { TCreateData } from "../../store/resv";

interface IMonthListItemNew {
  handleCreate: (data: Omit<TCreateData, "date">) => void;
  handleReset: (i: number | undefined) => void;
}

const MonthListItemNew = ({ handleCreate, handleReset }: IMonthListItemNew) => {
  // Items for the dropdown.
  const { rooms } = useRoomContext();

  const [room, setRoom] = useState<IRoom>(rooms[0]);
  const [activity, setActivity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleTimestart = (e: React.ChangeEvent) =>
    setStartTime((e.target as HTMLInputElement).value);
  const handleTimeend = (e: React.ChangeEvent) =>
    setEndTime((e.target as HTMLInputElement).value);
  const handleActivity = (e: React.ChangeEvent) =>
    setActivity((e.target as HTMLInputElement).value);
  const handleRoom = (r: IRoom) => setRoom(r);

  const handleItemSave = () => {
    handleCreate({ room, activity, startTime, endTime });
  };

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
          <Button
            onClick={(_) => handleReset(undefined)}
            className='border-none text-red'
          >
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

export default MonthListItemNew;
