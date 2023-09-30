import classNames from 'classnames'

const MonthDayRoom = ({ room, roomClickHandler }) => {
  const cls = classNames(
    'w-4 h-4 mx-1 border rounded-full',
    {
      'border-red bg-red': room === 'rodekamer',
      'border-green bg-green': room === 'groenekamer',
      'border-purple bg-purple': room === 'rosekamer',
      'border-yellow bg-yellow': room === 'multiruimte',
      'border-blue bg-blue': room === 'huiskamer',
      'border-aqua bg-aqua': room === 'keuken'
    }
  )
  return <div onClick={roomClickHandler} className={cls} />
}

export default MonthDayRoom