import Button from "./Button";
import {
  RiCheckLine,
  RiCloseLine,
  RiDeleteBin6Line,
  RiEditLine,
} from "react-icons/ri";
import RoomMarker from "./RoomMarker";
import { useState } from "react";

const MonthListItem = ({
  rresv,
  handleEdit,
  isEdit,
  handleSave,
  handleReset,
  handleDelete,
}) => {
  const [activity, setActivity] = useState(rresv.activity);
  const [timestart, setTimestart] = useState(rresv.timestart);
  const [timeend, setTimeend] = useState(rresv.timeend);

  const handleActivity = (e) => setActivity(e.target.value);
  const handleTimestart = (e) => setTimestart(e.target.value);
  const handleTimeend = (e) => setTimeend(e.target.value);

  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <RoomMarker
            room={rresv.room}
            filterHandler={(e) => e}
            className='mx-1 h-4 w-4 rounded-full border'
          />
          {rresv.room}
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
            <Button onClick={handleSave} className='border-none text-green'>
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
          className='mr-auto text-black'
          onChange={handleActivity}
          value={activity}
        />
      ) : (
        <div className='mr-auto'>{rresv.activity}</div>
      )}
      <div>
        <span className='pr-2'>van:&nbsp;</span>
        {isEdit ? (
          <input
            className='w-[3em] text-black'
            onChange={handleTimestart}
            value={timestart}
          />
        ) : (
          <span className='w-[3em]'>{rresv.timestart}</span>
        )}
        <span className='px-2'>tot:&nbsp;</span>
        {isEdit ? (
          <input
            className='w-[3em] text-black'
            onChange={handleTimeend}
            value={timeend}
          />
        ) : (
          <span className='w-[3em]'>{rresv.timeend}</span>
        )}
      </div>
    </li>
  );
};

export default MonthListItem;
