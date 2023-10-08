import React, { useState } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiEditLine,
} from "react-icons/ri";

import Button from "./Button";
import RoomMarker from "./RoomMarker";
import { type IRresv } from "../context/rresv";
import DropDown, { IDropDownItem } from "./DropDown";

interface IRoomItem extends IDropDownItem {}
const roomItems: IRoomItem[] = [
  "rode kamer",
  "groene kamer",
  "rose kamer",
  "multiruimte",
  "huiskamer",
  "keuken",
].map((r) => {
  return {
    value: r,
    label: (
      <div className='mx-auto flex items-center px-2'>
        <RoomMarker
          room={r}
          filterHandler={(e) => e}
          className='mx-1 h-4 w-4 rounded-full border'
        />
        <div>{r}</div>
      </div>
    ),
  };
});

interface IMonthListItem {
  rresv: IRresv;
  handleEdit: (i: number) => void;
  isEdit: boolean;
  handleSave: (i: number, r: IRresv) => void;
  handleReset: (i: number) => void;
  handleDelete: (r: IRresv) => void;
}

const MonthListItem = ({
  rresv,
  handleEdit,
  isEdit,
  handleSave,
  handleReset,
  handleDelete,
}: IMonthListItem) => {
  const [room, setRoom] = useState(
    roomItems.find((room) => room.value === rresv.room) ?? roomItems[0]
  );
  const [activity, setActivity] = useState(rresv.activity);
  const [timestart, setTimestart] = useState(rresv.timestart);
  const [timeend, setTimeend] = useState(rresv.timeend);

  const handleActivity = (e: React.ChangeEvent) =>
    setActivity((e.target as HTMLInputElement).value);
  const handleTimestart = (e: React.ChangeEvent) =>
    setTimestart((e.target as HTMLInputElement).value);
  const handleTimeend = (e: React.ChangeEvent) =>
    setTimeend((e.target as HTMLInputElement).value);
  const handleRoom = (r: IRoomItem) => setRoom(r);

  const handleItemSave = () => {
    const resv = { ...rresv, room: room.value, activity, timestart, timeend };
    handleSave(rresv.id, resv);
  };

  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          {isEdit ? (
            <DropDown
              items={roomItems}
              selected={room}
              setSelected={handleRoom}
            />
          ) : (
            <>
              <RoomMarker
                room={rresv.room}
                filterHandler={(e) => e}
                className='mx-1 h-4 w-4 rounded-full border'
              />
              <span>{rresv.room}</span>
            </>
          )}
        </div>

        <div className='flex'>
          {!isEdit && (
            <Button
              onClick={() => handleEdit(rresv.id)}
              className='border-none text-yellow'
            >
              <RiEditLine />
            </Button>
          )}
          {!isEdit && (
            <Button
              onClick={() => handleDelete(rresv)}
              className='border-none text-red'
            >
              <RiDeleteBin6Line />
            </Button>
          )}
          {isEdit && (
            <Button onClick={handleItemSave} className='border-none text-green'>
              <RiCheckLine />
            </Button>
          )}
          {isEdit && (
            <Button
              onClick={() => handleReset(rresv.id)}
              className='border-none text-red'
            >
              <RiCloseLine />
            </Button>
          )}
        </div>
      </div>

      {isEdit ? (
        <input
          className='my-1 mr-auto bg-white text-black'
          onChange={handleActivity}
          value={activity}
        />
      ) : (
        <div className='my-1 mr-auto'>{rresv.activity}</div>
      )}

      <div className='flex justify-between'>
        <div>
          <span className='pr-2'>van:&nbsp;</span>
          {isEdit ? (
            <input
              className='my-1 bg-white text-black'
              onChange={handleTimestart}
              value={timestart}
              type='time'
            />
          ) : (
            <span className='my-1 w-[3em]'>{rresv.timestart}</span>
          )}
        </div>
        <div>
          <span className='pr-2'>tot:&nbsp;</span>
          {isEdit ? (
            <input
              className='my-1 bg-white text-black'
              onChange={handleTimeend}
              value={timeend}
              type='time'
            />
          ) : (
            <span className='my-1 w-[3em]'>{rresv.timeend}</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default MonthListItem;
