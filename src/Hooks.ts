import { useEffect, useState } from "react"
import { Action, ActionTypes, Content, LocationInterface, Timeout, ToastLocation, ToastValues } from "./Types"
import { useAddTimeout, useUpdateTimeout } from "./TimoutHooks"

export function updateStatus(toasts: ToastValues[], dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

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
  }, [toastsToString(toasts)])
}

function toastsToString(toasts: ToastValues[]) {
  const removedContent = toasts.map(toast => {toast.id, toast.open})
  console.log(removedContent)
  return JSON.stringify(removedContent)
}

export function useOpenFunction(dispatch: React.Dispatch<Action>) {

  const [openFunction, setOpenFunction] = useState<(content: Content) => void>( () => () => {} )

  useEffect(() => {
    setOpenFunction(() => (content: Content) => {
      dispatch({ type: ActionTypes.open, content: content })
    })
  }, [dispatch])

  return openFunction
}

export function useLocation(dispatch: React.Dispatch<Action>) {

  const defaultLocation = {
    ...ToastLocation,
    update() {}
  }
  const [Location, setLocation] = useState<Readonly<LocationInterface>>(defaultLocation)

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
