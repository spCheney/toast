import { useEffect, useState } from "react"
import { ActionInterface, ActionType, ContentType, LocationInterface, LocationType, StatusType } from "./Types"

function updateStatus(status: StatusType, location: LocationType, dispatch: React.Dispatch<ActionInterface>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

  const [currentTimeout, setCurrentTimeout] = useState<number>()
  const delayDispatch = useDelayDispatchFunction(dispatch, currentTimeout, setCurrentTimeout)

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
}

function useDelayDispatchFunction(dispatch: React.Dispatch<ActionInterface>, currentTimeout: undefined | number, setCurrentTimeout: React.Dispatch<React.SetStateAction<number | undefined>>) {

  const [delayDispatchFunction, setDelayDispatchFunction] = useState<(type: ActionType, seconds: number) => void>( () => () => {} )

  useEffect(() => {
    setDelayDispatchFunction(() => (type: ActionType, seconds: number) => {
      if(currentTimeout != undefined) {
        clearTimeout(currentTimeout)
      }

      const timeout = setTimeout(() => {
        dispatch({ type: type })
        setCurrentTimeout(undefined)
      }, seconds * 1000)

      setCurrentTimeout(timeout)
    })
  }, [dispatch, currentTimeout, setCurrentTimeout])

  return delayDispatchFunction
}

function useOpenFunction(dispatch: React.Dispatch<ActionInterface>) {

  const [openFunction, setOpenFunction] = useState<(content: ContentType) => void>( () => () => {} )

  useEffect(() => {
    setOpenFunction(() => (content: ContentType) => {
      dispatch({ type: "open", content: content })
    })
  }, [dispatch])

  return openFunction
}

function useCloseFunction(dispatch: React.Dispatch<ActionInterface>) {

  const [closeFunction, setCloseFunction] = useState<() => {}>( () => () => {})

  useEffect(() => {
    setCloseFunction(() => () => {
      dispatch({ type: "close" })
    })
  }, [dispatch])

  return closeFunction
}

function useLocation(dispatch: React.Dispatch<ActionInterface>) {

  const [Location, setLocation] = useState<Readonly<LocationInterface>>({} as Readonly<LocationInterface>)

  useEffect(() => {
    setLocation({
      bottomCenter: "BOTTOM-CENTER",
      bottomLeft: "BOTTOM-LEFT",
      bottomRight: "BOTTOM-RIGHT",
      topCenter: "TOP-CENTER",
      topLeft: "TOP-LEFT",
      topRight: "TOP-RIGHT",
      update(location: LocationType) {
        dispatch({ type: "update location", location: location })
      }
    } as Readonly<LocationInterface>)
  }, [dispatch])

  return Location
}

export { updateStatus, useOpenFunction, useCloseFunction, useLocation }