import React, { forwardRef } from "react";
import { RiCloseLine } from "react-icons/ri";

import Button from "../widgets/Button";
import RoomMarker from "../widgets/RoomMarker";
import { IRoom, selectAllRooms } from "../../store/room";
import dayjs, { Dayjs } from "dayjs";

import DatePicker, { registerLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
import useDateContext from "../../hooks/use-date-context";
import { useAppSelector } from "../../hooks/use-store";

interface IListBar {
  handleNewItem: () => void;
  handleClickFilter: (r: IRoom | undefined) => void;
  filteredRooms: IRoom[];
}
type TListBar = React.PropsWithChildren<IListBar>;

registerLocale("nl", nl); // locale for day-fns

const ListBar = ({
  handleNewItem,
  handleClickFilter: handleFilterList,
  filteredRooms: filterRooms,
}: TListBar) => {
  const rooms = useAppSelector(selectAllRooms);
  const { currentDay, setCurrentDay } = useDateContext();

  const handleDateChange = (d: Dayjs): void => {
    setCurrentDay(d);
  };

  const renderedRooms = rooms.map((r) => {
    return (
      <li key={r.id}>
        <RoomMarker
          handleClick={(_) => handleFilterList(r)}
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
        <Button onClick={onClick ?? ((_) => undefined)}>Datum</Button>
      </div>
    )
  );

  return (
    <>
      <div className='my-3 flex justify-around'>
        <Button onClick={handleNewItem}>nieuw</Button>
        <DatePicker
          onChange={(d) => handleDateChange(dayjs(d))}
          className='border border-red bg-black text-white'
          selected={currentDay.toDate()}
          locale='nl'
          customInput={<DatePickerButton />}
        />
      </div>
      <h1 className='text-center text-xl'>{`${currentDay.format(
        "D MMMM YYYY"
      )}`}</h1>
      <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
    </>
  );
};

export default ListBar;
