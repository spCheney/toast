import { useEffect, useState } from "react"
import { Action, ActionTypes, ContentType, LocationInterface, StatusType, Timeout, ToastLocation, ToastValues } from "./Types"

// function updateStatus(status: StatusType, location: ToastLocation, dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

//   const [currentTimeout, setCurrentTimeout] = useState<number>()
//   const delayDispatch = useDelayDispatchFunction(dispatch, currentTimeout, setCurrentTimeout)

//   useEffect(() => {
//     if(status == "OPEN") {
//       delayDispatch(ActionTypes.close, timeToastIsOpenFor + openAnimationDuration)
//     } else if(status == "INITIATE CLOSE") {
//       delayDispatch(ActionTypes.closeComplete, closeAnimationDuration)
//     } else if(status == "CLOSED") {
//       clearTimeout(currentTimeout)
//       setCurrentTimeout(undefined)
//     }
//   }, [status])

//   useEffect(() => {
//     if(currentTimeout != undefined) {
//       clearTimeout(currentTimeout)
//     }

//     if(status == "INITIATE CLOSE") {
//       dispatch({ type: ActionTypes.open })
//     } else if(status == "OPEN") {
//       delayDispatch(ActionTypes.close, timeToastIsOpenFor)
//     }
//   }, [location])
// }

function updateStatus(toasts: ToastValues[], location: ToastLocation, dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

  const [timeouts, setTimeouts] = useState<Timeout[]>([])
  const delayDispatch = useDelayDispatchFunction(dispatch, currentTimeout, setCurrentTimeout)

  useEffect(() => {
    if(status == "OPEN") {
      delayDispatch(ActionTypes.close,  timeToastIsOpenFor + openAnimationDuration)
    } else if(status == "INITIATE CLOSE") {
      delayDispatch(ActionTypes.closeComplete, closeAnimationDuration)
    }
  }, [status])

  useEffect(() => {
    if(currentTimeout != undefined) {
      clearTimeout(currentTimeout)
    }

    if(status == "INITIATE CLOSE") {
      dispatch({ type: ActionTypes.open })
    } else if(status == "OPEN") {
      delayDispatch(ActionTypes.close, timeToastIsOpenFor)
    }
  }, [location])
}

function useDelayDispatchFunction(dispatch: React.Dispatch<Action>, currentTimeout: undefined | number, setCurrentTimeout: React.Dispatch<React.SetStateAction<number | undefined>>) {

  const [delayDispatchFunction, setDelayDispatchFunction] = useState<(type: ActionTypes, seconds: number) => void>( () => () => {} )

  useEffect(() => {
    setDelayDispatchFunction(() => (type: ActionTypes, id: string, seconds: number) => {
      if(currentTimeout != undefined) {
        clearTimeout(currentTimeout)
      }

      const timeout = setTimeout(() => {
        dispatch({ type: type, toastId: id })
        setCurrentTimeout(undefined)
      }, seconds * 1000)

      setCurrentTimeout(timeout)
    })
  }, [dispatch, currentTimeout, setCurrentTimeout])

  return delayDispatchFunction
}

function useOpenFunction(dispatch: React.Dispatch<Action>) {

  const [openFunction, setOpenFunction] = useState<(content: ContentType) => void>( () => () => {} )

  useEffect(() => {
    setOpenFunction(() => (content: ContentType) => {
      dispatch({ type: ActionTypes.open, content: content })
    })
  }, [dispatch])

  return openFunction
}

function useCloseFunction(dispatch: React.Dispatch<Action>) {

  const [closeFunction, setCloseFunction] = useState<() => {}>( () => () => {})

  useEffect(() => {
    setCloseFunction(() => () => {
      dispatch({ type: ActionTypes.close })
    })
  }, [dispatch])

  return closeFunction
}

function useLocation(dispatch: React.Dispatch<Action>) {

  const [Location, setLocation] = useState<Readonly<LocationInterface>>({} as LocationInterface)

  useEffect(() => {
    setLocation({
      ...ToastLocation,
      update(location: ToastLocation) {
        dispatch({ type: ActionTypes.updateLocation, location: location })
      }
    })
  }, [dispatch])

  return Location
}

export { updateStatus, useOpenFunction, useCloseFunction, useLocation }