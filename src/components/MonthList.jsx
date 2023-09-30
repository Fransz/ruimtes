import useRresvContext from "../hooks/use-rresv-context";
import MonthListBar from "./MonthListBar";
import MonthListItem from "./MonthListItem";

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
      <MonthListBar
        closeHandler={closeHandler}
        filterHandler={filterHandler}
        curFilter={room}
      />
      <ul>{renderedItems}</ul>
    </>
  );
};

export default MonthList;
