import { useEffect } from "react";

import Month from "./month/Month";
import useResvContext from "../hooks/use-resv-context";
import useRoomContext from "../hooks/use-room-context";

import "react-datepicker/dist/react-datepicker.css";

import { store } from "../store/store";
import { Provider } from "react-redux";

function App() {
  const { fetchResvs } = useResvContext();
  const { fetchRooms } = useRoomContext();

  useEffect(() => {
    void fetchResvs();
    void fetchRooms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Provider store={store}>
      <Month />
    </Provider>
  );
}

export default App;
