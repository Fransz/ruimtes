import axios from "axios";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import React, { createContext, useState } from "react";

import { type IRoom } from "./Room";

interface IResv {
  date: Dayjs;
  timestart: string;
  timeend: string;
  activity: string;
  room: IRoom;
  id: number;
}

interface IResvCtx {
  resvs: IResv[];
  createResv: (
    date: Dayjs,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ) => Promise<void>;
  updateResv: (
    id: number,
    date: Dayjs,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ) => Promise<void>;
  deleteResv: (r: IResv) => Promise<void>;
}

type TActivity = string;

dayjs.extend(customParseFormat);

const ResvCtx = createContext({} as IResvCtx);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [resvs, setResvs] = useState([] as IResv[]);

  const createResv = async (
    date: Dayjs,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ): Promise<void> => {
    const r = {
      date: date.format("YYYY-MM-DD"),
      activity,
      timestart: timestart,
      timeend: timeend,
      roomId: room.id,
    };
    await axios.post("http://localhost:3001/resvs", r).then(({ data: nr }) => {
      nr.date = dayjs(nr.date, "YYYY-MM-DD");
      nr.room = room;
      setResvs([...resvs, nr]);
    });
  };

  const updateResv = async (
    id: number,
    date: Dayjs,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ): Promise<void> => {
    const old = resvs.find((r) => r.id === id);
    if (!old) throw Error();

    const upd = { id, date, activity, timestart, timeend, roomId: room.id };
    const updd = { ...upd, date: old.date, room };
    await axios.put(`http://localhost:3001/resvs/${upd.id}`, upd).then(() => {
      setResvs([...resvs.filter((r) => r.id !== old.id), updd]);
    });
  };

  const deleteResv = async (res: IResv): Promise<void> => {
    await axios.delete(`http://localhost:3001/resvs/${res.id}`).then(() => {
      setResvs(resvs.filter((r) => r.id !== res.id));
    });
  };

  const ctx: IResvCtx = {
    resvs,
    createResv,
    updateResv,
    deleteResv,
  };

  return <ResvCtx.Provider value={ctx}>{children}</ResvCtx.Provider>;
};

export { Provider, type IResv, type IResvCtx, type TActivity };
export default ResvCtx;
