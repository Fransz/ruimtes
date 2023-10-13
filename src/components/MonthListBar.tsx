import Button from "./Button";
import RoomMarker from "./RoomMarker";
import React from "react";
import { IRoom } from "../context/Room";
import useRoomContext from "../hooks/use-room-context";

interface IListBar {
  closeHandler: () => void;
  filterHandler: (r: IRoom | undefined) => void;
  curFilter: IRoom | undefined;
}

const ListBar = ({ closeHandler, filterHandler, curFilter }: IListBar) => {
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

  const filterName = (
    <h1 className='my-2 text-center text-xl'>
      {curFilter?.name ?? "allemaal"}
    </h1>
  );
  return (
    <>
      <div className='my-2'>
        <div className='my-3 flex justify-around'>
          <Button onClick={(_) => console.log("not yet")}>nieuw</Button>
          <Button onClick={closeHandler}>sluit</Button>
        </div>
        <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
        {filterName}
      </div>
    </>
  );
};

export default ListBar;
