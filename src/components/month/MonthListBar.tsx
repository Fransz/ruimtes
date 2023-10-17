import React, { forwardRef } from "react";
import { RiCloseLine } from "react-icons/ri";

import Button from "../widgets/Button";
import RoomMarker from "../widgets/RoomMarker";
import { IRoom } from "../../context/Room";
import useRoomContext from "../../hooks/use-room-context";
import { Dayjs } from "dayjs";

import DatePicker, { registerLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";

interface IListBar {
  handleCloseList: () => void;
  isNew: boolean;
  handleNewItem: () => void;
  handleFilterList: (r: IRoom | undefined) => void;
  calendarDate: Dayjs;
  handleCalendarDateChange: (d: Date | null) => void;
  filterRooms: IRoom[];
}
type TListBar = React.PropsWithChildren<IListBar>;

registerLocale("nl", nl);

const ListBar = ({
  handleCloseList,
  isNew,
  handleNewItem,
  handleFilterList,
  filterRooms,
  calendarDate,
  handleCalendarDateChange,
  children,
}: TListBar) => {
  const { rooms } = useRoomContext();
  const renderedRooms = rooms.map((r) => {
    return (
      <li key={r.id}>
        <RoomMarker
          filterHandler={(_) => handleFilterList(r)}
          room={r}
          className={`mx-1 h-4 w-4 ${
            filterRooms.some((fr) => fr.id === r.id)
              ? "border-4 border-white"
              : ""
          }`}
        />
      </li>
    );
  });

  const filters = [
    ...renderedRooms,
    filterRooms.length > 0 && (
      <li key='all' onClick={(_) => handleFilterList(undefined)}>
        <RiCloseLine />
      </li>
    ),
  ];

  let DatePickerButton = forwardRef<HTMLDivElement, { onClick?: () => void }>(
    ({ onClick }, ref) => (
      <div ref={ref}>
        <Button onClick={onClick ?? ((e) => undefined)}>Datum</Button>
      </div>
    )
  );

  return (
    <>
      <div className='my-3 flex justify-around'>
        <Button onClick={handleNewItem}>{isNew ? "alle" : "nieuw"}</Button>
        <DatePicker
          onChange={(d) => handleCalendarDateChange(d)}
          className='border border-red bg-black text-white'
          selected={calendarDate.toDate()}
          locale='nl'
          customInput={<DatePickerButton />}
        />
        <Button onClick={handleCloseList}>sluit</Button>
      </div>
      <div className='my-2'>
        {children}
        <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
      </div>
    </>
  );
};

export default ListBar;
