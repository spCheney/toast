import { useEffect, useState } from "react"
import { ActionInterface, ActionType, LocationType, StatusType } from "./Types"

function updateStatus(status: StatusType, location: LocationType, dispatch: React.Dispatch<ActionInterface>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

  const [currentTimeout, setCurrentTimeout] = useState<undefined | number>()

  useEffect(() => {
    if(status == "OPEN") {
      delayDispatch("close", timeToastIsOpenFor + openAnimationDuration)
    } else if(status == "INITIATE CLOSE") {
      delayDispatch("close complete", closeAnimationDuration)
    } else if(status == "CLOSED") {
      clearTimeout(currentTimeout)
      setCurrentTimeout(undefined)
    }
  }, [status])

  useEffect(() => {
    if(currentTimeout != undefined) {
      clearTimeout(currentTimeout)
    }

    if(status == "INITIATE CLOSE") {
      dispatch({ type: "open" })
    } else if(status == "OPEN") {
      delayDispatch("close", timeToastIsOpenFor)
    }
  }, [location])

  function delayDispatch(type: ActionType, seconds: number) {
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