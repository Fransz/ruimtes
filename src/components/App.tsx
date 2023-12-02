import { useEffect } from "react";

import { EStatus, fetchResvs, statusSelector } from "../store/resv";
import { useAppDispatch, useAppSelector } from "../hooks/use-store";

import "react-datepicker/dist/react-datepicker.css"; // css for the datepicker
import Month from "./month/Month";
import { fetchRooms } from "../store/room";
import Test from "./TestServer.jsx"

const App = () => {
  const fetchStatus = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  useEffect(() => {
    if (fetchStatus === EStatus.IDLE) dispatch(fetchResvs());
  }, []);

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
      <Month />
      <Test />
    </>
  );
};

export default App;
