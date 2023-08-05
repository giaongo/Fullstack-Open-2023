import { useContext } from "react"
import NotiContext from "../NotiContext"

const Notification = () => {
  const [notiState, notiDispatch] = useContext(NotiContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5, 
    display: notiState.isVisible ? 'block' : 'none'
  }
  console.log("notistate", notiState)

  return (
    <div style={style}>
      {notiState.message}
    </div>
  )
}

export default Notification
