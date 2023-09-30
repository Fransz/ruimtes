import Button from "./Button";
import RoomMarker from "./RoomMarker";

const ListBar = ({ closeHandler, filterHandler, curFilter }) => {
  const filters = [
    <li key='all' onClick={(e) => filterHandler(e, undefined)}>
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
            filterHandler={(e) => filterHandler(e, r)}
            key={r}
            room={r === curFilter ? r : `dimmed ${r}`}
            className='mx-1 h-4 w-4 border'
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
          <Button onClick={(e) => console.log("not yet")}>nieuw</Button>
          <Button onClick={closeHandler}>sluit</Button>
        </div>
        <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
        {filterName}
      </div>
    </>
  );
};

export default ListBar;
