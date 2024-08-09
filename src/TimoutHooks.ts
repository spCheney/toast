import { useState, useEffect } from "react"
import { ToastValues, Timeout, Action, ActionTypes, ToastStatus } from "./Types"

export function useUpdateTimeouts(createTimeout: (toast: ToastValues) => Timeout, setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>) {
  const [updateTimeouts, setUpdateTimeouts] = useState<(toast: ToastValues, timeout: NodeJS.Timeout, index: number) => void>(() => {})

  useEffect(() => {
    setUpdateTimeouts(() =>
      (toast: ToastValues, timeout: NodeJS.Timeout, index: number) => {
        clearTimeout(timeout)
        var newTimeout = createTimeout(toast)

        setTimeouts(prevState => {
          prevState[index] = newTimeout
          return prevState
        })
      }
    )
  }, [createTimeout, setTimeouts])

  return updateTimeouts
}

export function useCreateTimeout(setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>, dispatch: React.Dispatch<Action>, openAnimationDuration: number, timeToastIsOpenFor: number, closeAnimationDuration: number) {
  const [createTimeout, useCreateTimeout] = useState<(toast: ToastValues) => Timeout>(() => { return {} as Timeout })
  const removeTimeout = useRemoveTimeout(setTimeouts,  dispatch)

  useEffect(() => {
    useCreateTimeout(() =>
        (toast: ToastValues) => {
          if(toast.status === ToastStatus.created) {
            return newTimeout(toast, () => dispatch({ type: ActionTypes.update, toastId: toast.id, status: ToastStatus.open }), openAnimationDuration)
          } else if(toast.status === ToastStatus.open) {
            return newTimeout(toast, () => dispatch({ type: ActionTypes.update, toastId: toast.id, status: ToastStatus.closed }), timeToastIsOpenFor)
          } else {
            return newTimeout(toast, () => removeTimeout(toast.id), closeAnimationDuration)
          }
        }
    )
  }, [dispatch, openAnimationDuration, timeToastIsOpenFor, closeAnimationDuration, removeTimeout])

  return createTimeout
}

function newTimeout(toast: ToastValues, runnable: () => void, seconds: number) {
  return {
    toastId: toast.id,
    toastStatus: toast.status,
    timeout: setTimeout(runnable, seconds * 1000)
  }
}

function useRemoveTimeout(setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>, dispatch: React.Dispatch<Action>) {
  const [removeTimeout, setRemoveTimeout] = useState<(toastId: string) => void>(() => {})

  useEffect(() => {
    setRemoveTimeout(() =>
      (toastId: string) => {
        dispatch({ type: ActionTypes.remove, toastId: toastId })
        setTimeouts(prevState => prevState.filter(timeout => timeout.toastId !== toastId))
      }
    )
  }, [setTimeouts, dispatch])

  return removeTimeout
}