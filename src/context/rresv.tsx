import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import React, { createContext, useState } from "react";

interface IRresv {
  date: Dayjs;
  timestart: string;
  timeend: string;
  activity: string;
  room: string;
  id: number;
}

interface IRresvCtx {
  rresvs: IRresv[];
  createRresv: (r: IRresv) => Promise<void>;
  fetchRresvs: () => Promise<void>;
  updateRresv: (r: IRresv) => Promise<void>;
  deleteRresv: (r: IRresv) => Promise<void>;
}

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const RresvContext = createContext({} as IRresvCtx);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [rresvs, setRresvs] = useState([] as IRresv[]);

  const createRresv = async (res: IRresv): Promise<void> => {
    const { data: r } = await axios.post("http://localhost:3001/rresv", res);
    setRresvs([...rresvs, r]);
  };

  const fetchRresvs = async (): Promise<void> => {
    const { data: rs } = await axios.get("http://localhost:3001/rresv");

    rs.map((r: IRresv) => {
      const d = r.date;
      r.date = dayjs.utc(d, "YYYY-MM-DD");
      return r;
    });
    setRresvs(rs);
  };

  const updateRresv = async (res: IRresv): Promise<void> => {
    const date = res.date.toISOString().slice(0, 10);
    const updated = { ...res, date };
    await axios
      .put(`http://localhost:3001/rresv/${res.id}`, updated)
      .then(() => {
        setRresvs([...rresvs.filter((r) => r.id !== res.id), res]);
      });
  };

  const deleteRresv = async (res: IRresv): Promise<void> => {
    await axios.delete(`http://localhost:3001/rresv/${res.id}`).then(() => {
      setRresvs(rresvs.filter((r) => r.id !== res.id));
    });
  };

  const ctx: IRresvCtx = {
    rresvs,
    createRresv,
    updateRresv,
    deleteRresv,
    fetchRresvs,
  };

  return <RresvContext.Provider value={ctx}>{children}</RresvContext.Provider>;
};

export { Provider, type IRresv, type IRresvCtx };
export default RresvContext;
