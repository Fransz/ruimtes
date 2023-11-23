import { useEffect } from "react";

import { EStatus, fetchResvs, statusSelector } from "../store/resv";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";
import useRoomContext from "../hooks/use-room-context";

import Month from "./month/Month";

import "react-datepicker/dist/react-datepicker.css"; // css for the datepicker
import MonthWrapper from "./month/MonthWrapper";

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

  let status;
  switch (fetchStatus) {
    case EStatus.FAILED:
      status = <div>Error!</div>;
      break;
    case EStatus.SUCCEEDED:
      status = null;
      break;
    case EStatus.LOADING:
      status = <div>Loading....</div>;
      break;
    default:
      status = <div>Dunno!</div>;
  }
  return (
    <>
      {status}
      <MonthWrapper />
    </>
  );
};

export default App;
