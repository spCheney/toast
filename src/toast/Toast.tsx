import { ReactNode, useEffect, useState } from "react"
import styles from "./toast.module.css"

type Props = {
  toastStatus: string,
  close: () => void,
  content?: ReactNode
}

export default function Toast({toastStatus, close, content}: Props) {
  //all in seconds
  const timeToastIsOpenFor = 20
  const closeAnimationDuration = 0.3
  const openAnimationDuration = 0.1

  const [location, setLocation] = useState(styles.topLeft)
  const [showCloseAni, setShowClosedAni] = useState(false)
  const [displayToast, setDisplayToast] = useState(false)

  const [toastStyles, setToastStyles] = useState([styles.toast])

  useEffect(() => {
    if(toastStatus == "OPEN") {
      setToastStyles([styles.toast, styles.open])
    } else if(toastStatus == "INITIATE CLOSE") {
      setToastStyles([styles.toast, styles.close])
    }
  }, [toastStatus])

  return (
    <div className={ [styles.wrapper, location].join(' ') }>
      {toastStatus == "CLOSED" ? <></> :
      <div className={ toastStyles.join(' ') }>
        <span className={ styles.text }>
          { content }
        </span>
        <button onClick={ () => close() } className={ styles.closeBtn }>x</button>
      </div>}
    </div>
  )
}