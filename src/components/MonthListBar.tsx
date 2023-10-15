import Button from "./Button";
import RoomMarker from "./RoomMarker";
import React from "react";
import { IRoom } from "../context/Room";
import useRoomContext from "../hooks/use-room-context";

interface IListBar {
  closeHandler: () => void;
  isNew: boolean;
  newHandler: () => void;
  filterHandler: (r: IRoom | undefined) => void;
  curFilter: IRoom | undefined;
}

type TListBar = React.PropsWithChildren<IListBar>;

const ListBar = ({
  closeHandler,
  isNew,
  newHandler,
  filterHandler,
  curFilter,
  children,
}: TListBar) => {
  const { rooms } = useRoomContext();
  const renderedRooms = rooms.map((r) => {
    return (
      <li key={r.id}>
        <RoomMarker
          filterHandler={(_) => filterHandler(r)}
          room={r}
          dimmed={r.id !== curFilter?.id}
          className='mx-1 h-4 w-4 border-2'
        />
      </li>
    );
  });

  const filters = [
    <li key='all' onClick={(_) => filterHandler(undefined)}>
      alle
    </li>,
    ...renderedRooms,
  ];

  return (
    <>
      <div className='my-3 flex justify-around'>
        <Button onClick={newHandler}>{isNew ? "alle" : "nieuw"}</Button>
        <Button onClick={closeHandler}>sluit</Button>
      </div>
      <div className='my-2'>
        {children}
        <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
      </div>
    </>
  );
};

export default ListBar;
