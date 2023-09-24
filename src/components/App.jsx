import Month from "./Month";

import { useEffect } from "react";
import useRresvContext from "../hooks/use-rresv-context";

function App() {
  const { rresvs, fetchRresvs, createRresv } = useRresvContext();

  const displayDate = new Date();

  useEffect(() => {
    fetchRresvs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Month displayDate={displayDate}></Month>;
}

export default App;
