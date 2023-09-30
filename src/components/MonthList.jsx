import useRresvContext from "../hooks/use-rresv-context";
import { RoomMarker } from "./MonthDayRoom";
import Button from "./Button";

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
      all
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
            room={r}
            className='mx-1 h-4 w-4 border'
          />
        </li>
      );
    }),
  ];

  return (
    <>
      <div className='my-2'>
        <div className='my-3 flex justify-around'>
          <Button onClick={(e) => console.log("not yet")}>nieuw</Button>
          <Button onClick={closeHandler}>sluit</Button>
        </div>
        <ul className='mt-4 flex justify-around align-top'>{filters}</ul>
        {curFilter && <h1 className='my-2 text-center text-xl'>{curFilter}</h1>}
      </div>
    </>
  );
};

const MonthListItem = ({ rresv }) => {
  return (
    <li className='mt-4 border-t pt-2'>
      <div>{rresv.activity}</div>
      <div>{rresv.room}</div>
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
