import React, { forwardRef } from "react";
import { RiCloseLine } from "react-icons/ri";

import Button from "../widgets/Button";
import RoomMarker from "../widgets/RoomMarker";
import { IRoom } from "../../context/Room";
import useRoomContext from "../../hooks/use-room-context";
import dayjs, { Dayjs } from "dayjs";

import DatePicker, { registerLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";
import { useRootDispatch, useStateSelector } from "../../hooks/use-store";
import { currentDateSelector, setCurrentDate } from "../../store/store";

interface IListBar {
  handleCloseList: () => void;
  isNew: boolean;
  handleNewItem: () => void;
  handleFilterList: (r: IRoom | undefined) => void;
  filterRooms: IRoom[];
}
type TListBar = React.PropsWithChildren<IListBar>;

registerLocale("nl", nl); // locale for day-fns

const ListBar = ({
  handleCloseList,
  isNew,
  handleNewItem,
  handleFilterList,
  filterRooms,
}: TListBar) => {
  const { rooms } = useRoomContext();
  const dispatch = useRootDispatch();
  const date = useStateSelector(currentDateSelector);

  const handleDateChange = (d: Dayjs): void => {
    dispatch(setCurrentDate(d));
  };

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
        <Button onClick={onClick ?? ((_) => undefined)}>Datum</Button>
      </div>
    )
  );

  return (
    <>
      <div className='my-3 flex justify-around'>
        <Button onClick={handleNewItem}>{isNew ? "alle" : "nieuw"}</Button>
        <DatePicker
          onChange={(d) => handleDateChange(dayjs(d))}
          className='border border-red bg-black text-white'
          selected={date.toDate()}
          locale='nl'
          customInput={<DatePickerButton />}
        />
        <Button onClick={handleCloseList}>sluit</Button>
      </div>
      <h1 className='text-center text-xl'>{`${date.format("D MMMM YYYY")}`}</h1>
      <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
    </>
  );
};

export default ListBar;
