import useRresvContext from '../hooks/use-rresv-context'
import MonthDay, { NoDay } from './MonthDay'

const Month = ({ displayDate }) => {
  const { rresvs } = useRresvContext()

  const first = new Date(
    Date.UTC(displayDate.getFullYear(), displayDate.getMonth(), 1)
  )
  const last = new Date(
    Date.UTC(displayDate.getFullYear(), displayDate.getMonth() + 1, 0)
  )

  // Nr of befores; Days in week before first day.
  const bf = first.getDay() === 0 ? 6 : first.getDay() - 1
  const befores = Array.from(new Array(bf), (_, i) => <NoDay key={i} />)

  // Rresvs this month;
  const mRresvs = rresvs.filter((r) => r.date >= first && r.date <= last)

  // All days.
  let days = Array.from(
    new Array(last.getDate()),
    (_, i) => new Date(Date.UTC(first.getFullYear(), first.getMonth(), i + 1))
  )
  days = days.map((d, i) => {
    return (
      <MonthDay
        key={i}
        rresvs={mRresvs.filter((r) => r.date.getTime() === d.getTime())}
        date={d}
      />
    )
  })

  const fmt = Intl.DateTimeFormat('nl-NL', { year: 'numeric', month: 'long' })
  const header = fmt.format(displayDate)

  return (
    <>
      <div className='py-6 text-6xl text-center'>{header}</div>
      <div className='flex flex-row flex-wrap'>
        {befores}
        {days}
      </div>
    </>
  )
}
export default Month
