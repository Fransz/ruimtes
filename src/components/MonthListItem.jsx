import Button from "./Button";
import {
  RiCheckLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiEditLine,
} from "react-icons/ri";
import RoomMarker from "./RoomMarker";
import { useState } from "react";
import Dropdown from "./Dropdown";

const roomItems = [
  {
    value: "rode kamer",
    content: (
      <div className='flex'>
        <RoomMarker
          room='groene kamer'
          filterHandler={(e) => e}
          className='mx-1 h-4 w-4 rounded-full border'
        />
        <span>rode kamer</span>
      </div>
    ),
  },
  {
    value: "groene kamer",
    content: (
      <>
        <RoomMarker
          room='groene kamer'
          filterHandler={(e) => e}
          className='mx-1 h-4 w-4 rounded-full border'
        />
        <span>groene kamer</span>
      </>
    ),
  },
];

const MonthListItem = ({
  rresv,
  handleEdit,
  isEdit,
  handleSave,
  handleReset,
  handleDelete,
}) => {
  const [room, setRoom] = useState(
    roomItems.find((r) => r.value === rresv.room)
  );
  const [activity, setActivity] = useState(rresv.activity);
  const [timestart, setTimestart] = useState(rresv.timestart);
  const [timeend, setTimeend] = useState(rresv.timeend);

  const handleActivity = (e) => setActivity(e.target.value);
  const handleTimestart = (e) => setTimestart(e.target.value);
  const handleTimeend = (e) => setTimeend(e.target.value);

  const handleItemSave = (e) => {
    const a = { ...rresv, activity, timestart, timeend };
    handleSave(e, a);
  };

  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          {isEdit ? (
            <Dropdown items={roomItems} selected={room} />
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
            <Button onClick={handleEdit} className='border-none text-yellow'>
              <RiEditLine />
            </Button>
          )}
          {!isEdit && (
            <Button onClick={handleDelete} className='border-none text-red'>
              <RiDeleteBin6Line />
            </Button>
          )}
          {isEdit && (
            <Button onClick={handleItemSave} className='border-none text-green'>
              <RiCheckLine />
            </Button>
          )}
          {isEdit && (
            <Button onClick={handleReset} className='border-none text-red'>
              <RiCloseLine />
            </Button>
          )}
        </div>
      </div>

      {isEdit ? (
        <input
          className='my-1 mr-auto text-black'
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
              className='my-1 text-black'
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
              className='my-1 text-black'
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
