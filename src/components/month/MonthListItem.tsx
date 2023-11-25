import React from "react";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

import Button from "../widgets/Button";
import RoomMarker from "../widgets/RoomMarker";
import { IResv } from "../../store/resv";

interface IMonthListItem {
  resv: IResv;
  handleEdit: (i: number) => void;
  handleDelete: (r: IResv) => void;
}

const MonthListItem = ({ resv, handleEdit, handleDelete }: IMonthListItem) => {
  return (
    <li className='mt-4 border-t pt-2'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <RoomMarker
            room={resv.room}
            handleClick={(e) => e}
            className='mx-1 h-4 w-4 rounded-full border'
          />
          <span>{resv!.room.name}</span>
        </div>

        <div className='flex'>
          <Button
            onClick={() => handleEdit(resv!.id)}
            className='border-none text-yellow'
          >
            <RiEditLine />
          </Button>
          <Button
            onClick={() => handleDelete(resv!)}
            className='border-none text-red'
          >
            <RiDeleteBin6Line />
          </Button>
        </div>
      </div>

      <div className='my-1 mr-auto'>{resv.activity}</div>

      <div className='flex justify-between'>
        <div>
          <span className='pr-2'>van:&nbsp;</span>
          <span className='my-1 w-[3em]'>{resv.startTime.format("HH:mm")}</span>
        </div>
        <div>
          <span className='pr-2'>tot:&nbsp;</span>
          <span className='my-1 w-[3em]'>{resv.endTime.format("HH:mm")}</span>
        </div>
      </div>
    </li>
  );
};

export default MonthListItem;
