import RoomMarker from "./RoomMarker";
import useRresvContext from "../hooks/use-rresv-context";

const dFormat = new Intl.DateTimeFormat("nl-NL", { weekday: "long" });

const MonthDay = ({ day, dayClickHandler, roomClickHandler }) => {
  const { rresvs } = useRresvContext();
  const dayRresvs = rresvs.filter((r) => r.date.getTime() === day.getTime());

  const rooms = [
    "rode kamer",
    "groene kamer",
    "rose kamer",
    "multiruimte",
    "huiskamer",
    "keuken",
  ]
    .filter((r) => dayRresvs.some((rresv) => rresv.room === r))
    .map((r) => {
      return (
        <RoomMarker
          filterHandler={(e) => roomClickHandler(e, day, r)}
          key={r}
          room={r}
          className='mx-1 h-4 w-4 rounded-full border'
        />
      );
    });

  return (
    <div
      onClick={(e) => dayClickHandler(e, day)}
      className='w-[14%] border border-blue'
    >
      <div className='flex items-baseline justify-between'>
        <div className='ml-3'>{dFormat.format(day)}</div>
        <div className='mr-3 text-[2rem]'>{day.getDate()}</div>
      </div>
      <div className='mb-4 flex min-h-[1rem] justify-start'>{rooms}</div>
    </div>
  );
};

const NoDay = () => {
  return <div className='w-[14%] border border-blue'>&nbsp;</div>;
};
export { NoDay };
export default MonthDay;
