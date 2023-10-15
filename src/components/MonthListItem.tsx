import React, { useState } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiEditLine,
} from "react-icons/ri";

import Button from "./Button";
import RoomMarker from "./RoomMarker";
import { type IResv, TActivity } from "../context/Resv";
import DropDown, { IDropDownItem } from "./DropDown";
import useRoomContext from "../hooks/use-room-context";
import { IRoom } from "../context/Room";
import { Dayjs } from "dayjs";

interface IRoomItem extends IDropDownItem {}

interface IMonthListItem {
  resv: IResv | undefined;
  handleEdit: (i: number) => void;
  handleCreate: (
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ) => void;
  handleSave: (
    id: number,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ) => void;
  handleReset: (i: number) => void;
  handleDelete: (r: IResv) => void;
  isEdit: boolean;
  isNew: boolean;
}

const MonthListItem = ({
  resv,
  handleEdit,
  handleSave,
  handleCreate,
  handleReset,
  handleDelete,
  isEdit,
  isNew,
}: IMonthListItem) => {
  // Items for the dropdown.
  const { rooms } = useRoomContext();
  const roomItems = rooms.map((r) => {
    return {
      key: r.id,
      value: r,
      label: (
        <div className='mx-auto flex items-center px-2'>
          <RoomMarker
            room={r}
            filterHandler={(e) => e}
            className='mx-1 h-4 w-4 rounded-full border'
          />
          <div>{r.name}</div>
        </div>
      ),
    };
  });

  const [room, setRoom] = useState<IRoomItem>(
    roomItems.find((i) => i.value.id === resv?.room.id) ?? roomItems[0]
  );
  const [activity, setActivity] = useState(resv?.activity || "");
  const [timestart, setTimestart] = useState(resv?.timestart || "");
  const [timeend, setTimeend] = useState(resv?.timeend || "");

  const handleActivity = (e: React.ChangeEvent) =>
    setActivity((e.target as HTMLInputElement).value);
  const handleTimestart = (e: React.ChangeEvent) =>
    setTimestart((e.target as HTMLInputElement).value);
  const handleTimeend = (e: React.ChangeEvent) =>
    setTimeend((e.target as HTMLInputElement).value);
  const handleRoom = (r: IRoomItem) => setRoom(r);

  const handleItemSave = () => {
    if (resv) {
      handleSave(resv.id, room.value as IRoom, activity, timestart, timeend);
    } else {
      handleCreate(room.value as IRoom, activity, timestart, timeend);
    }
  };

  const handleItemReset = () => {
    if (resv) {
      handleReset(resv.id);
    } else {
      setRoom(roomItems[0]);
      setActivity("");
      setTimeend("");
      setTimestart("");
    }
  };

  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          {isEdit || isNew ? (
            <DropDown
              items={roomItems}
              selected={room}
              setSelected={handleRoom}
            />
          ) : (
            <>
              <RoomMarker
                room={resv!.room}
                filterHandler={(e) => e}
                className='mx-1 h-4 w-4 rounded-full border'
              />
              <span>{resv!.room.name}</span>
            </>
          )}
        </div>

        <div className='flex'>
          {!isEdit && !isNew && (
            <Button
              onClick={() => handleEdit(resv!.id)}
              className='border-none text-yellow'
            >
              <RiEditLine />
            </Button>
          )}
          {!isEdit && !isNew && (
            <Button
              onClick={() => handleDelete(resv!)}
              className='border-none text-red'
            >
              <RiDeleteBin6Line />
            </Button>
          )}
          {(isEdit || isNew) && (
            <Button onClick={handleItemSave} className='border-none text-green'>
              <RiCheckLine />
            </Button>
          )}
          {(isEdit || isNew) && (
            <Button onClick={handleItemReset} className='border-none text-red'>
              <RiCloseLine />
            </Button>
          )}
        </div>
      </div>

      {isEdit || isNew ? (
        <input
          className='my-1 mr-auto bg-white text-black'
          onChange={handleActivity}
          value={activity}
        />
      ) : (
        <div className='my-1 mr-auto'>{resv!.activity}</div>
      )}

      <div className='flex justify-between'>
        <div>
          <span className='pr-2'>van:&nbsp;</span>
          {isEdit || isNew ? (
            <input
              className='my-1 bg-white text-black'
              onChange={handleTimestart}
              value={timestart}
              type='time'
            />
          ) : (
            <span className='my-1 w-[3em]'>{resv!.timestart}</span>
          )}
        </div>
        <div>
          <span className='pr-2'>tot:&nbsp;</span>
          {isEdit || isNew ? (
            <input
              className='my-1 bg-white text-black'
              onChange={handleTimeend}
              value={timeend}
              type='time'
            />
          ) : (
            <span className='my-1 w-[3em]'>{resv!.timeend}</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default MonthListItem;
