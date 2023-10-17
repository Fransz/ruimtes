import { useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/nl";

import Month from "./month/Month";
import useResvContext from "../hooks/use-resv-context";
import useRoomContext from "../hooks/use-room-context";

import "react-datepicker/dist/react-datepicker.css";

dayjs.extend(utc);

function App() {
  const { fetchResvs } = useResvContext();
  const { fetchRooms } = useRoomContext();
  const [calendarDate, setCalendarDate] = useState<Dayjs>(
    dayjs().utc().locale("nl")
  );

  useEffect(() => {
    void fetchResvs();
    void fetchRooms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCalendarDateChange = (d: Date | null): void => {
    if (d) setCalendarDate(dayjs.utc(d).locale("nl"));
  };

  // return <DateComponent initDate={date} />;
  return (
    <Month
      calendarDate={calendarDate}
      handleCalendarDateChange={handleCalendarDateChange}
    ></Month>
  );
}

export default App;
