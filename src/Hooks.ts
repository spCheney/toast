import { useEffect, useState } from "react"
import { Action, ActionTypes, Content, LocationInterface, Timeout, ToastLocation, ToastStatus, ToastValues } from "./Types"
import { useCreateTimeout, useRemoveTT, useUpdateTimeouts } from "./TimoutHooks"
import { getCSSClasses } from "./StyleFunctions"

export function updateStatus(toasts: ToastValues[], dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {

  const [timeouts, setTimeouts] = useState<Timeout[]>([])
  const removeTT = useRemoveTT(setTimeouts, dispatch)
  const createTimeout = useCreateTimeout(removeTT , dispatch, openAnimationDuration, timeToastIsOpenFor, closeAnimationDuration)
  const updateTimeouts = useUpdateTimeouts(createTimeout, setTimeouts)

  useEffect(() => {
    for(var toast of toasts) {
      const timeoutIndex = timeouts.findIndex(timeout => timeout.toastId === toast.id)
      if(timeoutIndex === -1) {
        setTimeouts(prevState => [ ...prevState, createTimeout(toast) ])
      } else if(timeouts[timeoutIndex].toastStatus !== toast.status) {
        updateTimeouts(toast, timeouts[timeoutIndex].timeout, timeoutIndex)
      }
    }
  }, [ toastsToString(toasts), createTimeout ])
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

export function useToastCSSClass(status: ToastStatus, location: ToastLocation) {
  const [toastCSSClass, setToastCSSClass] = useState( getCSSClasses(status, location) )

  useEffect(() => {
    setToastCSSClass( getCSSClasses(status, location) )
  }, [status, location])

  return toastCSSClass
}
