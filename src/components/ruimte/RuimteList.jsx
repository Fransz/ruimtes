import useRresvContext from '../../hooks/use-rresv-context'
import RresvShow from './RresvShow'

const RresvsList = () => {
  const { rresvs } = useRresvContext()

  const rendered = rresvs.map((r) => {
    return <RresvShow key={r.id} rresv={r} />
  })

  return <div>{rendered}</div>
}

export default RresvsList
