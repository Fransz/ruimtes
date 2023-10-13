import React, { createContext, useState } from "react";
import axios from "axios";

interface IRoom {
  id: number;
  name: string;
}

interface IRoomCtx {
  rooms: IRoom[];
  fetchRooms: () => Promise<void>;
}

const RoomCtx = createContext({} as IRoomCtx);

const Provider = ({ children }: { children: React.ReactElement }) => {
  const [rooms, setRooms] = useState([] as IRoom[]);

  const fetchRooms = async (): Promise<void> => {
    axios.get("http://localhost:3001/rooms").then(({ data: rs }) => {
      setRooms(rs);
    });
  };

  const ctx = {
    rooms,
    fetchRooms,
  };

  return <RoomCtx.Provider value={ctx}>{children}</RoomCtx.Provider>;
};

export { Provider, type IRoom, type IRoomCtx };
export default RoomCtx;
