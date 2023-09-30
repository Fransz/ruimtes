import MonthDayRoom from './MonthDayRoom'

const dFormat = new Intl.DateTimeFormat('nl-NL', { weekday: 'long' })

const MonthDay = ({ rresvs, date, dayClickHandler, roomClickHandler }) => {
  const rooms = ['rode kamer', 'groene kamer', 'rose kamer', 'multiruimte', 'huiskamer', 'keuken']
  const rRooms = rooms
    .filter((r) => rresvs.some((rresv) => rresv.room === r))
    .map((r) => {
      const rr = r.replace(' ', '')
      return <MonthDayRoom roomClickHandler={e => roomClickHandler(e, date, r)} key={rr} room={rr} />
  })

  return (
    <div onClick={e => dayClickHandler(e, date)} className='w-[14%] border border-blue'>
      <div className='flex items-baseline justify-between'>
        <div className='ml-3'>{dFormat.format(date)}</div>
        <div className='mr-3 text-[2rem]'>{date.getDate()}</div>
      </div>
      <div className='flex justify-start min-h-[1rem] mb-4'>
        {rRooms}
      </div>
    </div>
  )
}

const NoDay = () => {
  return <div className='w-[14%] border border-blue'>&nbsp;</div>
}
export { NoDay }
export default MonthDay
