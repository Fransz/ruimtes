import classNames from 'classnames'

const dFormat = new Intl.DateTimeFormat('nl-NL', { weekday: 'long' })

const MonthDay = ({ rresvs, date }) => {
  const rooms = ['rode kamer', 'groene kamer', 'rose kamer', 'multiruimte', 'huiskamer', 'keuken']
  const rRooms = rooms
    .filter((r) => rresvs.some((rresv) => rresv.room === r))
    .map((r) => r.replace(' ', ''))
    .map((r) => <Room key={r} room={r} />)

  return (
    <div className='w-[14%] border border-blue'>
      <div className='flex items-baseline justify-between'>
        <div className='ml-3'>{dFormat.format(date)}</div>
        <div className='mr-3 text-[5rem]'>{date.getDate()}</div>
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

const Room = ({ room }) => {
  const cls = classNames(
    'w-4 h-4 mx-2 border rounded-lg',
    {
      'border-red bg-red': room === 'rodekamer',
      'border-green bg-green': room === 'groenekamer',
      'border-purple bg-purple': room === 'rosekamer',
      'border-yellow bg-yellow': room === 'multiruimte',
      'border-blue bg-blue': room === 'huiskamer',
      'border-aqua bg-aqua': room === 'keuken'
    }
  )
  return <div className={cls} />
}

export { NoDay }
export default MonthDay
