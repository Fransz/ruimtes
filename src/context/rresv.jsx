import axios from "axios";
import { createContext, useState } from "react";

const RresvContext = createContext(null);

const Provider = ({ children }) => {
  const [rresvs, setRresvs] = useState([]);

  const createRresv = async (activity) => {
    // Todo: Object -> String for the date values.
    const { data: r } = await axios.post(
      "http://localhost:3001/rresv",
      activity
    );
    setRresvs([...rresvs, r]);
  };

  const fetchRresvs = async () => {
    const { data: rs } = await axios.get("http://localhost:3001/rresv");
    rs.map((r) => {
      const d = r.date;
      r.date = new Date(d);
      return r;
    });
    setRresvs(rs);
  };

  const updateRresv = async (activity) => {
    const date = activity.date.toISOString().slice(0, 10);
    const updated = { ...activity, date };
    await axios
      .put(`http://localhost:3001/rresv/${activity.id}`, updated)
      .then((r) => {
        setRresvs([...rresvs.filter((r) => r.id !== activity.id), activity]);
      });
  };

  const deleteRresv = async (activity) => {
    await axios
      .delete(`http://localhost:3001/rresv/${activity.id}`)
      .then((r) => {
        setRresvs(rresvs.filter((r) => r.id !== activity.id));
      });
  };

  const deleteRresvById = async (id) => {
    await axios.delete(`http://localhost:3001/rresv/${id}`).then((r) => {
      setRresvs(rresvs.filter((r) => r.id !== id));
    });
  };

  const ctx = {
    rresvs,
    createRresv,
    updateRresv,
    deleteRresv,
    fetchRresvs,
  };

  return <RresvContext.Provider value={ctx}>{children}</RresvContext.Provider>;
};

export { Provider };
export default RresvContext;
