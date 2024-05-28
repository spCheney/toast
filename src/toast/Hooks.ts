import { useEffect, useState } from "react"
import { StatusType } from "./Values"
import { ActionType } from "./reducer"

function updateStatus(status: StatusType, dispatch: React.Dispatch<ActionType>) {
  //all in seconds
  const timeToastIsOpenFor = 20
  const closeAnimationDuration = 0.3
  const openAnimationDuration = 0.1

  const [currentTimeout, setCurrentTimeout] = useState<undefined | number>()

  useEffect(() => {
    if(status == "OPEN") {
      delayDispatch("close", timeToastIsOpenFor)
    } else if(status == "INITIATE CLOSE") {
      delayDispatch("close complete", closeAnimationDuration)
    } else if(status == "CLOSED") {
      clearTimeout(currentTimeout)
      setCurrentTimeout(undefined)
    }
  }, [status])

  function delayDispatch(type: ActionType["type"], seconds: number) {
    if(currentTimeout != undefined) {
      clearTimeout(currentTimeout)
    }

    const timeout = setTimeout(() => {
      dispatch({ type: type })
      setCurrentTimeout(undefined)
    }, seconds * 1000)

    setCurrentTimeout(timeout)
  }
}

export { updateStatus }