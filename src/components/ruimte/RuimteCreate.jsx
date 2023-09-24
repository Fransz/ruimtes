import { useState } from 'react'
import useRresvContext from '../../hooks/use-rresv-context'
import Button from '../Button'

const RresvCreate = () => {
  const [activiteit, setActiviteit] = useState('')
  const { createRresv } = useRresvContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    createRresv({ activiteit })
    setActiviteit('')
  }

  return (
    <div>
      <h3>Nieuwe activiteit</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={activiteit}
          onChange={(e) => setActiviteit(e.target.value)}
          className='text-black'
        />
        <Button warning>nieuwe activiteit</Button>
      </form>
    </div>
  )
}

export default RresvCreate
