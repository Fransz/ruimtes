import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import React, { createContext, useState } from "react";

interface IResv {
  date: Dayjs;
  timestart: string;
  timeend: string;
  activity: string;
  room: string;
  id: number;
}

interface IResvCtx {
  resvs: IResv[];
  createResv: (r: IResv) => Promise<void>;
  fetchResvs: () => Promise<void>;
  updateResv: (r: IResv) => Promise<void>;
  deleteResv: (r: IResv) => Promise<void>;
}

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const ResvContext = createContext({} as IResvCtx);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [resvs, setResvs] = useState([] as IResv[]);

  const createResv = async (res: IResv): Promise<void> => {
    const { data: r } = await axios.post("http://localhost:3001/resvs", res);
    setResvs([...resvs, r]);
  };

  const fetchResvs = async (): Promise<void> => {
    const { data: rs } = await axios.get("http://localhost:3001/resvs");

    rs.map((r: IResv) => {
      const d = r.date;
      r.date = dayjs.utc(d, "YYYY-MM-DD");
      return r;
    });
    setResvs(rs);
  };

  const updateResv = async (res: IResv): Promise<void> => {
    const date = res.date.toISOString().slice(0, 10);
    const updated = { ...res, date };
    await axios
      .put(`http://localhost:3001/resvs/${res.id}`, updated)
      .then(() => {
        setResvs([...resvs.filter((r) => r.id !== res.id), res]);
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

  return <ResvContext.Provider value={ctx}>{children}</ResvContext.Provider>;
};

export { Provider, type IResv, type IResvCtx };
export default ResvContext;
