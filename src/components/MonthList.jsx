import useRresvContext from '../hooks/use-rresv-context'

const MonthList = ({ day, room }) => {

  const { rresvs } = useRresvContext()
  const renderedItems =rresvs.filter(r => r.date.getTime() === day.getTime() && (room === undefined || r.room === room))
    .map(r => <MonthListItem rresv={r} />)

  return (
    <>
      <h1 className='text-xl text-center'>{`Bezetting op ${day.toLocaleDateString()}`}</h1>
      { room && <h1 className='text-xl text-center'>{ room }</h1> }
      <ul>{renderedItems}</ul>
    </>
  )
}

const MonthListItem = ({ rresv }) => {

 return <li className='border-y-2 my-4 py-2'>
   <div>{rresv.activity}</div>
   <div>{rresv.room}</div>
   <div>
     <span className="pr-2">van:&nbsp;</span><span>{rresv.timestart}</span>
     <span className="px-2">tot:&nbsp;</span><span>{rresv.timeend}</span>
   </div>
 </li>
}
export default MonthList;