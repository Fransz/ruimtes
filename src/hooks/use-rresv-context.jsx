import { useContext } from 'react'
import RresvContext from '../context/rresv'

function useRresvContext () {
  return useContext(RresvContext)
}

export default useRresvContext
