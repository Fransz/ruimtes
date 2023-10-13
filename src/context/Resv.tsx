import axios from "axios";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

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
  createResv: (r: IResv) => Promise<void>;
  fetchResvs: () => Promise<void>;
  updateResv: (
    id: number,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ) => Promise<void>;
  deleteResv: (r: IResv) => Promise<void>;
}

type TActivity = string;

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const ResvCtx = createContext({} as IResvCtx);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [resvs, setResvs] = useState([] as IResv[]);

  const createResv = async (res: IResv): Promise<void> => {
    const { data: r } = await axios.post(
      "http://localhost:3001/resvs?_expand=room",
      res
    );
    setResvs([...resvs, r]);
  };

  const fetchResvs = async (): Promise<void> => {
    const { data: rs } = await axios.get(
      "http://localhost:3001/resvs?_expand=room"
    );

    rs.map((r: IResv) => {
      const d = r.date;
      r.date = dayjs.utc(d, "YYYY-MM-DD");
      return r;
    });
    setResvs(rs);
  };

  const updateResv = async (
    id: number,
    room: IRoom,
    activity: TActivity,
    timestart: string,
    timeend: string
  ): Promise<void> => {
    const old = resvs.find((r) => r.id === id);
    if (!old) throw Error();

    const upd = {
      id,
      date: old.date.format("YYYY-MM_DD"),
      activity,
      timestart: timestart,
      timeend: timeend,
      roomId: room.id,
    };
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
    fetchResvs,
  };

  return <ResvCtx.Provider value={ctx}>{children}</ResvCtx.Provider>;
};

export { Provider, type IResv, type IResvCtx, type TActivity };
export default ResvCtx;
