const MonthList = ({ date, room, rresvs }) => {
  const renderedItems = rresvs.map(r => <MonthListItem rresv={r} />)
  return (
    <>
      <h1 className='text-xl text-center'>{`Bezetting ${room} op`}</h1>
      <h1 className='text-xl text-center'>{ date.toLocaleDateString() }</h1>
      <ul>{renderedItems}</ul>
    </>
  )
}

const MonthListItem = ({ rresv }) => {

 return <li className='border-y-2 my-4 py-2'>
   <div>{rresv.activity}</div>
   <div>
     <span className="pr-2">van:&nbsp;</span><span>{rresv.timestart}</span>
     <span className="px-2">tot:&nbsp;</span><span>{rresv.timeend}</span>
   </div>
 </li>
}
export default MonthList;