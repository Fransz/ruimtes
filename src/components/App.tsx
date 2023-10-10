import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/nl";

import Month from "./Month";
import useRresvContext from "../hooks/use-rresv-context";

dayjs.extend(utc);

function App() {
  const { fetchRresvs } = useRresvContext();

  const displayDate = dayjs.utc("2023-09-30").locale("nl");

  useEffect(() => {
    void fetchRresvs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Month displayDate={displayDate}></Month>;
}

export default App;
