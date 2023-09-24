import useRresvContext from '../../hooks/use-rresv-context'
import Button from '../Button'

const RresvShow = ({ rresv }) => {
  const { deleteRresvById } = useRresvContext()

  return (
    <div className='m-3 p-5 border border-aqua flex justify-start'>
      <h3>
        {rresv.activiteit}
      </h3>
      <Button id='delete' onClick={() => deleteRresvById(rresv.id)} className='mx-5'>D</Button>
      <Button id='edit' onClick={() => console.log(`E ${rresv.id}`)} className='mx-5'>E</Button>
    </div>
  )
}

export default RresvShow
