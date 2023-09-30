import useRresvContext from "../hooks/use-rresv-context";
import RoomMarker from "./RoomMarker";
import Button from "./Button";
import {
  RiCheckboxLine,
  RiCheckLine,
  RiDeleteBin6Line,
  RiEditLine,
} from "react-icons/ri";

const MonthList = ({ day, room, closeHandler, filterHandler }) => {
  const { rresvs } = useRresvContext();

  const renderedItems = rresvs
    .filter(
      (r) =>
        r.date.getTime() === day.getTime() &&
        (room === undefined || r.room === room)
    )
    .map((r) => <MonthListItem key={r.id} rresv={r} />);

  return (
    <>
      <h1 className='text-center text-xl'>{`Bezetting op ${day.toLocaleDateString()}`}</h1>
      <ListBar
        closeHandler={closeHandler}
        filterHandler={filterHandler}
        curFilter={room}
      />
      <ul>{renderedItems}</ul>
    </>
  );
};

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
          <Button className='border-none px-0'>
            <RiEditLine />
          </Button>
          <Button className='border-none px-0'>
            <RiCheckLine />
          </Button>
          <Button className='border-none px-0'>
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
export default MonthList;
