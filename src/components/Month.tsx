import MonthDay, { NoDay } from "./MonthDay";
import React, { useState } from "react";
import MonthList from "./MonthList";

interface IMonth {
  displayDate: Date;
}
const Month = ({ displayDate }: IMonth) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<Date | undefined>(undefined);
  const [currentRoom, setCurrentRoom] = useState<string | undefined>(undefined);

  const dayClickHandler = (d: Date): void => {
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(undefined);
  };

  const roomClickHandler = (e: React.MouseEvent, d: Date, r: string): void => {
    e.stopPropagation();
    setShowList(true);
    setCurrentDay(d);
    setCurrentRoom(r);
  };

  /**
   * Handler for closing the list.
   */
  const closeHandler = () => {
    setShowList(!showList);
  };

  /**
   * Handler for filtering the list.
   */
  const filterHandler = (r: string | undefined) => {
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
          <MonthList
            room={currentRoom}
            day={currentDay ?? first}
            key={currentDay?.getTime()}
            closeHandler={closeHandler}
            filterHandler={filterHandler}
          />
        )}
      </div>
    </>
  );
};
export default Month;
