import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/nl";

import Month from "./Month";
import useResvContext from "../hooks/use-resv-context";
import useRoomContext from "../hooks/use-room-context";

dayjs.extend(utc);

function App() {
  const { fetchResvs } = useResvContext();
  const { fetchRooms } = useRoomContext();

  const displayDate = dayjs.utc("2023-09-30").locale("nl");

  useEffect(() => {
    void fetchResvs();
    void fetchRooms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Month displayDate={displayDate}></Month>;
}

export default App;
