import { useEffect } from "react";

import { EStatus, fetchResvs } from "../store/resv";
import { useRootDispatch, useStateSelector } from "../hooks/use-store";
import useRoomContext from "../hooks/use-room-context";

import Month from "./month/Month";

import "react-datepicker/dist/react-datepicker.css"; // css for the datepicker

function App() {
  const { fetchRooms } = useRoomContext();
  const fetchStatus = useStateSelector((state) => state.resvs.status);
  const dispatch = useRootDispatch();

  useEffect(() => {
    void fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (fetchStatus === EStatus.IDLE) dispatch(fetchResvs());
  }, [dispatch, fetchStatus]);

  switch (fetchStatus) {
    case EStatus.LOADING:
      return <div>Loading....</div>;
    case EStatus.FAILED:
      return <div>Error!</div>;
    case EStatus.SUCCEEDED:
      return <Month />;
  }
}

export default App;
