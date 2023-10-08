import Button from "./Button";
import RoomMarker from "./RoomMarker";
import React from "react";

interface IListBar {
  closeHandler: () => void;
  filterHandler: (r: string | undefined) => void;
  curFilter: string | undefined;
}

const ListBar = ({ closeHandler, filterHandler, curFilter }: IListBar) => {
  const filters = [
    <li key='all' onClick={(_) => filterHandler(undefined)}>
      alle
    </li>,
    ...[
      "rode kamer",
      "groene kamer",
      "rose kamer",
      "multiruimte",
      "huiskamer",
      "keuken",
    ].map((r) => {
      return (
        <li key={r}>
          <RoomMarker
            filterHandler={(_) => filterHandler(r)}
            key={r}
            room={r === curFilter ? r : `dimmed ${r}`}
            className='mx-1 h-4 w-4 border-2'
          />
        </li>
      );
    }),
  ];

  const filterName = (
    <h1 className='my-2 text-center text-xl'>{curFilter ?? "allemaal"}</h1>
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
