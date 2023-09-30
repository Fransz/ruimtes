import Button from "./Button";
import { RiCheckLine, RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import RoomMarker from "./RoomMarker";

const MonthListItem = ({ rresv }) => {
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
          <Button className='border-none text-yellow'>
            <RiEditLine />
          </Button>
          <Button className='border-none text-green'>
            <RiCheckLine />
          </Button>
          <Button className='border-none text-red'>
            <RiDeleteBin6Line />
          </Button>
        </div>
      </div>
      <div className='mr-auto'>{rresv.activity}</div>
      <div>
        <span className='pr-2'>van:&nbsp;</span>
        <span>{rresv.timestart}</span>
        <span className='px-2'>tot:&nbsp;</span>
        <span>{rresv.timeend}</span>
      </div>
    </li>
  );
};

export default MonthListItem;
