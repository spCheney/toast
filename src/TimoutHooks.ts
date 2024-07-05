import { useState, useEffect } from "react"
import { ToastValues, Timeout, Action, ActionTypes } from "./Types"

function createTimeout(toast: ToastValues, runnable: () => void, seconds: number) {
  return {
    toastId: toast.id,
    isToastOpen: toast.open,
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

export function useAddTimeout(setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>, dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number) {
  const [addTimeout, setAddTimeout] = useState<(toast: ToastValues) => void>(() => {})

  useEffect(() => {
    setAddTimeout(() =>
      (toast: ToastValues) => {
        setTimeouts(prevState => [
          ...prevState,
          createTimeout(toast, () => dispatch({ type: ActionTypes.close, toastId: toast.id }), timeToastIsOpenFor + openAnimationDuration)
        ])
      }
    )
  }, [dispatch, timeToastIsOpenFor, openAnimationDuration])

  return addTimeout
}

export function useUpdateTimeout(setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>, dispatch: React.Dispatch<Action>, timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number) {
  const [updateTimeout, setUpdateTimeout] = useState<(index: Number, toast: ToastValues) => void>(() => {})
  const removeTimeout = useRemoveTimeout(setTimeouts, dispatch)

  useEffect(() => {
    setUpdateTimeout(() =>
      (index: number, toast: ToastValues) => {
        setTimeouts(prevState => {
          var updated = prevState
          clearTimeout(updated[index].timeout)

          if(toast.open) {
            updated[index] = createTimeout(toast, () => dispatch({ type: ActionTypes.close, toastId: toast.id }), timeToastIsOpenFor + openAnimationDuration)
          } else {
            updated[index] = createTimeout(toast, () => removeTimeout(toast.id), closeAnimationDuration)
          }

          return updated
        })
      }
    )
  }, [setTimeouts, dispatch, timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration, removeTimeout])

  return updateTimeout
}