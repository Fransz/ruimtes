import { useEffect } from "react";

import { EStatus, fetchResvs, statusSelector } from "../store/resv";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";
import useRoomContext from "../hooks/use-room-context";

import Month from "./month/Month";

import "react-datepicker/dist/react-datepicker.css"; // css for the datepicker

const App = () => {
  const { fetchRooms } = useRoomContext();
  const fetchStatus = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (fetchStatus === EStatus.IDLE) dispatch(fetchResvs());
  }, [dispatch, fetchStatus]);

  switch (fetchStatus) {
    case EStatus.FAILED:
      return <div>Error!</div>;
    case EStatus.SUCCEEDED:
      return <Month />;
    case EStatus.LOADING:
      return <div>Loading....</div>;
    default:
      return <div>Dunno!</div>;
  }
};

export default App;
