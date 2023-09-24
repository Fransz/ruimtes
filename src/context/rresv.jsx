import axios from 'axios'
import { createContext, useState } from 'react'

const RresvContext = createContext(null)

const Provider = ({ children }) => {
  const [rresvs, setRresvs] = useState([])

  const createRresv = async (activity) => {
    // Todo: Object -> String for the date values.
    const { data: r } = await axios.post(
      'http://localhost:3001/rresv',
      activity
    )
    setRresvs([...rresvs, r])
  }

  const fetchRresvs = async () => {
    const { data: rs } = await axios.get('http://localhost:3001/rresv')
    rs.map(r => {
      const d = r.date
      r.date = new Date(d)
      r.startTime = new Date(`${d}T${r.startTime}`)
      r.endTime = new Date(`${d}T${r.endTime}`)
      return r
    })
    setRresvs(rs)
  }

  const deleteRresvById = async (id) => {
    await axios.delete(`http://localhost:3001/rresv/${id}`)
    setRresvs(rresvs.filter((r) => r.id !== id))
  }

  const ctx = {
    rresvs,
    createRresv,
    deleteRresvById,
    fetchRresvs
  }

  return (
    <RresvContext.Provider value={ctx}>{children}</RresvContext.Provider>
  )
}

export { Provider }
export default RresvContext
