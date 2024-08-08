import { useEffect, useState } from "react"
import { Action, ActionTypes, Content, LocationInterface, Timeout, ToastLocation, ToastValues } from "./Types"
import { useCreateTimeout, useUpdateTimeouts } from "./TimoutHooks"

export function updateStatus(toasts: ToastValues[], dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

  const [timeouts, setTimeouts] = useState<Timeout[]>([])
  const createTimeout = useCreateTimeout(setTimeouts, dispatch, openAnimationDuration, timeToastIsOpenFor, closeAnimationDuration)
  const updateTimeouts = useUpdateTimeouts(createTimeout)

  useEffect(() => {
    for(var toast of toasts) {
      const timeoutIndex = timeouts.findIndex(timeout => timeout.toastId === toast.id)
      if(timeoutIndex === -1) {
        setTimeouts(prevState => [ ...prevState, createTimeout(toast) ])
      } else if(timeouts[timeoutIndex].toastStatus !== toast.status) {
        setTimeouts(prevState => updateTimeouts(toast, prevState))
      }
    }
  }, [ toastsToString(toasts) ])
}

function toastsToString(toasts: ToastValues[]) {
  const toastsWithoutContent = toasts.map(toast => {
    return {
      id: toast.id,
      status: toast.status
    }
  })
  return JSON.stringify(toastsWithoutContent)
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
