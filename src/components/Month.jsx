import useRresvContext from "../hooks/use-rresv-context";
import MonthDay, { NoDay } from "./MonthDay";
import { useState } from "react";
import MonthList from "./MonthList";

const Month = ({ displayDate }) => {
  const [showList, setShowList] = useState(false);
  const [currentDay, setCurrentDay] = useState(undefined);
  const [currentRoom, setCurrentRoom] = useState(undefined);

  const dayClickHandler = (e, d) => {
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(undefined);
  };

  const roomClickHandler = (e, d, r) => {
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(r);
    e.stopPropagation();
  };

  /**
   * Handler for closing the list.
   */
  const closeHandler = (e) => {
    setShowList(!showList);
  };

  /**
   * Handler for filtering the list.
   */
  const filterHandler = (e, r) => {
    setCurrentRoom(r);
  };

  const first = new Date(
    Date.UTC(displayDate.getFullYear(), displayDate.getMonth(), 1)
  );
  const last = new Date(
    Date.UTC(displayDate.getFullYear(), displayDate.getMonth() + 1, 0)
  );

  // Nr of befores; Days in week before first day.
  const bf = first.getDay() === 0 ? 6 : first.getDay() - 1;
  const befores = Array.from(new Array(bf), (_, i) => <NoDay key={i} />);

  // All days.
  let days = Array.from(
    new Array(last.getDate()),
    (_, i) => new Date(Date.UTC(first.getFullYear(), first.getMonth(), i + 1))
  ).map((d, i) => (
    <MonthDay
      key={i}
      day={d}
      roomClickHandler={roomClickHandler}
      dayClickHandler={dayClickHandler}
    />
  ));

  const fmt = Intl.DateTimeFormat("nl-NL", { year: "numeric", month: "long" });
  const header = fmt.format(displayDate);

  return (
    <>
      <div className='py-6 text-center text-6xl'>{header}</div>
      <div className='flex'>
        <div className='mb-auto flex w-[80%] flex-row flex-wrap'>
          {befores}
          {days}
        </div>
        {showList && (
          <div className=''>
            <MonthList
              room={currentRoom}
              day={currentDay}
              closeHandler={closeHandler}
              filterHandler={filterHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Month;
