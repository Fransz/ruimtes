import Button from "./Button";
import RoomMarker from "./RoomMarker";
import React, { forwardRef, useEffect } from "react";
import { IRoom } from "../context/Room";
import useRoomContext from "../hooks/use-room-context";
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
  curFilter: IRoom | undefined;
}
type TListBar = React.PropsWithChildren<IListBar>;

registerLocale("nl", nl);

const ListBar = ({
  handleCloseList,
  isNew,
  handleNewItem,
  handleFilterList,
  curFilter,
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
          dimmed={r.id !== curFilter?.id}
          className='mx-1 h-4 w-4 border-2'
        />
      </li>
    );
  });

  const filters = [
    <li key='all' onClick={(_) => handleFilterList(undefined)}>
      alle
    </li>,
    ...renderedRooms,
  ];

  let DatePickerButton = forwardRef<
    React.ReactElement,
    { onClick?: () => void }
  >(({ onClick }, ref) => (
    <Button onClick={onClick ?? ((e) => undefined)} ref={ref}>
      Datum
    </Button>
  ));

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
