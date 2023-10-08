import Month from "./Month";

import { useEffect } from "react";
import useRresvContext from "../hooks/use-rresv-context";

function App() {
  const { fetchRresvs } = useRresvContext();

  const displayDate = new Date("2023-09-30");

  useEffect(() => {
    void fetchRresvs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Month displayDate={displayDate}></Month>;
}

export default App;
