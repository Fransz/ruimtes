import Button from "./Button";
import RoomMarker from "./RoomMarker";
import React from "react";
import { IRoom } from "../context/Room";
import useRoomContext from "../hooks/use-room-context";

interface IListBar {
  handleCloseList: () => void;
  isNew: boolean;
  handleNewItem: () => void;
  handleFilterList: (r: IRoom | undefined) => void;
  curFilter: IRoom | undefined;
}

type TListBar = React.PropsWithChildren<IListBar>;

const ListBar = ({
  handleCloseList,
  isNew,
  handleNewItem,
  handleFilterList,
  curFilter,
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

  return (
    <>
      <div className='my-3 flex justify-around'>
        <Button onClick={handleNewItem}>{isNew ? "alle" : "nieuw"}</Button>
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
