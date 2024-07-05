import { useEffect, useState } from "react"
import { Action, ActionTypes, Content, LocationInterface, Timeout, ToastLocation, ToastValues } from "./Types"
import { useAddTimeout, useUpdateTimeout } from "./TimoutHooks"

function updateStatus(toasts: ToastValues[], dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

  const [timeouts, setTimeouts] = useState<Timeout[]>([])
  const addTimeout = useAddTimeout(setTimeouts, dispatch, timeToastIsOpenFor, openAnimationDuration)
  const updateTimeout = useUpdateTimeout(setTimeouts, dispatch, timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration)

  useEffect(() => {
    for(var toast of toasts) {
      const timeoutIndex = timeouts.findIndex(timeout => timeout.toastId === toast.id)
      if(timeoutIndex === -1) {
        addTimeout(toast)
      } else if(timeouts[timeoutIndex].isToastOpen !== toast.open) {
        updateTimeout(timeoutIndex, toast)
      }
    }
  }, [JSON.stringify(toasts)])
}

function useOpenFunction(dispatch: React.Dispatch<Action>) {

  const [openFunction, setOpenFunction] = useState<(content: Content) => void>( () => () => {} )

  useEffect(() => {
    setOpenFunction(() => (content: Content) => {
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
        dispatch({ type: ActionTypes.setLocation, location: location })
      }
    })
  }, [dispatch])

  return Location
}

export { updateStatus, useOpenFunction, useCloseFunction, useLocation }