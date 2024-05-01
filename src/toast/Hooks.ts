import { useEffect, useState } from "react"
import styles from "./toast.module.css"
import { ToastInterface } from "./Values"
import { ActionType } from "./reducer"

function useStyles(status: ToastInterface["status"]) {
  const [toastStyles, setToastStyles] = useState([styles.toast])

  useEffect(() => {
    if(status == "OPEN") {
      setToastStyles([styles.toast, styles.open])
    } else if(status == "INITIATE CLOSE") {
      setToastStyles([styles.toast, styles.close])
    }
  }, [status])

  return toastStyles
}

function updateStatus(status: ToastInterface["status"], dispatch: React.Dispatch<ActionType>) {
  //all in seconds
  const timeToastIsOpenFor = 20
  const closeAnimationDuration = 0.3
  const openAnimationDuration = 0.1

  useEffect(() => {
    if(status == "OPEN") {
      delayDispatch("close", timeToastIsOpenFor)
    } else if(status == "INITIATE CLOSE") {
      delayDispatch("close complete", closeAnimationDuration)
    }
  }, [status])

  function delayDispatch(type: ActionType["type"], seconds: number) {
    setTimeout(() => {
      dispatch({ type: type })
    }, seconds * 1000)
  }
}

export { useStyles, updateStatus }